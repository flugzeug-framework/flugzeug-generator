import { BaseController as BaseControllerLib } from "flugzeug";
import { validateJWT } from "@/policies/General";
import { authorize } from "@/policies/Authorization";

export class BaseController extends BaseControllerLib {
  constructor() {
    super(validateJWT, authorize);
  }
}
