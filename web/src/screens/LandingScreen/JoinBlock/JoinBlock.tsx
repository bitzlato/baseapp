import { FC } from 'react';
import { useT } from 'src/hooks/useT';

import s from './JoinBlock.postcss';
import { LandingLink } from '../LandingLink';
import { LandingContainer } from '../LandingContainer';

export const JoinBlock: FC = () => {
  const t = useT();

  return (
    <div className={s.join}>
      <LandingContainer className={s.container}>
        <div className={s.body}>
          <h2 className={s.title}>{t('page.body.landing.register.item.title')}</h2>
          <p className={s.text}>{t('page.body.landing.register.item.text')}</p>
          <LandingLink to="/trading">{t('page.body.landing.marketInfo.title.button')}</LandingLink>
        </div>
        <div className={s.image} />
      </LandingContainer>
    </div>
  );
};
