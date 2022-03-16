import { FC } from 'react';
import cn from 'classnames';
import {
  IconName,
  LinkType,
  RenderLinkComponent,
  RenderNavLinkComponent,
} from 'web/src/components/shared/sharedTypes';
import { Box } from 'web/src/components/ui/Box';
import ApiIcon from 'web/src/assets/svg/ApiIcon.svg';
import HistoryIcon from 'web/src/assets/svg/HistoryIcon.svg';
import LogoutIcon from 'web/src/assets/svg/LogoutIcon.svg';
import OrdersIcon from 'web/src/assets/svg/OrdersIcon.svg';
import P2PIcon from 'web/src/assets/svg/P2PIcon.svg';
import ProfileIcon from 'web/src/assets/svg/ProfileIcon.svg';
import QuickExchangeIcon from 'web/src/assets/svg/QuickExchangeIcon.svg';
import SignupIcon from 'web/src/assets/svg/SignupIcon.svg';
import TrandingIcon from 'web/src/assets/svg/TrandingIcon.svg';
import WalletsIcon from 'web/src/assets/svg/WalletsIcon.svg';
import QuestionIcon from 'web/src/assets/svg/QuestionIcon.svg';
import * as s from './DropdownItem.css';

const icons = {
  profile: <ProfileIcon />,
  signup: <SignupIcon />,
  quickExchange: <QuickExchangeIcon />,
  trading: <TrandingIcon />,
  wallets: <WalletsIcon />,
  orders: <OrdersIcon />,
  history: <HistoryIcon />,
  p2p: <P2PIcon />,
  api: <ApiIcon />,
  logout: <LogoutIcon />,
  question: <QuestionIcon />,
};

type Props = {
  icon?: IconName | undefined;
  children: string;
  closeMenu: () => void;
} & (
  | ({
      type: LinkType;
      to: string;
    } & (
      | {
          renderNavLinkComponent: RenderNavLinkComponent;
        }
      | {
          renderLinkComponent: RenderLinkComponent;
        }
    ))
  | { isActive?: boolean | undefined; onClick: () => void }
);

export const DropdownItem: FC<Props> = (props) => {
  const { icon, children, closeMenu, ...rest } = props;

  const handleClick = () => {
    if ('onClick' in props) {
      const { onClick } = props;
      onClick?.();
    }
    closeMenu();
  };

  const body = (
    <>
      {icon && (
        <Box as="span" className={s.icon}>
          {icons[icon]}
        </Box>
      )}
      {children}
    </>
  );

  if ('onClick' in rest) {
    return (
      <Box
        as="button"
        className={cn(s.item, rest.isActive && s.itemActive)}
        type="button"
        onClick={handleClick}
      >
        {body}
      </Box>
    );
  }

  if (rest.type === 'internal') {
    const { to } = rest;
    if ('renderNavLinkComponent' in rest) {
      const { renderNavLinkComponent } = rest;

      return (
        <>
          {renderNavLinkComponent({
            className: s.item,
            activeClassName: s.itemActive,
            to,
            onClick: handleClick,
            children: body,
          })}
        </>
      );
    }

    const { renderLinkComponent } = rest;
    return (
      <>
        {renderLinkComponent({
          className: s.item,
          to,
          onClick: handleClick,
          children: body,
        })}
      </>
    );
  }

  return (
    <Box as="a" className={s.item} href={rest.to} onClick={handleClick}>
      {body}
    </Box>
  );
};
