import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { themeSwitcher } from 'src/api/config';
import { Moon } from 'src/assets/images/Moon';
import { Sun } from 'src/assets/images/Sun';
import { changeColorTheme, selectCurrentColorTheme } from 'src/modules';

import s from './ThemeSwitcher.postcss';

export const ThemeSwitcher: FC = () => {
  const dispatch = useDispatch();
  const colorTheme = useSelector(selectCurrentColorTheme);
  if (themeSwitcher() !== 'visible') {
    return null;
  }

  const handleClick = () => dispatch(changeColorTheme(colorTheme === 'light' ? 'dark' : 'light'));

  return (
    <button className={s.switchTheme} type="button" onClick={handleClick}>
      <span className={s.sun}>
        <Sun />
      </span>
      <span className={s.moon}>
        <Moon />
      </span>
    </button>
  );
};
