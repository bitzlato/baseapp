import React, { FC } from 'react';
import { useT } from 'src/hooks/useT';

import s from './PoweredByOpenwareBlock.postcss';

export const PoweredByOpenwareBlock: FC = () => {
    const t = useT();

    return (
        <div className={s.poweredByOpenwareBlock}>
            {t('pagy.body.footer.powered_by')}{' '}
            <a href="https://www.openware.com/" target="_blank" rel="noopener noreferrer">
                openware.com
            </a>
        </div>
    );
};
