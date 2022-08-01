import { FC, ReactNode, useRef, useState } from 'react';
import { useTransition } from 'transition-hook';
import { Box } from 'web/src/components/ui/Box';
import { Text } from 'web/src/components/ui/Text';
import { useAdapterContext } from 'web/src/components/shared/Adapter';
import * as s from './LinkButton.css';

const SHOW_ALERT_TIMEOUT = 3000;
const ANIMATION_TIMEOUT = 200;

interface Props {
  icon: ReactNode;
  onClick: () => void;
}

export const LinkButton: FC<Props> = ({ children, icon, onClick }) => {
  const { t } = useAdapterContext();
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const { shouldMount } = useTransition(showSuccessAlert, ANIMATION_TIMEOUT);
  const timeoutRef = useRef<number>();

  const handleClick = () => {
    onClick();
    setShowSuccessAlert(true);

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => setShowSuccessAlert(false), SHOW_ALERT_TIMEOUT);
  };

  return (
    <Box className={s.container}>
      <Box
        className={s.button}
        as="button"
        type="button"
        display="flex"
        alignItems="center"
        justifyContent="center"
        width="full"
        gap="1x"
        py="1.5x"
        px="5x"
        borderRadius="1x"
        backgroundColor={{ default: 'userAdButtonLinkBg', hover: 'userAdButtonLinkHoverBg' }}
        onClick={handleClick}
      >
        {icon}
        <Box className={s.text} as="span" fontWeight="medium" fontSize="caption" color="text">
          {children}
        </Box>
      </Box>

      <Box
        className={s.alert}
        display="flex"
        alignItems="center"
        justifyContent="center"
        py="1x"
        px="1x"
        borderRadius="2x"
        backgroundColor="tooltip"
        style={{
          transition: 'opacity 0.2s ease, transform 0.1s ease-in-out',
          transform: shouldMount ? 'translate(-50%, -120%)' : 'translate(-50%, 0%)',
          opacity: shouldMount ? 1 : 0,
          zIndex: shouldMount ? 2 : 0,
        }}
      >
        <Text as="span" variant="caption" color="tooltipText">
          {t('Link copied')}
        </Text>
      </Box>
    </Box>
  );
};
