import { ActionCreator } from "flux-payload-action";
import { put, takeLatest } from "redux-saga/effects";
import { extendTestAction } from "./actions";
import { namespaceName } from "./namespace";

export const triggerExtendTest = ActionCreator(`${namespaceName}/triggerExtendTest`);

function* triggerExtendTestWorker() {
  // let res: SagaEffectReturn<any> = yield call(getGithubInfo);

  const res = {
    current_user_url: "http://www.baidu.com",
  };
  yield put(extendTestAction(res));
}

export function* extendSaga() {
  yield takeLatest(triggerExtendTest.match, triggerExtendTestWorker);
}
