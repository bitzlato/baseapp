/* eslint-disable no-restricted-syntax */
export const pick = <T, K extends keyof T>(obj: T, keys: readonly K[]): Pick<T, K> => {
  const picked = {} as Pick<T, K>;

  for (const key of keys) {
    picked[key] = obj[key];
  }

  return picked;
};
