import { useRef } from 'react';
import cn from 'classnames';
import { Box } from 'web/src/components/ui/Box';
import { Link, RenderNavLinkComponent } from 'web/src/components/shared/sharedTypes';
import { useFocusWithin } from 'web/src/hooks/useFocusWithin';
import { NavigationTabs } from './NavigationTabs';
import * as s from './NavigationItem.css';

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

  const className = cn(s.item, !open && active && s.itemActive, open && s.itemHover);

  return (
    <Box
      height="full"
      onMouseEnter={openSubmenu}
      onMouseLeave={closeSubmenuDelayed}
      {...focusWithinProps}
    >
      {item.type === 'internal' &&
        renderNavLinkComponent({
          key: item.key,
          className,
          activeClassName: s.itemActive,
          to: item.to,
          children: item.children,
        })}

      {item.type === 'external' && (
        <Box as="a" className={className} href={item.to}>
          {item.children}
        </Box>
      )}

      {item.type === 'tab' && (
        <>
          <Box as="button" type="button" className={className}>
            {item.children}
          </Box>

          {item.tabs && open ? (
            <NavigationTabs tabs={item.tabs} renderNavLinkComponent={renderNavLinkComponent} />
          ) : null}
        </>
      )}
    </Box>
  );
};
