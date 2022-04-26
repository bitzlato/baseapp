import { Dispatch, useReducer, useRef } from 'react';
import { isEqualArrays } from 'web/src/helpers/isEqualArrays';

interface Internals<T> {
  value: T;
  setState: Dispatch<T>;
  deps: unknown[];
}

export const useStateWithDeps = <T>(initialiser: () => T, deps: unknown[]): [T, Dispatch<T>] => {
  const forceUpdate = useReducer((x) => x + 1, 0)[1];

  // eslint-disable-next-line no-multi-assign
  const internals = (useRef<Internals<T>>().current ||= {
    value: initialiser(),
    deps,
    setState: (value) => {
      internals.value = value;
      forceUpdate();
    },
  });

  if (!isEqualArrays(deps, internals.deps)) {
    internals.value = initialiser();
    internals.deps = deps;
  }

  return [internals.value, internals.setState];
};
