import { FC, useContext } from 'react';
import Moon from 'shared/src/assets/svg/Moon.svg';
import Sun from 'shared/src/assets/svg/Sun.svg';
import { Theme } from 'shared/src/types';
import { Box } from 'shared/src/components/Box';

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

  const switcher = (
    <Box
      as={!itemInMenu ? 'button' : 'span'}
      className={s.themeSwitcher}
      type={!itemInMenu ? 'button' : undefined}
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
      onClick={!itemInMenu ? handleThemeChange : undefined}
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
