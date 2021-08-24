import React, { FC } from 'react';
import { MarketsTable } from 'src/containers';
import { useT } from 'src/hooks/useT';

import { LandingContainer } from '../LandingContainer';
import { LandingLink } from '../LandingLink';
import s from './WelcomeBlock.postcss';

export const WelcomeBlock: FC = () => {
    const t = useT();

    return (
        <div className={s.welcome}>
            <LandingContainer className={s.container}>
                <div className={s.marketing}>
                    <h1 className={s.marketingTitle}>{t('page.body.landing.marketInfo.title.text2')}</h1>
                    <p className={s.marketingBody}>
                        <LandingLink to="/trading">{t('page.body.landing.marketInfo.title.button')}</LandingLink>
                    </p>
                    <MarketsTable />
                </div>
                <div className={s.tradingStatistics}>
                    {/* TODO: stats */}
                    add charts
                </div>
            </LandingContainer>
        </div>
    );
};
