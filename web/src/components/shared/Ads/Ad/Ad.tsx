import { FC, useState } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { Text } from 'web/src/components/ui/Text';
import { Container } from 'web/src/components/ui/Container';
import { useAdapterContext } from 'web/src/components/shared/Adapter';
import { useFetchAdvert } from 'web/src/hooks/data/useFetchAds';
import { useFetchPaymethod } from 'web/src/hooks/data/useFetchPaymethod';
import { Spinner } from 'web/src/components/ui/Spinner';
import ShieldIcon from 'web/src/assets/svg/ShieldIcon.svg';
import { Button } from 'web/src/components/ui/Button';
import { useAppContext } from 'web/src/components/app/AppContext';
import { MoneyInput } from 'web/src/components/TextInputCustom/MoneyInputCustom';
import { useP2PFiatCurrencies } from 'web/src/hooks/useP2PFiatCurrencies';
import { createMoney } from 'web/src/helpers/money';
import { parseNumeric } from 'web/src/helpers/parseNumeric';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'web/src/components/ui/Modal';
import { themeDark } from 'web/src/theme/vars.css';
import { useFetchTraderInfo } from 'web/src/hooks/data/useFetchTraderInfo';
import { useTradeEstimate } from 'web/src/hooks/data/useTradeEstimate';
import { useDebouncedCallback } from 'use-debounce';
import { useFetchLastRequisites } from 'web/src/hooks/data/useFetchTrade';
import { useFetchP2PWallet } from 'web/src/hooks/data/useFetchP2PWallets';
import { MoneyFormat } from 'web/src/components/MoneyFormat/MoneyFormat';
import { useTradeStart } from 'web/src/hooks/mutations/useTradeUpdateState';
import { AdvertType } from 'web/src/modules/p2p/types';
import { DetailsInput } from 'web/src/components/TextInputCustom/DetailsInput';
import { useFetchRate } from 'web/src/hooks/data/useFetchRate';
import { useP2PCryptoCurrencies } from 'web/src/hooks/useP2PCryptoCurrencies';
import { CollapsibleText } from 'web/src/components/shared/CollapsibleText/CollapsibleText';
import {
  getFormatOptionsByLanguage,
  getP2PFiatOptionsByCode,
} from 'web/src/components/AmountFormat/getFormatOptionsByLanguage';
import { Money } from '@bitzlato/money-js';
import { Breadcrumbs, BreadcrumbsItem } from 'web/src/components/ui/Breadcrumbs';
import { AdsType } from 'web/src/components/shared/Trade/types';
import { ConfirmDangerRateModal } from './RateDiffModal';
import { ActionBlock } from './ActionBlock';
import { AdTrader } from './AdTrader';
import { AdTraderInfo } from './AdTraderInfo';
import { AdTerms } from './AdTerms';
import { AdInfo } from './AdInfo';
import { AdError } from './AdError';

interface UrlParams {
  type: 'buy' | 'sell';
  id: string;
}

const DEFERRED_INTERVAL = 300;

