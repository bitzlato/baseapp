import React, { FC } from 'react';
import { useT } from 'src/hooks/useT';
import { HeaderToolbar } from 'src/containers/HeaderToolbar/HeaderToolbar';
import { MarketsTable, Charts } from 'src/containers';

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
            <LandingLink to="/trading">
              {t('page.body.landing.marketInfo.title.button')}
            </LandingLink>
          </p>
          <div className={s.marketTable}>
            <MarketsTable />
          </div>
        </div>
        <div className={s.tradingStatistics}>
          <div className={s.tradingStatisticsHeader}>
            <HeaderToolbar />
          </div>
          <div className={s.tradingStatisticsChart}>
            <Charts />
          </div>
        </div>
      </LandingContainer>
    </div>
  );
};
