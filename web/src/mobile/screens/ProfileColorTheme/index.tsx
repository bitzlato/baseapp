import classnames from 'classnames';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BackButtonMobile } from 'web/src/components/shared/Header/BackButtonMobile';
import { useT } from 'web/src/hooks/useT';
import { changeColorTheme, selectCurrentColorTheme, Theme } from '../../../modules';
import { CheckIcon } from '../../assets/images/CheckIcon';

const COLOR_THEMES: Theme[] = ['dark', 'light'];

const ProfileThemeMobileScreenComponent: React.FC = () => {
  const t = useT();
  const dispatch = useDispatch();
  const currentColorTheme = useSelector(selectCurrentColorTheme);

  const handleChangeColorTheme = (colorTheme: string) => {
    if (colorTheme !== currentColorTheme) {
      dispatch(changeColorTheme(colorTheme));
    }
  };

  const renderThemeListItem = (colorTheme: Theme, index: number) => {
    const listItemClassName = classnames('pg-mobile-profile-theme-screen__list__item', {
      'pg-mobile-profile-theme-screen__list__item--active': colorTheme === currentColorTheme,
    });

    return (
      <div
        key={index}
        className={listItemClassName}
        onClick={() => handleChangeColorTheme(colorTheme)}
      >
        <span>{t(`page.mobile.profileColorTheme.theme.${colorTheme}`)}</span>
        <CheckIcon />
      </div>
    );
  };

  return (
    <>
      <BackButtonMobile to="/profile">{t('page.body.profile.header.account')}</BackButtonMobile>
      <div className="pg-mobile-profile-theme-screen">
        <div className="pg-mobile-profile-theme-screen__list">
          {COLOR_THEMES.map(renderThemeListItem)}
        </div>
      </div>
    </>
  );
};

export const ProfileThemeMobileScreen = React.memo(ProfileThemeMobileScreenComponent);
