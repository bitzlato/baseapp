import { useState, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button as BsButton, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useHistory } from 'react-router';
import cn from 'classnames';
import { useT } from 'src/hooks/useT';
import { quickExchangeLimitsFetch } from 'src/modules/public/quickExchangePublic/actions';
import { selectQuickExchangeLimits } from 'src/modules/public/quickExchangePublic/selectors';
import { DEFAULT_CURRENCY } from 'src/modules/public/currencies/defaults';
import { NumberInput } from 'web/src/components/Input/NumberInput';
import { createCcy, createMoney, ZERO_MONEY } from 'src/helpers/money';
import { parseNumeric } from 'src/helpers/parseNumeric';
import { CryptoCurrencyIcon } from 'web/src/components/ui/CryptoCurrencyIcon';
import { Box } from 'src/components/Box/Box';
import { MoneyFormat } from 'src/components/MoneyFormat/MoneyFormat';
import { Button } from 'src/components/ui/Button';
import { SelectString } from 'src/components/Select/Select';
import { Card } from 'src/components/Card/Card';
import { InfoIcon } from 'src/assets/images/InfoIcon';
import { DotsFlashing } from 'src/components/DotsFlashing/DotsFlashing';
import { RefreshIcon } from 'src/assets/icons/RefreshIcon';
import { DEFAULT_CCY_PRECISION } from 'src/constants';
import { Container } from 'web/src/components/ui/Container';
import { AmountDescription } from './AmountDescription';
import { getWallet, getCurrencies, getCurrency } from './helpers';
import { SwipeIcon } from '../../assets/images/swipe';
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
import { useCurrenciesFetch, useMarketsFetch, useWalletsFetch } from '../../hooks';

import s from './QuickExchange.postcss';
import { Limits } from './Limits';
import { Spoiler } from 'web/src/components/Spoiler/Spoiler';
import { IconButton } from 'web/src/components/IconButton/IconButton';

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
  const isMobileDevice = useSelector(selectMobileDeviceState);
  const history = useHistory();

  const t = useT();

  useEffect(() => {
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
      history.push('/signin');
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
        <CryptoCurrencyIcon size="6x" currency={d} />
        <Box textTr="uppercase" as="span">
          {d.split('-')[0]}
        </Box>
      </Box>
    );
  };

  const renderQuickExchangeBody = () => {
    return (
      <Box row spacing="2" align="stretch" justify="center">
        {!isMobileDevice && fromCcy ? (
          <Box col align="start">
            <Card
              header={t('page.body.quick.exchange.label.limits')}
              className={s.quickExchangeLimit}
            >
              <Limits limits={limits} ccy={fromCcy} />
            </Card>
          </Box>
        ) : null}
        <Card
          header={<h4>{t('page.body.quick.exchange.header')}</h4>}
          className={s.quickExchangeWidget}
        >
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
                  flex="1"
                  as={NumberInput}
                  label={t('page.body.quick.exchange.label.exchange')}
                  labelVisible
                  value={fromAmount}
                  onChange={handleChangeFrom}
                />
                <SelectString
                  className={s.quickExchangeDropdown}
                  isSearchable={false}
                  options={fromList}
                  value={fromCurrency}
                  onChange={handleSelectFrom}
                  placeholder={t('page.body.quick.exchange.label.currency')}
                  formatOptionLabel={renderDropdownItem}
                />
              </Box>
              {market && fromWallet && price.request_price && !exchangeFetching && (
                <AmountDescription
                  market={market}
                  fromWallet={fromWallet}
                  requestPrice={price.request_price}
                  fromAmount={fromAmount}
                />
              )}
            </Box>
            <Box row justify="between">
              <Box row spacing>
                <span>{t('page.body.quick.exchange.sublabel.balance')}: </span>
                <MoneyFormat
                  money={
                    fromWallet?.balance ??
                    createMoney(0, createCcy(fromCurrency, DEFAULT_CCY_PRECISION))
                  }
                />
              </Box>
              <Box row>
                {PERCENTS.map((v) => (
                  <BsButton
                    key={v}
                    variant="secondary"
                    disabled={disablePercents}
                    className={s.quickExchangeAll}
                    onClick={() => handleUsePercent(v)}
                  >
                    {v}%
                  </BsButton>
                ))}
              </Box>
            </Box>
            <Box row justify="between">
              <Box flex="1" row spacing="2" justify="between">
                {fromCcy && toCcy && (
                  <Box col spacing>
                    <Box row spacing wrap>
                      <span>{t('page.body.quick.exchange.rate')}: </span>
                      <MoneyFormat money={createMoney(1, fromCcy)} />
                      <Box as="span" textColor="primary">
                        ≈
                      </Box>
                      <MoneyFormat money={createMoney(price.request_price, toCcy)} zeroSymbol="?" />
                    </Box>
                  </Box>
                )}
              </Box>
              <Box flex="half" row justify="center">
                <IconButton
                  size="small"
                  onClick={handleRearrange}
                  title={t('page.body.quick.exchange.button.rearrange')}
                >
                  <SwipeIcon />
                </IconButton>
              </Box>
            </Box>
          </Box>
          <Box grow row spacing="2">
            <Box
              flex="1"
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
              isSearchable={false}
              options={toList}
              value={toCurrency}
              onChange={handleSelectTo}
              placeholder={t('page.body.quick.exchange.label.currency')}
              formatOptionLabel={renderDropdownItem}
            />
          </Box>
          <Box col spacing>
            {minAmount && (
              <Box row spacing wrap>
                <span>{t('page.body.quick.exchange.sublabel.min_amount')}:</span>
                <MoneyFormat money={minAmount} />
              </Box>
            )}
            <Box row spacing wrap>
              <span>{t('page.body.quick.exchange.sublabel.fee')}:</span>
              <span>0.2%</span>
            </Box>
            <Box row spacing="2" justify="end">
              <IconButton
                color="primary"
                className={cn(!noAmount && rateOutOfDate && s.quickExchangeRefreshPulse)}
                title={t('page.body.quick.exchange.button.refresh')}
                onClick={handleRefresh}
                disabled={noAmount || priceFetching}
              >
                <RefreshIcon />
              </IconButton>
            </Box>
          </Box>
          <Box
            as={Button}
            data-gtm-click="create_quick_exchange"
            row
            spacing="2"
            disabled={noAmount || rateOutOfDate || exchangeFetching}
            onClick={handleExchange}
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

  const noAmount = createMoney(requestVolume, DEFAULT_CURRENCY).isZero();
  const noMarket = !market && !!fromCurrency && !!toCurrency;
  const disablePercents = noMarket || !!fromWallet?.balance.isZero();

  const minAmount =
    market && fromCcy && toCcy
      ? createMoney(market.min_amount, market.base_unit === fromCurrency ? fromCcy! : toCcy!)
      : ZERO_MONEY;

  return isMobileDevice ? (
    renderQuickExchangeBody()
  ) : (
    <Container maxWidth="lg" my="6x">
      {renderQuickExchangeBody()}
    </Container>
  );
};
