import { FC } from 'react';
import { useSelector } from 'react-redux';
import { useT } from 'src/hooks/useT';
import { showInternalTransfer } from 'src/api';
import { selectCurrentLanguage, selectUserLoggedIn, RootState } from 'src/modules';

import s from './HeaderNavigation.postcss';
import { getLinkToP2P } from './getLinkToP2P';
import { HeaderNavigationItem } from './HeaderNavigationItem';

const selector = (state: RootState) => ({
  isLoggedIn: selectUserLoggedIn(state),
  languageCode: selectCurrentLanguage(state),
});

export const HeaderNavigation: FC = () => {
  const t = useT();
  const { isLoggedIn, languageCode } = useSelector(selector);

  return (
    <div className={s.navigation}>
      <HeaderNavigationItem to="/quick-exchange">
        {t('page.header.navbar.quick-exchange')}
      </HeaderNavigationItem>

      <HeaderNavigationItem to="/trading">{t('page.header.navbar.trade')}</HeaderNavigationItem>

      {isLoggedIn && (
        <>
          <HeaderNavigationItem to="/wallets">
            {t('page.header.navbar.wallets')}
          </HeaderNavigationItem>
          <HeaderNavigationItem to="/orders">
            {t('page.header.navbar.openOrders')}
          </HeaderNavigationItem>
          <HeaderNavigationItem to="/history">
            {t('page.header.navbar.history')}
          </HeaderNavigationItem>
          {showInternalTransfer() && (
            <HeaderNavigationItem to="/internal-transfer">
              {t('page.header.navbar.internal.transfer')}
            </HeaderNavigationItem>
          )}
        </>
      )}

      <HeaderNavigationItem to={getLinkToP2P(languageCode)} external>
        {t('page.header.navbar.toP2P')}
      </HeaderNavigationItem>
    </div>
  );
};
