import React from 'react';
import { Link } from 'react-router-dom';
import { Box } from 'src/components/Box/Box';
import { MoneyFormat } from 'src/components/MoneyFormat/MoneyFormat';
import { createMoney } from 'src/helpers/money';
import { useT } from 'src/hooks/useT';
import { Market } from 'src/modules/public/markets/types';
import { Wallet } from 'src/modules/user/wallets/types';
import s from './QuickExchange.postcss';

interface AmountDescriptionProps {
  market: Market;
  fromWallet: Wallet;
  requestPrice: string;
  fromAmount: string;
}

export const AmountDescription: React.FC<AmountDescriptionProps> = ({
  market,
  fromWallet,
  requestPrice,
  fromAmount,
}) => {
  const t = useT();

  const fromCurrency = fromWallet.currency.code.toLowerCase();
  const inverse = market.quote_unit === fromCurrency;

  let minAmount = createMoney(market.min_amount, fromWallet.currency);
  if (inverse) {
    minAmount = minAmount.divide(requestPrice);
  }
  const maxAmount = createMoney(fromWallet.balance.toString(), fromWallet.currency);
  const amount = createMoney(fromAmount, fromWallet.currency);

  if ((maxAmount.isZero() && fromAmount) || amount.greaterThan(maxAmount)) {
    return (
      <Box as="span" textColor="failed">
        <Box as="span">{t('page.body.quick.exchange.insufficient_balance')}</Box>
        &nbsp;
        <Box as={Link} to={`/wallets/${fromCurrency}/deposit`} className={s.link}>
          {t('page.body.quick.exchange.top_up_balance')}
        </Box>
      </Box>
    );
  }

  if (!amount.isZero() && amount.lessThan(minAmount)) {
    return (
      <Box as="span" textColor="failed">
        {t('page.body.quick.exchange.less_than_min_amount', {
          value: <MoneyFormat money={minAmount} />,
        })}
      </Box>
    );
  }

  return null;
};
