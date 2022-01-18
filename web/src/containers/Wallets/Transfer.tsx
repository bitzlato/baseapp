import React, { useState } from 'react';
import { Currency } from '@bitzlato/money-js';
import { parseNumeric } from 'src/helpers/parseNumeric';
import { Box } from 'src/components/Box/Box';
import { Button } from 'src/components/Button/Button';
import { SelectString } from 'src/components/Select/Select';
import { MoneyInput } from 'src/components/NumberInput/MoneyInput';
import { useT } from 'src/hooks/useT';
import { SwipeIcon } from 'src/assets/images/swipe';
import { IconButton } from 'src/components/IconButton/IconButton';
import { TransferPlace, TransferPost } from 'src/modules/account/types';
import { createMoney } from 'src/helpers/money';
import { FetchError, postData } from 'src/hooks/useFetch';
import { TransferHistory } from './TransferHistory';
import { useAlert } from 'src/hooks/useAlert';
import { accountUrl } from 'src/api/config';
import s from './Transfer.postcss';

interface Props {
  currency: Currency;
  balanceMarket: string;
  balanceP2P: string;
}

export const Transfer: React.FC<Props> = ({ currency, balanceMarket, balanceP2P }) => {
  const [from, setFrom] = useState<TransferPlace | undefined>();
  const [to, setTo] = useState<TransferPlace | undefined>();
  const [amount, setAmount] = useState('');

  const [error, setError] = useState<FetchError | undefined>();
  const [succeed, setSucceed] = useState(0);

  const t = useT();

  useAlert(error);

  const handleSetFrom = (value: TransferPlace) => {
    setFrom(value);
    setTo(value === DropId.market ? DROPS[0] : DROPS[1]);
  };

  const handleSetTo = (value: TransferPlace) => {
    setTo(value);
    setFrom(value === DropId.market ? DROPS[0] : DROPS[1]);
  };

  const handleChangeAmount = (value: string) => {
    setAmount(parseNumeric(value));
  };

  const handlerRearrange = () => {
    setFrom(to);
    setTo(from);
  };

  const handleTransfer = async () => {
    if (from && to) {
      const data: TransferPost = {
        source: from,
        destination: to,
        currency_id: currency.code,
        amount: amount,
        description: 'Transfer by market web-client',
      };
      try {
        await postData(accountUrl() + '/transfers', data, { credentials: 'include' });
        setSucceed(succeed + 1);
      } catch (e) {
        setError(e as FetchError);
      }
    }
  };

  const renderDropItem = (d: TransferPlace) => {
    return t(d);
  };

  const m = createMoney(amount, currency);
  const disable =
    m.isZero() ||
    m.greaterThan(
      from === DropId.market
        ? createMoney(balanceMarket, currency)
        : createMoney(balanceP2P, currency),
    );

  return (
    <>
      <Box col spacing="3">
        <Box grow row spacing>
          <Box
            flex1
            as={SelectString}
            options={DROPS}
            value={from}
            onChange={handleSetFrom as any}
            placeholder={t('Transfer from')}
            placeholderAsLabel
            itemRenderer={renderDropItem as any}
          />
          <IconButton
            className={s.transferRearrange}
            onClick={handlerRearrange}
            title={t('Rearrange')}
          >
            <SwipeIcon />
          </IconButton>
          <Box
            flex1
            as={SelectString}
            options={DROPS}
            value={to}
            onChange={handleSetTo as any}
            placeholder={t('Transfer to')}
            placeholderAsLabel
            itemRenderer={renderDropItem as any}
          />
        </Box>
        <Box
          flex1
          as={MoneyInput}
          currency={currency.code}
          label={t('Amount')}
          value={amount}
          onChange={handleChangeAmount}
        />
        <Box self="end" as={Button} variant="primary" onClick={handleTransfer} disabled={disable}>
          {t('Transfer.verb')}
        </Box>
      </Box>
      <TransferHistory key={succeed} currency={currency} />
    </>
  );
};

const enum DropId {
  p2p = 'p2p',
  market = 'market',
}

const DROPS: TransferPlace[] = [DropId.p2p, DropId.market];
