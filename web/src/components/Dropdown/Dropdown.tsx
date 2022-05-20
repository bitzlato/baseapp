import { ReactNode, useCallback, useRef, useState } from 'react';
import cn from 'classnames';
import { Box } from 'web/src/components/ui/Box';
import { useOnClickOutside } from 'web/src/hooks/useOnClickOutside';
import { useEscapeKeyDown } from 'web/src/hooks/useEscapeKeyDown';
import { DropdownChevron } from './DropdownChevron';
import * as s from './Dropdown.css';

interface Props {
  renderButton?: (props: { open: boolean; onClick: () => void }) => ReactNode;
  renderContent: () => ReactNode;
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

  return (
    <Box position="relative" ref={elementRef}>
      {renderButton ? (
        renderButton({ open, onClick: handleDropdownToggle })
      ) : (
        <Box as="button" onClick={handleDropdownToggle}>
          <DropdownChevron open={open} />
        </Box>
      )}

      <Box
        className={cn(s.dropdown, open && s.dropdownOpened)}
        display="flex"
        flexDirection="column"
        backgroundColor="selectDropdownBg"
        borderRadius="2x"
        fontSize="medium"
        boxShadow="dropdown"
      >
        {renderContent()}
      </Box>
    </Box>
  );
};
