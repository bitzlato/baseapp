import { FC } from 'react';
import cn from 'classnames';
import { BottomTabLink, RenderNavLinkComponent } from 'web/src/components/shared/sharedTypes';
import { BottomTabButton } from 'web/src/components/shared/MobileFooter/BottomTabButton';
import { Box } from 'web/src/components/ui/Box';
import { Theme } from 'web/src/types';
import { themeDark, themeLight } from 'web/src/theme/vars.css';
import * as s from './MobileFooter.css';

export interface SharedFooterMobileProps {
  theme: Theme;
  renderNavLinkComponent: RenderNavLinkComponent;
  tabLinks: Array<BottomTabLink>;
}

export const MobileFooter: FC<SharedFooterMobileProps> = ({
  theme,
  tabLinks,
  renderNavLinkComponent,
}) => {
  const themeClassName = theme === 'light' ? themeLight : themeDark;

  return (
    <Box
      display="flex"
      alignItems="center"
      height="19x"
      zIndex="bottomTabs"
      position="fixed"
      width="full"
      bottom={0}
      bg="bottomTabsBg"
      borderTopStyle="solid"
      borderTopWidth="1x"
      borderColor="bottomTabsTopBorder"
      className={cn(themeClassName, s.footer)}
    >
      {tabLinks.map((tab) => {
        return (
          <BottomTabButton key={tab.to} renderNavLinkComponent={renderNavLinkComponent} {...tab} />
        );
      })}
    </Box>
  );
};
