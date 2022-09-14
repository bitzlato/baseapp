import { FC, useContext } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { DropdownItemType, icons } from 'web/src/components/shared/Header/Dropdown/DropdownItem';
import { MenuMobileContext } from 'web/src/components/shared/Header/MenuMobile/MenuMobile';
import ChevronDownIcon from 'web/src/assets/svg/ChevronDownIcon.svg';
import * as s from './MenuMobileItem.css';

type Props = DropdownItemType;

export const MenuMobileItem: FC<Props> = (props) => {
  const { type, icon, children } = props;
  const { onClose } = useContext(MenuMobileContext);

  const handleClick = () => {
    if (type === 'button') {
      const { onClick } = props;
      onClick();
    }
    onClose();
  };

  const iconBox = icon && (
    <Box as="span" className={s.icon}>
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

  const { to } = props;

  // type=external
  return (
    <Box as="a" className={s.item} href={to} onClick={handleClick}>
      {link}
    </Box>
  );
};
