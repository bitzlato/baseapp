import { useContext } from 'react';
import { Theme } from 'web/src/types';
import { Box } from 'web/src/components/ui/Box';
import { Switch } from 'web/src/components/form/Switch';
import BedtimeIcon from 'web/src/assets/svg/BedtimeIcon.svg';

import * as s from 'web/src/components/shared/Header/Dropdown/DropdownItem.css';
import { HeaderContext } from './HeaderContext';

export interface ThemeSwitcherContext {
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
}

const SWITCH_ID = 'theme-switch';

export const ThemeSwitcher = () => {
  const { t, theme, onThemeChange } = useContext(HeaderContext);
  const handleThemeChange = () => {
    onThemeChange(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Box
      as="label"
      display="flex"
      alignItems="center"
      width="full"
      height="full"
      color={{
        default: 'dropdownItemText',
        hover: 'dropdownItemHoverText',
      }}
      htmlFor={SWITCH_ID}
      cursor="pointer"
    >
      <Box className={s.icon}>
        <BedtimeIcon />
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" width="full">
        <span>{t('darkTheme')}</span>
        <Switch id={SWITCH_ID} checked={theme === 'dark'} onChange={handleThemeChange} />
      </Box>
    </Box>
  );
};
