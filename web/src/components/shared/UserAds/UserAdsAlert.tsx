import { FC } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { Text } from 'web/src/components/ui/Text';
import { Sprinkles } from 'web/src/theme/sprinkles.css';
import * as s from './UserAdsAlert.css';

type Theme = 'warning' | 'info';

const backgroundColors: Record<Theme, Sprinkles['backgroundColor']> = {
  warning: 'advertsAlertWarningBg',
  info: 'advertsAlertInfoBg',
};

const dotColors: Record<Theme, Sprinkles['backgroundColor']> = {
  warning: 'danger',
  info: 'advertsAlertInfoDot',
};

interface Props {
  theme?: Theme | undefined;
}

export const UserAdsAlert: FC<Props> = ({ children, theme = 'warning' }) => {
  return (
    <Box
      display="flex"
      alignItems={{ mobile: 'flex-start', tablet: 'center' }}
      my="2x"
      px={{ mobile: '4x', tablet: '6x' }}
      py={{ mobile: '3x', tablet: '5x' }}
      borderColor="transparent"
      borderWidth="1x"
      borderStyle="solid"
      borderRadius="1x"
      bg={backgroundColors[theme]}
    >
      <Box
        className={s.alertDot}
        mr={{ mobile: '3x', tablet: '5x' }}
        mt={{ mobile: '2x', tablet: '0' }}
        bg={dotColors[theme]}
      />
      <Text variant="caption">{children}</Text>
    </Box>
  );
};
