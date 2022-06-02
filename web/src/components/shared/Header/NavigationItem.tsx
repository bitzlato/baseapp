import { useRef } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { Link, RenderNavLinkComponent } from 'web/src/components/shared/sharedTypes';
import { useFocusWithin } from 'web/src/hooks/useFocusWithin';
import { NavigationTabs } from './NavigationTabs';
import { NavigationLink } from './NavigationLink';

interface Props {
  item: Link;
  active?: boolean;
  open?: boolean;
  onOpen: (key: string) => void;
  onClose: (key: string) => void;
  renderNavLinkComponent: RenderNavLinkComponent;
}

const CLOSE_DELAY = 200;

export const NavigationItem = ({
  item,
  active = false,
  open = false,
  onOpen,
  onClose,
  renderNavLinkComponent,
}: Props) => {
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openSubmenu = () => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
    }

    onOpen(item.key);
  };

  const closeSubmenu = () => {
    onClose(item.key);
  };

  const closeSubmenuDelayed = () => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
    }

    closeTimeout.current = setTimeout(() => {
      closeSubmenu();
    }, CLOSE_DELAY);
  };

  const { focusWithinProps } = useFocusWithin({
    onFocusWithin: openSubmenu,
    onBlurWithin: closeSubmenu,
  });

  if (item.type !== 'tab') {
    return (
      <NavigationLink
        active={active}
        open={open}
        link={item}
        renderNavLinkComponent={renderNavLinkComponent}
      />
    );
  }

  return (
    <Box onMouseEnter={openSubmenu} onMouseLeave={closeSubmenuDelayed} {...focusWithinProps}>
      <NavigationLink
        active={active}
        open={open}
        link={{ key: item.key, children: item.children, ...(item.link ?? {}) }}
        renderNavLinkComponent={renderNavLinkComponent}
      />

      {item.tabs && open ? (
        <NavigationTabs tabs={item.tabs} renderNavLinkComponent={renderNavLinkComponent} />
      ) : null}
    </Box>
  );
};
