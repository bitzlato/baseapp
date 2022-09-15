import { FC, useContext, useState } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { DropdownItemType, icons } from 'web/src/components/shared/Header/Dropdown/DropdownItem';
import { MenuMobileContext } from 'web/src/components/shared/Header/MenuMobile/MenuMobile';
import ChevronDownIcon from 'web/src/assets/svg/ChevronDownIcon.svg';
import { Link } from 'web/src/components/shared/sharedTypes';
import { MenuMobileSubItems } from 'web/src/components/shared/Header/MenuMobile/MenuMobileSubItems';
import * as s from './MenuMobileItem.css';

type Props = DropdownItemType | Link;

export const MenuMobileItem: FC<Props> = (props) => {
  const { type, icon, children } = props;
  const { onClose } = useContext(MenuMobileContext);
  const [open, setOpen] = useState(() => {
    if (type === 'button' || type === 'tab') {
      const { isActive } = props;

      return isActive;
    }

    return false;
  });

  const handleClick = () => {
    if (type === 'button') {
      const { onClick } = props;
      onClick();
    } else if (type === 'tab') {
      setOpen((prev) => !prev);

      return;
    }

    onClose();
  };

  let iconClassName = s.icon.base;
  if (open) {
    iconClassName = s.icon.active;
  }
  const iconBox = icon && (
    <Box as="span" className={iconClassName}>
      {icons[icon]}
    </Box>
  );
  const body = (
    <>
      {iconBox}
      {children}
    </>
  );
  const link = (
    <>
      {body}
      <ChevronDownIcon className={s.chevron.right} />
    </>
  );

  if (type === 'button') {
    return (
      <Box as="button" className={s.item} type="button" onClick={handleClick}>
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
            activeClassName: '', // s.itemActive,
            to,
            onClick: handleClick,
            children: link,
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
            children: link,
          })}
        </>
      );
    }
  }

  if (type === 'custom') {
    const { component: Component } = props;
    return (
      <Box className={s.item}>
        <Component icon={iconBox} />
      </Box>
    );
  }

  if (type === 'tab') {
    const { tabs } = props;

    return (
      <Box className={s.wrap}>
        <Box as="button" className={s.item} type="button" onClick={handleClick}>
          {body}
          <ChevronDownIcon className={s.chevron[open ? 'up' : 'down']} />
        </Box>
        <MenuMobileSubItems links={tabs} open={open} />
      </Box>
    );
  }

  const { to } = props;

  // type=external
  return (
    <Box as="a" className={s.item} href={to} onClick={handleClick}>
      {link}
    </Box>
  );
};
