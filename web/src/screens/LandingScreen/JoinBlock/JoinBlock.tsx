import React, { FC } from 'react';
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
                    <h2 className={s.title}>
                        {/* TODO: add translate t('page.body.landing.register.item.title') */}
                        Независимо от вашего уровня опыта
                    </h2>
                    <p className={s.text}>
                        {/* TODO: add translate t('page.body.landing.register.item.text') */}
                        Предлагаем интуитивно понятный интерфейс с книгами заказов в реальном времени, инструментами
                        построения графиков, историей торговли и простым процессом заказа, поэтому вы можете торговать с
                        первого дня
                    </p>
                    <LandingLink to="/trading">{t('page.body.landing.marketInfo.title.button')}</LandingLink>
                </div>
                <div className={s.image} />
            </LandingContainer>
        </div>
    );
};
