import { FC } from 'react';
import { useT } from 'src/hooks/useT';
import { Charts, MarketsTable } from 'src/containers';
import { useFeatureEnabled } from 'web/src/hooks/useFeatureEnabled';
import { HeaderToolbar } from 'web/src/containers/HeaderToolbar/HeaderToolbar';
import { LandingContainer } from '../LandingContainer';
import { LandingLink } from '../LandingLink';
import { TradingStatisticsP2P } from './TradingStatisticsP2P';

import s from './WelcomeBlock.postcss';

export const WelcomeBlock: FC = () => {
  const t = useT();

  const p2pTradingViewEnabled = useFeatureEnabled('p2p_trading_view');

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
        {p2pTradingViewEnabled ? (
          <TradingStatisticsP2P />
        ) : (
          <div className={s.tradingStatistics}>
            <div className={s.tradingStatisticsHeader}>
              <HeaderToolbar />
            </div>
            <div className={s.tradingStatisticsChart}>
              <Charts />
            </div>
          </div>
        )}
      </LandingContainer>
    </div>
  );
};
