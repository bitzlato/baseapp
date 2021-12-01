import React, { useState, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Spinner } from 'react-bootstrap';
import { msPricesUpdates } from '../../api';
import { useMarketsFetch } from '../../hooks';
import { useT } from 'src/hooks/useT';
import {
  selectMarkets,
  selectWallets,
  marketPriceFetch,
  selectMarketPrice,
  selectMarketPriceFetch,
  createQuickExchangeFetch,
  selectCurrentMarket,
  selectQuickExchangeFetching,
} from '../../modules';
import { DEFAULT_CURRENCY } from 'src/modules/public/currencies/defaults';
import { SwipeIcon } from '../../assets/images/swipe';
import { CustomInput } from '../../components';
import { getWallet, getCurrencies, calcQuoteAmount, calcBaseAmount } from './helpers';
import { fromDecimalSilent } from 'src/helpers/fromDecimal';
import { CryptoCurrencyIcon } from 'src/components/CryptoCurrencyIcon/CryptoCurrencyIcon';
import { Box } from 'src/components/Box/Box';
import { MoneyFormat } from 'src/components/MoneyFormat/MoneyFormat';
import { DropdownComponent } from './Dropdown';
import { Card } from 'src/components/Card/Card';
import { WarningIcon } from 'src/mobile/assets/images/WarningIcon';
import { Label } from 'src/components/Label/Label';

import s from './QuickExchange.postcss';
import inputS from 'src/containers/Withdraw/Withdraw.postcss';

const PERCENTS = [25, 50, 75, 100];

