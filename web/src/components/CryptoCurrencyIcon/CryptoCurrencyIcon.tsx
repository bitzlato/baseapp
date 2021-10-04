import React, { FC } from 'react';
import { CryptoIcon } from 'src/components/CryptoIcon';
import { BlockchainIcon } from 'src/components/BlockchainIcon/BlockchainIcon';

import s from './CryptoCurrencyIcon.postcss';

interface Props {
  currency: string;
  iconId?: string;
}

export const CryptoCurrencyIcon: FC<Props> = ({ currency, iconId }: Props) => {
  const [cryptoCurrency, protocol] = currency.split('-');
  const icon = iconId ?? cryptoCurrency;

  return (
    <span className={s.icon}>
      <CryptoIcon code={icon} />
      {protocol && (
        <span className={s.blockchainIcon}>
          <BlockchainIcon protocol={protocol} />
        </span>
      )}
    </span>
  );
};
