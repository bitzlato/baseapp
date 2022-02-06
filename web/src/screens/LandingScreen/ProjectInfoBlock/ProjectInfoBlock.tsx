import { FC } from 'react';
import { useT } from 'src/hooks/useT';

import s from './ProjectInfoBlock.postcss';

export const ProjectInfoBlock: FC = () => {
  const t = useT();

  return (
    <div className={s.projectInfo}>
      <div className={s.item}>
        <span className={s.itemValue}>{t('page.body.landing.platformInfo.item.first.value')}</span>
        <span className={s.itemTitle}>{t('page.body.landing.platformInfo.item.first.title')}</span>
      </div>
      <div className={s.item}>
        <span className={s.itemValue}>{t('page.body.landing.platformInfo.item.second.value')}</span>
        <span className={s.itemTitle}>{t('page.body.landing.platformInfo.item.second.title')}</span>
      </div>
      <div className={s.item}>
        <span className={s.itemValue}>{t('page.body.landing.platformInfo.item.third.value')}</span>
        <span className={s.itemTitle}>{t('page.body.landing.platformInfo.item.third.title')}</span>
      </div>
    </div>
  );
};
