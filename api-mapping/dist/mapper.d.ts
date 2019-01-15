interface StringObj<T = string> {
  [key: string]: T;
}
export interface RequestMapping {
  url: string;
  path?: string[];
  query?: StringObj;
  headers?: StringObj;
  body?: object;
}
export interface RequestOutput {
  url: string;
  headers?: StringObj;
  body?: object;
}
declare type evalMethod = 'eval' | 'vm-runInNewContext';
interface RequestOptions {
  type?: 'json';
  locator?: 'simple' | 'json-path';
  evalMethod?: evalMethod;
}
export declare const requestMapping: (
  inputAction: object,
  mapping: RequestMapping,
  options?: RequestOptions,
) => RequestOutput;
interface ResponseObj {
  headers?: StringObj<string | number>;
  body?: any;
}
export interface ResponseMapping {
  headers?: StringObj;
  body?: object;
}
interface ResponseOptions {
  evalMethod?: evalMethod;
}
export declare const responseMapping: (
  inputResponse: ResponseObj,
  mapping: ResponseMapping,
  options?: ResponseOptions,
) => object;
export {};