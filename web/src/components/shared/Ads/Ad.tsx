import { FC, useState } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { Text } from 'web/src/components/ui/Text';
import { Container } from 'web/src/components/ui/Container';
import { useAdapterContext } from 'web/src/components/shared/Adapter';
import { useFetchAdvert } from 'web/src/hooks/data/useFetchAds';
import { useFetchPaymethod } from 'web/src/hooks/data/useFetchPaymethod';
import { Spinner } from 'web/src/components/ui/Spinner';
import ShieldIcon from 'web/src/assets/svg/ShieldIcon.svg';
import LikeIcon from 'web/src/assets/svg/ThumbUp.svg';
import UnLikeIcon from 'web/src/assets/svg/ThumbDown.svg';
import VerifiedIcon from 'web/src/assets/svg/VerifiedIcon.svg';
import { Tooltip } from 'web/src/components/ui/Tooltip';
import { Button } from 'web/src/components/ui/Button';
import { useAppContext } from 'web/src/components/app/AppContext';
import { MoneyInput } from 'web/src/components/TextInputCustom/MoneyInputCustom';
import { P2PFiatFormat } from 'web/src/components/money/P2PFiatFormat';
import { useFiatCurrencies } from 'web/src/hooks/data/useFetchP2PCurrencies';
import { useCryptoCurrencies } from 'web/src/hooks/useCryptoCurrencies';
import { createMoney } from 'web/src/helpers/money';
import { P2PMoneyFormat } from 'web/src/components/money/P2PFiatMoney';
import { parseNumeric } from 'web/src/helpers/parseNumeric';
import { DealStat } from 'web/src/modules/p2p/user.types';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'web/src/components/ui/Modal';
import { OnlineStatusByLastActivity } from 'web/src/components/ui/OnlineStatus';
import { ActionOnTraderButton } from 'web/src/components/p2p/ActionOnTraderButton';
import { themeDark } from 'web/src/theme/vars.css';
import { useFetchTraderInfo } from 'web/src/hooks/data/useFetchTraderInfo';
import { useTrustUser } from 'web/src/hooks/mutations/useTrustUser';
import { useTradeEstimate } from 'web/src/hooks/data/useTradeEstimate';
import { useDebouncedCallback } from 'use-debounce';
import { useFetchLastRequisites } from 'web/src/hooks/data/useFetchTrade';
import { useFetchP2PWallet } from 'web/src/hooks/data/useFetchP2PWallets';
import { MoneyFormat } from 'web/src/components/MoneyFormat/MoneyFormat';
import { useTradeStart } from 'web/src/hooks/mutations/useTradeUpdateState';
import { AdvertType } from 'web/src/modules/p2p/types';
import { WarningIcon } from 'web/src/mobile/assets/images/WarningIcon';
import WarningTriangleIcon from 'web/src/assets/svg/WarningTriangleIcon.svg';
import { DetailsInput } from 'web/src/components/TextInputCustom/DetailsInput';
import { useFetchRate } from 'web/src/hooks/data/useFetchRate';
import { AdStat } from './AdStat';
import { ConfirmDangerRateModal } from './RateDiffModal';

interface UrlParams {
  type: 'buy' | 'sell';
  id: string;
}

const DEFERRED_INTERVAL = 300;

const ErrorBlock: FC<{ text: string }> = ({ text }) => (
  <Box display="flex" alignItems="center" mt="3x">
    <WarningIcon />
    <Text fontWeight="strong">{text}</Text>
  </Box>
);

const WarningBlock: FC<{ unactiveReason: string }> = ({ unactiveReason }) => (
  <Box display="flex" flexDirection="column" py="13x" justifyContent="center" alignItems="center">
    <WarningTriangleIcon />
    <Text>{unactiveReason}</Text>
  </Box>
);

