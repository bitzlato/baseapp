import React from 'react';
import { Link } from 'react-router-dom';
import { Box } from '../Box';
import { Label } from '../Label';
import { Button } from '../Button/Button';
import { LockedIcon } from 'src/assets/images/LockedIcon';

interface Props {
  text: string;
  link: string;
  buttonText: string;
}

export const LockedComponent: React.FC<Props> = ({ text, link, buttonText }) => {
  return (
    <Box padding="3x" col spacing="2x" alignCenter>
      <LockedIcon />
      <Label size="2x">{text}</Label>
      <Button component={Link} to={link}>
        {buttonText}
      </Button>
    </Box>
  );
};
