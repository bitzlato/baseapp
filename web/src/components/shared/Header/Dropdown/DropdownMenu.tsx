import { Box } from 'web/src/components/ui/Box';
import { getThemeClassName, HeaderContext } from 'web/src/components/shared/Header/HeaderContext';
import { forwardRef, PropsWithChildren, useContext } from 'react';
import cn from 'classnames';

import * as s from './DropdownMenu.css';

interface Props {
  dropdownAlign?: 'left' | 'right' | undefined;
  dropdownSize?: 'small' | 'medium' | undefined;
  open?: boolean | undefined;
}

export const DropdownMenu = forwardRef<HTMLDivElement, PropsWithChildren<Props>>(
  ({ dropdownAlign, dropdownSize, open = false, children }, ref) => {
    const context = useContext(HeaderContext);
    const themeClassName = getThemeClassName(context);

    return (
      <Box
        ref={ref}
        className={cn(
          themeClassName,
          s.dropdown,
          open && s.dropdownOpened,
          dropdownAlign === 'right' && s.dropdownRight,
          dropdownSize === 'small' && s.dropdownSmall,
        )}
        display="flex"
        flexDirection="column"
        bg="dropdown"
        borderRadius="1.5x"
        fontSize="medium"
        boxShadow="dropdown"
      >
        {children}
      </Box>
    );
  },
);
