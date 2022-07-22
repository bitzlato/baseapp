import { Currency } from '@bitzlato/money-js';
import { FC } from 'react';
import { CurrencyTicker } from 'web/src/components/CurrencyTicker/CurrencyTicker';
import * as s from './CurrencyBadge.css';

interface Props {
  currency: Currency;
  size?: 'small' | 'large' | undefined;
}

export const CurrencyBadge: FC<Props> = ({ currency: { code }, size = 'small' }) => (
  <CurrencyTicker className={s.badge[size]} symbol={code} />
);
