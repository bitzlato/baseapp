/* eslint-disable global-require */
import { FC } from 'react';
import { sprinkles, Sprinkles } from 'web/src/theme/sprinkles.css';

const ICONS: Record<string, string> = {
  // Currency icons
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
  sol: require('cryptocurrency-icons/svg/color/sol.svg'),
  trx: require('cryptocurrency-icons/svg/color/trx.svg'),
  usd: require('cryptocurrency-icons/svg/color/usd.svg'),
  usdc: require('cryptocurrency-icons/svg/color/usdc.svg'),
  usdt: require('cryptocurrency-icons/svg/color/usdt.svg'),
  // Blockchain icons
  bsc: require('cryptocurrency-icons/svg/color/bnb.svg'),
  heco: require('cryptocurrency-icons/svg/color/ht.svg'),
  polygon: require('cryptocurrency-icons/svg/color/matic.svg'),
  solana: require('cryptocurrency-icons/svg/color/sol.svg'),
  tron: require('cryptocurrency-icons/svg/color/trx.svg'),
};

interface Props {
  /**
   * Cryptocurrency code in lowercase OR blockchain name in lowercase
   */
  currency: string;
  /**
   * Size value from sprinkles (web/src/theme/sprinkles.css.ts)
   */
  size?: Sprinkles['size'] | undefined;
}

export const CryptoCurrencyIcon: FC<Props> = ({ currency, size }) => {
  const code = currency.split('-')[0]!;
  const src = ICONS[code.toLowerCase()] ?? require('cryptocurrency-icons/svg/color/generic.svg');

  return <img className={size && sprinkles({ size })} src={src} alt={code.toUpperCase()} />;
};
