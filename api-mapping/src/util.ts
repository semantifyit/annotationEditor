// tslint:disable:ter-indent

// adapted from https://github.com/30-seconds/30-seconds-of-code#deepmapkeys-
// tslint:disable-next-line:ban-types
export const deepMapValues = <T = object>(obj: T, f: Function): T =>
  Array.isArray(obj)
    ? obj.map((val) => deepMapValues(val, f))
    : typeof obj === 'object'
    ? Object.entries(obj).reduce((acc: any, [key, val]: any) => {
        acc[key] = deepMapValues(val, f);
        return acc;
      }, {})
    : f(obj);

// from https://github.com/30-seconds/30-seconds-of-code#get
export const get = (obj: object, selector: string): any =>
  selector
    .replace(/\[([^\[\]]*)\]/g, '.$1.')
    .split('.')
    .filter((t) => t !== '')
    .reduce((prev: any, cur) => prev && prev[cur], obj);

const isDefined = <T>(t: T | undefined): t is T => !!t;

// adding undefined can add a '/' at the end, we don't care about that ?
// adapted from https://github.com/30-seconds/30-seconds-of-code#urljoin-
export const URLJoin = (...args: any[]) =>
  args
    .filter(isDefined)
    .join('/')
    .replace(/[\/]+/g, '/')
    .replace(/^(.+):\//, '$1://')
    .replace(/^file:/, 'file:/')
    .replace(/\/(\?|&|#[^!])/g, '$1')
    .replace(/\?/g, '&')
    .replace('&', '?');

// @ts-ignore
export const isNodeJs = (): boolean => typeof window === 'undefined';

export const isBrowser = (): boolean =>
  // @ts-ignore
  ![typeof window, typeof document].includes('undefined');

export const mergeDiff = (...objects: any[]) =>
  objects.reduce((acc, cur) => {
    // if (typeof cur === 'object') {
    Object.entries(cur).forEach(([k, v]) => {
      if (acc[k]) {
        if (Array.isArray(acc[k])) {
          acc[k].push(v);
        } else {
          acc[k] = [acc[k], v];
        }
      } else {
        acc[k] = v;
      }
    });
    return acc;
  }, {});

export const mergeSame = (...objects: any[]) =>
  objects.reduce((acc, cur) => {
    if (typeof cur === 'object') {
      Object.entries(cur).forEach(([k, v]) => {
        if (acc[k]) {
          acc[k] = mergeSame(acc[k], v);
        } else {
          acc[k] = v;
        }
      });
      return acc;
    }
    if (Array.isArray(acc)) {
      acc.push(cur);
      return acc;
    }
    if (Object.keys(acc).length === 0) {
      return [cur];
    }
    return [acc, cur];
  }, {});

export const removeUndef = <T>(obj: T): T =>
  Object.entries(obj).reduce(
    (acc, [k, v]) => {
      if (!isEmptyObject(v)) {
        acc[k] = v;
      }
      return acc;
    },
    {} as any,
  );

export const isEmptyObject = (obj: any): boolean =>
  obj === null ||
  obj === undefined ||
  (Array.isArray(obj) && obj.length === 0) ||
  (typeof obj === 'object' && Object.keys(obj).length === 0);