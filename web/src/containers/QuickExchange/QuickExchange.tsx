import React, { useState, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import cn from 'classnames';
import { useCurrenciesFetch, useMarketsFetch, useWalletsFetch } from '../../hooks';
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
  marketPriceReset,
  selectCurrencies,
  selectUserLoggedIn,
  selectMobileDeviceState,
} from '../../modules';
import { quickExchangeLimitsFetch } from 'src/modules/public/quickExchangePublic/actions';
import { selectQuickExchangeLimits } from 'src/modules/public/quickExchangePublic/selectors';
import { DEFAULT_CURRENCY } from 'src/modules/public/currencies/defaults';
import { SwipeIcon } from '../../assets/images/swipe';
import { NumberInput } from 'src/components/NumberInput/NumberInput';
import { getWallet, getCurrencies, getCurrency } from './helpers';
import { createCcy, createMoney, ZERO_MONEY } from 'src/helpers/money';
import { parseNumeric } from 'src/helpers/parseNumeric';
import { CryptoCurrencyIcon } from 'src/components/CryptoCurrencyIcon/CryptoCurrencyIcon';
import { Box } from 'src/components/Box/Box';
import { MoneyFormat } from 'src/components/MoneyFormat/MoneyFormat';
import { Button as BzButton } from 'src/components/Button/Button';
import { SelectString } from 'src/components/Select/Select';
import { Card } from 'src/components/Card/Card';
import { InfoIcon } from 'src/assets/images/InfoIcon';
import { Limits } from './Limits';
import { DotsFlashing } from 'src/components/DotsFlashing/DotsFlashing';
import { RefreshIcon } from 'src/assets/icons/RefreshIcon';
import { AmountDescription } from './AmountDescription';
import { DEFAULT_CCY_PRECISION } from 'src/constants';
import { loginWithRedirect } from 'src/helpers/auth0';
import { Spoiler } from 'src/components/Spoiler/Spoiler';

import s from './QuickExchange.postcss';

const PERCENTS = [25, 50, 75, 100];

