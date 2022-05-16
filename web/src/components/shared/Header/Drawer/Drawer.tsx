import React, { useRef, useState, useCallback, useContext } from 'react';
import cx from 'classnames';
import { useOnClickOutside } from 'web/src/hooks/useOnClickOutside';
import { useEscapeKeyDown } from 'web/src/hooks/useEscapeKeyDown';
import { Box } from 'web/src/components/ui/Box';
import * as styles from './Drawer.css';
import { RenderMenuFn } from '../Dropdown/Dropdown';
import { HeaderContext } from '../HeaderContext';

type DrawerType = {
  renderButton: (params: { open: boolean }) => JSX.Element;
  renderMenu: RenderMenuFn;
};

const Drawer: React.FC<DrawerType> = ({ renderButton, renderMenu }) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const { renderLinkComponent, renderNavLinkComponent } = useContext(HeaderContext);
  const [open, setOpen] = useState(false);

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
        color={{ default: 'interactive', hover: 'interactiveHighlighted' }}
        onClick={handleClick}
      >
        {renderButton({ open })}
      </Box>

      <div className={cx(styles.drawer, open && styles.openDrawer)}>{items}</div>
    </div>
  );
};

export default Drawer;
