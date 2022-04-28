import { FC, useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router';
import { Language } from 'src/types';
import { getSearchParam } from 'web/src/helpers/url';
import { languages } from 'web/src/api/config';
import { verificationFetch } from 'web/src/modules/user/auth/actions';
import { changeLanguage } from 'web/src/modules/public/i18n/actions';
import { useLocation } from 'react-router-dom';

export const VerificationScreen: FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  useLayoutEffect(() => {
    const token = getSearchParam('confirmation_token', location.search);
    const lang = getSearchParam('lang', location.search);

    if (token) {
      dispatch(verificationFetch({ token }));
    }

    if (lang && languages.includes(lang.toLowerCase() as Language)) {
      dispatch(changeLanguage(lang.toLowerCase()));
    }
  }, [dispatch, location]);

  return <Redirect to="/trading" />;
};
