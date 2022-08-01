import { Box } from 'web/src/components/ui/Box';
import { Link, RenderNavLinkComponent } from 'web/src/components/shared/sharedTypes';
import * as s from './NavigationTabs.css';

interface Props {
  tabs: Link[];
  renderNavLinkComponent: RenderNavLinkComponent;
}

export const NavigationTabs = ({ tabs, renderNavLinkComponent }: Props) => (
  <Box
    position="absolute"
    className={s.tabs}
    display="flex"
    alignItems="center"
    bg="headerSubmenuBg"
    px="8x"
    height="14x"
    left={0}
    right={0}
  >
    {tabs.map((tab) => {
      if (!('type' in tab) || tab.type === 'tab') {
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
