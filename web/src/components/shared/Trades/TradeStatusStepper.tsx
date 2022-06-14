import { Box } from 'web/src/components/ui/Box';

interface Props {
  step: number;
  count?: number;
}

export const TradeStatusStepper = ({ step, count = 3 }: Props) => {
  return (
    <Box display="flex" alignItems="center" gap="1x" mt="4x">
      {Array.from({ length: count }, (_, index) => {
        return (
          <Box
            key={index}
            width="12x"
            height="1.5x"
            borderRadius="circle"
            backgroundColor={step >= index ? 'btnPrimaryBg' : 'inputBorder'}
          />
        );
      })}
    </Box>
  );
};
