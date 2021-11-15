import React from 'react';
import cn from 'classnames';
import s from './Label.postcss';

interface Props extends React.HTMLAttributes<HTMLSpanElement> {
  size?: 'lg' | 'sm';
  primaryColor?: boolean;
  secondaryColor?: boolean;
  warningColor?: boolean;
  successColor?: boolean;
  failedColor?: boolean;
  capitalize?: boolean;
  bold?: boolean;
  ellipsis?: boolean;
  center?: boolean;
  noWrap?: boolean;
}

export const Label: React.FC<Props> = ({
  className,
  size,
  primaryColor,
  secondaryColor,
  warningColor,
  successColor,
  failedColor,
  capitalize,
  bold,
  ellipsis,
  center,
  noWrap,
  ...others
}) => {
  const c = cn(
    className,
    size === 'lg' && s.textLg,
    size === 'sm' && s.textSm,
    primaryColor && s.primaryColor,
    secondaryColor && s.secondaryColor,
    warningColor && s.warningColor,
    successColor && s.successColor,
    failedColor && s.failedColor,
    capitalize && s.capitalize,
    bold && s.bold,
    ellipsis && s.ellipsis,
    center && s.center,
    noWrap && s.noWrap,
  );
  return <span className={c} {...others} />;
};
