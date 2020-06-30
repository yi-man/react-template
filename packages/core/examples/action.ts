import { ActionCreator } from "flux-payload-action";

export const testAction = ActionCreator < {
  [url: string]: string;
} > (`${__filenamespace}/test`);