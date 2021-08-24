import React, { FC } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import cn from 'classnames';

import s from './LandingLink.postcss';

type Props = LinkProps & {
    theme?: 'primary' | 'secondary';
};

export const LandingLink: FC<Props> = ({ className, theme = 'primary', children, ...rest }: Props) => (
    <Link {...rest} className={cn(s.landingLink, s[theme], className)}>
        {children}
    </Link>
);
