import { Controller } from "flugzeug";
import { ModelAdminController } from "@/libraries/ModelAdminController";
import { Role } from "@/models/Role";

@Controller("role", Role)
export class RoleAdminController extends ModelAdminController<Role> {
  constructor() {
    super();
  }
}

const controller = new RoleAdminController();
export default controller;