export const QuickExchangeContainer: React.FC = () => {
  const currentMarket = useSelector(selectCurrentMarket);

  const [fromCurrency, setFromCurrency] = useState(() => currentMarket?.base_unit ?? '');
  const [toCurrency, setToCurrency] = useState(() => currentMarket?.quote_unit ?? '');
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [requestCurrency, setRequestCurrency] = useState('');
  const [requestVolume, setRequestVolume] = useState('');
  const [rateOutOfDate, setRateOutOfDate] = useState(true);

  useMarketsFetch();
  useWalletsFetch();
  useCurrenciesFetch();

  const dispatch = useDispatch();
  const wallets = useSelector(selectWallets) || [];
  const markets = useSelector(selectMarkets) || [];
  const price = useSelector(selectMarketPrice);
  const priceFetching = useSelector(selectMarketPriceFetch);
  const limits = useSelector(selectQuickExchangeLimits);
  const exchangeSucess = useSelector(selectQuickExchangeSuccess);
  const exchangeFetching = useSelector(selectQuickExchangeFetching);
  const currencies = useSelector(selectCurrencies);
  const isLoggedIn = useSelector(selectUserLoggedIn);

  const t = useT();

  React.useEffect(() => {
    dispatch(quickExchangeLimitsFetch());
  }, [dispatch]);

  const { fromList, toList, market, recommendTo } = useMemo(
    () => getCurrencies(markets, fromCurrency, toCurrency),
    [markets, fromCurrency, toCurrency],
  );

  const fromWallet = useMemo(() => getWallet(fromCurrency, wallets), [fromCurrency, wallets]);
  const fromCcy = useMemo(() => getCurrency(fromCurrency, currencies), [fromCurrency, currencies]);
  const toCcy = useMemo(() => getCurrency(toCurrency, currencies), [fromCurrency, currencies]);

  useEffect(() => {
    const handle = window.setTimeout(handleRefresh, 300);
    return () => window.clearTimeout(handle);
  }, [requestVolume, requestCurrency]);

  useEffect(() => {
    if (!priceFetching && price.request_price) {
      if (price.request_currency === price.from_currency) {
        setToAmount(price.to_volume);
      } else {
        setFromAmount(price.from_volume);
      }
      setRateOutOfDate(false);
      const handle = window.setTimeout(() => setRateOutOfDate(true), 10000);
      return () => window.clearTimeout(handle);
    }
  }, [priceFetching]);

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

  useEffect(() => {
    dispatch(marketPriceReset());
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    if (recommendTo) {
      setToCurrency(recommendTo);
    }
  }, [recommendTo]);

  const resetInput = () => {
    setFromAmount('');
    setToAmount('');
    setRequestVolume('');
    setRequestCurrency('');
  };

  const handleChangeFrom = (value: string) => {
    value = parseNumeric(value);
    setFromAmount(value);
    setToAmount('');
    setRequestCurrency(fromCurrency);
    setRequestVolume(value);
  };

  const handleChangeTo = (value: string) => {
    value = parseNumeric(value);
    setToAmount(value);
    setFromAmount('');
    setRequestCurrency(toCurrency);
    setRequestVolume(value);
  };

  const handleSelectFrom = (value: string | null) => {
    setFromCurrency(value ?? '');
    resetInput();
  };

  const handleSelectTo = (value: string | null) => {
    setToCurrency(value ?? '');
    resetInput();
  };

  const handleUsePercent = (value: number) => {
    const balance = fromWallet?.balance;
    if (balance) {
      const m = createMoney(balance.toString(), balance.currency);
      handleChangeFrom(m.multiply(value).divide(100).toFormat());
    }
  };

  const handleRearrange = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    resetInput();
  };

  const handleRefresh = () => {
    if (!createMoney(requestVolume, DEFAULT_CURRENCY).isZero()) {
      dispatch(
        marketPriceFetch({
          from_currency: fromCurrency,
          to_currency: toCurrency,
          request_volume: parseNumeric(requestVolume, { trimRightDot: true }),
          request_currency: requestCurrency,
        }),
      );
    }
  };

  const handleExchange = () => {
    if (!isLoggedIn) {
      loginWithRedirect();
    } else {
      dispatch(
        createQuickExchangeFetch({
          from_currency: fromCurrency,
          to_currency: toCurrency,
          request_currency: requestCurrency,
          request_volume: requestVolume,
          price: price.request_price,
        }),
      );
    }
  };

  const renderDropdownItem = (d: string) => {
    return (
      <Box row spacing>
        <CryptoCurrencyIcon
          size="small"
          icon={getWallet(d, wallets)?.icon_url ?? ''}
          currency={d}
        />
        <Box textTr="uppercase" as="span">
          {d.split('-')[0]}
        </Box>
      </Box>
    );
  };
  const isMobileDevice = useSelector(selectMobileDeviceState);
  const noAmount = createMoney(requestVolume, DEFAULT_CURRENCY).isZero();
  const noMarket = !market && fromCurrency && toCurrency;

  const minAmount = market
    ? createMoney(market.min_amount, market.base_unit === fromCurrency ? fromCcy! : toCcy!)
    : ZERO_MONEY;

  return (
    <Box row align="stretch" justify="center">
      {!isMobileDevice && fromCcy ? (
        <Box col align="start">
          <Card size="lg" header={t('page.body.quick.exchange.label.limits')}>
            <Limits limits={limits} ccy={fromCcy} />
          </Card>
        </Box>
      ) : null}
      <Card size="md" header={<h4>{t('page.body.quick.exchange.header')}</h4>}>
        <Box col spacing>
          <Box col spacing="sm">
            {isMobileDevice && fromCcy ? (
              <Box col>
                <Spoiler title={t('page.body.quick.exchange.label.limits')}>
                  <Limits limits={limits} ccy={fromCcy} />
                </Spoiler>
              </Box>
            ) : null}
            <Box grow row spacing="2">
              <Box
                flex1
                as={NumberInput}
                label={t('page.body.quick.exchange.label.exchange')}
                labelVisible
                value={fromAmount}
                onChange={handleChangeFrom}
              />
              <SelectString
                className={s.quickExchangeDropdown}
                options={fromList}
                value={fromCurrency}
                onChange={handleSelectFrom}
                placeholder={t('page.body.quick.exchange.label.currency')}
                itemRenderer={renderDropdownItem}
              />
            </Box>
            <AmountDescription
              market={market}
              fromWallet={fromWallet}
              price={price}
              fromAmount={fromAmount}
            />
          </Box>
          <Box row spacing justify="between" wrap>
            <Box row spacing>
              <span>{t('page.body.quick.exchange.sublabel.balance')}:</span>
              <MoneyFormat
                money={
                  fromWallet?.balance ??
                  createMoney(0, createCcy(fromCurrency, DEFAULT_CCY_PRECISION))
                }
              />
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
          <Box row justify="between">
            {fromCcy && toCcy && (
              <Box flex1 row spacing="2" justify="between">
                <Box col spacing>
                  <Box row spacing wrap>
                    <span>{t('page.body.quick.exchange.rate')}:</span>
                    <MoneyFormat money={createMoney(1, fromCcy)} />
                    <Box as="span" textColor="primary">
                      ≈
                    </Box>
                    <MoneyFormat money={createMoney(price.request_price, toCcy)} zeroSymbol="?" />
                  </Box>
                </Box>
              </Box>
            )}
            <Button
              className={s.quickExchangeSwap}
              onClick={handleRearrange}
              title={t('page.body.quick.exchange.button.rearrange')}
            >
              <SwipeIcon />
            </Button>
          </Box>
        </Box>
        <Box grow row spacing="2">
          <Box
            flex1
            as={NumberInput}
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
            value={toAmount}
            onChange={handleChangeTo}
          />
          <SelectString
            className={s.quickExchangeDropdown}
            options={toList}
            value={toCurrency}
            onChange={handleSelectTo}
            placeholder={t('page.body.quick.exchange.label.currency')}
            itemRenderer={renderDropdownItem}
          />
        </Box>
        {fromCcy && toCcy && (
          <Box col spacing>
            <Box row spacing wrap>
              <span>{t('page.body.quick.exchange.sublabel.min_amount')}:</span>
              <MoneyFormat money={minAmount} />
            </Box>
            <Box row spacing="2" justify="end">
              <BzButton
                variant="primary-outline"
                className={cn(
                  s.quickExchangeRefresh,
                  !noAmount && rateOutOfDate && s.quickExchangeRefreshPulse,
                )}
                title={t('page.body.quick.exchange.button.refresh')}
                onClick={handleRefresh}
                disabled={noAmount || priceFetching}
              >
                <RefreshIcon />
              </BzButton>
            </Box>
          </Box>
        )}
        <Box
          row
          spacing="2"
          as={BzButton}
          size="large"
          variant="primary"
          onClick={handleExchange}
          disabled={noAmount || rateOutOfDate || exchangeFetching}
        >
          <span>
            {noMarket
              ? t('page.body.quick.exchange.tip.market')
              : noAmount
              ? t('page.body.quick.exchange.tip.amount')
              : rateOutOfDate && !exchangeFetching
              ? t('page.body.quick.exchange.tip.refresh')
              : t('page.body.quick.exchange.button.exchange')}
          </span>
          {exchangeFetching && <DotsFlashing />}
        </Box>
      </Card>
    </Box>
  );
};
