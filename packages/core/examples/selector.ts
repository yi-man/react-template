import { createSelector } from "reselect";
import { examplesRootSelector } from "./reducer";

export const testSelector = createSelector(
  examplesRootSelector,
  ({ current_user_url }) => {
    return {
      current_user_url
    }
  }
)