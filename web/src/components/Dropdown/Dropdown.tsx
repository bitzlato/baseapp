import { ReactNode, useCallback, useRef, useState } from 'react';
import cn from 'classnames';
import { Box } from 'web/src/components/ui/Box';
import { useOnClickOutside } from 'web/src/hooks/useOnClickOutside';
import { useEscapeKeyDown } from 'web/src/hooks/useEscapeKeyDown';
import * as s from './Dropdown.css';

interface Props {
  renderButton: (props: { open: boolean; onClick: () => void }) => ReactNode;
  renderContent: (props: { onClose: () => void }) => ReactNode;
}

export const Dropdown = ({ renderButton, renderContent }: Props) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const handleOnOutsideClick = useCallback(() => {
    if (open) {
      setOpen(false);
    }
  }, [open]);

  useOnClickOutside(elementRef, handleOnOutsideClick);
  useEscapeKeyDown(handleOnOutsideClick);

  const handleDropdownToggle = useCallback(() => {
    setOpen((current) => !current);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <Box position="relative" ref={elementRef}>
      {renderButton({ open, onClick: handleDropdownToggle })}

      <Box
        className={cn(s.dropdown, open && s.dropdownOpened)}
        display="flex"
        flexDirection="column"
        backgroundColor="selectDropdownBg"
        borderRadius="2x"
        fontSize="medium"
        boxShadow="dropdown"
      >
        {open ? renderContent({ onClose: handleClose }) : null}
      </Box>
    </Box>
  );
};
