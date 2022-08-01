import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { useTransition } from 'transition-hook';
import { useDebouncedCallback } from 'use-debounce';
import cn from 'classnames';
import { Box } from 'web/src/components/ui/Box';
import { Text } from 'web/src/components/ui/Text';
import * as s from './CreateAdFormStep.css';

const ANIMATION_TIMEOUT = 400;
const DEBOUNCE_TIMEOUT = 300;

interface Props {
  title?: ReactNode | undefined;
  children?: ReactNode | undefined;
  activeValue?: ReactNode | undefined;
  isActive?: boolean | undefined;
  isCompleted?: boolean | undefined;
  isCompletedBeforeActive?: boolean | undefined;
  isNext?: boolean | undefined;
  onClick: () => void;
}

export const CreateAdFormStep: FC<Props> = ({
  title,
  children,
  activeValue,
  isActive = false,
  isCompleted = false,
  isCompletedBeforeActive = false,
  isNext = false,
  onClick,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | undefined>();
  const { stage, shouldMount } = useTransition(isActive, ANIMATION_TIMEOUT);

  const calcHeightDebounced = useDebouncedCallback(() => {
    setHeight(contentRef.current?.scrollHeight);
  }, DEBOUNCE_TIMEOUT);

  useEffect(() => {
    const contentContainer = contentRef.current;

    calcHeightDebounced();

    window.addEventListener('resize', calcHeightDebounced);

    const resizeObserver = new MutationObserver(calcHeightDebounced);
    if (contentContainer) {
      resizeObserver.observe(contentContainer, { childList: true, subtree: true });
    }

    return () => {
      window.removeEventListener('resize', calcHeightDebounced);
      resizeObserver.disconnect();
    };
  }, [children, calcHeightDebounced]);

  return (
    <Box
      className={cn(s.step, {
        [s.stepCompletedOrActive]: isCompletedBeforeActive || isActive,
        [s.stepNext]: isNext,
      })}
      borderWidth="1x"
      borderStyle="solid"
      borderColor={isActive ? 'createAdStepActiveBg' : 'inputBorder'}
      bg={isActive ? 'createAdStepActiveBg' : undefined}
    >
      <Box className={s.stepDot} />
      <Box
        display="flex"
        flexDirection={{ mobile: 'column', tablet: 'row' }}
        alignItems={{ mobile: 'flex-start', tablet: 'center' }}
        justifyContent="space-between"
        cursor="pointer"
        py={{ mobile: '3x', tablet: '5x' }}
        px={{ mobile: '4x', tablet: '6x' }}
        onClick={onClick}
      >
        <Text
          variant="label"
          fontWeight="strong"
          color={isActive || isCompleted ? 'text' : 'createAdInactiveText'}
        >
          {title}
        </Text>

        {!isActive && isCompleted && (
          <Text
            variant="label"
            className={s.activeValue}
            fontWeight="strong"
            color="createAdActiveValue"
          >
            {activeValue}
          </Text>
        )}
      </Box>

      <Box
        ref={contentRef}
        px={{ mobile: '4x', tablet: '6x' }}
        style={{
          transition: 'opacity 0.3s ease, max-height 0.4s ease',
          opacity: shouldMount && stage === 'enter' ? 1 : 0,
          maxHeight: {
            from: shouldMount ? height ?? 'auto' : 0,
            enter: shouldMount ? height ?? 'auto' : 0,
            leave: 0,
          }[stage],
          overflow: {
            from: 'hidden',
            enter: shouldMount ? 'unset' : 'hidden',
            leave: 'hidden',
          }[stage],
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