export const QuickExchangeContainer: React.FC = () => {
  const currentMarket = useSelector(selectCurrentMarket);

  const [baseCurrency, setBaseCurrency] = useState(currentMarket?.base_unit ?? '');
  const [quoteCurrency, setQuoteCurrency] = useState(currentMarket?.quote_unit ?? '');
  const [baseAmount, setBaseAmount] = useState('');
  const [quoteAmount, setQuoteAmount] = useState('');

  const dispatch = useDispatch();
  const wallets = useSelector(selectWallets) || [];
  const markets = useSelector(selectMarkets) || [];
  const { price } = useSelector(selectMarketPrice);
  const marketPriceFetching = useSelector(selectMarketPriceFetch);
  const exchangeFetching = useSelector(selectQuickExchangeFetching);

  const t = useT();

  useMarketsFetch();

  const { bases, quotes, market, baseCcy, quoteCcy } = useMemo(
    () => getCurrencies(markets, baseCurrency, quoteCurrency),
    [markets, baseCurrency, quoteCurrency],
  );

  const updateMarketPrice = () => {
    if (!marketPriceFetching && !exchangeFetching && market) {
      dispatch(marketPriceFetch({ from_currency: baseCurrency, to_currency: quoteCurrency }));
    }
  };

  useEffect(() => {
    updateMarketPrice();
    const handle = window.setInterval(updateMarketPrice, +msPricesUpdates());
    return () => window.clearInterval(handle);
  }, [baseCurrency, quoteCurrency]);

  const baseWallet = useMemo(() => getWallet(baseCurrency, wallets), [baseCurrency, wallets]);

  useEffect(() => {
    if (baseAmount && quoteCcy) {
      setQuoteAmount(calcQuoteAmount(baseAmount, quoteCcy, price));
    }
  }, [price]);

  useEffect(() => {
    if (currentMarket) {
      setBaseCurrency(currentMarket.base_unit);
      setQuoteCurrency(currentMarket.quote_unit);
    }
  }, [currentMarket]);

  const handleChangeBase = (value: string) => {
    setBaseAmount(value);
    if (quoteCcy) {
      setQuoteAmount(calcQuoteAmount(value, quoteCcy, price));
    }
  };

  const handleChangeQuote = (value: string) => {
    setQuoteAmount(value);
    if (baseCcy) {
      setBaseAmount(calcBaseAmount(value, baseCcy, price));
    }
  };

  const handleUseBaseAmount = (value: number) => {
    if (baseWallet?.balance) {
      handleChangeBase(baseWallet.balance.multiply(value).divide(100).toFormat());
    }
  };

  const handleSwapCurrencies = () => {
    setBaseAmount(quoteAmount);
    setBaseCurrency(quoteCurrency);
    setQuoteAmount(baseAmount);
    setQuoteCurrency(baseCurrency);
  };

  const handleSubmitExchange = () => {
    dispatch(
      createQuickExchangeFetch({
        from_currency: baseCurrency,
        to_currency: quoteCurrency,
        volume: baseAmount,
        price,
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

  return (
    <Card className={s.quickExchange} header={<h4>{t('page.body.quick.exchange.header')}</h4>}>
      <Box col spacing>
        <Box grow row spacing="2x">
          <CustomInput
            type="number"
            className={inputS.numberInput}
            label={t('page.body.quick.exchange.label.exchange')}
            defaultLabel=""
            inputValue={baseAmount}
            placeholder={t('page.body.quick.exchange.label.exchange')}
            handleChangeInput={handleChangeBase}
          />
          <DropdownComponent
            className={s.quickExchangeDropdown}
            list={bases}
            value={baseCurrency}
            onSelect={setBaseCurrency}
            placeholder={t('page.body.quick.exchange.label.currency')}
            itemRenderer={renderDropdownItem}
          />
        </Box>
        <Box row spacing justifyBetween wrap>
          <Box row spacing>
            <span>{t('page.body.quick.exchange.sublabel.balance')}:</span>
            <MoneyFormat money={baseWallet?.balance ?? fromDecimalSilent(0, DEFAULT_CURRENCY)} />
          </Box>
          <Box row spacing>
            {PERCENTS.map((v) => (
              <Button
                key={v}
                variant="secondary"
                className={s.quickExchangeAll}
                onClick={() => handleUseBaseAmount(v)}
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
        onClick={handleSwapCurrencies}
        title={t('page.body.quick.exchange.button.rearrange')}
      >
        <SwipeIcon />
      </Button>
      <Box grow row spacing="2x">
        <CustomInput
          type="number"
          className={inputS.numberInput}
          label={t('page.body.quick.exchange.label.receive')}
          defaultLabel=""
          inputValue={quoteAmount}
          placeholder={t('page.body.quick.exchange.label.receive')}
          handleChangeInput={handleChangeQuote}
        />
        <DropdownComponent
          className={s.quickExchangeDropdown}
          list={quotes}
          value={quoteCurrency}
          onSelect={setQuoteCurrency}
          placeholder={t('page.body.quick.exchange.label.currency')}
          itemRenderer={renderDropdownItem}
        />
      </Box>
      {price && baseCcy && quoteCcy && market && (
        <Box col spacing>
          <Box row spacing>
            <WarningIcon className={s.quickExchangeWarningIcon} />
            <Label color="warning">{t('page.body.quick.exchange.warning')}</Label>
          </Box>
          <Box row spacing>
            <span>{t('page.body.quick.exchange.rate')}:</span>
            <MoneyFormat money={fromDecimalSilent(1, baseCcy)} />
            <span>≈</span>
            <MoneyFormat money={fromDecimalSilent(price, quoteCcy)} />
          </Box>
          <Box row spacing>
            <span>{t('page.body.quick.exchange.sublabel.min_amount')}:</span>
            <MoneyFormat
              money={fromDecimalSilent(market.min_amount, {
                code: market.base_unit,
                minorUnit: market.amount_precision,
              })}
            />
          </Box>
        </Box>
      )}
      <Button
        className={s.quickExchangeButton}
        onClick={handleSubmitExchange}
        size="lg"
        variant="primary"
        disabled={exchangeFetching || !market || !baseAmount || !quoteAmount}
      >
        {exchangeFetching ? (
          <Spinner animation="border" variant="primary" />
        ) : (
          t('page.body.quick.exchange.button.exchange')
        )}
      </Button>
    </Card>
  );
};
