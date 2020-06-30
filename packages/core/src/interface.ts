import * as React from "react";

export interface ReactNode {
  type: "reactNode" | "deleted";
  content: React.ReactNode;
  children?: RTElements;
}

export interface TagElement {
  type: "tag" | "deleted";
  name: string;
  voidElement: boolean;
  attrs: {
    [propName: string]: any;
  };
  children: RTElements;
  content?: any;
}

export type RTElement = TagElement | ReactNode;

export type RTElements = RTElement[];

export interface ITemplateData {
  id: string;
  template: string;
  props: object;
  components: object;
}

export interface TemplateConfig {
  id: string;
  template: (tpl: RTElements, props: object) => RTElements;
}

export interface TemplateCollection {
  [pageName: string]: TemplateConfig;
}

export interface ReactTemplateComponents {
  [name: string]: React.ComponentClass | React.FunctionComponent;
}

export abstract class ReactTemplate<P, S = {}> extends React.Component {
  abstract id: string;
  abstract template: string;
  abstract props: P;

  components: ReactTemplateComponents = {};
  
  selector?: any;
  dispatchSelector: any;
}
