import React, { FC } from 'react';
import cn from 'classnames';
import { CryptoIcon } from 'src/components/CryptoIcon';
import { BlockchainIcon } from 'src/components/BlockchainIcon/BlockchainIcon';

import s from './CryptoCurrencyIcon.postcss';

interface Props {
  icon?: string | null;
  currency: string;
  iconId?: string;
  size?: 'small' | 'medium';
}

export const CryptoCurrencyIcon: FC<Props> = ({ currency, icon, iconId, size }) => {
  const sizeClassName = cn(size === 'small' && s.iconSmall, size === 'medium' && s.iconMedium);

  if (icon) {
    return (
      <img
        alt={currency}
        className={cn('cr-wallet-item__single__image-icon', sizeClassName)}
        src={icon}
      />
    );
  }

  const [cryptoCurrency, protocol] = currency.split('-');

  return (
    <span className={cn(s.icon, sizeClassName)}>
      <CryptoIcon code={iconId ?? cryptoCurrency} />
      {protocol && (
        <span className={s.blockchainIcon}>
          <BlockchainIcon protocol={protocol} />
        </span>
      )}
    </span>
  );
};
