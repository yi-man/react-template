import { ITemplateData, RTElements, TemplateCollection, TemplateConfig } from "../interface";
import { parse } from "../parse";

const mergeJsxTreeObject = (jsxTree: RTElements, props: object, overide: TemplateConfig) => {
  if (overide.template) {
    overide.template(jsxTree, props);
  }

  return jsxTree;
};

export let patches = {};

export const loadPatches = (overridePatches: TemplateCollection) => {
  patches = overridePatches;
};

const cache = {};

export function transform({ id, template, props, components }: ITemplateData) {
  let htmlTree;
  if (cache[id]) {
    htmlTree = cache[id];
  } else {
    htmlTree = parse(template);
    if (patches[id]) {
      htmlTree = mergeJsxTreeObject(htmlTree, props, patches[id]);
    }

    // console.log(htmlTree)

    cache[id] = htmlTree;
  }
  return htmlTree;
}
