import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { useT } from 'src/hooks/useT';

import s from './ToProfileButton.postcss';

export const ToProfileButton: FC = () => {
    const t = useT();

    const icon = (
        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25">
            <path
                d="M1770,27.5A12.5,12.5,0,1,0,1782.5,40,12.5,12.5,0,0,0,1770,27.5Zm0,3.2a4.5,4.5,0,1,1-4.49,4.49A4.5,4.5,0,0,1,1770,30.7Zm7.65,13.6a5.65,5.65,0,0,1-.53.78,7.37,7.37,0,0,1-.9,1,8.48,8.48,0,0,1-.9.79,9,9,0,0,1-10.68,0c-.31-.26-.62-.51-.9-.79a6.77,6.77,0,0,1-.9-1,7.6,7.6,0,0,1-.53-.78.43.43,0,0,1,0-.38,5.09,5.09,0,0,1,.45-.82,5.54,5.54,0,0,1,3.87-2.43.77.77,0,0,1,.57.13,4.7,4.7,0,0,0,2.82.93,4.75,4.75,0,0,0,2.83-.93.85.85,0,0,1,.57-.13,5.56,5.56,0,0,1,3.86,2.43,3.86,3.86,0,0,1,.45.82A.34.34,0,0,1,1777.65,44.3Z"
                transform="translate(-1757.5 -27.5)"
            />
        </svg>
    );

    return (
        <Link className={s.link} to="/profile" title={t('page.header.navbar.profile')}>
            {icon}
        </Link>
    );
};
