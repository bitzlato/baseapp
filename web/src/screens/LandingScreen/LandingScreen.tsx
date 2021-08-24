import React, { FC } from 'react';

import s from './LandingScreen.postcss';
import { WelcomeBlock } from './WelcomeBlock';
import { ProjectInfoBlock } from './ProjectInfoBlock';
import { JoinBlock } from './JoinBlock';
import { FeaturesBlock } from './FeaturesBlock';
import { PoweredByOpenwareBlock } from './PoweredByOpenwareBlock';

export const LandingScreen: FC = () => {
    // TODO: add header and footer

    return (
        <div className={s.landing}>
            <WelcomeBlock />
            <ProjectInfoBlock />
            <JoinBlock />
            <FeaturesBlock />
            <PoweredByOpenwareBlock />
        </div>
    );
};
