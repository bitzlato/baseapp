import React, { useRef, useState, useCallback, useContext, useEffect } from 'react';
import cx from 'classnames';
import { useThrottledCallback } from 'use-debounce';
import { useOnClickOutside } from 'web/src/hooks/useOnClickOutside';
import { useEscapeKeyDown } from 'web/src/hooks/useEscapeKeyDown';
import { Box } from 'web/src/components/ui/Box';
import { RenderMenuFn } from 'web/src/components/shared/Header/Dropdown/Dropdown';
import { HeaderContext } from 'web/src/components/shared/Header/HeaderContext';
import * as styles from './Drawer.css';

type DrawerType = {
  renderButton: (params: { open: boolean }) => JSX.Element;
  renderMenu: RenderMenuFn;
};

export const Drawer: React.FC<DrawerType> = ({ renderButton, renderMenu }) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const { renderLinkComponent, renderNavLinkComponent } = useContext(HeaderContext);
  const [open, setOpen] = useState(false);

  const handleScroll = useThrottledCallback(() => {
    const headerHeight = elementRef.current?.offsetHeight;
    const windowScroll = document.body.scrollTop || document.documentElement.scrollTop;

    if (headerHeight && drawerRef.current) {
      if (windowScroll >= headerHeight) {
        drawerRef.current.style.marginTop = '0';
      } else {
        drawerRef.current.style.marginTop = `${Math.floor(headerHeight - windowScroll)}px`;
      }
    }
  }, 100);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  const handleOnOutsideClick = useCallback(() => {
    if (open) {
      setOpen(false);
    }
  }, [open]);

  useOnClickOutside([elementRef], handleOnOutsideClick);
  useEscapeKeyDown(handleOnOutsideClick);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setOpen(false);
  };

  const items = renderMenu({
    renderLinkComponent,
    renderNavLinkComponent,
    closeMenu,
  });

  return (
    <div ref={elementRef}>
      <Box
        as="button"
        type="button"
        display="flex"
        height="full"
        alignItems="center"
        color={{ default: 'headerIcon', hover: 'headerIconHover' }}
        onClick={handleClick}
      >
        {renderButton({ open })}
      </Box>

      <div className={cx(styles.drawer, open && styles.openDrawer)} ref={drawerRef}>
        {items}
      </div>
    </div>
  );
};
