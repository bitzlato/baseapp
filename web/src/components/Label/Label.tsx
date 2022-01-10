import React from 'react';
import cn from 'classnames';
import s from './Label.postcss';

interface Props extends React.HTMLAttributes<HTMLSpanElement> {
  size?: 'lg' | 'sm' | 'xl';
  color?: 'primary' | 'secondary' | 'warning' | 'success' | 'failed' | 'bid' | 'ask';
  tr?: 'capitalize' | 'uppercase';
  bold?: boolean;
  ellipsis?: boolean;
  center?: boolean;
  noWrap?: boolean;
}

export const Label: React.FC<Props> = ({
  className,
  size,
  tr,
  bold,
  ellipsis,
  center,
  noWrap,
  color,
  ...others
}) => {
  const c = cn(
    className,
    size && s[`${size}Size`],
    color && s[`${color}Color`],
    tr && s[`${tr}Transform`],
    bold && s.bold,
    ellipsis && s.ellipsis,
    center && s.center,
    noWrap && s.noWrap,
  );
  return <span className={c} {...others} />;
};
