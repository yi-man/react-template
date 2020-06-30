/* tslint:disable no-console no-default-export no-parameter-reassignment */
import { RTElements, TagElement } from "../interface";
import parseTag from "./parseTag";

const tagRE = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g;

export function parse(html: string) {
  // 最终数组
  const result: RTElements = [];
  // 当前tag
  let current: TagElement;
  // 层级
  let level = -1;
  // 层级数组
  const arr: TagElement[] = [];

  html.replace(tagRE, (tag, index) => {
    const isOpen = tag.charAt(1) !== "/";
    let parent;

    if (isOpen) {
      level++;
      current = parseTag(tag);

      // 添加到主数组
      if (level === 0) {
        result.push(current);
      }
      parent = arr[level - 1];
      if (parent) {
        parent.children.push(current);
      }
      arr[level] = current;
    }

    if (!isOpen || current.voidElement) {
      level--;
    }

    return "";
  });
  return result;
}
