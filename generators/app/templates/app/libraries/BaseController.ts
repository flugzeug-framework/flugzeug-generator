import { BaseController as BaseControllerLib } from "flugzeug";
import { DependenciesInjection } from "./BaseControllerDependency";

export class BaseController extends BaseControllerLib {
  constructor(dependenciesInjection: DependenciesInjection) {

    const { setAuthorize, setValidateJWT } = dependenciesInjection || {} as DependenciesInjection;    
    super(setValidateJWT(), setAuthorize());
  }
}
