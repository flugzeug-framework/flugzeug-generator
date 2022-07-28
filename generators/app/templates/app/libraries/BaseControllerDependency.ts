import { authorize } from "@/policies/Authorization";
import { validateJWT } from "@/policies/General";

export interface DependenciesInjection {
  setAuthorize: Function,
  setValidateJWT: Function
}

export const dependenciesInjection: DependenciesInjection = {
  setAuthorize: () => authorize(),
  setValidateJWT: () => validateJWT,
};
