import { FC } from 'react';
import cn from 'classnames';
import Snowfall from 'react-snowfall';
import { Box } from 'web/src/components/ui/Box';
import { themeDark, themeLight } from 'web/src/theme/vars.css';
import {
  USER_STATUS_AUTHORIZATION_REQUIRED,
  USER_STATUS_AUTHORIZED,
  USER_STATUS_NOT_AUTHORIZED,
} from 'web/src/components/shared/sharedConstants';
import { HeaderBackButtonMobile } from 'web/src/components/shared/Header/HeaderBackButtonMobile';
import { Logo } from './Logo';
import { Navigation } from './Navigation';
import { UserPanel } from './UserPanel/UserPanel';
import { HeaderContext, HeaderContextValue } from './HeaderContext';
import * as s from './Header.css';
import { MobileNavigation } from './MobileNavigation';

type Props = HeaderContextValue;

export const Header: FC<Props> = (props) => {
  const { children, backButton, theme, navLinks, pathname, renderNavLinkComponent } = props;
  const themeClassName = theme === 'light' ? themeLight : themeDark;

  return (
    <HeaderContext.Provider value={props}>
      <Box className={cn(s.header, themeClassName)} position="relative">
        <Box position="absolute" left={0} top={0} className={s.snowfall}>
          <Snowfall
            snowflakeCount={50}
            changeFrequency={300}
            color={theme === 'light' ? '#B8DBED' : '#ffffff'}
            speed={[0.01, 0.1]}
            wind={[0, 0.05]}
            radius={[0.2, 1.4]}
          />
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          width="full"
          borderBottomWidth={{ mobile: '0', tablet: '1x' }}
          borderBottomStyle="solid"
          borderBottomColor="headerBorderBottom"
          px={{ mobile: '2x', tablet: '3x' }}
          h={{ mobile: '12x', tablet: '16x' }}
        >
          <Box
            display={{ mobile: 'none', tablet: 'flex' }}
            alignItems="center"
            ml={{ mobile: '0', desktop: '4x' }}
            mr={{ mobile: '0', desktop: '3x' }}
            flexShrink={0}
          >
            <Logo />
            <Box className={s.backButton}>{backButton}</Box>
          </Box>
          <Box display={{ mobile: 'block', tablet: 'none' }}>
            <HeaderBackButtonMobile />
          </Box>

          {children || (
            <Navigation
              navLinks={navLinks}
              pathname={pathname}
              renderNavLinkComponent={renderNavLinkComponent}
            />
          )}

          <UserPanel
            responsiveMode={children !== undefined && children !== null && children !== false}
          />
        </Box>

        <MobileNavigation
          navLinks={navLinks}
          pathname={pathname}
          renderNavLinkComponent={renderNavLinkComponent}
        />
      </Box>
    </HeaderContext.Provider>
  );
};

export { USER_STATUS_NOT_AUTHORIZED, USER_STATUS_AUTHORIZATION_REQUIRED, USER_STATUS_AUTHORIZED };
