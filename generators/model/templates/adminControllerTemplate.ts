import { <%- modelName %> } from "@/models/<%- modelName %>";
import { Controller } from "flugzeug";
import { ModelAdminController } from "@/libraries/ModelAdminController";

@Controller("<%- tableName %>", <%- modelName %>)
export class <%- modelName %>AdminController extends ModelAdminController<<%- modelName %>> {
  constructor() {
    super();
  }
}

const controller = new <%- modelName %>AdminController();
export default controller;
