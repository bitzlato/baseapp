import { FC } from 'react';
import { IconButton } from 'web/src/components/IconButton/IconButton';
import BlockedUserIcon from 'web/src/assets/svg/BlockedUserIcon.svg';
import TrustIcon from 'web/src/assets/svg/TrustIcon.svg';
import TrustOutlinedIcon from 'web/src/assets/svg/TrustOutlinedIcon.svg';
import { Tooltip } from 'web/src/components/ui/Tooltip';
import { button, ButtonVariants } from './ActionOnTraderButton.css';

type Props = NonNullable<ButtonVariants> & {
  title?: string | undefined;
  activeTitle?: string | undefined;
  onClick?: (() => void) | undefined;
};

const iconMap = {
  trust: {
    true: <TrustIcon width="11" />,
    false: <TrustOutlinedIcon width="11" />,
  },
  block: {
    true: <BlockedUserIcon width="16" />,
    false: <BlockedUserIcon width="16" />,
  },
};

export const ActionOnTraderButton: FC<Props> = ({
  variant = 'trust',
  active = false,
  title,
  activeTitle = title,
  onClick,
}) => (
  <Tooltip label={active ? activeTitle : title} placement="top">
    <IconButton className={button({ variant, active })} onClick={onClick}>
      <span>{iconMap[variant][`${active}`]}</span>
    </IconButton>
  </Tooltip>
);