export const Ad: FC = () => {
  const { lang, isMobileDevice, user } = useAppContext();
  const isLogged = user !== undefined;

  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [details, setDetails] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [inputLast, setInputLast] = useState('');
  const [rateDiffIsOk, setRateDiffIsOk] = useState(true);

  const toggleRateDiffIsOk = () => setRateDiffIsOk((r) => !r);
  const toggleRateDiffIsOkMobile = () => {
    toggleRateDiffIsOk();
    setShow(true);
  };

  const { t, params, history } = useAdapterContext<UrlParams>();

  const { data: advert, mutate: reloadAdvert } = useFetchAdvert(params.id);
  const { data: paymethod } = useFetchPaymethod(advert?.paymethod, lang);
  const lastRequisitesSWR = useFetchLastRequisites(paymethod?.id);
  const traderInfoSWR = useFetchTraderInfo(advert?.owner);
  const { data: owner } = traderInfoSWR;
  const { getFiatCurrency } = useP2PFiatCurrencies();
  const { getCryptoCurrency } = useP2PCryptoCurrencies();

  const cryptocurrency = advert?.cryptocurrency;

  const rateResponse = useFetchRate(cryptocurrency, paymethod?.currency);
  const currentRate = rateResponse.data?.rate ?? 0;

  const { data: p2pWallet } = useFetchP2PWallet(cryptocurrency);

  const lastDetails = lastRequisitesSWR?.data?.data || [];

  const calculateAmount = useTradeEstimate({
    onFailure: (reason) => {
      reloadAdvert();
      setError(t(`error.${reason}`));
    },
  });

  const calculateDebounced = useDebouncedCallback(
    async (
      amount: string,
      amountType: string,
      other: 'currency' | 'cryptocurrency',
      type: AdvertType,
    ) => {
      if (advert && paymethod) {
        const c = await calculateAmount({
          advertId: advert.id,
          amount,
          amountType,
          rate: advert.rate,
        });

        if (c) {
          const calculated = c[other]?.amount;

          if (type === 'purchase') {
            if (other === 'cryptocurrency') {
              setTo(calculated);
            } else {
              setFrom(calculated);
            }
          }

          if (type === 'selling') {
            if (other === 'cryptocurrency') {
              setFrom(calculated);
            } else {
              setTo(calculated);
            }
          }
        }
      }
    },
    DEFERRED_INTERVAL,
  );

  const tradeStart = useTradeStart({
    onFailure: (reason) => {
      setError(t(`error.${reason}`));
    },
  });

  if (advert === undefined || paymethod === undefined || owner === undefined) {
    return (
      <Box display="flex" justifyContent="center" py="20x">
        <Spinner />
      </Box>
    );
  }

  const handleChangeDetails = (d: string) => {
    setError(null);
    setDetails(d);
  };

  const isBuy = advert.type === 'purchase';
  const fiatCcy = getFiatCurrency(paymethod.currency);
  const cryptoCcy = getCryptoCurrency(advert.cryptocurrency);
  const rate = createMoney(advert.rate, fiatCcy);
  const nextRate = createMoney(currentRate, fiatCcy);
  const min = createMoney(advert.limitCurrency.min, fiatCcy);
  const max = createMoney(advert.limitCurrency.max, fiatCcy);
  const cmin = createMoney(advert.limitCryptocurrency.min, cryptoCcy);
  const cmax = createMoney(
    advert.limitCryptocurrency.realMax || advert.limitCryptocurrency.max,
    cryptoCcy,
  );
  const fromCcy = isBuy ? fiatCcy : cryptoCcy;
  const toCcy = isBuy ? cryptoCcy : fiatCcy;

  const balance = p2pWallet && createMoney(p2pWallet?.balance, cryptoCcy);

  const handleChange = async (
    field: 'from' | 'to',
    fieldType: 'currency' | 'cryptocurrency',
    value: string,
    code: string,
  ) => {
    const isFieldTypeCryptocurrency = fieldType === 'cryptocurrency';

    const numericValue = parseNumeric(value, {
      maxFractionDigits: isFieldTypeCryptocurrency ? cryptoCcy.minorUnit : 0,
    });

    if (!numericValue) {
      setTo('');
      setFrom('');
      return;
    }

    setError(null);
    setInputLast(fieldType);

    if (field === 'to') {
      setTo(numericValue);
    } else {
      setFrom(numericValue);
    }

    const moneyInput = createMoney(numericValue, isFieldTypeCryptocurrency ? cryptoCcy : fiatCcy);

    if (moneyInput.isPositive() && !moneyInput.isZero()) {
      const amountType = code;
      const other = isFieldTypeCryptocurrency ? 'currency' : 'cryptocurrency';

      const limitType = isFieldTypeCryptocurrency ? 'limitCryptocurrency' : 'limitCurrency';

      const advertMaxAmount = advert[limitType].realMax ?? advert[limitType].max;
      const advertMinAmount = advert[limitType].min;

      const coin = isFieldTypeCryptocurrency ? advert.cryptocurrency : paymethod.currency;

      const moneyMax = createMoney(
        advertMaxAmount,
        isFieldTypeCryptocurrency ? cryptoCcy : fiatCcy,
      );
      const moneyMin = createMoney(
        advertMinAmount,
        isFieldTypeCryptocurrency ? cryptoCcy : fiatCcy,
      );

      const formatMinMax = (v: Money): string => {
        if (isFieldTypeCryptocurrency) {
          return v.toFormat({
            ...getFormatOptionsByLanguage(lang),
            maxFractionDigits: cryptoCcy.minorUnit,
          });
        }

        return v.toFormat({
          ...getFormatOptionsByLanguage(lang),
          ...getP2PFiatOptionsByCode(coin),
        });
      };

      if (moneyInput.greaterThan(moneyMax)) {
        setError(t('error.limit.max', { max: formatMinMax(moneyMax), coin }));
      }

      if (moneyInput.lessThan(moneyMin)) {
        setError(t('error.limit.min', { min: formatMinMax(moneyMin), coin }));
      }

      calculateDebounced(moneyInput.amount.toString(), amountType, other, advert.type);
    }
  };

  const handleStartTrade = async () => {
    if (isMobileDevice) {
      if (!rateDiffIsOk) {
        toggleRateDiffIsOkMobile();
      }
    }

    const amount = () => {
      if (advert.type === 'purchase') {
        if (inputLast === 'cryptocurrency') {
          return to;
        }
        return from;
      }

      if (advert.type === 'selling') {
        if (inputLast === 'cryptocurrency') {
          return from;
        }
      }

      return to;
    };

    if (!isBuy && !details) {
      setError(t('trade.modal.details.action'));
    } else {
      setError(null);

      const trade = await tradeStart({
        advertId: advert.id,
        amount: amount(),
        amountType: inputLast === 'cryptocurrency' ? advert.cryptocurrency : paymethod.currency,
        rate: advert.rate,
        details: !isBuy ? details : null,
      });

      if (trade && trade.id) {
        history.push(`/p2p/trades/${trade.id}`);
      }
    }
  };

  const handleClickStart = () => {
    const rateDiff = rate.amount.div(nextRate.amount).times(100).sub(100).abs().toNumber();

    if (rateDiff > 20) {
      if (isMobileDevice) {
        setShow(false);
      }

      toggleRateDiffIsOk();
      return;
    }

    handleStartTrade();
  };

  const handleClickStartMobile = () => {
    setShow(true);
  };

  const handleClickCancelMobile = () => {
    setShow(false);
  };

  const traderEl = <AdTrader trader={owner} />;
  const traderInfoEl = <AdTraderInfo trader={owner} />;
  const termsEl = <AdTerms terms={advert.terms} />;

  const yourBalance = !isBuy && balance && (
    <Box
      py="3x"
      px="6x"
      fontSize="medium"
      flexGrow={0}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      bg="paginationItemBgHover"
      borderRadius="1.5x"
    >
      <Box display="flex" justifyContent="space-between">
        <Text variant="h6">{t('Balance')}</Text>
        <MoneyFormat money={balance} />
      </Box>
    </Box>
  );

  const dealInfoEl = (
    <AdInfo
      owner={owner}
      rate={rate}
      cryptocurrency={cryptoCcy}
      currencyMin={min}
      currencyMax={max}
      cryptoCurrencyMax={cmax}
      cryptoCurrencyMin={cmin}
    />
  );

  const inputsEl = (
    <>
      <MoneyInput
        currency={fromCcy.code}
        value={from}
        label={t('You pay')}
        onChange={(value: string) =>
          handleChange('from', isBuy ? 'currency' : 'cryptocurrency', value, fromCcy.code)
        }
        autoFocus
        showIcon={!isBuy}
      />
      <MoneyInput
        currency={toCcy.code}
        value={to}
        label={t('You receive')}
        onChange={(value: string) =>
          handleChange('to', isBuy ? 'cryptocurrency' : 'currency', value, toCcy.code)
        }
        showIcon={isBuy}
      />

      {!isBuy && (
        <DetailsInput
          rows={1}
          details={details}
          onChangeDetails={handleChangeDetails}
          lastDetails={lastDetails}
        />
      )}
    </>
  );

  const tValues = {
    currency: paymethod.currency,
    cryptocurrency: advert.cryptocurrency,
    paymethod: paymethod.description,
    username: advert.owner,
  };
  const header = isBuy ? t('ad.buy', tValues) : t('ad.sell', tValues);

  const startTradeEnabled = from && to && !error;

  const actionBlock = (
    <ActionBlock
      available={advert.available}
      unactiveReason={advert.unactiveReason}
      handleClickStart={handleClickStart}
      startTradeEnabled={startTradeEnabled}
      inputsEl={inputsEl}
    />
  );

  if (isMobileDevice) {
    return (
      <Box display="flex" flexDirection="column" width="full" color="btnPrimaryText">
        <Box className={themeDark} p="6x" backgroundColor="adTrade">
          <Box as="h2" fontSize="lead" fontWeight="strong">
            {header}
          </Box>

          {actionBlock}

          <Box mt="5x" bg="paginationItemBgHover" borderRadius="1.5x" px="5x" py="4x">
            <Box as="h6" fontSize="caption">
              {t('Trader')}
            </Box>
            {traderEl}
          </Box>
          <Box
            mt="3x"
            bg="paginationItemBgHover"
            borderRadius="1.5x"
            px="5x"
            py="4x"
            display="flex"
            flexDirection="column"
            gap="4x"
            fontSize="medium"
          >
            {traderInfoEl}
          </Box>
          <Box mt="5x">
            {advert.available && isLogged && (
              <Button fullWidth onClick={handleClickStartMobile}>
                {t('Start trade')}
              </Button>
            )}
          </Box>
        </Box>
        <Box
          p="5x"
          display="flex"
          flexDirection="column"
          gap="4x"
          backgroundColor="adTradeMobileBackground"
        >
          <Box
            p="6x"
            backgroundColor="adBg"
            borderRadius="1.5x"
            display="flex"
            flexDirection="column"
            gap="3x"
          >
            {dealInfoEl}
          </Box>
          {termsEl}

          <Box p="6x" backgroundColor="adBg" borderRadius="1.5x">
            <CollapsibleText
              title={t('Garantee')}
              titleColor="collapsibleTextTitleColor"
              text={t('ad.trade.info')}
              controlColor="collapsibleTextExpandControlsColorInverse"
            />
          </Box>
        </Box>
        <Modal show={show} onClose={handleClickCancelMobile}>
          <ModalHeader>{t('Start trade')}</ModalHeader>
          <ModalBody>
            <Box display="flex" flexDirection="column" gap="3x">
              {dealInfoEl}
            </Box>
            <Box
              mt="7x"
              flex={1}
              display="flex"
              flexDirection="column"
              gap="4x"
              position="relative"
            >
              {inputsEl}
            </Box>
            {error && <AdError>{error}</AdError>}
          </ModalBody>
          <ModalFooter>
            <Box flexGrow={1} display="flex" flexDirection="column" gap="4x">
              <Button color="secondary" onClick={handleClickStart} disabled={!startTradeEnabled}>
                {t('Confirm')}
              </Button>
              <Button variant="outlined" color="secondary" onClick={handleClickCancelMobile}>
                {t('Cancel')}
              </Button>
            </Box>
          </ModalFooter>
        </Modal>
        {!rateDiffIsOk && (
          <ConfirmDangerRateModal
            cryptoCurrency={cryptoCcy}
            prevRate={rate}
            nextRate={nextRate}
            isBuy={isBuy}
            onClose={toggleRateDiffIsOkMobile}
            onConfirm={handleStartTrade}
          />
        )}
      </Box>
    );
  }

  return (
    <Container maxWidth="xl">
      <Breadcrumbs>
        <BreadcrumbsItem to={`/${lang}/p2p`}>{t('Market')}</BreadcrumbsItem>
        <BreadcrumbsItem>
          {advert.type === AdsType.purchase ? t('Purchase') : t('Selling')}
        </BreadcrumbsItem>
      </Breadcrumbs>

      <Box
        display="flex"
        flexDirection="column"
        backgroundColor="dropdown"
        mb="8x"
        borderRadius="1.5x"
        overflow="hidden"
        color="text"
      >
        <Box className={themeDark} p="6x" backgroundColor="adTrade" color="btnPrimaryText">
          <Box as="h2" fontSize="lead30">
            {header}
          </Box>
          <Box mt="6x" display="flex" gap="6x" flex={1}>
            {actionBlock}
            <Box flex={1} display="flex" flexDirection="column" gap="2x">
              {yourBalance}

              <Box
                py="5x"
                px="6x"
                fontSize="medium"
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                bg="paginationItemBgHover"
                borderRadius="1.5x"
                gap="5x"
              >
                {dealInfoEl}
              </Box>
            </Box>
          </Box>
          {error && <AdError>{error}</AdError>}
        </Box>
        <Box p="6x" display="flex" flexDirection="column" gap="6x">
          <Box p="6x" backgroundColor="adBg" borderRadius="1.5x" display="flex" gap="6x">
            <Box flex={1}>{traderEl}</Box>
            <Box flex={1} display="flex">
              <Box
                pl="6x"
                fontSize="medium"
                flexGrow={1}
                display="flex"
                flexDirection="column"
                gap="4x"
              >
                {traderInfoEl}
              </Box>
            </Box>
          </Box>
          {termsEl}
          <Box display="flex" alignItems="center" gap="6x">
            <ShieldIcon />
            <Text color="secondary">{t('ad.trade.info')}</Text>
          </Box>
        </Box>
      </Box>
      {!rateDiffIsOk && (
        <ConfirmDangerRateModal
          cryptoCurrency={cryptoCcy}
          prevRate={rate}
          nextRate={nextRate}
          isBuy={isBuy}
          onClose={toggleRateDiffIsOk}
          onConfirm={handleStartTrade}
        />
      )}
    </Container>
  );
};
