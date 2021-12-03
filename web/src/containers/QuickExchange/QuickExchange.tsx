import React, { useState, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useCurrenciesFetch, useMarketsFetch } from '../../hooks';
import { useT } from 'src/hooks/useT';
import {
  selectMarkets,
  selectWallets,
  marketPriceFetch,
  selectMarketPrice,
  selectMarketPriceFetch,
  createQuickExchangeFetch,
  selectCurrentMarket,
  selectQuickExchangeSuccess,
  selectQuickExchangeFetching,
} from '../../modules';
import { quickExchangeLimitsFetch } from 'src/modules/public/quickExchangePublic/actions';
import { selectQuickExchangeLimits } from 'src/modules/public/quickExchangePublic/selectors';
import { DEFAULT_CURRENCY } from 'src/modules/public/currencies/defaults';
import { SwipeIcon } from '../../assets/images/swipe';
import { CustomInput } from '../../components';
import { getWallet, getCurrencies, getCurrency } from './helpers';
import { fromDecimalSilent } from 'src/helpers/fromDecimal';
import { CryptoCurrencyIcon } from 'src/components/CryptoCurrencyIcon/CryptoCurrencyIcon';
import { Box } from 'src/components/Box/Box';
import { MoneyFormat } from 'src/components/MoneyFormat/MoneyFormat';
import { Button as BzButton } from 'src/components/Button/Button';
import { DropdownComponent } from './Dropdown';
import { Card } from 'src/components/Card/Card';
import { InfoIcon } from 'src/assets/images/InfoIcon';
import { PriceLimit } from './PriceLimit';
import { IconButton } from 'src/components/IconButton/IconButton';
import { DotsFlashing } from 'src/components/DotsFlashing/DotsFlashing';
import { RefreshIcon } from 'src/assets/icons/RefreshIcon';

import s from './QuickExchange.postcss';
import inputS from 'src/containers/Withdraw/Withdraw.postcss';

const PERCENTS = [25, 50, 75, 100];

