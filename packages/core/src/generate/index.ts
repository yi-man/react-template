import * as React from "react";
import { ITemplateData, RTElements } from "../interface";
import { transform } from "../transform";
import { isBiz, isLayout } from './enum';

export { DomType } from './enum'

const create = (
  children: RTElements,
  props: object,
  components: object,
  index: number,
): React.ReactNode =>
  children.map(ele => {
    const key = `_${index}`;

    if (ele.type === "tag") {
      const { attrs, children: children2, name } = ele;

      let bindObj = {};
      let className = "";

      Object.keys(attrs).forEach(k => {
        const obj = attrs[k];

        if (isBiz(k)) {
          bindObj = props[obj.value];
        } else if (isLayout(k)) {
          className = obj.value;
        }
      });

      return React.createElement(
        components[name] ? components[name] : name,
        {
          key,
          className,
          ...bindObj,
        },

        (index++, children2.length > 0 ? create(children2, props, components, index) : null),
      );
    }

    if (ele.type === "reactNode") {
      // @ts-ignore
      return ele.content;
    }

    return null;
  });

const generateByCreateElement = (rootArr: RTElements, props: object, components: object) => {
  if (!Array.isArray(rootArr)) {
    return new Error("必须为数组对象");
  }

  if (rootArr.length === 0) {
    return null;
  }

  if (rootArr.length > 1) {
    return new Error("只能有一个子元素");
  }

  return create(rootArr, props, components, 0);
};

export function generate(dataSource: ITemplateData) {
  const htmlTree = transform(dataSource);

  const { props, components } = dataSource;

  return generateByCreateElement(htmlTree, props, components) as any;
}
