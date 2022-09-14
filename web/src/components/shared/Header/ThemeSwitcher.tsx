import { FC, ReactNode, useContext } from 'react';
import { Theme } from 'web/src/types';
import { Box } from 'web/src/components/ui/Box';
import { Switch } from 'web/src/components/form/Switch';
import { HeaderContext } from './HeaderContext';

export interface ThemeSwitcherContext {
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
}

interface Props {
  icon: ReactNode;
}

const SWITCH_ID = 'theme-switch';

export const ThemeSwitcher: FC<Props> = ({ icon }) => {
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
      htmlFor={SWITCH_ID}
      cursor="pointer"
    >
      {icon}
      <Box display="flex" justifyContent="space-between" alignItems="center" width="full">
        <span>{t('darkTheme')}</span>
        <Switch id={SWITCH_ID} checked={theme === 'dark'} onChange={handleThemeChange} />
      </Box>
    </Box>
  );
};
