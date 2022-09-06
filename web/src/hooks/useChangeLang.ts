import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Language } from 'web/src/types';
import { changeLanguage } from 'web/src/modules/public/i18n/actions';
import { useUpdateProfile } from 'web/src/hooks/mutations/useUpdateProfile';
import { useUser } from 'web/src/components/app/AppContext';

export const useChangeLang = () => {
  const user = useUser();
  const dispatch = useDispatch();
  const updateProfile = useUpdateProfile();

  return useCallback(
    (lang: Language) => {
      dispatch(changeLanguage(lang));
      if (user) {
        updateProfile({ lang });
      }
    },
    [dispatch, updateProfile, user],
  );
};
