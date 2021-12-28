import { ModelAdminController as ModelAdminControllerLib } from "flugzeug";
import { validateJWT } from "@/policies/General";
import { authorize, hasAdminAccess } from "@/policies/Authorization";
import { db } from "@/db";
import { percentEncode } from "@/libraries/util";
import { config } from "@/config";
import { Model } from "sequelize";

export class ModelAdminController<
  T extends Model
  > extends ModelAdminControllerLib<T> {
  constructor() {
    super(validateJWT, authorize, hasAdminAccess, db, percentEncode, config);
  }
}
