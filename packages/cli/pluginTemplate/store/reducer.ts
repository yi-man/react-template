import { AnyAction } from "redux";
import { namespaceName } from "./namespace";

import { rootSelectorFactory } from "packages/chrysalis/reducer/rootSelectorFactory";
import { extendTestAction } from "./actions";

interface IExtendReducer {
  [url: string]: string;
}
const defaultState: IExtendReducer = {};

export function extendReducer(state = defaultState, action: AnyAction) {
  if (extendTestAction.match(action)) {
    return {
      ...state,
      ...action.payload,
    };
  }

  return state;
}
export const extendRootSelector = rootSelectorFactory<typeof extendReducer>(namespaceName);
