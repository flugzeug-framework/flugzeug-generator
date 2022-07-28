import { BaseController } from "@/libraries/BaseController";
import { Request, Response } from "express";
import {
  authenticateSSO,
  authenticateSSOCallback,
  IdentityProvider,
} from "@/policies/Authentication";
import { config } from "@/config";
import { AuthType, User } from "@/models/User";
import { Op } from "sequelize";
import authService from "@/services/AuthService";
import { Role } from "@/models/Role";
import onboardingService from "@/services/OnboardingService";
import { Profile } from "@/models/Profile";
import { Controller, Get, Middlewares } from "flugzeug";
import { dependenciesInjection } from "@/libraries/BaseControllerDependency";

@Controller("microsoftauth")
export class MicrosoftAuthController extends BaseController {
  @Get("/login")
  authenticate = authenticateSSO(IdentityProvider.Microsoft);

  @Get("/login/callback")
  @Middlewares([authenticateSSOCallback(IdentityProvider.Microsoft)])
  loginCallback = (req, res) =>
    this.login(req, res, {
      loginPageRedirect: config.auth.login_page,
      homePageRedirect: config.auth.home_page,
    });

  @Get("/register")
  authenticateRegister = authenticateSSO(IdentityProvider.MicrosoftRegister);

  @Get("/register/callback")
  @Middlewares([authenticateSSOCallback(IdentityProvider.MicrosoftRegister)])
  registerCallback = (req, res) =>
    this.register(req, res, {
      registerPageRedirect: config.auth.register_page,
      homePageRedirect: config.auth.home_page,
    });

  async login(
    req: Request,
    res: Response,
    options: {
      loginPageRedirect: string;
      homePageRedirect: string;
    },
  ) {
    try {
      // On Microsoft, it is called mail. On Gmail, it is called email.
      const email =
        (req.user as any)?._json?.mail || (req.user as any)?._json?.email;
      if (email == null) {
        return BaseController.notFound(res);
      }

      const user: User = await User.findOne({
        where: {
          email: {
            [Op.iLike]: email.toLowerCase(),
          },
          authType: AuthType.Microsoft,
        },
        include: [{ model: Role, as: "roles" }],
      });

      if (user == null)
        return res.redirect(`${options.loginPageRedirect}?status=notFound`);
      if (!user.isActive)
        return res.redirect(`${options.loginPageRedirect}?status=unauthorized`);
      const token = authService.getExchangeToken(user);
      res.redirect(`${options.homePageRedirect}?token=${token}`);
    } catch (error) {
      return BaseController.serverError(res, error);
    }
  }

  async register(
    req: Request,
    res: Response,
    options: {
      registerPageRedirect: string;
      homePageRedirect: string;
    },
  ) {
    try {
      // On Microsoft, it is called mail. On Gmail, it is called email.
      const email =
        (req.user as any)?._json?.mail || (req.user as any)?._json?.email;
      const name = (req.user as any)?._json?.displayName;
      if (email == null) {
        return BaseController.notFound(res);
      }

      // Validate if user doesn't already exists
      let user: User = await User.findOne({
        where: {
          email: {
            [Op.iLike]: email.toLowerCase(),
          },
        },
      });

      if (user != null) {
        // User already exists
        return res.redirect(
          `${options.registerPageRedirect}?status=emailInUse`,
        );
      }

      // Create new user from SSO response data
      user = await onboardingService.createUser(
        name,
        email,
        "ssonopassword",
        AuthType.Microsoft,
      );
      // We need to do another query because before, the profile and role weren't ready
      user = await User.findOne({
        where: { id: user.id },
        include: [
          { model: Profile, as: "profile" },
          { model: Role, as: "roles" },
        ],
      });

      // Login directly
      const token = authService.getExchangeToken(user);
      res.redirect(`${options.homePageRedirect}?token=${token}`);
    } catch (error) {
      return BaseController.serverError(res, error);
    }
  }
}

const controller = new MicrosoftAuthController(dependenciesInjection);
export default controller;
