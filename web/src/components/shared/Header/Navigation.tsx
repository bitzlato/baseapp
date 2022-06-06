import { FC, useEffect, useState } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { Stack } from 'web/src/components/ui/Stack';
import { Links, LinkTabs, RenderNavLinkComponent } from 'web/src/components/shared/sharedTypes';
import { NavigationItem } from './NavigationItem';

interface Props {
  renderNavLinkComponent: RenderNavLinkComponent;
  navLinks: Links;
  pathname?: string | undefined;
}

export const findActiveTabByPathname = (navLinks: Links, pathname: string | undefined) => {
  if (!pathname) {
    return undefined;
  }

  return navLinks.find((item) => {
    if (item.type === 'tab') {
      return (
        item.tabs.some((tab) => tab.to === pathname) ||
        item.tabs.some((tab) => pathname.startsWith(tab.to))
      );
    }

    return false;
  }) as LinkTabs | undefined;
};

export const Navigation: FC<Props> = ({ navLinks, pathname, renderNavLinkComponent }) => {
  const [tabOpened, setTabOpened] = useState<{ current: string | null; next: string | null }>({
    current: null,
    next: null,
  });
  const activeTab = findActiveTabByPathname(navLinks, pathname);

  useEffect(() => {
    if (tabOpened.current === null && tabOpened.next !== null) {
      setTabOpened({ current: tabOpened.next, next: null });
    }
  }, [tabOpened]);

  const handleOpenTab = (key: string) => {
    setTabOpened((currentTabOpened) => {
      return {
        current: currentTabOpened.current ?? key,
        next: currentTabOpened.current ? key : currentTabOpened.next,
      };
    });
  };

  const handleCloseTab = (key: string) => {
    setTabOpened((currentTabOpened) => {
      return {
        current: currentTabOpened.current === key ? null : currentTabOpened.current,
        next: currentTabOpened.next === key ? null : currentTabOpened.next,
      };
    });
  };

  return (
    <Box
      display={{ mobile: 'none', tablet: 'flex' }}
      flexShrink={0}
      alignItems="stretch"
      height="full"
    >
      <Stack alignItems="stretch">
        {navLinks.map((item) => (
          <NavigationItem
            key={item.key}
            item={item}
            active={item.key === activeTab?.key}
            open={item.key === tabOpened.current}
            renderNavLinkComponent={renderNavLinkComponent}
            onOpen={handleOpenTab}
            onClose={handleCloseTab}
          />
        ))}
      </Stack>
    </Box>
  );
};
