import { call, put, takeLatest } from "redux-saga/effects";

import { ActionCreator } from "flux-payload-action";
import { testAction } from "./actions";

export const triggerTest = ActionCreator(`${__filenamespace}/triggerExtendTest`);

function* triggerTestWorker() {
  const res = {
    current_user_url: "https://www.xxx.com/",
  };
  yield put(testAction(res));
}

export function* examplesSaga() {
  yield takeLatest(triggerTest.match, triggerTestWorker);
}