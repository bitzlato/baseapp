import React from 'react';
import cn from 'classnames';
import s from './Label.postcss';

interface Props {
  size?: '2x';
  secondaryColor?: boolean;
  warningColor?: boolean;
  successColor?: boolean;
  failedColor?: boolean;
  capitalize?: boolean;
}

export const Label: React.FC<Props> = ({
  children,
  size,
  secondaryColor,
  warningColor,
  successColor,
  failedColor,
  capitalize,
}) => {
  const className = cn(
    size === '2x' && s.text2X,
    secondaryColor && s.secondaryColor,
    warningColor && s.warningColor,
    successColor && s.successColor,
    failedColor && s.failedColor,
    capitalize && s.capitalize,
  );
  return <span className={className}>{children}</span>;
};
