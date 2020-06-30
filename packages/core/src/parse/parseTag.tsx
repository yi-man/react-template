/* tslint:disable no-console no-default-export no-parameter-reassignment */
import { TagElement } from "../interface";

const regStatic = /\s+([\w-_]+)=('[^']*'|"[^"]*")/;
const regSingle = /\s+(\w+)(?![=\w])/;

const reg = {
  regStatic,
  regSingle,
};

const matchFirst = (str: string) => {
  const matchedArr: RegExpMatchArray[] = [];
  Object.keys(reg).forEach(k => {
    const matched = str.match(reg[k]);
    if (matched) {
      matchedArr.push(matched);
    }
  });

  if (matchedArr.length === 0) {
    return null;
  }

  matchedArr.sort((a, b) => {
    if (a.index && b.index) {
      return a.index - b.index;
    }

    return 0;
  });

  return matchedArr[0];
};

const voidElements = new Set([
  "area",
  "base",
  "basefont",
  "br",
  "col",
  "command",
  "embed",
  "frame",
  "hr",
  "img",
  "input",
  "isindex",
  "keygen",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr",
]);

export default function(tag: string) {
  const res: TagElement = {
    type: "tag",
    name: "",
    voidElement: false,
    attrs: {},
    children: [],
  };

  const tagMatch = tag.match(/<\/?([^\s]+?)[/\s>]/);
  if (tagMatch) {
    res.name = tagMatch[1];

    if (voidElements.has(tagMatch[1]) || tag.charAt(tag.length - 2) === "/") {
      res.voidElement = true;
    }
  }

  let elemStr = tag;

  let match = matchFirst(elemStr);

  while (match) {
    const k = match[1];
    if (k) {
      if (match.length > 2) {
        const v = match[2].trim();

        res.attrs[k] = {
          type: "text",
          value: v.substr(1, v.length - 2),
        };
      } else {
        res.attrs[k] = {
          type: "boolean",
          value: true,
        };
      }

      elemStr = elemStr.substr((match.index ? match.index : 0) + match[0].length);

      match = matchFirst(elemStr);
    } else {
      match = null;
    }
  }

  return res;
}
