import React from 'react';
import { Link } from 'react-router-dom';
import { Box } from '../Box';
import { Label } from '../Label';
import { Button } from '../Button/Button';
import { LockedIcon } from 'src/assets/images/LockedIcon';
import { useSelector } from 'react-redux';
import { selectMobileDeviceState } from 'src/modules/public/globalSettings/selectors';

interface Props {
  text: string;
  link: string;
  buttonText: string;
}

export const LockedComponent: React.FC<Props> = ({ text, link, buttonText }) => {
  const isMobileDevice = useSelector(selectMobileDeviceState);
  return (
    <Box padding="3x" col spacing="2x" alignCenter>
      <LockedIcon />
      <Label size="2x" center style={{ maxWidth: 180 }}>
        {text}
      </Label>
      {isMobileDevice ? (
        <Button component={Link} to={link} variant="primary-outline" revertLightPrimary>
          {buttonText}
        </Button>
      ) : (
        <Button component={Link} to={link} variant="primary">
          {buttonText}
        </Button>
      )}
    </Box>
  );
};
