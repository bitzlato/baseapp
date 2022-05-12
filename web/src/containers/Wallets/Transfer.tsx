import { useEffect, useState } from 'react';
import { Button as BootstrapButton } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Currency } from '@bitzlato/money-js';
import { parseNumeric } from 'src/helpers/parseNumeric';
import { Box } from 'src/components/Box/Box';
import { Button } from 'src/components/Button/Button';
import { SelectString } from 'src/components/Select/Select';
import { MoneyInput } from 'src/components/Input/MoneyInput';
import { useT } from 'src/hooks/useT';
import { SwipeIcon } from 'src/assets/images/swipe';
import { IconButton } from 'src/components/IconButton/IconButton';
import { WalletType, TransferPost } from 'src/modules/account/types';
import { createMoney } from 'src/helpers/money';
import { accountUrl } from 'src/api/config';
import { alertPush } from 'src/modules/public/alert/actions';
import { selectMobileDeviceState } from 'src/modules/public/globalSettings/selectors';
import { SummaryField } from 'src/components/SummaryField';
import { MoneyFormat } from 'src/components/MoneyFormat/MoneyFormat';
import sQuickExchange from 'src/containers/QuickExchange/QuickExchange.postcss';
import s from './Transfer.postcss';
import { TransferHistory } from './TransferHistory';
import { getCurrencySymbol } from 'web/src/helpers/getCurrencySymbol';
import { useSWRConfig } from 'swr';
import { fetchWithCreds } from 'web/src/helpers/fetch';
import { alertFetchError } from 'web/src/helpers/alertFetchError';

interface Props {
  currency: Currency;
  balanceMarket: string;
  balanceP2P: string;
}

export const Transfer: React.FC<Props> = ({ currency, balanceMarket, balanceP2P }) => {
  const [from, setFrom] = useState<WalletType | undefined>();
  const [to, setTo] = useState<WalletType | undefined>();
  const [amount, setAmount] = useState('');

  const t = useT();
  const isMobileDevice = useSelector(selectMobileDeviceState);
  const dispatch = useDispatch();

  const { mutate } = useSWRConfig();

  useEffect(() => {
    setFrom(undefined);
    setTo(undefined);
    setAmount('');
  }, [currency.code]);

  const handleSetFrom = (value: WalletType) => {
    setFrom(value);
    setTo(value === 'market' ? DROPS[0] : DROPS[1]);
  };

  const handleSetTo = (value: WalletType) => {
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
        currency_id: getCurrencySymbol(currency),
        amount,
        description: 'Transfer by market web-client',
      };
      try {
        await fetchWithCreds(`${accountUrl()}/transfers`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });

        setFrom(undefined);
        setTo(undefined);
        setAmount('');

        mutate(`${accountUrl()}/balances`);
        mutate(`${accountUrl()}/transfers`);

        dispatch(alertPush({ message: ['Transfer was successfully created'], type: 'success' }));
      } catch (e) {
        alertFetchError(dispatch, e);
      }
    }
  };

  const renderDropItem = (d: WalletType) => {
    return t(d);
  };

  const available =
    from === 'market'
      ? createMoney(balanceMarket, currency)
      : from === 'p2p'
      ? createMoney(balanceP2P, currency)
      : createMoney(0, currency);

  const m = createMoney(amount, currency);
  const disablePercents = !from || !to || available.isZero();
  const disableTransfer = disablePercents || m.isZero() || m.greaterThan(available);

  return (
    <>
      <Box col spacing="3">
        <Box grow row spacing>
          <Box
            flex="1"
            as={SelectString}
            isSearchable={false}
            options={DROPS}
            value={from as any}
            onChange={handleSetFrom as any}
            placeholder={t('Transfer from')}
            label={t('Transfer from')}
            formatOptionLabel={renderDropItem as any}
          />
          <IconButton
            className={s.transferRearrange}
            onClick={handlerRearrange}
            title={t('Rearrange')}
          >
            <SwipeIcon />
          </IconButton>
          <Box
            flex="1"
            as={SelectString}
            isSearchable={false}
            options={DROPS}
            value={to as any}
            onChange={handleSetTo as any}
            placeholder={t('Transfer to')}
            label={t('Transfer to')}
            formatOptionLabel={renderDropItem as any}
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
                  disabled={disablePercents}
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
          <Box flex="1" self="end" row justify="end">
            <Button variant="primary" onClick={handleTransfer} disabled={disableTransfer}>
              {t('Transfer.verb')}
            </Button>
          </Box>
        </Box>
      </Box>
      <Box col>
        <TransferHistory currency={currency} size="small" />
      </Box>
    </>
  );
};

const DROPS: WalletType[] = ['p2p', 'market'];
const PERCENTS = [25, 50, 75, 100];
