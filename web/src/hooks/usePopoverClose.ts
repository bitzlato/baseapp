import { RefObject } from 'react';
import { useOnClickOutside } from './useOnClickOutside';
import { useEscapeKeyDown } from './useEscapeKeyDown';

export const usePopoverClose = (
  ref: RefObject<HTMLElement>,
  callback: (event: MouseEvent | TouchEvent | KeyboardEvent) => void,
) => {
  useOnClickOutside(ref, callback);
  useEscapeKeyDown(callback);
};
