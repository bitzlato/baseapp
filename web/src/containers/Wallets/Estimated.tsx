import React from 'react';
import { Currency } from '@bitzlato/money-js';
import { useT } from 'src/hooks/useT';
import { Box } from 'src/components/Box/Box';
import { AmountFormat } from 'src/components/AmountFormat/AmountFormat';
import { CurrencyTicker } from 'src/components/CurrencyTicker/CurrencyTicker';
import { TotalBalance, TotalBalances } from 'src/modules/account/types';
import { BTC_CCY, createMoney, USD_CCY } from 'src/helpers/money';
import { accountUrl } from 'src/api/config';
import { useSelector } from 'react-redux';
import { selectMobileDeviceState } from 'src/modules/public/globalSettings/selectors';
import s from './Estimated.postcss';
import { useFetch } from 'web/src/hooks/data/useFetch';
import { fetchWithCreds } from 'web/src/helpers/fetch';

export const Estimated: React.FC = () => {
  const t = useT();
  const isMobileDevice = useSelector(selectMobileDeviceState);

  const shouldFetch = process.env.REACT_APP_RELEASE_STAGE !== 'sandbox';

  const { data = DEFAULT_TOTAL } = useFetch<TotalBalances>(
    shouldFetch ? `${accountUrl()}/balances/total` : null,
    fetchWithCreds,
  );

  const m1 = getBalance(data.total, USD_CCY);
  const m2 = getBalance(data.total, BTC_CCY);

  const values = (
    <>
      <Box row spacing>
        <AmountFormat money={m1}>{(d) => <Box textColor="primary">{d}</Box>}</AmountFormat>
        <div className={s.estimatedCurrency}>
          <CurrencyTicker symbol={m1.currency.code} />
        </div>
      </Box>
      <Box row spacing>
        <AmountFormat money={m2}>{(d) => <Box textColor="primary">{d}</Box>}</AmountFormat>
        <div className={s.estimatedCurrency}>
          <CurrencyTicker symbol={m2.currency.code} />
        </div>
      </Box>
    </>
  );

  return isMobileDevice ? (
    <Box col spacing align="stretch">
      <Box self="center">{t('Estimated value')}</Box>
      <Box row spacing justify="around" textSize="xl">
        {values}
      </Box>
    </Box>
  ) : (
    <Box row spacing="5" textSize="xl">
      <span>{t('Estimated value')}</span>
      {values}
    </Box>
  );
};

const DEFAULT_TOTAL: TotalBalances = {
  total: [],
  p2p: [],
  spot: [],
};

function getBalance(total: TotalBalance[], ccy: Currency) {
  return createMoney(total.find((d) => d.currency_id === ccy.code)?.balance ?? 0, ccy);
}
