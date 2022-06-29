import { FC, ReactNode } from 'react';
import cn from 'classnames';
import {
  IconName,
  LinkType,
  RenderLinkComponent,
  RenderNavLinkComponent,
} from 'web/src/components/shared/sharedTypes';
import { Box } from 'web/src/components/ui/Box';
import LogoutIcon from 'web/src/assets/svg/LogoutIcon.svg';
import SettingsIcon from 'web/src/assets/svg/SettingsIcon.svg';
import TelegramPlainIcon from 'web/src/assets/svg/TelegramPlainIcon.svg';
import TraderWorkspaceIcon from 'web/src/assets/svg/TraderWorkspaceIcon.svg';
import ListIcon from 'web/src/assets/svg/ListIcon.svg';
import * as s from './DropdownItem.css';

const icons = {
  profile: <SettingsIcon />,
  logout: <LogoutIcon />,
  telegram: <TelegramPlainIcon />,
  invoices: <ListIcon />,
  'trader-workspace': <TraderWorkspaceIcon />,
};

type DropdownLinkType = {
  type: LinkType;
  to: string;
  children: ReactNode | string;
};
type DropdownLinkTypeWithRenderProps = DropdownLinkType &
  (
    | {
        renderNavLinkComponent: RenderNavLinkComponent;
      }
    | {
        renderLinkComponent: RenderLinkComponent;
      }
  );
type DropdownButtonType = {
  type: 'button';
  isActive?: boolean | undefined;
  children: ReactNode | string;
  onClick: () => void;
};
type DropdownCustomType = { type: 'custom'; children: ReactNode };

export type DropdownItemType = {
  icon?: IconName | undefined;
} & (DropdownLinkTypeWithRenderProps | DropdownButtonType | DropdownCustomType);

type Props = {
  closeMenu: () => void;
} & DropdownItemType;

export const DropdownItem: FC<Props> = (props) => {
  const { type, icon, children, closeMenu } = props;

  const handleClick = () => {
    if (type === 'button') {
      const { onClick } = props;
      onClick();
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

  if (type === 'button') {
    const { isActive } = props;
    return (
      <Box
        as="button"
        className={cn(s.item, isActive && s.itemActive)}
        type="button"
        onClick={handleClick}
      >
        {body}
      </Box>
    );
  }

  if (type === 'internal') {
    const { to } = props;
    if ('renderNavLinkComponent' in props) {
      const { renderNavLinkComponent } = props;

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

    if ('renderLinkComponent' in props) {
      const { renderLinkComponent } = props;
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
  }

  if (type === 'custom') {
    return <Box className={s.item}>{children}</Box>;
  }

  const { to } = props;

  return (
    <Box as="a" className={s.item} href={to} onClick={handleClick}>
      {body}
    </Box>
  );
};
