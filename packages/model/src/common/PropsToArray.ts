export type PropsToArray<T> = {
  [key in keyof T]: any[];
};
