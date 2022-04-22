import React from 'react';
import { Link } from 'react-router-dom';
import { LockedIcon } from 'src/assets/images/LockedIcon';
import { useSelector } from 'react-redux';
import { selectMobileDeviceState } from 'src/modules/public/globalSettings/selectors';
import { Text } from 'web/src/components/ui/Text';
import { Box } from '../Box';
import { Button } from '../ui/Button';
import { lockedWidth } from './LockedComponent.css';

interface Props {
  text: string;
  link?: string;
  buttonText: string;
  onClick?: () => void;
}

export const LockedComponent: React.FC<Props> = ({ text, link, buttonText, onClick }) => {
  const isMobileDevice = useSelector(selectMobileDeviceState);
  return (
    <Box padding="3" col spacing="2" align="center">
      <LockedIcon />
      <Text className={lockedWidth} fontSize="large" textAlign="center">
        {text}
      </Text>
      {link ? (
        <Button
          as={Link}
          to={link}
          color={isMobileDevice ? 'secondary' : 'primary'}
          variant={isMobileDevice ? 'outlined' : 'contained'}
        >
          {buttonText}
        </Button>
      ) : (
        <Button
          onClick={onClick}
          color={isMobileDevice ? 'secondary' : 'primary'}
          variant={isMobileDevice ? 'outlined' : 'contained'}
        >
          {buttonText}
        </Button>
      )}
    </Box>
  );
};
