export const omit = <T, K extends keyof T>(obj: T | null, key: K | Array<K>): Omit<T, K> | null => {
  if (!obj) {
    return obj;
  }

  if (Array.isArray(key)) {
    const res = obj;
    key.forEach((k) => {
      delete res[k];
    });

    return res;
  }

  const { [key]: omitted, ...rest } = obj;
  return rest;
};
