export const omit = <T, K extends keyof T>(obj: T | null, key: K): Omit<T, K> | null => {
  if (!obj) {
    return obj;
  }

  const { [key]: omitted, ...rest } = obj;
  return rest;
};
