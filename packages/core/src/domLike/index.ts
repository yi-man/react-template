import * as React from "react";
import { DomType, isBiz, isLayout } from '../generate/enum';
import { RTElement, RTElements } from "../interface";
import { parse } from "../parse";

const replaceChildren = (tpl: RTElement, newChildren: string | React.ReactNode) => {
  if (tpl.children) {
    if (typeof newChildren === "string") {
      const result = parse(newChildren);
      tpl.children = result;
    } else {
      tpl.children = [
        {
          type: "reactNode",
          content: newChildren,
        },
      ];
    }
  }
};

const appendChildren = (tpl: RTElement, newChildren: string | React.ReactNode) => {
  if (tpl.children) {
    if (typeof newChildren === "string") {
      const result = parse(newChildren);
      tpl.children.push(result[0]);
    } else {
      tpl.children.push({
        type: "reactNode",
        content: newChildren,
      });
    }
  }
};

interface IFoundResult {
  found?: RTElement;
  type?: DomType;
  replaceChildren: (newChildren: string | React.ReactNode) => IFoundResult;
  appendChildren: (newChildren: string | React.ReactNode) => IFoundResult;
  replace: (newChildren: React.ComponentClass) => IFoundResult;
  delete: () => IFoundResult;
  deleteChildren: () => IFoundResult;
}

const foundResult: IFoundResult = {
  replace(newChildren) {
    if (this.found && isBiz(this.type)) {
      const tpl = this.found;

      // @ts-ignore
      tpl.name = newChildren.name;
    }

    return this;
  },

  delete() {
    if (this.found && isBiz(this.type)) {
      this.found.type = 'deleted';
      this.found = undefined;
    }

    return this;
  },

  replaceChildren (newChildren) {
    if (this.found && isLayout(this.type)) {
      const tpl = this.found;

      replaceChildren(tpl, newChildren);
    }

    return this;
  },

  appendChildren(newChildren) {
    
    if (this.found && isLayout(this.type)) {
      const tpl = this.found;

      appendChildren(tpl, newChildren);
    }

    return this;
  },

  deleteChildren() {
    if (this.found && isBiz(this.type)) {
      this.found.children = [];
      this.found = undefined;
    }

    return this;
  },
};

// TODO: 使用enum
const setFound = (found?: IFoundResult['found'], type?: IFoundResult['type']) => {
  foundResult.found = found;
  foundResult.type = type;
};

export const getElementByAttr = (
  tpl: RTElements,
  val: string,
  attrName: string,
): IFoundResult['found'] => {
  let found;

  for (const ele of tpl) {
    if (ele.type === "tag") {
      const { attrs, children } = ele;
      if (attrs && attrs[attrName] && attrs[attrName].value === val) {
        return ele;
      }

      if (children) {
        found = getElementByAttr(children, val, attrName);

        if (found) {
          return found;
        }
      }
    }
  }

  return found;
};

export const getElementByClassName = (tpl: RTElements, val: string) => {
  const found = getElementByAttr(tpl, val, DomType.LAYOUT);

  if (found) {
    setFound(found, DomType.LAYOUT);
  } else {
    setFound();
  }

  return foundResult;
};
  

export const getElementByData = (tpl: RTElements, val: string) =>{
  const found = getElementByAttr(tpl, val, DomType.BIZ);
  if (found) {
    setFound(found, DomType.BIZ);
  } else {
    setFound();
  }

  return foundResult;
};

