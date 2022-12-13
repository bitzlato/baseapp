import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, useLocation, useParams } from 'react-router-dom';
import { changeLanguage } from 'web/src/modules';

export const RemoveLangParam: FC = () => {
  const dispatch = useDispatch();
  const { lang } = useParams<{ lang?: string }>();
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    if (lang) {
      dispatch(changeLanguage(lang));
    }
  }, [dispatch, lang]);

  return lang ? <Redirect to={`${pathname.slice(`/${lang}`.length)}${search}${hash}`} /> : null;
};
