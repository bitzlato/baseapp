import { FC } from 'react';
import { useT } from 'src/hooks/useT';
import cn from 'classnames';

import s from './FeaturesBlock.postcss';
import { LandingContainer } from '../LandingContainer';
import { LandingLink } from '../LandingLink';

export const FeaturesBlock: FC = () => {
  const t = useT();

  return (
    <div className={s.featuresBlock}>
      <LandingContainer>
        <h2 className={s.title}>{t('page.body.landing.features.title')}</h2>
        <div className={s.features}>
          <div className={s.feature}>
            <div className={s.featureHeader}>
              <span className={cn(s.featureIcon, s.featureIconExchange)} />
              <h3 className={s.featureTitle}>
                {t('page.body.landing.features.features.item1.title')}
              </h3>
            </div>
            <div className={s.featureBody}>
              {t('page.body.landing.features.features.item1.text')}
            </div>
          </div>
          <div className={s.feature}>
            <div className={s.featureHeader}>
              <span className={cn(s.featureIcon, s.featureIconInterface)} />
              <h3 className={s.featureTitle}>
                {t('page.body.landing.features.features.item3.title')}
              </h3>
            </div>
            <div className={s.featureBody}>
              {t('page.body.landing.features.features.item3.text')}
            </div>
          </div>
          <div className={s.feature}>
            <div className={s.featureHeader}>
              <span className={cn(s.featureIcon, s.featureIconOrder)} />
              <h3 className={s.featureTitle}>
                {t('page.body.landing.features.features.item2.title')}
              </h3>
            </div>
            <div className={s.featureBody}>
              {t('page.body.landing.features.features.item2.text')}
            </div>
          </div>
          <div className={s.feature}>
            <div className={s.featureHeader}>
              <span className={cn(s.featureIcon, s.featureIconSecurity)} />
              <h3 className={s.featureTitle}>
                {t('page.body.landing.features.features.item4.title')}
              </h3>
            </div>
            <div className={s.featureBody}>
              {t('page.body.landing.features.features.item4.text')}
            </div>
          </div>
          <div className={s.feature}>
            <div className={s.featureHeader}>
              <span className={cn(s.featureIcon, s.featureIconCommunity)} />
              <h3 className={s.featureTitle}>
                {t('page.body.landing.features.features.item5.title')}
              </h3>
            </div>
            <div className={s.featureBody}>
              {t('page.body.landing.features.features.item5.text')}
            </div>
          </div>
          <div className={s.feature}>
            <div className={s.featureHeader}>
              <span className={cn(s.featureIcon, s.featureIconApi)} />
              <h3 className={s.featureTitle}>
                {t('page.body.landing.features.features.item6.title')}
              </h3>
            </div>
            <div className={s.featureBody}>
              {t('page.body.landing.features.features.item6.text')}
            </div>
          </div>
        </div>
        <div className={s.joinButton}>
          <LandingLink to="/tranding">{t('page.body.landing.marketInfo.title.button')}</LandingLink>
        </div>
      </LandingContainer>
    </div>
  );
};
