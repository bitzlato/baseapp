import { FC, ReactNode, useCallback, useContext, useRef, useState } from 'react';
import { useEscapeKeyDown } from 'web/src/hooks/useEscapeKeyDown';
import { useOnClickOutside } from 'web/src/hooks/useOnClickOutside';
import { RenderLinkComponent, RenderNavLinkComponent } from 'web/src/components/shared/sharedTypes';
import { Box } from 'web/src/components/ui/Box';
import { Sprinkles } from 'web/src/theme/sprinkles.css';
import { HeaderContext } from 'web/src/components/shared/Header/HeaderContext';
import { OptionalWithUndefined } from 'web/src/types';
import { DropdownMenu } from './DropdownMenu';

export type RenderButtonFn = (props: { open: boolean; onClick: () => void }) => ReactNode;

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
  const { renderLinkComponent, renderNavLinkComponent } = useContext(HeaderContext);
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

  return (
    <Box ref={elementRef} {...props} position="relative">
      {renderButton({ open, onClick: handleClick })}

      <DropdownMenu open={open} dropdownAlign={dropdownAlign} dropdownSize={dropdownSize}>
        {items}
      </DropdownMenu>
    </Box>
  );
};
