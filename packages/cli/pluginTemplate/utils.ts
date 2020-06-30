import { chrysalis } from "packages/chrysalis";
import { AnyAction } from "redux";
export { extendProps } from '@yds/react-template';

export const getStore = () => chrysalis.getStore();

export const getState = () => chrysalis.getStore().getState();

export const dispatch = (action: AnyAction) => chrysalis.getStore().dispatch(action);

