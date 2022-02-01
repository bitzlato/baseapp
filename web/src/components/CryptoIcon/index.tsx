import cx from 'classnames';
import React from 'react';

export interface CryptoIconProps {
  code: string;
  className?: string;
  children?: React.ReactNode;
}

const findIcon = (code: string): string => {
  code = MAP.get(code) ?? code;
  try {
    return require(`cryptocurrency-icons/svg/color/${code}.svg`);
  } catch (err) {
    return require('cryptocurrency-icons/svg/color/generic.svg');
  }
};

export const CryptoIcon: React.FunctionComponent<CryptoIconProps> = (props) => {
  const { code, className = '', children } = props;

  const icon = findIcon(code.toLowerCase());

  return (
    <span className={cx('cr-crypto-icon', className)}>
      <img src={icon} alt={code?.toUpperCase()} /> {children}
    </span>
  );
};

const MAP = new Map<string, string>([['usdte', 'usdt']]);
