type IMergePorps<T extends (...args: any) => any, U extends (...args: any) => any> = (
  stateProps: ReturnType<T>,
  dispatchProps: ReturnType<U>,
) => {
  [propName: string]: {
    [P in keyof (ReturnType<T> & ReturnType<U>)]: (ReturnType<T> & ReturnType<U>)[P]
  };
};

export type IMergePorpsFn<T extends (...args: any) => any, U extends (...args: any) => any> = (
  selector: T,
  dispatchSelector: U,
) => IMergePorps<T, U>;

export const connectData = <T extends (...args: any) => any, U extends (...args: any) => any>(
  selector: T,
  dispatchSelector: U,
  mergeProps: IMergePorpsFn<typeof selector, typeof dispatchSelector>,
) => {
  return {
    selector,
    dispatchSelector,
    mergeProps,
  };
};
