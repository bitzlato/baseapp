import { shallowEqual, useSelector } from 'react-redux';
import { RootState } from '../modules';

export function useShallowSelector<T>(selector: (state: RootState) => T): T {
  return useSelector(selector, shallowEqual);
}
