import { FC } from 'react';
import cn from 'classnames';
import { CryptoIcon } from 'src/components/CryptoIcon';
import { BlockchainIcon } from 'src/components/BlockchainIcon/BlockchainIcon';
import { capitalize } from 'src/helpers/capitalize';

import s from './CryptoCurrencyIcon.postcss';

interface Props {
  icon?: string | null | undefined;
  currency: string;
  iconId?: string | undefined;
  size?: 'small' | 'medium' | 'large' | undefined;
}

export const CryptoCurrencyIcon: FC<Props> = ({ currency, icon, iconId, size }) => {
  const className = cn(size && s[`icon${capitalize(size)}`]);

  if (icon) {
    return (
      <img
        alt={currency}
        className={cn('cr-wallet-item__single__image-icon', className)}
        src={icon}
      />
    );
  }

  const [cryptoCurrency, protocol] = currency.split('-');

  return (
    <span className={cn(s.icon, className)}>
      <CryptoIcon code={iconId ?? cryptoCurrency!} />
      {protocol && (
        <span className={s.blockchainIcon}>
          <BlockchainIcon protocol={protocol} />
        </span>
      )}
    </span>
  );
};
