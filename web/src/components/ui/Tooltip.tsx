import {
  Children,
  cloneElement,
  FC,
  ReactElement,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import cn from 'classnames';
import { Portal } from 'web/src/components/ui/Portal';
import { Box } from 'web/src/components/ui/Box';
import { useTransition } from 'transition-hook';
import { getThemeClassName } from 'web/src/theme/getThemeClassName';
import { useTheme } from 'web/src/components/app/AppContext';
import * as s from './Tooltip.css';

type Placement = 'top' | 'bottom';

interface Props {
  placement?: Placement | undefined;
  label: ReactNode;
}

interface Position {
  x: number;
  y: number;
  arrowLeft: number;
}

const calculatePosition = (trigger: DOMRect, tooltip: DOMRect, placement: Placement): Position => {
  let x = Math.round(trigger.x + trigger.width / 2 - tooltip.width / 2);
  let y;

  switch (placement) {
    case 'top': {
      y = Math.round(trigger.y - tooltip.height - 8 + window.pageYOffset);

      break;
    }

    case 'bottom':
    default: {
      y = Math.round(trigger.y + trigger.height + 8 + window.pageYOffset);

      break;
    }
  }

  if (x < 0) {
    x = 0;
  } else if (tooltip.width + x > window.innerWidth) {
    x = window.innerWidth - tooltip.width;
  }

  return {
    x,
    y,
    arrowLeft: Math.round(trigger.x + trigger.width / 2 - x),
  };
};

export const Tooltip: FC<Props> = ({ children, placement = 'bottom', label }) => {
  const theme = useTheme();
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState<Position | undefined>(undefined);
  const triggerRef = useRef<HTMLElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const { stage, shouldMount } = useTransition(visible, s.TOOLTIP_TRANSITION_DELAY);

  useEffect(() => {
    if (triggerRef.current && tooltipRef.current) {
      setPosition(
        calculatePosition(
          triggerRef.current.getBoundingClientRect(),
          tooltipRef.current.getBoundingClientRect(),
          placement,
        ),
      );
    }
  }, [label, shouldMount, placement]);

  const child = Children.only(children) as ReactElement;
  const childProps = useMemo(
    () => ({
      onMouseEnter: (event: Event) => {
        setVisible(true);

        child.props.onMouseEnter?.(event);
      },
      onMouseLeave: (event: Event) => {
        setVisible(false);

        child.props.onMouseLeave?.(event);
      },
      onFocus: (event: Event) => {
        setVisible(true);

        child.props.onFocus?.(event);
      },
      onBlur: (event: Event) => {
        setVisible(false);

        child.props.onBlur?.(event);
      },
    }),
    [child],
  );

  return (
    <>
      {shouldMount && (
        <Portal>
          <Box
            ref={tooltipRef}
            className={cn(
              getThemeClassName(theme),
              s.tooltip[stage === 'enter' ? 'enter' : 'base'],
            )}
            style={
              position && {
                transform: `translate(${position.x}px, ${position.y}px)`,
              }
            }
          >
            <Box
              className={s.tooltipArrow[placement]}
              style={position && { left: `${position.arrowLeft}px` }}
            />
            {label}
          </Box>
        </Portal>
      )}
      {cloneElement(child, { ...childProps, ref: triggerRef })}
    </>
  );
};
