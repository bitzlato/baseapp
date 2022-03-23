import { FC } from 'react';
import cn from 'classnames';
import { Box } from 'web/src/components/ui/Box';
import { themeDark, themeLight } from 'web/src/theme/vars.css';
import {
  USER_STATUS_AUTHORIZATION_REQUIRED,
  USER_STATUS_AUTHORIZED,
  USER_STATUS_NOT_AUTHORIZED,
} from 'web/src/components/shared/sharedConstants';
import { Logo } from './Logo';
import { Navigation } from './Navigation';
import { UserPanel } from './UserPanel/UserPanel';
import * as s from './Header.css';
import { HamburgerMenu } from './HamburgerMenu';
import { HeaderContext, HeaderContextValue } from './HeaderContext';

type Props = HeaderContextValue;

export const Header: FC<Props> = (props) => {
  const { children, theme, navLinks, renderNavLinkComponent } = props;
  const themeClassName = theme === 'light' ? themeLight : themeDark;

  return (
    <HeaderContext.Provider value={props}>
      <Box
        className={cn(s.header, themeClassName)}
        bg="primary"
        display="flex"
        alignItems="center"
        px={['2x', '2x', '4x', '8x']}
        h={['14x', '18x']}
      >
        <HamburgerMenu />
        <Logo />

        {children || (
          <Navigation navLinks={navLinks} renderNavLinkComponent={renderNavLinkComponent} />
        )}

        <UserPanel
          responsiveMode={children !== undefined && children !== null && children !== false}
        />
      </Box>
    </HeaderContext.Provider>
  );
};

export { USER_STATUS_NOT_AUTHORIZED, USER_STATUS_AUTHORIZATION_REQUIRED, USER_STATUS_AUTHORIZED };
