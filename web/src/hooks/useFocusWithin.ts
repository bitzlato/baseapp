import {
  FocusEvent as ReactFocusEvent,
  HTMLAttributes,
  useCallback,
  useLayoutEffect,
  useRef,
} from 'react';
import { OptionalWithUndefined } from 'web/src/types';

export class SyntheticFocusEvent implements ReactFocusEvent {
  nativeEvent: FocusEvent;

  target: Element;

  currentTarget: Element;

  relatedTarget: Element;

  bubbles: boolean;

  cancelable: boolean;

  defaultPrevented: boolean;

  eventPhase: number;

  isTrusted: boolean;

  timeStamp: number;

  type: string;

  constructor(type: string, nativeEvent: FocusEvent) {
    this.nativeEvent = nativeEvent;
    this.target = nativeEvent.target as Element;
    this.currentTarget = nativeEvent.currentTarget as Element;
    this.relatedTarget = nativeEvent.relatedTarget as Element;
    this.bubbles = nativeEvent.bubbles;
    this.cancelable = nativeEvent.cancelable;
    this.defaultPrevented = nativeEvent.defaultPrevented;
    this.eventPhase = nativeEvent.eventPhase;
    this.isTrusted = nativeEvent.isTrusted;
    this.timeStamp = nativeEvent.timeStamp;
    this.type = type;
  }

  isDefaultPrevented(): boolean {
    return this.nativeEvent.defaultPrevented;
  }

  preventDefault(): void {
    this.defaultPrevented = true;
    this.nativeEvent.preventDefault();
  }

  stopPropagation(): void {
    this.nativeEvent.stopPropagation();
    this.isPropagationStopped = () => true;
  }

  // eslint-disable-next-line class-methods-use-this
  isPropagationStopped(): boolean {
    return false;
  }

  // eslint-disable-next-line class-methods-use-this
  persist() {}
}

type OnBlurHandler = (event: ReactFocusEvent) => void;

export function useSyntheticBlurEvent(onBlur: OnBlurHandler) {
  const stateRef = useRef<{
    isFocused: boolean;
    onBlur: OnBlurHandler;
    observer: null | MutationObserver;
  }>({
    isFocused: false,
    onBlur,
    observer: null,
  });
  stateRef.current.onBlur = onBlur;

  // eslint-disable-next-line arrow-body-style
  useLayoutEffect(() => {
    const state = stateRef.current;
    return () => {
      if (state.observer) {
        state.observer.disconnect();
        state.observer = null;
      }
    };
  }, []);

  return useCallback((event: ReactFocusEvent) => {
    if (
      event.target instanceof HTMLButtonElement ||
      event.target instanceof HTMLInputElement ||
      event.target instanceof HTMLTextAreaElement ||
      event.target instanceof HTMLSelectElement
    ) {
      stateRef.current.isFocused = true;

      const { target } = event;
      const onBlurHandler = (e: FocusEvent) => {
        stateRef.current.isFocused = false;

        if (target.disabled) {
          stateRef.current.onBlur?.(new SyntheticFocusEvent('blur', e));
        }

        if (stateRef.current.observer) {
          stateRef.current.observer.disconnect();
          stateRef.current.observer = null;
        }
      };

      target.addEventListener('focusout', onBlurHandler as EventListener, { once: true });

      stateRef.current.observer = new MutationObserver(() => {
        if (stateRef.current.isFocused && target.disabled) {
          stateRef.current.observer?.disconnect();
          target.dispatchEvent(new FocusEvent('blur'));
          target.dispatchEvent(new FocusEvent('focusout', { bubbles: true }));
        }
      });

      stateRef.current.observer.observe(target, {
        attributes: true,
        attributeFilter: ['disabled'],
      });
    }
  }, []);
}

interface FocusWithinProps {
  isDisabled?: boolean;
  onFocusWithin?: (event: ReactFocusEvent) => void;
  onBlurWithin?: (event: ReactFocusEvent) => void;
  onFocusWithinChange?: (isFocusWithin: boolean) => void;
}

interface FocusWithinResult {
  focusWithinProps: OptionalWithUndefined<Pick<HTMLAttributes<HTMLElement>, 'onBlur' | 'onFocus'>>;
}

export function useFocusWithin({
  isDisabled,
  onBlurWithin,
  onFocusWithin,
  onFocusWithinChange,
}: FocusWithinProps): FocusWithinResult {
  const state = useRef({ isFocusWithin: false });

  const onBlur = useCallback(
    (event: ReactFocusEvent) => {
      if (
        state.current.isFocusWithin &&
        !(event.currentTarget as Element).contains(event.relatedTarget as Element)
      ) {
        state.current.isFocusWithin = false;

        if (onBlurWithin) {
          onBlurWithin(event);
        }

        if (onFocusWithinChange) {
          onFocusWithinChange(false);
        }
      }
    },
    [onBlurWithin, onFocusWithinChange, state],
  );

  const onSyntheticFocus = useSyntheticBlurEvent(onBlur);

  const onFocus = useCallback(
    (event: ReactFocusEvent) => {
      if (!state.current.isFocusWithin) {
        if (onFocusWithin) {
          onFocusWithin(event);
        }

        if (onFocusWithinChange) {
          onFocusWithinChange(true);
        }

        state.current.isFocusWithin = true;
        onSyntheticFocus(event);
      }
    },
    [onFocusWithin, onFocusWithinChange, onSyntheticFocus],
  );

  if (isDisabled) {
    return {
      focusWithinProps: {
        onFocus: undefined,
        onBlur: undefined,
      },
    };
  }

  return {
    focusWithinProps: {
      onFocus,
      onBlur,
    },
  };
}
