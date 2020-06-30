import { examplesReducer as reducer } from "./reducer";
import { examplesSaga as saga } from "./saga";

export const extendModule = {
  reducer,
  saga,
  namespace: __filenamespace,
};