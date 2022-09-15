import { FC, useContext } from 'react';
import { Box } from 'web/src/components/ui/Box';
import HamburgerIcon from 'web/src/assets/svg/HamburgerIcon.svg';
import { MenuMobile } from 'web/src/components/shared/Header/MenuMobile/MenuMobile';
import { MenuMobileHeader } from 'web/src/components/shared/Header/MenuMobile/MenuMobileHeader';
import { MenuMobileBody } from 'web/src/components/shared/Header/MenuMobile/MenuMobileBody';
import { RenderButtonFn } from 'web/src/components/shared/Header/Dropdown/Dropdown';
import { HeaderContext } from 'web/src/components/shared/Header/HeaderContext';
import { MenuMobileItem } from 'web/src/components/shared/Header/MenuMobile/MenuMobileItem';
import { findActiveTabByPathname } from 'web/src/components/shared/Header/Navigation';
import * as s from './HamburgerMenu.css';

export const HamburgerMenu: FC = () => {
  const { navLinks, rightNavLinks, pathname } = useContext(HeaderContext);
  const activeTab = findActiveTabByPathname(navLinks, pathname);
  const renderButton: RenderButtonFn = ({ onClick }) => (
    <Box
      as="button"
      className={s.onlyMobile}
      color={{ default: 'headerIcon', hover: 'headerIconHover' }}
      onClick={onClick}
    >
      <HamburgerIcon width="24" height="24" />
    </Box>
  );

  return (
    <MenuMobile renderButton={renderButton}>
      <MenuMobileHeader />
      <MenuMobileBody>
        {navLinks?.map((item) => (
          <MenuMobileItem {...item} isActive={item.key === activeTab?.key} />
        ))}
        {rightNavLinks?.map((item) => (
          <MenuMobileItem {...item} isActive={'to' in item && item.to === pathname} />
        ))}
      </MenuMobileBody>
    </MenuMobile>
  );
};
