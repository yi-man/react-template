import { createFile } from '../utils/fs'
import { jsFormat } from '../utils/format'
import { ICategoryData } from '../createFiles'

async function createReducer(name: string) {
  const reducerName = `${name}Reducer`
  const selector = `${name}RootSelector`

  const content = `
  import { rootSelectorFactory } from "packages/chrysalis/reducer/rootSelectorFactory";
  import { AnyAction } from "redux";
  import {
    testAction,
  } from "./actions";

  export interface IState {
    current_user_url: string | undefined;
  }

  export const defaultState: IState = {
    current_user_url: undefined,
  };

  export const ${reducerName} = (state = defaultState, action: AnyAction): IState => {
    if (testAction.match(action)) {
      return {
        ...state,
        ...action.payload,
      };
    }

    return state;
  };

  export const ${selector} = rootSelectorFactory<typeof ${reducerName}>(__filenamespace);
  `

  await createFile('reducer.ts', jsFormat(content))
}

async function createAction() {
  const content = `
    import { ActionCreator } from "flux-payload-action";

    export const testAction = ActionCreator<{
      [url: string]: string;
    }>(\`$\{__filenamespace}/test\`);
  `

  await createFile('actions.ts', jsFormat(content));
}

async function createSaga(pageName: string) {
  const sagaName = `${pageName}Saga`

  const content = `
    import { ActionCreator } from "flux-payload-action";
    import { put, takeLatest } from "redux-saga/effects";    
    import { testAction } from "./actions";
    
    export const triggerTest = ActionCreator(\`$\{__filenamespace}/triggerExtendTest\`);
    
    function* triggerTestWorker() {    
      const res = {
        current_user_url: "https://www.xxx.com/",
      };
      yield put(testAction(res));
    }
    
    export function* ${sagaName}() {
      yield takeLatest(triggerTest.match, triggerTestWorker);
    }
  `

  await createFile('saga.ts', jsFormat(content))
}

async function createModule(pageName: string) {
  const moduleName =  `${pageName.replace(/^[A-Z]/, (F) => F.toLocaleLowerCase())}Module`

  const content = `
    import { ${pageName}Reducer as reducer } from "./reducer";
    import { ${pageName}Saga as saga } from "./saga";
    
    export const ${moduleName} = {
      reducer,
      saga,
      namespace: __filenamespace,
    };
  `

  await createFile('module.ts', jsFormat(content))
}

async function createSelector(pageName: string) {
  const selector = `${pageName}RootSelector`
  const content = `
  import { createSelector } from "reselect";
  import { ${selector} } from "./reducer";
    
  export const testSelector = createSelector(
    ${selector},
    ({ current_user_url }) => {
      return {
        current_user_url,
      };
    },
  );
  `

  await createFile('selector.ts', jsFormat(content))
}

export async function createStore(pageName: string, componentNameArr?: ICategoryData['props']) {
  await createReducer(pageName);
  await createAction();
  await createSaga(pageName);
  await createModule(pageName);
  await createSelector(pageName);
}
