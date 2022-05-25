import { FC } from 'react';
import cn from 'classnames';
import { Box } from 'web/src/components/ui/Box';
import * as s from './Stepper.css';

type Step = { key: string; isCompleted: boolean; content: JSX.Element };

const VerticalStepper: FC<{ steps: Step[] }> = ({ steps }) => (
  <Box className={s.container}>
    {steps.map((step) => {
      return (
        <Box key={step.key} className={s.step}>
          <Box className={cn(s.vStepper)}>
            <Box className={cn(step.isCompleted ? s.circleCompleted : s.vCircle)} />
            <Box className={cn(step.isCompleted ? s.lineCompleted : s.line)} />

            <Box className={cn(s.content)}>{step.content}</Box>
          </Box>
        </Box>
      );
    })}
  </Box>
);

const HorizontalStepper: FC<{ steps: Step[] }> = ({ steps }) => (
  <Box className={s.hContainer}>
    {steps.map((step) => {
      return (
        <Box key={step.key} className={s.hStep}>
          <Box className={cn(s.vStepper)}>
            <Box className={cn(step.isCompleted ? s.hCircleCompleted : s.hCircle)}>
              {step.content}
            </Box>
            <Box className={cn(step.isCompleted ? s.hLineCompleted : s.hLine)} />
          </Box>
        </Box>
      );
    })}
  </Box>
);

export const Stepper: FC<{ direction: 'horizontal' | 'vertical'; steps: Step[] }> = ({
  direction,
  steps,
}) => {
  if (!steps) {
    return null;
  }

  return direction === 'horizontal' ? (
    <HorizontalStepper steps={steps} />
  ) : (
    <VerticalStepper steps={steps} />
  );
};
