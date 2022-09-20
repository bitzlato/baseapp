import { FC } from 'react';
import { Box } from 'web/src/components/ui/Box';
import LeftArrowIcon from 'web/src/assets/svg/LeftArrowIcon.svg';
import { Link } from 'react-router-dom';
import { BackButtonMobileTeleporter } from './HeaderBackButtonMobile';

interface Props {
  to: string;
}

export const BackButtonMobile: FC<Props> = ({ children, to }) => (
  <BackButtonMobileTeleporter.Source>
    <Box
      as={Link}
      to={to}
      display="flex"
      alignItems="center"
      gap="4x"
      color={{ default: 'text', hover: 'textHighlighted' }}
      textDecoration={{ hover: 'none' }}
    >
      <LeftArrowIcon />
      <Box fontSize="large">{children}</Box>
    </Box>
  </BackButtonMobileTeleporter.Source>
);
