import React from 'react';
import cn from 'classnames';
import s from './Label.postcss';

interface Props {
  size?: '2x' | 'sm';
  primaryColor?: boolean;
  secondaryColor?: boolean;
  warningColor?: boolean;
  successColor?: boolean;
  failedColor?: boolean;
  capitalize?: boolean;
  bold?: boolean;
}

export const Label: React.FC<Props> = ({
  children,
  size,
  primaryColor,
  secondaryColor,
  warningColor,
  successColor,
  failedColor,
  capitalize,
  bold,
}) => {
  const className = cn(
    size === '2x' && s.text2X,
    size === 'sm' && s.textSm,
    primaryColor && s.primaryColor,
    secondaryColor && s.secondaryColor,
    warningColor && s.warningColor,
    successColor && s.successColor,
    failedColor && s.failedColor,
    capitalize && s.capitalize,
    bold && s.bold,
  );
  return <span className={className}>{children}</span>;
};
