import { Box } from 'shared/src/components/Box';
import { getThemeClassName, HeaderContext } from 'shared/src/components/Header/HeaderContext';
import { forwardRef, PropsWithChildren, useContext } from 'react';
import cn from 'classnames';

import * as s from './DropdownMenu.css';

interface Props {
  dropdownAlign?: 'left' | 'right' | undefined;
  dropdownSize?: 'small' | 'medium' | undefined;
  open?: boolean | undefined;
  mobile?: boolean | undefined;
}

export const DropdownMenu = forwardRef<HTMLDivElement, PropsWithChildren<Props>>(
  ({ dropdownAlign, dropdownSize, open = false, mobile = false, children }, ref) => {
    const context = useContext(HeaderContext);
    const themeClassName = getThemeClassName(context);

    return (
      <Box
        ref={ref}
        className={cn(
          themeClassName,
          s.dropdown,
          open && s.dropdownOpened,
          mobile && s.dropdownMobile,
          dropdownAlign === 'right' && s.dropdownRight,
          dropdownSize === 'small' && s.dropdownSmall,
        )}
        display={!mobile ? ['none', 'flex'] : ['flex', 'none']}
        flexDirection="column"
        bg="dropdown"
        borderRadius="2x"
        borderWidth="1x"
        borderStyle="solid"
        borderColor="dropdownBorder"
        fontSize="medium"
        boxShadow="dropdown"
      >
        {children}
      </Box>
    );
  },
);
