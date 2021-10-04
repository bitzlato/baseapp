import React, { FC } from 'react';
import { logoutFetch } from 'src/modules';
import { useDispatch } from 'react-redux';
import { useT } from 'src/hooks/useT';
import { LogoutIcon } from 'src/assets/icons/LogoutIcon';

import s from './LogoutButton.postcss';

export const LogoutButton: FC = () => {
  const dispatch = useDispatch();
  const t = useT();

  const handleClick = () => dispatch(logoutFetch());

  return (
    <button
      className={s.button}
      type="button"
      onClick={handleClick}
      title={t('page.body.profile.content.action.logout')}
    >
      <LogoutIcon />
    </button>
  );
};
