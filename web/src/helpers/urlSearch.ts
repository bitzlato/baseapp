export interface ConvertItem<T> {
  name: string;
  set: (v: T) => string | undefined;
  get: (v: string) => T;
}

export type ConvertTmpl<T> = {
  [P in keyof T]: ConvertItem<T[P]>;
};

export function setUrlSearch<T>(
  tmpl: ConvertTmpl<T>,
  obj: Record<string, unknown>,
  def: Record<string, unknown>,
): void {
  const params = new URLSearchParams(window.location.search);
  Object.keys(obj).forEach((key) => {
    const ci = tmpl[key as keyof ConvertTmpl<T>];
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
  window.history.pushState(null, '', window.location.pathname + search ? `?${search}` : '');
}

export function getUrlSearch<T>(tmpl: ConvertTmpl<T>): Partial<T> {
  const url = new URLSearchParams(window.location.search);
  return Object.keys(tmpl).reduce<Partial<T>>((p, c) => {
    const key = c as keyof T;
    const item = tmpl[key];
    const sval = url.get(item.name);
    if (sval) {
      // eslint-disable-next-line no-param-reassign
      p[key] = item.get(sval);
    }
    return p;
  }, {});
}
