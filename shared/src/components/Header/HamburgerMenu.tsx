import { FC, useCallback, useContext } from 'react';
import cn from 'classnames';
import { Box } from 'shared/src/components/Box';
import * as s from './HamburgerMenu.css';
import { DropdownItem } from 'shared/src/components/Dropdown/DropdownItem';
import { Dropdown, RenderButtonFn, RenderMenuFn } from 'shared/src/components/Dropdown/Dropdown';
import { getUserContext, HeaderContext } from './HeaderContext';
import { ThemeSwitcher } from './ThemeSwitcher';
import { LanguageSwitcher } from './LanguageSwitcher/LanguageSwitcher';
import { Button } from 'shared/src/components/Button';
import { USER_STATUS_AUTHORIZATION_REQUIRED } from 'shared/src/constants';

export const HamburgerMenu: FC = () => {
  const context = useContext(HeaderContext);
  const userContext = getUserContext(context);
  const { t, hamburgerLinks, hamburgerShowOnlyTablet } = context;

  const renderButton: RenderButtonFn = useCallback(
    ({ open }) => (
      <Box as="span" className={s.hamburger}>
        <Box as="span" className={cn(s.hamburgerItem, open && s.item1)} />
        <Box as="span" className={cn(s.hamburgerItem, open && s.item2)} />
        <Box as="span" className={cn(s.hamburgerItem, open && s.item3)} />
      </Box>
    ),
    [],
  );

  const renderMenu: RenderMenuFn = useCallback(
    ({ renderNavLinkComponent, closeMenu }) =>
      hamburgerLinks.map((item) => (
        <DropdownItem
          closeMenu={closeMenu}
          renderNavLinkComponent={renderNavLinkComponent}
          {...item}
        />
      )),
    [hamburgerLinks],
  );

  const renderMobileMenu: RenderMenuFn = useCallback(
    (props) => (
      <>
        {userContext.status === USER_STATUS_AUTHORIZATION_REQUIRED && (
          <>
            <Box px="4x" mt="4x" mb="4x">
              <Button fullWidth onClick={userContext.onSignInClick}>
                {t('signIn')}
              </Button>
            </Box>
            <Box px="4x" mb="4x">
              <Button color="secondary" fullWidth onClick={userContext.onSignUpClick}>
                {t('signUp')}
              </Button>
            </Box>
          </>
        )}
        {renderMenu(props)}
        <ThemeSwitcher itemInMenu />
        <LanguageSwitcher />
      </>
    ),
    [renderMenu],
  );

  return (
    <Dropdown
      renderButton={renderButton}
      renderMenu={renderMenu}
      renderMobileMenu={renderMobileMenu}
      display={hamburgerShowOnlyTablet ? ['flex', 'flex', 'none'] : 'flex'}
      height="full"
    />
  );
};
