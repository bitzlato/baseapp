import { FC } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { Text } from 'web/src/components/ui/Text';
import { Sprinkles } from 'web/src/theme/sprinkles.css';
import { useAppContext } from 'web/src/components/app/AppContext';
import * as s from './UserAdsAlert.css';

type Theme = 'warning' | 'info' | 'error';

const dotColors: Record<Theme, Sprinkles['backgroundColor']> = {
  warning: 'danger',
  info: 'advertsAlertInfoDot',
  error: 'danger',
};

interface Props {
  theme?: Theme | undefined;
}

export const UserAdsAlert: FC<Props> = ({ children, theme = 'warning' }) => {
  const { isMobileDevice } = useAppContext();

  const backgroundColors: Record<Theme, Sprinkles['backgroundColor']> = {
    warning: 'advertsAlertWarningBg',
    info: 'advertsAlertInfoBg',
    error: isMobileDevice ? 'advertsAlertErrorBg' : 'advertsAlertInfoBg',
  };

  return (
    <Box
      display="flex"
      alignItems="flex-start"
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
        mt="1x"
        bg={dotColors[theme]}
      />
      <Text variant="caption">{children}</Text>
    </Box>
  );
};
