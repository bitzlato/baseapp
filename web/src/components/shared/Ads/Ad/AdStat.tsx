import { FC } from 'react';
import { Sprinkles } from 'web/src/theme/sprinkles.css';
import { Box } from 'web/src/components/ui/Box';

interface AdStatProps {
  label: string;
  labelColor?: Sprinkles['color'] | undefined;
}

export const AdStat: FC<AdStatProps> = ({ label, labelColor = 'adStatLabel', children }) => {
  return (
    <Box display="flex" justifyContent="space-between">
      <Box color={labelColor} fontWeight="strong">
        {label}
      </Box>
      {children}
    </Box>
  );
};
