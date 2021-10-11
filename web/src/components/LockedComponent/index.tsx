import React from 'react';
import { Link } from 'react-router-dom';
import { Box } from '../Box';
import { Text } from '../Text';
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
      <Text size="2x">{text}</Text>
      <Button component={Link} to={link}>
        {buttonText}
      </Button>
    </Box>
  );
};
