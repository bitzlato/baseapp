import { FC } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { Links, RenderNavLinkComponent } from 'web/src/components/shared/sharedTypes';
import { findActiveTabByPathname } from 'web/src/components/shared/Header/Navigation';
import * as s from './MobileNavigation.css';

interface Props {
  renderNavLinkComponent: RenderNavLinkComponent;
  navLinks: Links;
  pathname?: string | undefined;
}

export const MobileNavigation: FC<Props> = ({ navLinks, pathname, renderNavLinkComponent }) => {
  const activeTab = findActiveTabByPathname(navLinks, pathname);

  if (!activeTab) {
    return null;
  }

  return (
    <Box
      display={{ mobile: 'flex', tablet: 'none' }}
      flexShrink={0}
      alignItems="stretch"
      py="4x"
      px="5x"
      overflowY="auto"
      className={s.tabs}
      gap="4x"
    >
      {activeTab.tabs.map((tab) => {
        if (!('type' in tab)) {
          return null;
        }

        return tab.type === 'internal' ? (
          renderNavLinkComponent({
            key: tab.key,
            className: s.tab,
            activeClassName: s.tabActive,
            to: tab.to,
            children: tab.children,
            exact: tab.exact ?? false,
          })
        ) : (
          <Box key={tab.key} as="a" className={s.tab} href={tab.to}>
            {tab.children}
          </Box>
        );
      })}
    </Box>
  );
};
