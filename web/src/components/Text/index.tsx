import React from 'react';
import cn from 'classnames';
import s from './Text.postcss';

interface Props {
  size?: '2x';
  secondaryColor?: boolean;
  warningColor?: boolean;
}

export const Text: React.FC<Props> = ({ size, secondaryColor, warningColor, children }) => {
  const className = cn(
    size === '2x' && s.text2X,
    secondaryColor && s.secondaryColor,
    warningColor && s.warningColor,
  );
  return <span className={className}>{children}</span>;
};
