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

  return navLinks.find(
    (item) =>
      item.type === 'tab' &&
      item.tabs.some((tab) => tab.to === pathname || pathname.startsWith(tab.to)),
  ) as LinkTabs | undefined;
};

export const Navigation: FC<Props> = ({ navLinks, pathname, renderNavLinkComponent }) => {
  const [openedTabKey, setOpenedTabKey] = useState<null | string>(null);
  const [nextTabToOpen, setNextTabToOpen] = useState<null | string>(null);
  const activeTab = findActiveTabByPathname(navLinks, pathname);

  useEffect(() => {
    if (openedTabKey === null && nextTabToOpen !== null) {
      setOpenedTabKey(nextTabToOpen);
      setNextTabToOpen(null);
    }
  }, [openedTabKey, nextTabToOpen]);

  const handleOpenTab = (key: string) => {
    if (openedTabKey) {
      setNextTabToOpen(key);
    } else {
      setOpenedTabKey(key);
    }
  };

  const handleCloseTab = (key: string) => {
    if (openedTabKey === key) {
      setOpenedTabKey(null);
    }

    if (nextTabToOpen === key) {
      setNextTabToOpen(null);
    }
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
            open={item.key === openedTabKey}
            renderNavLinkComponent={renderNavLinkComponent}
            onOpen={handleOpenTab}
            onClose={handleCloseTab}
          />
        ))}
      </Stack>
    </Box>
  );
};
