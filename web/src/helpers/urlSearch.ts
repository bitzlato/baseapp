export interface UrlParam<T, S extends string> {
  name: string;
  set: (v: T) => S | undefined;
  get: (v: S) => T;
}

export type UrlParams<T> = {
  [P in keyof T]: UrlParam<T[P], T[P] extends string ? T[P] : string>;
};

export function setUrlSearchParams<T>(
  obj: Record<string, unknown>,
  def: Record<string, unknown>,
  tmpl: UrlParams<T>,
): void {
  const params = new URLSearchParams(window.location.search);
  Object.keys(obj).forEach((key) => {
    const ci = tmpl[key as keyof UrlParams<T>];
    if (ci !== undefined) {
      if (obj[key] !== def[key]) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const v = ci.set(obj[key] as any);
        if (v !== undefined) {
          params.set(ci.name, v);
          return;
        }
      }
      params.delete(ci.name);
    }
  });
  const search = params.toString();
  window.history.pushState(null, '', window.location.pathname + (search ? `?${search}` : ''));
}

export function getUrlSearchParams<T>(tmpl: UrlParams<T>): Partial<T> {
  const url = new URLSearchParams(window.location.search);
  return Object.keys(tmpl).reduce<Partial<T>>((p, c) => {
    const key = c as keyof T;
    const item = tmpl[key];
    const sval = url.get(item.name);
    if (sval) {
      // eslint-disable-next-line no-param-reassign
      p[key] = item.get(sval as any);
    }
    return p;
  }, {});
}
