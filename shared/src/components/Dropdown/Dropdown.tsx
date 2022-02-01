import { FC, ReactNode, useCallback, useContext, useRef, useState } from 'react';
import { useEscapeKeyDown } from 'shared/src/hooks/useEscapeKeyDown';
import { useOnClickOutside } from 'shared/src/hooks/useOnClickOutside';
import {
  OptionalWithUndefined,
  RenderLinkComponent,
  RenderNavLinkComponent,
} from 'shared/src/types';
import { Box } from 'shared/src/components/Box';
import { Sprinkles } from 'shared/src/theme/sprinkles.css';
import { HeaderContext } from 'shared/src/components/Header/HeaderContext';
import { Portal } from 'shared/src/components/Portal';
import { DropdownMenu } from './DropdownMenu';

export type RenderButtonFn = (props: { open: boolean }) => ReactNode;

export type RenderMenuFn = (props: {
  renderLinkComponent: RenderLinkComponent;
  renderNavLinkComponent: RenderNavLinkComponent;
  closeMenu: () => void;
}) => ReactNode;

interface Props extends OptionalWithUndefined<Sprinkles> {
  dropdownAlign?: 'left' | 'right' | undefined;
  dropdownSize?: 'small' | 'medium' | undefined;
  renderButton: RenderButtonFn;
  renderMenu: RenderMenuFn;
  renderMobileMenu?: RenderMenuFn | undefined;
}

export const Dropdown: FC<Props> = ({
  dropdownAlign = 'left',
  dropdownSize = 'medium',
  renderButton,
  renderMenu,
  renderMobileMenu,
  ...props
}) => {
  const {
    enableMobileMenu = false,
    renderLinkComponent,
    renderNavLinkComponent,
  } = useContext(HeaderContext);
  const elementRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const handleOnOutsideClick = useCallback(() => {
    if (open) {
      setOpen(false);
    }
  }, [open]);

  useOnClickOutside([elementRef, mobileMenuRef], handleOnOutsideClick);
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

  const mobileMenu = renderMobileMenu?.({
    renderLinkComponent,
    renderNavLinkComponent,
    closeMenu,
  });

  return (
    <Box ref={elementRef} {...props} position="relative">
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
      {enableMobileMenu && (
        <Portal>
          <DropdownMenu
            ref={mobileMenuRef}
            dropdownAlign={dropdownAlign}
            dropdownSize={dropdownSize}
            open={open}
            mobile
          >
            {mobileMenu ?? items}
          </DropdownMenu>
        </Portal>
      )}
      <DropdownMenu open={open} dropdownAlign={dropdownAlign} dropdownSize={dropdownSize}>
        {items}
      </DropdownMenu>
    </Box>
  );
};
