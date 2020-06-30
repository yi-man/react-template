import { namespaceName } from "./namespace";
import { extendReducer as reducer } from "./reducer";
import { extendSaga as saga } from "./saga";

export const extendModule = {
  reducer,
  saga,
  namespace: namespaceName,
};
