import React from 'react';
import cn from 'classnames';
import s from './IconButton.postcss';

export function IconButton(props: JSX.IntrinsicElements['button']) {
    return <button className={cn('cr-percentage-button', s.iconButton)} type="button" {...props} />;
}
