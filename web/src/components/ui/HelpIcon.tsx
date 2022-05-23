import { FC, ReactNode } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { Tooltip } from 'web/src/components/ui/Tooltip';
import { Sprinkles } from 'web/src/theme/sprinkles.css';
import HelpIconSvg from 'web/src/assets/svg/HelpIcon.svg';
import { OptionalWithUndefined } from 'web/src/types';

interface Props {
  children: ReactNode;
  iconFillColor?: OptionalWithUndefined<Sprinkles>['color'];
}

export const HelpIcon: FC<Props> = ({ children, iconFillColor }) => (
  <Tooltip label={children} placement="top">
    <Box as="span" color={iconFillColor}>
      <HelpIconSvg />
    </Box>
  </Tooltip>
);
