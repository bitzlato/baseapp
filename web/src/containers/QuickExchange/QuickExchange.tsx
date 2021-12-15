import React, { useState, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import cn from 'classnames';
import { useMarketsFetch, useWalletsFetch } from '../../hooks';
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
import { NumberInput } from 'src/components/NumberInput/NumberInput';
import { getWallet, getCurrencies, getCurrency, DropdownItem, getItem } from './helpers';
import { createMoney } from 'src/helpers/money';
import { parseNumeric } from 'src/helpers/parseNumeric';
import { CryptoCurrencyIcon } from 'src/components/CryptoCurrencyIcon/CryptoCurrencyIcon';
import { Box } from 'src/components/Box/Box';
import { MoneyFormat } from 'src/components/MoneyFormat/MoneyFormat';
import { Button as BzButton } from 'src/components/Button/Button';
import { DropdownComponent } from './Dropdown';
import { Card } from 'src/components/Card/Card';
import { InfoIcon } from 'src/assets/images/InfoIcon';
import { PriceLimit } from './PriceLimit';
import { DotsFlashing } from 'src/components/DotsFlashing/DotsFlashing';
import { RefreshIcon } from 'src/assets/icons/RefreshIcon';

import s from './QuickExchange.postcss';

const PERCENTS = [25, 50, 75, 100];

export const QuickExchangeContainer: React.FC = () => {
  const currentMarket = useSelector(selectCurrentMarket);

  const [fromCurrency, setFromCurrency] = useState<DropdownItem>(() =>
    getItem(currentMarket?.base_unit ?? '', !!currentMarket),
  );
  const [toCurrency, setToCurrency] = useState<DropdownItem>(() =>
    getItem(currentMarket?.quote_unit ?? '', !!currentMarket),
  );
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
  useWalletsFetch();

  React.useEffect(() => {
    dispatch(quickExchangeLimitsFetch());
  }, [dispatch]);

  const { fromList, toList, market, toCcy } = useMemo(
    () => getCurrencies(markets, fromCurrency.code, toCurrency.code),
    [markets, fromCurrency, toCurrency],
  );

  const fromWallet = useMemo(() => getWallet(fromCurrency.code, wallets), [fromCurrency, wallets]);

  useEffect(() => {
    const handle = window.setTimeout(handleRefresh, 300);
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
      const handle = window.setTimeout(() => setRateOutOfDate(true), 10000);
      return () => window.clearTimeout(handle);
    }
  }, [price.request_price, priceFetching]);

  useEffect(() => {
    if (currentMarket) {
      setFromCurrency(getItem(currentMarket.base_unit, true));
      setToCurrency(getItem(currentMarket.quote_unit, true));
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

  const handleChangeFrom = (value: string) => {
    value = parseNumeric(value);
    setFromAmount(value);
    setToAmount('');
    setRequestCurrency(fromCurrency.code);
    setRequestVolume(value);
  };

  const handleChangeTo = (value: string) => {
    value = parseNumeric(value);
    setToAmount(value);
    setFromAmount('');
    setRequestCurrency(toCurrency.code);
    setRequestVolume(value);
  };

  const handleSelectFrom = (value: DropdownItem) => {
    setFromCurrency(value);
    setToCurrency(getItem(toCurrency.code, value.match));
  };

  const handleSelectTo = (value: DropdownItem) => {
    setToCurrency(value);
    setFromCurrency(getItem(fromCurrency.code, value.match));
  };

  const handleUsePercent = (value: number) => {
    if (fromWallet?.balance) {
      handleChangeFrom(fromWallet.balance.multiply(value).divide(100).toFormat());
    }
  };

  const handleRearrange = () => {
    setFromAmount('');
    setFromCurrency(toCurrency);
    setToAmount('');
    setToCurrency(fromCurrency);
    setRequestVolume('');
    setRequestCurrency('');
  };

  const handleRefresh = () => {
    if (!noAmount && +requestVolume > 0) {
      dispatch(
        marketPriceFetch({
          from_currency: fromCurrency.code,
          to_currency: toCurrency.code,
          request_volume: parseNumeric(requestVolume, { trimRightDot: true }),
          request_currency: requestCurrency,
        }),
      );
    }
  };

  const handleExchange = () => {
    dispatch(
      createQuickExchangeFetch({
        from_currency: fromCurrency.code,
        to_currency: toCurrency.code,
        request_currency: requestCurrency,
        request_volume: requestVolume,
        price: price.request_price,
      }),
    );
  };

  const renderDropdownItem = (d: DropdownItem) => {
    return (
      <Box row spacing>
        <CryptoCurrencyIcon
          size="small"
          icon={getWallet(d.code, wallets)?.icon_url ?? ''}
          currency={d.code}
        />
        <Box as="span" textColor={d.match ? 'primary' : 'failed'}>
          {d.code.toUpperCase()}
        </Box>
      </Box>
    );
  };

  const noAmount = !(market && (fromAmount || toAmount));
  const noMarket = !market && fromCurrency.code && toCurrency.code;

  return (
    <Card className={s.quickExchange} header={<h4>{t('page.body.quick.exchange.header')}</h4>}>
      <Box col spacing>
        <Box grow row spacing="2x">
          <Box
            flex1
            as={NumberInput}
            label={t('page.body.quick.exchange.label.exchange')}
            labelVisible
            value={fromAmount}
            onChange={handleChangeFrom}
          />
          <DropdownComponent
            className={s.quickExchangeDropdown}
            list={fromList}
            value={fromCurrency}
            onSelect={handleSelectFrom}
            placeholder={t('page.body.quick.exchange.label.currency')}
            itemRenderer={renderDropdownItem}
          />
        </Box>
        <Box row spacing justifyBetween wrap>
          <Box row spacing>
            <span>{t('page.body.quick.exchange.sublabel.balance')}:</span>
            <MoneyFormat money={fromWallet?.balance ?? createMoney(0, DEFAULT_CURRENCY)} />
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
        <DropdownComponent
          className={s.quickExchangeDropdown}
          list={toList}
          value={toCurrency}
          onSelect={handleSelectTo}
          placeholder={t('page.body.quick.exchange.label.currency')}
          itemRenderer={renderDropdownItem}
        />
      </Box>
      {fromWallet && toCcy && market && (
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
              money={createMoney(
                market.min_amount,
                getCurrency(market.base_unit, market.amount_precision),
              )}
            />
          </Box>
          <Box row spacing="2x" justifyBetween>
            <Box col spacing>
              <Box row spacing>
                <span>{t('page.body.quick.exchange.rate')}:</span>
                <MoneyFormat money={createMoney(1, fromWallet.currency)} />
                <Box as="span" textColor="primary">
                  ≈
                </Box>
                <MoneyFormat money={createMoney(price.request_price, toCcy)} zeroSymbol="?" />
              </Box>
              <Box row spacing>
                <span>{t('page.body.quick.exchange.reverse_rate')}:</span>
                <MoneyFormat money={createMoney(1, toCcy)} />
                <Box as="span" textColor="primary">
                  ≈
                </Box>
                <MoneyFormat
                  money={createMoney(price.inverse_price, fromWallet.currency)}
                  zeroSymbol="?"
                />
              </Box>
            </Box>
            <BzButton
              variant="primary-outline"
              className={cn(
                s.quickExchangeRefresh,
                !noAmount && rateOutOfDate && s.quickExchangeRefreshPulse,
              )}
              title={t('page.body.quick.exchange.button.refresh')}
              onClick={handleRefresh}
              disabled={noAmount}
            >
              <RefreshIcon />
            </BzButton>
          </Box>
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
  );
};
