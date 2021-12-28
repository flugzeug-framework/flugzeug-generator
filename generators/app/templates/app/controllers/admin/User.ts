import { User } from "@/models/User";
import { Controller } from "flugzeug";

import { ModelAdminController } from "@/libraries/ModelAdminController";

@Controller("user", User)
export class UserAdminController extends ModelAdminController<User> {
  constructor() {
    super();
  }
}

const controller = new UserAdminController();
export default controller;
