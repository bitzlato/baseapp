import React, { FC } from 'react';

import s from './LandingScreen.postcss';
import { WelcomeBlock } from './WelcomeBlock';
import { ProjectInfoBlock } from './ProjectInfoBlock';
import { JoinBlock } from './JoinBlock';
import { FeaturesBlock } from './FeaturesBlock';

export const LandingScreen: FC = () => {
    return (
        <div className={s.landing}>
            <WelcomeBlock />
            <ProjectInfoBlock />
            <JoinBlock />
            <FeaturesBlock />
        </div>
    );
};
