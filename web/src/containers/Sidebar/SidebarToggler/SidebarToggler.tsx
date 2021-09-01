import React, { FC } from 'react';

import s from './SidebarToggler.postcss';

type Props = {
    onClick: () => void;
};

export const SidebarToggler: FC<Props> = ({ onClick }: Props) => (
    <button className={s.toggler} type="button" onClick={onClick}>
        <span className={s.togglerItem} />
        <span className={s.togglerItem} />
        <span className={s.togglerItem} />
    </button>
);
