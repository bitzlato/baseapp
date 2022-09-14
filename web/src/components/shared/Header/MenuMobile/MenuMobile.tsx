import { createContext, FC, useContext, useMemo, useState } from 'react';
import cn from 'classnames';
import { FocusOn } from 'react-focus-on';
import { RenderButtonFn } from 'web/src/components/shared/Header/Dropdown/Dropdown';
import { Box } from 'web/src/components/ui/Box';
import { Portal } from 'web/src/components/ui/Portal';
import { getThemeClassName, HeaderContext } from 'web/src/components/shared/Header/HeaderContext';
import { useTransition } from 'transition-hook';
import * as s from './MenuMobile.css';

interface Props {
  renderButton: RenderButtonFn;
}

export const MenuMobileContext = createContext({
  onClose: () => {},
});

export const MenuMobile: FC<Props> = ({ children, renderButton }) => {
  const context = useContext(HeaderContext);
  const themeClassName = getThemeClassName(context);
  const [open, setOpen] = useState(false);
  const { stage, shouldMount } = useTransition(open, s.MENU_TRANSITION_DURATION);

  const handleButtonClick = () => {
    setOpen((prev) => !prev);
  };

  const contextValue = useMemo(
    () => ({
      onClose: () => {
        setOpen(false);
      },
    }),
    [],
  );

  return (
    <MenuMobileContext.Provider value={contextValue}>
      <Box className={s.main}>
        {renderButton({ open, onClick: handleButtonClick })}
        {shouldMount && (
          <Portal>
            <FocusOn>
              <Box className={cn(themeClassName, s.menu[stage === 'enter' ? 'opened' : 'closed'])}>
                {children}
              </Box>
            </FocusOn>
          </Portal>
        )}
      </Box>
    </MenuMobileContext.Provider>
  );
};
