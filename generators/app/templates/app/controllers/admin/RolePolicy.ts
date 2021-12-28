import { Controller } from "flugzeug";
import { ModelAdminController } from "@/libraries/ModelAdminController";
import { RolePolicy } from "@/models/RolePolicy";

@Controller("rolePolicy", RolePolicy)
export class RolePolicyAdminController extends ModelAdminController<
  RolePolicy
> {
  constructor() {
    super();
  }
}

const controller = new RolePolicyAdminController();
export default controller;
