import * as hoistNonReactStatics from "hoist-non-react-statics";
import * as React from "react";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import { lifeCycle } from "../const";
import { generate } from "../generate";
import { ReactTemplateComponents } from "../interface";
import { patches } from "../transform";

interface IConfigurablePage {
  [propName: string]: any;
}

const getPatchProps = (id: string) => {
  if (patches[id] && patches[id].props) {
    return patches[id].props;
  }

  return  {};
};

const getCombinedSelector = (originalSelector: any, selectorArgs: any) => {
  let combineSelector = originalSelector;

  if (selectorArgs) {
    // @ts-ignore
    const pathchSelector = createSelector(...selectorArgs);

    if (combineSelector) {
      combineSelector = createSelector(
        combineSelector,
        pathchSelector,
        (originalData, extendData) => {
          return {
            ...originalData,
            ...extendData,
          };
        },
      );
    } else {
      combineSelector = pathchSelector;
    }
  }

  return combineSelector;
};

const getCombinedComponents = (id: string, components: ReactTemplateComponents) => {
  const finalComponents = components;
  if (patches[id] && patches[id].components) {
    Object.assign(finalComponents, patches[id].components);
  }

  return finalComponents;
};

// type IReturnType = ConnectedComponent<React.ComponentType, IConfigurablePage & object>
type IReturnType = any

export function connectTemplate(configClass: React.ComponentClass): IReturnType {
  // @ts-ignore
  const proxyObj = new configClass();

  const {
    id,
    template,
    adapter,
    components,
  } = proxyObj;
  const {
    mapStateToProps,
    mapDispatchToProps,
    mergeProps,
  } = adapter;

  const proto = Object.getPrototypeOf(proxyObj);

  const { selectorArgs, merged } = getPatchProps(id);

  const combineSelector = getCombinedSelector(mapStateToProps, selectorArgs);

  const combinedComponents = getCombinedComponents(id, components);


  // TODO: 添加key
  class ConfigurablePage extends React.PureComponent<IConfigurablePage> {
    private methods = {};

    constructor(props: IConfigurablePage) {
      super(props);

      Object.getOwnPropertyNames(proto).forEach(k => {
        const shouldFilter = lifeCycle.some(li => li === k);

        if (shouldFilter) {
          this[k] = proto[k].bind(this);
        } else {
          this.methods[k] = this[k] = proto[k].bind(this);
        }
      });
    }

    render() {
      return generate({
        id,
        template,
        components: combinedComponents,
        props: this.props.merged,
      })
    }
  }

  hoistNonReactStatics(ConfigurablePage, configClass);

  const mergeProos2 = (stateProps: ReturnType<typeof combineSelector>, dispatchProps: ReturnType<typeof mapDispatchToProps>, ownProps: object) => {
    const props = {
      ...stateProps,
      ...dispatchProps,
      ...ownProps,
    };

    const originalMergeProps = mergeProps(stateProps, dispatchProps, ownProps);
    const patchProps = merged ? merged(props) : {};
    
    props.merged = Object.assign(originalMergeProps, patchProps);

    return props;
  };

  return connect(combineSelector, mapDispatchToProps, mergeProos2)(ConfigurablePage);
}
