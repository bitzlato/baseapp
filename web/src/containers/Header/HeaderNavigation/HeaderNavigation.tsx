import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useT } from 'src/hooks/useT';
import { showInternalTransfer } from 'src/api';
import { selectCurrentLanguage, selectUserLoggedIn, RootState } from 'src/modules';

import s from './HeaderNavigation.postcss';
import { getLinkToP2P } from './getLinkToP2P';

const selector = (state: RootState) => ({
    isLoggedIn: selectUserLoggedIn(state),
    languageCode: selectCurrentLanguage(state),
});

export const HeaderNavigation: FC = () => {
    const t = useT();
    const { isLoggedIn, languageCode } = useSelector(selector);

    return (
        <div className={s.navigation}>
            {!isLoggedIn && (
                <>
                    <Link className={s.item} to="/signin">
                        {t('page.header.navbar.signIn')}
                    </Link>
                    <Link className={s.item} to="/signup">
                        {t('page.header.signUp')}
                    </Link>
                </>
            )}

            <Link className={s.item} to="/trading">
                {t('page.header.navbar.trade')}
            </Link>

            {isLoggedIn && (
                <>
                    <Link className={s.item} to="/wallets">
                        {t('page.header.navbar.wallets')}
                    </Link>
                    <Link className={s.item} to="/orders">
                        {t('page.header.navbar.openOrders')}
                    </Link>
                    <Link className={s.item} to="/history">
                        {t('page.header.navbar.history')}
                    </Link>
                    {showInternalTransfer() && (
                        <Link className={s.item} to="/internal-transfer">
                            {t('page.header.navbar.internal.transfer')}
                        </Link>
                    )}
                </>
            )}

            <a className={s.item} href={getLinkToP2P(languageCode)} target="_blank" rel="noopener noreferrer">
                {t('page.header.navbar.toP2P')}
            </a>
        </div>
    );
};
