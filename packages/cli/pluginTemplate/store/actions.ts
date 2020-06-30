import { ActionCreator } from "flux-payload-action";
import { namespaceName } from "./namespace";

export const extendTestAction = ActionCreator<{
  [url: string]: string;
}>(`${namespaceName}/extendTest`);