export const Ad: FC = () => {
  const { lang, isMobileDevice } = useAppContext();

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
  const { getFiatCurrency } = useFiatCurrencies();
  const { getCryptoCurrency } = useCryptoCurrencies();
  const changeTrust = useTrustUser(traderInfoSWR);

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

  if (
    advert === undefined ||
    paymethod === undefined ||
    owner === undefined ||
    p2pWallet === undefined
  ) {
    return (
      <Box display="flex" justifyContent="center" py="20x">
        <Spinner />
      </Box>
    );
  }

  const isBuy = advert.type === 'purchase';
  const fiatCcy = getFiatCurrency(paymethod.currency);
  const cryptoCcy = getCryptoCurrency(advert.cryptocurrency);
  const rate = createMoney(advert.rate, fiatCcy);
  const nextRate = createMoney(currentRate, fiatCcy);
  const min = createMoney(advert.limitCurrency.min, fiatCcy);
  const max = createMoney(advert.limitCurrency.max, fiatCcy);
  const fromCcy = isBuy ? fiatCcy : cryptoCcy;
  const toCcy = isBuy ? cryptoCcy : fiatCcy;
  const deals =
    owner.dealStats.find((v) => v.cryptocurrency === 'common') ??
    ({ successDeals: 0, canceledDeals: 0 } as DealStat);

  const balance = createMoney(p2pWallet.balance, cryptoCcy);

  const handleChange = async (
    field: 'from' | 'to',
    fieldType: 'currency' | 'cryptocurrency',
    value: string,
    code: string,
  ) => {
    setError(null);
    setInputLast(fieldType);

    const amount = parseNumeric(value);

    if (field === 'to') {
      setTo(amount);
    } else {
      setFrom(amount);
    }

    if (amount) {
      const amountType = code;
      const other = fieldType === 'cryptocurrency' ? 'currency' : 'cryptocurrency';
      calculateDebounced(amount, amountType, other, advert.type);
    }
  };

  const handleClickTrusted = () => {
    changeTrust({ publicName: owner.name, flag: !owner.trusted });
  };

  const handleStartTrade = async () => {
    if (isMobileDevice) {
      toggleRateDiffIsOkMobile();
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

  const traderEl = (
    <Box>
      <Box display="flex" alignItems="center" gap="2x">
        <Box as="p" fontSize="lead24">
          {advert.owner}
        </Box>
        {owner.verification && (
          <Tooltip label={t('Verified user')} placement="top">
            <div>
              <VerifiedIcon width="22" height="22" />
            </div>
          </Tooltip>
        )}
      </Box>
      <OnlineStatusByLastActivity lastActivity={owner.lastActivity} />
    </Box>
  );

  const labelColor = isMobileDevice ? 'text' : undefined;
  const traderInfoEl = (
    <>
      <AdStat labelColor={labelColor} label={t('Rating')}>
        <Box display="flex" alignItems="center" gap="5x">
          <Box display="flex" alignItems="center" gap="1x">
            <Box as={LikeIcon} color="statIcon" />
            <span>{owner.feedbacks.find((v) => v.type === 'thumb_up')?.count ?? 0}</span>
          </Box>
          <Box display="flex" alignItems="center" gap="1x">
            <Box as={UnLikeIcon} color="statIcon" />
            <span>{owner.feedbacks.find((v) => v.type === 'hankey')?.count ?? 0}</span>
          </Box>
          <span>{owner.rating}</span>
        </Box>
      </AdStat>
      <AdStat labelColor={labelColor} label={t('Reputation')}>
        {owner.safetyIndex}
      </AdStat>
      <AdStat labelColor={labelColor} label={t('Successful deals')}>
        {deals.successDeals}
      </AdStat>
      <AdStat labelColor={labelColor} label={t('Canceled deals')}>
        {deals.canceledDeals}
      </AdStat>
    </>
  );

  const termsEl = (
    <Box p="6x" backgroundColor="adBg" borderRadius="1.5x">
      <Text variant="title">{t('Trade terms')}</Text>
      <Box marginTop="6x" whiteSpace="pre-line">
        {advert.terms ? (
          <Text>{advert.terms}</Text>
        ) : (
          <Text
            color="secondary"
            textTransform="uppercase"
            fontWeight="strong"
            fontSize="medium"
            textAlign="center"
          >
            {t('Missing.plural')}
          </Text>
        )}
      </Box>
    </Box>
  );

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
    <>
      <Text variant="h6">{t('Deal info')}</Text>
      <AdStat label={t('Rate')}>
        <Text>
          <P2PMoneyFormat money={rate} cryptoCurrency={cryptoCcy} />
        </Text>
      </AdStat>
      <AdStat label={t('Limits')}>
        <Text>
          <P2PFiatFormat money={min} cryptoCurrency={cryptoCcy} /> —{' '}
          <P2PMoneyFormat money={max} cryptoCurrency={cryptoCcy} />
        </Text>
      </AdStat>
      <AdStat label={t('Bitzlato fee')}>
        <Text>0%</Text>
      </AdStat>
    </>
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
      />
      <MoneyInput
        currency={toCcy.code}
        value={to}
        label={t('You receive')}
        onChange={(value: string) =>
          handleChange('to', isBuy ? 'cryptocurrency' : 'currency', value, toCcy.code)
        }
      />

      {!isBuy && (
        <DetailsInput
          rows={1}
          details={details}
          onChangeDetails={setDetails}
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

  let reason = null;
  switch (advert.unactiveReason) {
    case 'blacklisted':
      reason = t('reasonBlacklisted');
      break;
    case 'partner_not_enough_funds':
      reason = t('reasonPartnerNotEnoughFunds');
      break;
    case 'not_enough_funds':
      reason = t('reasonNotEnoughFunds');
      break;
    case 'verified_only':
      reason = t('reasonVerifiedOnly');
      break;
    case 'trade_with_yourself':
      reason = t('reasonTradeWithYourself');
      break;
    case 'blacklisted_by_you':
      reason = t('reasonBlacklistedByYou');
      break;
    default:
      reason = t('notAvailable');
  }

  if (isMobileDevice) {
    return (
      <Box display="flex" flexDirection="column" width="full" color="btnPrimaryText">
        <Box className={themeDark} p="6x" backgroundColor="adTrade">
          <Box as="h2" fontSize="lead" fontWeight="strong">
            {header}
          </Box>
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
            {advert.available ? (
              <Button fullWidth onClick={handleClickStartMobile}>
                {t('Start trade')}
              </Button>
            ) : (
              <WarningBlock unactiveReason={reason} />
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
          {termsEl}
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
          <Box p="6x" backgroundColor="adBg" borderRadius="1.5x">
            <Text>{t('ad.trade.info')}</Text>
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
            {error && <ErrorBlock text={error} />}
          </ModalBody>
          <ModalFooter>
            <Box flexGrow={1} display="flex" flexDirection="column" gap="4x">
              <Button color="secondary" onClick={handleClickStart} disabled={!(from && to)}>
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
      <Box
        display="flex"
        flexDirection="column"
        backgroundColor="dropdown"
        m="8x"
        borderRadius="1.5x"
        overflow="hidden"
        color="text"
      >
        <Box className={themeDark} p="6x" backgroundColor="adTrade" color="btnPrimaryText">
          <Box as="h2" fontSize="lead30">
            {header}
          </Box>
          <Box mt="6x" display="flex" gap="6x">
            <Box flex={1} display="flex" flexDirection="column" gap="4x" position="relative">
              {advert.available ? (
                <>
                  {inputsEl}
                  <Button onClick={handleClickStart} disabled={!(from && to)}>
                    {t('Start trade')}
                  </Button>
                </>
              ) : (
                <WarningBlock unactiveReason={reason} />
              )}
            </Box>
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
          {error && <ErrorBlock text={error} />}
        </Box>
        <Box p="6x" display="flex" flexDirection="column" gap="6x">
          <Box p="6x" backgroundColor="adBg" borderRadius="1.5x" display="flex" gap="6x">
            <Box flex={1} display="flex">
              <Box display="flex" flexDirection="column" justifyContent="space-between">
                {traderEl}
                <ActionOnTraderButton
                  variant="trust"
                  active={owner.trusted ?? false}
                  title={t('Add to trusted')}
                  activeTitle={t('Remove from trusted')}
                  onClick={handleClickTrusted}
                />
              </Box>
            </Box>
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
