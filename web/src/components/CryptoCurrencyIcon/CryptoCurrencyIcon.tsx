/* eslint-disable global-require */
import { FC } from 'react';
import cn from 'classnames';
import { capitalize } from 'src/helpers/capitalize';

import s from './CryptoCurrencyIcon.postcss';

const MAP: Record<string, string> = {
  avax: require('cryptocurrency-icons/svg/color/avax.svg'),
  bch: require('cryptocurrency-icons/svg/color/bch.svg'),
  bnb: require('cryptocurrency-icons/svg/color/bnb.svg'),
  btc: require('cryptocurrency-icons/svg/color/btc.svg'),
  dai: require('cryptocurrency-icons/svg/color/dai.svg'),
  dash: require('cryptocurrency-icons/svg/color/dash.svg'),
  doge: require('cryptocurrency-icons/svg/color/doge.svg'),
  eth: require('cryptocurrency-icons/svg/color/eth.svg'),
  ht: require('cryptocurrency-icons/svg/color/ht.svg'),
  ltc: require('cryptocurrency-icons/svg/color/ltc.svg'),
  matic: require('cryptocurrency-icons/svg/color/matic.svg'),
  mcr: require('cryptocurrency-icons/svg/color/mcr.svg'),
  mdt: require('cryptocurrency-icons/svg/color/mdt.svg'),
  usdc: require('cryptocurrency-icons/svg/color/usdc.svg'),
  usdt: require('cryptocurrency-icons/svg/color/usdt.svg'),
};

interface Props {
  currency: string;
  size?: 'small' | 'medium' | 'large' | undefined;
}

export const CryptoCurrencyIcon: FC<Props> = ({ currency, size }) => {
  const code = currency.split('-')[0]!;
  const className = cn(s.icon, size && s[`icon${capitalize(size)}`]);
  const src = MAP[code.toLowerCase()] ?? require('cryptocurrency-icons/svg/color/generic.svg');

  return (
    <span className={className}>
      <img src={src} alt={code.toUpperCase()} />
    </span>
  );
};
