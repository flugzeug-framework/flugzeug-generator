import { Controller } from "flugzeug";
import { ModelAdminController } from "@/libraries/ModelAdminController";
import { Profile } from "@/models/Profile";

@Controller("profile", Profile)
export class ProfileAdminController extends ModelAdminController<Profile> {
  constructor() {
    super();
  }
}

const controller = new ProfileAdminController();
export default controller;
