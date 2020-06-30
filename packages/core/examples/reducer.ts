import { AnyAction } from "redux";
import { rootSelectorFactory } from "packages/chrysalis/reducer/rootSelectorFactory";
import {
  testAction
} from "./action";

export interface IState {};

export const defaultState: IState = {};

export const examplesReducer = (state = defaultState, action: AnyAction): IState => {
  if (testAction.match(action)) {
    return {
      ...state,
      ...action.payload,
    };
  }

  return state;
}

export const examplesRootSelector = rootSelectorFactory < typeof examplesReducer > (__filenamespace);