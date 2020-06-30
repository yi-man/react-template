import { bindActionCreators, Dispatch } from "redux";
import { createSelector } from "reselect";
import {
  testAction
} from "./action";
import { examplesRootSelector } from "./reducer";
import {
  triggerTest
} from "./saga";
import {
  testSelector
} from "./selector";

const mapStateToProps = createSelector(
  examplesRootSelector,
  testSelector,
  (examplesRootSelectorData, testSelectorData) => {
    return {
      examplesRootSelectorData,
      testSelectorData
    }
  }
)

const mapDispatchToProps = (dispatch: Dispatch) => {
  bindActionCreators({
      testAction,
      triggerTest,
    },
    dispatch,
  );
}

export type Props = ReturnType < typeof mapStateToProps > & ReturnType < typeof mapDispatchToProps > ;

const mergeProps = (stateProps: ReturnType < typeof mapStateToProps > , dispatchProps: ReturnType < typeof mapDispatchToProps > , ownProps: object) => {
  return {
    barrierScreenSubscribeData: {},
    barrierScreenSummaryData: {},
    BarrierScreenLocationData: {},
    BarrierScreenContentData: {},
    CaptureWallBannerData: {},
    SliderData: {},
    AlertSubscriptionData: {},
    AlertWallSummaryData: {},
    AlertLinkData: {},
    AlertWallFilterData: {},
    AlertWallListData: {},
  }
}

export const adapter = {
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
};