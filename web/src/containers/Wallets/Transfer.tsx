import { useEffect, useState } from 'react';
import { Button as BootstrapButton } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
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
import { alertPush } from 'src/modules/public/alert/actions';
import { selectMobileDeviceState } from 'src/modules/public/globalSettings/selectors';
import { SummaryField } from 'src/components/SummaryField';
import { MoneyFormat } from 'src/components/MoneyFormat/MoneyFormat';
import s from './Transfer.postcss';
import sQuickExchange from 'src/containers/QuickExchange/QuickExchange.postcss';

interface Props {
  currency: Currency;
  balanceMarket: string;
  balanceP2P: string;
  transfers?: number;
  onChangeTransfers?: () => void;
}

export const Transfer: React.FC<Props> = ({
  currency,
  balanceMarket,
  balanceP2P,
  transfers,
  onChangeTransfers,
}) => {
  const [from, setFrom] = useState<TransferPlace | undefined>();
  const [to, setTo] = useState<TransferPlace | undefined>();
  const [amount, setAmount] = useState('');
  const [error, setError] = useState<FetchError | undefined>();

  const t = useT();
  const isMobileDevice = useSelector(selectMobileDeviceState);
  const dispatch = useDispatch();

  useAlert(error);

  useEffect(() => {
    setFrom(undefined);
    setTo(undefined);
    setAmount('');
  }, [currency.code]);

  const handleSetFrom = (value: TransferPlace) => {
    setFrom(value);
    setTo(value === 'market' ? DROPS[0] : DROPS[1]);
  };

  const handleSetTo = (value: TransferPlace) => {
    setTo(value);
    setFrom(value === 'market' ? DROPS[0] : DROPS[1]);
  };

  const handleChangeAmount = (value: string) => {
    setAmount(parseNumeric(value));
  };

  const handlerRearrange = () => {
    setFrom(to);
    setTo(from);
  };

  const handleUsePercent = (value: number) => {
    handleChangeAmount(available.multiply(value).divide(100).toFormat());
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
        await postData(`${accountUrl()}/transfers`, data, { credentials: 'include' });

        setFrom(undefined);
        setTo(undefined);
        setAmount('');

        setError(undefined);

        onChangeTransfers?.();

        dispatch(alertPush({ message: ['Transfer was successfully created'], type: 'success' }));
      } catch (e) {
        setError(e as FetchError);
      }
    }
  };

  const renderDropItem = (d: TransferPlace) => {
    return t(d);
  };

  const available =
    from === 'market'
      ? createMoney(balanceMarket, currency)
      : from === 'p2p'
      ? createMoney(balanceP2P, currency)
      : createMoney(0, currency);
  const m = createMoney(amount, currency);
  const disable = m.isZero() || m.greaterThan(available);

  return (
    <>
      <Box col spacing="3">
        <Box grow row spacing>
          <Box
            flex1
            as={SelectString}
            options={DROPS}
            value={from as any}
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
            value={to as any}
            onChange={handleSetTo as any}
            placeholder={t('Transfer to')}
            placeholderAsLabel
            itemRenderer={renderDropItem as any}
          />
        </Box>
        <Box col spacing>
          <MoneyInput
            currency={currency.code}
            label={t('Amount')}
            value={amount}
            onChange={handleChangeAmount}
          />
          <Box row spacing justify="between" wrap>
            <Box row spacing textColor="secondary">
              <span>{t('page.body.quick.exchange.sublabel.balance')}:</span>
              <MoneyFormat money={available} />
            </Box>
            <Box self="end" row spacing>
              {PERCENTS.map((v) => (
                <BootstrapButton
                  key={v}
                  variant="secondary"
                  className={sQuickExchange.quickExchangeAll}
                  onClick={() => handleUsePercent(v)}
                >
                  {v}%
                </BootstrapButton>
              ))}
            </Box>
          </Box>
        </Box>
        <Box grow row={!isMobileDevice} col={isMobileDevice} spacing="2">
          <SummaryField message={t('Transfer Fee')}>
            <span>{t('Free')}</span>
          </SummaryField>
          <Box flex1 self="end" row justify="end">
            <Button variant="primary" onClick={handleTransfer} disabled={disable}>
              {t('Transfer.verb')}
            </Button>
          </Box>
        </Box>
      </Box>
      <TransferHistory currency={currency} transfers={transfers} />
    </>
  );
};

const DROPS: TransferPlace[] = ['p2p', 'market'];
const PERCENTS = [25, 50, 75, 100];
