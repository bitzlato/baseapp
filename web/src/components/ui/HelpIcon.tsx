import { FC } from 'react';
import HelpIconSvg from 'web/src/assets/svg/HelpIcon.svg';
import { Tooltip } from 'web/src/components/ui/Tooltip';

export const HelpIcon: FC = ({ children }) => (
  <Tooltip label={children} placement="top">
    <span>
      <HelpIconSvg />
    </span>
  </Tooltip>
);
