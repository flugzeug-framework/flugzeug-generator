import { ModelController as  ModelControllerLib} from "flugzeug";
import { validateJWT } from "@/policies/General";
import { authorize } from "@/policies/Authorization";
import { db } from "@/db";
import { percentEncode } from "@/libraries/util";
import { config } from "@/config";
import { Model } from "sequelize";

export class ModelController<T extends Model> extends ModelControllerLib<T> {
  constructor() {
    super(validateJWT, authorize, db, percentEncode, config);
  }
}
