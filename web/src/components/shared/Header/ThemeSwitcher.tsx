import { FC, useContext } from 'react';
import Moon from 'web/src/assets/svg/Moon.svg';
import Sun from 'web/src/assets/svg/Sun.svg';
import { Theme } from 'web/src/types';
import { Box } from 'web/src/components/ui/Box';

import * as s from './ThemeSwitcher.css';
import { HeaderContext } from './HeaderContext';

export interface ThemeSwitcherContext {
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
}

interface Props {
  itemInMenu?: boolean | undefined;
}

export const ThemeSwitcher: FC<Props> = ({ itemInMenu = false }) => {
  const { t, theme, onThemeChange } = useContext(HeaderContext);
  const handleThemeChange = () => {
    onThemeChange(theme === 'light' ? 'dark' : 'light');
  };

  const switcherProps = !itemInMenu
    ? {
        as: 'button' as const,
        type: 'button',
        onClick: handleThemeChange,
      }
    : { as: 'span' as const };
  const switcher = (
    <Box
      {...switcherProps}
      className={s.themeSwitcher}
      bg="primary"
      display="flex"
      alignItems="center"
      borderWidth="1x"
      borderStyle="solid"
      borderColor={{ default: 'themeSwitcherBorder', hover: 'themeSwitcherBorderHover' }}
      justifyContent="space-around"
      borderRadius="1x"
      w="20x"
      h="9x"
      alignSelf="center"
    >
      <Box as="span" className={s.sun}>
        <Sun />
      </Box>
      <Box as="span" className={s.moon}>
        <Moon />
      </Box>
    </Box>
  );

  if (!itemInMenu) {
    return switcher;
  }

  return (
    <Box as="button" className={s.item} type="button" onClick={handleThemeChange}>
      <span>{t('theme')}:</span>
      {switcher}
    </Box>
  );
};
