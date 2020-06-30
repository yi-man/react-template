import { getElementByClassName, getElementByData, RTElements } from "@yds/react-template";
import * as React from "react";
import { extendRootSelector } from "../../store/reducer";
import { triggerExtendTest } from "../../store/saga";
import { dispatch, extendProps } from '../../utils';
import ReplaceBarrierScreenLocation from "./ReplaceBarrierScreenLocation";
import ReplaceComponent from "./ReplaceComponent";

const onClick = () => dispatch(triggerExtendTest());

export const barrielTpl = {
  id: "barrielTpl",
  components: {
    ReplaceBarrierScreenLocation,
  },
  props: extendProps(extendRootSelector, ({ current_user_url }) => {
    return {
      current_user_url,
    };
  }).merge((props: any) => {
    return {
      BarrierScreenLocationData: {
        current_user_url: props.current_user_url,
        triggerExtendTest: onClick,
      },
    };
  }),
  
  template: (tpl: RTElements) => {
    // 通过className查找
    // 改字, 合并属性和事件    
    let found = getElementByClassName(tpl, "BarrierScreen-location");
    found.replaceChildren(`<ReplaceBarrierScreenLocation props="BarrierScreenLocationData" />`);
    // 额外添加新组建
    found.appendChildren(<ReplaceComponent />);
  
    // 通过data查找
    found = getElementByData(tpl, "BarrierScreenLocationData");
    found.replace(ReplaceBarrierScreenLocation);
    // found.delete();
    
    return tpl;
  },
};
