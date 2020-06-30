import { createFile } from '../utils/fs'
import { jsFormat } from '../utils/format'
import { ICategoryData } from '../createFiles'

export async function createAdapter(pageName: string, componentNameArr: ICategoryData['props']) {
  
  let content = `
    import { bindActionCreators, Dispatch } from "redux";
    import { createSelector } from "reselect";
    import {
      testAction,
    } from "./actions";
    import { ${pageName}RootSelector } from "./reducer";
    import {
      triggerTest,
    } from "./saga";
    import {
      testSelector,
    } from "./selector";

    const mapStateToProps = createSelector(
      ${pageName}RootSelector,
      testSelector,
      (${pageName}RootSelectorData, testSelectorData) => {
        return {
          ${pageName}RootSelectorData,
          testSelectorData,
        };
      },
    );

    const mapDispatchToProps = (dispatch: Dispatch) =>
      bindActionCreators(
        {
          testAction,
          triggerTest,
        },
        dispatch,
      );

    export type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

    const mergeProps = (stateProps: ReturnType<typeof mapStateToProps>, dispatchProps: ReturnType<typeof mapDispatchToProps>, ownProps: object) => {
      return {
  `

  componentNameArr.forEach(comp => {
    const { propName } = comp;

    content += `
      ${propName}: {
      },
    `.trim()
  })

  content += ` 
      };   
    };

    export const adapter = {
      mapStateToProps,
      mapDispatchToProps,
      mergeProps,
    };
  `.trim()

  await createFile('adapter.ts', jsFormat(content))
}
