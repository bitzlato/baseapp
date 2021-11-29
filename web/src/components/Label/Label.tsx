import React from 'react';
import cn from 'classnames';
import s from './Label.postcss';

interface Props extends React.HTMLAttributes<HTMLSpanElement> {
  size?: 'lg' | 'sm';
  color?: 'primary' | 'secondary' | 'warning' | 'success' | 'failed' | 'bid' | 'ask';
  capitalize?: boolean;
  bold?: boolean;
  ellipsis?: boolean;
  center?: boolean;
  noWrap?: boolean;
}

export const Label: React.FC<Props> = ({
  className,
  size,
  capitalize,
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
    capitalize && s.capitalize,
    bold && s.bold,
    ellipsis && s.ellipsis,
    center && s.center,
    noWrap && s.noWrap,
  );
  return <span className={c} {...others} />;
};