export const QuickExchangeContainer: React.FC = () => {
  const currentMarket = useSelector(selectCurrentMarket);

  const [fromCurrency, setFromCurrency] = useState(currentMarket?.base_unit ?? '');
  const [toCurrency, setToCurrency] = useState(currentMarket?.quote_unit ?? '');
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [requestCurrency, setRequestCurrency] = useState('');
  const [requestVolume, setRequestVolume] = useState('');
  const [rateOutOfDate, setRateOutOfDate] = useState(true);

  const dispatch = useDispatch();
  const wallets = useSelector(selectWallets) || [];
  const markets = useSelector(selectMarkets) || [];
  const price = useSelector(selectMarketPrice);
  const priceFetching = useSelector(selectMarketPriceFetch);
  const limits = useSelector(selectQuickExchangeLimits);
  const exchangeSucess = useSelector(selectQuickExchangeSuccess);
  const exchangeFetching = useSelector(selectQuickExchangeFetching);

  const t = useT();

  useMarketsFetch();
  useCurrenciesFetch();

  React.useEffect(() => {
    dispatch(quickExchangeLimitsFetch());
  }, [dispatch]);

  const { fromCurrencies, toCurrencies, market, toCcy } = useMemo(
    () => getCurrencies(markets, fromCurrency, toCurrency),
    [markets, fromCurrency, toCurrency],
  );

  const fromWallet = useMemo(() => getWallet(fromCurrency, wallets), [fromCurrency, wallets]);

  useEffect(() => {
    const handle = window.setTimeout(handleRefresh, 100);
    return () => window.clearTimeout(handle);
  }, [requestVolume, requestCurrency]);

  useEffect(() => {
    if (!priceFetching && requestVolume) {
      if (price.request_currency === price.from_currency) {
        setToAmount(price.to_volume);
      } else {
        setFromAmount(price.from_volume);
      }
      setRateOutOfDate(false);
      const handle = window.setTimeout(() => setRateOutOfDate(true), 15000);
      return () => window.clearTimeout(handle);
    }
  }, [price.request_price, priceFetching]);

  useEffect(() => {
    if (currentMarket) {
      setFromCurrency(currentMarket.base_unit);
      setToCurrency(currentMarket.quote_unit);
    }
  }, [currentMarket]);

  useEffect(() => {
    if (exchangeSucess) {
      setFromAmount('');
      setToAmount('');
      setRequestVolume('');
      setRequestCurrency('');
    }
  }, [exchangeSucess]);

  const handleChangeBase = (value: string) => {
    setFromAmount(value);
    setToAmount('');
    setRequestCurrency(fromCurrency);
    setRequestVolume(value);
  };

  const handleChangeQuote = (value: string) => {
    setToAmount(value);
    setFromAmount('');
    setRequestCurrency(toCurrency);
    setRequestVolume(value);
  };

  const handleUsePercent = (value: number) => {
    if (fromWallet?.balance) {
      handleChangeBase(fromWallet.balance.multiply(value).divide(100).toFormat());
    }
  };

  const handleRearrange = () => {
    setFromAmount(toAmount);
    setFromCurrency(toCurrency);
    setToAmount(fromAmount);
    setToCurrency(fromCurrency);
    setRequestVolume(requestCurrency === fromCurrency ? toAmount : fromAmount);
    setRequestCurrency(requestCurrency === fromCurrency ? toCurrency : fromCurrency);
  };

  const handleRefresh = () => {
    if (!priceFetching && +requestVolume > 0) {
      dispatch(
        marketPriceFetch({
          from_currency: fromCurrency,
          to_currency: toCurrency,
          request_volume: requestVolume,
          request_currency: requestCurrency,
        }),
      );
    }
  };

  const handleExchange = () => {
    dispatch(
      createQuickExchangeFetch({
        from_currency: fromCurrency,
        to_currency: toCurrency,
        request_currency: requestCurrency,
        request_volume: requestVolume,
        price: price.request_price,
      }),
    );
  };

  const renderDropdownItem = (d: string) => {
    return (
      <Box row spacing>
        <CryptoCurrencyIcon size="small" icon={getWallet(d, wallets)?.iconUrl ?? ''} currency={d} />
        <span>{d.toUpperCase()}</span>
      </Box>
    );
  };

  const noAmount = !(market && (fromAmount || toAmount));

  return (
    <Card className={s.quickExchange} header={<h4>{t('page.body.quick.exchange.header')}</h4>}>
      <Box col spacing>
        <Box grow row spacing="2x">
          <CustomInput
            type="number"
            className={inputS.numberInput}
            label={t('page.body.quick.exchange.label.exchange')}
            labelVisible
            inputValue={fromAmount}
            handleChangeInput={handleChangeBase}
          />
          <DropdownComponent
            className={s.quickExchangeDropdown}
            list={fromCurrencies}
            value={fromCurrency}
            onSelect={setFromCurrency}
            placeholder={t('page.body.quick.exchange.label.currency')}
            itemRenderer={renderDropdownItem}
          />
        </Box>
        <Box row spacing justifyBetween wrap>
          <Box row spacing>
            <span>{t('page.body.quick.exchange.sublabel.balance')}:</span>
            <MoneyFormat money={fromWallet?.balance ?? fromDecimalSilent(0, DEFAULT_CURRENCY)} />
          </Box>
          <Box row spacing>
            {PERCENTS.map((v) => (
              <Button
                key={v}
                variant="secondary"
                className={s.quickExchangeAll}
                onClick={() => handleUsePercent(v)}
              >
                {v}%
              </Button>
            ))}
          </Box>
        </Box>
      </Box>
      <Button
        variant=""
        className={s.quickExchangeSwap}
        onClick={handleRearrange}
        title={t('page.body.quick.exchange.button.rearrange')}
      >
        <SwipeIcon />
      </Button>
      <Box grow row spacing="2x">
        <CustomInput
          type="number"
          className={inputS.numberInput}
          label={
            <Box row spacing="sm">
              <span>{t('page.body.quick.exchange.label.receive')}</span>
              <OverlayTrigger
                placement="top"
                delay={{ show: 250, hide: 400 }}
                overlay={
                  <Tooltip id="quick-exchange-price">
                    {t('page.body.quick.exchange.warning')}
                  </Tooltip>
                }
              >
                <InfoIcon className={s.quickExchangeWarningIcon} />
              </OverlayTrigger>
            </Box>
          }
          labelVisible
          inputValue={toAmount}
          handleChangeInput={handleChangeQuote}
        />
        <DropdownComponent
          className={s.quickExchangeDropdown}
          list={toCurrencies}
          value={toCurrency}
          onSelect={setToCurrency}
          placeholder={t('page.body.quick.exchange.label.currency')}
          itemRenderer={renderDropdownItem}
        />
      </Box>
      {fromWallet && toCcy && market ? (
        <Box col spacing>
          <PriceLimit
            label={t('page.body.quick.exchange.limit.order')}
            limit={limits.order_limit}
            ccy={fromWallet.currency}
            price={fromWallet.price}
          />
          <PriceLimit
            label={t('page.body.quick.exchange.limit.daily')}
            limit={limits.daily_limit}
            ccy={fromWallet.currency}
            price={fromWallet.price}
          />
          <PriceLimit
            label={t('page.body.quick.exchange.limit.weekly')}
            limit={limits.weekly_limit}
            ccy={fromWallet.currency}
            price={fromWallet.price}
          />
          <Box row spacing>
            <span>{t('page.body.quick.exchange.sublabel.min_amount')}:</span>
            <MoneyFormat
              money={fromDecimalSilent(
                market.min_amount,
                getCurrency(market.base_unit, market.amount_precision),
              )}
            />
          </Box>
          <Box row spacing="2x" justifyBetween>
            <Box col spacing>
              <Box row spacing>
                <span>{t('page.body.quick.exchange.rate')}:</span>
                <MoneyFormat money={fromDecimalSilent(1, fromWallet.currency)} />
                <span>≈</span>
                <MoneyFormat money={fromDecimalSilent(price.request_price, toCcy)} zeroSymbol="?" />
              </Box>
              <Box row spacing>
                <span>{t('page.body.quick.exchange.reverse_rate')}:</span>
                <MoneyFormat money={fromDecimalSilent(1, toCcy)} />
                <span>≈</span>
                <MoneyFormat
                  money={fromDecimalSilent(price.inverse_price, fromWallet.currency)}
                  zeroSymbol="?"
                />
              </Box>
            </Box>
            <IconButton
              className={s.quickExchangeRefresh}
              title={t('page.body.quick.exchange.button.refresh')}
              onClick={handleRefresh}
              disabled={noAmount}
            >
              <RefreshIcon />
            </IconButton>
          </Box>
        </Box>
      ) : (
        <Box selfCenter>
          <DotsFlashing />
        </Box>
      )}
      <Box
        row
        spacing="2x"
        as={BzButton}
        className={s.quickExchangeButton}
        size="large"
        variant="primary"
        onClick={handleExchange}
        disabled={noAmount || rateOutOfDate || exchangeFetching}
      >
        <span>
          {noAmount
            ? t('page.body.quick.exchange.button.tip')
            : rateOutOfDate
            ? t('page.body.quick.exchange.button.refresh')
            : t('page.body.quick.exchange.button.exchange')}
        </span>
        {exchangeFetching && <DotsFlashing />}
      </Box>
    </Card>
  );
};
