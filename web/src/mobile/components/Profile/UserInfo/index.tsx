import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'src/components/Button/Button';
import { useT } from 'src/hooks/useT';
import { logoutFetch, selectUserInfo } from '../../../../modules';

const UserInfoComponent = () => {
  const t = useT();
  const user = useSelector(selectUserInfo);
  const dispatch = useDispatch();

  const handleLogoutUser = () => {
    dispatch(logoutFetch());
  };

  return (
    <div className="pg-mobile-user-info">
      <div className="pg-mobile-user-info__details">
        <span>{user.email}</span>
        <span>{t('page.mobile.userInfo.details.uid', { uid: user.uid })}</span>
      </div>
      <Button variant="primary-outline" revertLightPrimary onClick={handleLogoutUser}>
        {t('page.mobile.userInfo.logout.button')}
      </Button>
    </div>
  );
};

export const UserInfo = React.memo(UserInfoComponent);
