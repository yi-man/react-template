// export const extendProps = <T extends (...args: any) => any>(selector: T, selectorFilter: (selector: ReturnType<T>) => object) => {
//   return {
//     selector,
//     selectorFilter,
//     reMerge: (fn: (props: object) => object) => {
//       return {
//         selector,
//         selectorFilter,
//         merged: fn,
//       };
//     },
//   };
// };

export const merge = (fn: (props: object) => object) => {
  return {
    merged: fn,
  };
};

// type fnLike1<T extends (...args: any) => any> = [T, (selector: ReturnType<T>) => object];
// type fnLike2<T1 extends (...args: any) => any, T2 extends (...args: any) => any> = [T1, T2, (selector1: ReturnType<T1>, selector2: ReturnType<T2>) => object];

type IReturnType<T> = T extends (...args: any) => any ? ReturnType<T> : never;
type IExtendPropsReturnType = {
  selectorArgs: any[];
  merge: Function;
}
export function extendProps<T>(s1: T, filter: (r: IReturnType<T>) => any): IExtendPropsReturnType;
export function extendProps<T1, T2>(s1: T1, s2: T2, filter: (r1: IReturnType<T1>, r2: IReturnType<T2>) => any): IExtendPropsReturnType;
export function extendProps<T1, T2, T3>(s1: T1, s2: T2, s3: T3, filter: (r1: IReturnType<T1>, r2: IReturnType<T2>, r3: IReturnType<T3>) => any): IExtendPropsReturnType;
export function extendProps<T1, T2, T3, T4>(s1: T1, s2: T2, s3: T3, s4: T4, filter: (r1: IReturnType<T1>, r2: IReturnType<T2>, r3: IReturnType<T3>, r4: IReturnType<T4>) => any): IExtendPropsReturnType;

export function extendProps(...rest: any[]) {
  const selectorArgs = rest;
  return {
    selectorArgs,
    merge: (fn: (props: object) => object) => ({
      selectorArgs,
      merged: fn,
    }),
  };
};
