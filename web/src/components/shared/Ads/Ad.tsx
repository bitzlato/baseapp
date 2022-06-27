import { FC, useState } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { Text } from 'web/src/components/ui/Text';
import { Container } from 'web/src/components/Container/Container';
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
import { AdStat } from './AdStat';

interface UrlParams {
  type: 'buy' | 'sell';
  id: string;
}

export const Ad: FC = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const [show, setShow] = useState(false);

  const { t, params } = useAdapterContext<UrlParams>();
  const { lang, isMobileDevice } = useAppContext();
  const { data: advert } = useFetchAdvert(params.id);
  const { data: paymethod } = useFetchPaymethod(advert?.paymethod, lang);
  const traderInfoSWR = useFetchTraderInfo(advert?.owner);
  const { data: owner } = traderInfoSWR;
  const { getFiatCurrency } = useFiatCurrencies();
  const { getCryptoCurrency } = useCryptoCurrencies();
  const changeTrust = useTrustUser(traderInfoSWR);

  const calculateAmount = useTradeEstimate();

  const calculateDebounced = useDebouncedCallback(
    async (amount: string, amountType: string, other: 'currency' | 'cryptocurrency') => {
      if (advert && paymethod) {
        const c = await calculateAmount({
          advertId: advert.id,
          amount,
          amountType,
          rate: advert.rate,
        });

        if (c) {
          const calculated = c[other]?.amount;
          if (other === 'cryptocurrency') {
            setTo(calculated);
          } else {
            setFrom(calculated);
          }
        }
      }
    },
    500,
  );

  if (advert === undefined || paymethod === undefined || owner === undefined) {
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
  const min = createMoney(advert.limitCurrency.min, fiatCcy);
  const max = createMoney(advert.limitCurrency.max, fiatCcy);
  const fromCcy = isBuy ? fiatCcy : cryptoCcy;
  const toCcy = isBuy ? cryptoCcy : fiatCcy;
  const deals =
    owner.dealStats.find((v) => v.cryptocurrency === 'common') ??
    ({ successDeals: 0, canceledDeals: 0 } as DealStat);

  const handleChange = async (field: 'currency' | 'cryptocurrency', value: string) => {
    const amount = parseNumeric(value);

    if (field === 'currency') {
      setFrom(amount);
    } else {
      setTo(amount);
    }
    if (amount) {
      const amountType = field === 'currency' ? paymethod?.currency : advert.cryptocurrency;
      const other = field === 'currency' ? 'cryptocurrency' : 'currency';
      calculateDebounced(amount, amountType, other);
    }
  };

  const handleClickTrusted = () => {
    changeTrust({ publicName: owner.name, flag: !owner.trusted });
  };

  const handleClickStart = () => {};

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

  const dealInfoEl = (
    <>
      <Text variant="h6">{t('Deal info')}</Text>
      <AdStat label={t('Rate')}>
        <P2PMoneyFormat money={rate} cryptoCurrency={cryptoCcy} />
      </AdStat>
      <AdStat label={t('Limits')}>
        <span>
          <P2PFiatFormat money={min} cryptoCurrency={cryptoCcy} /> —{' '}
          <P2PMoneyFormat money={max} cryptoCurrency={cryptoCcy} />
        </span>
      </AdStat>
      <AdStat label={t('Bitzlato fee')}>0%</AdStat>
    </>
  );

  const inputsEl = (
    <>
      <MoneyInput
        currency={fromCcy.code}
        value={from}
        label={t('You pay')}
        onChange={(value: string) => handleChange(isBuy ? 'currency' : 'cryptocurrency', value)}
        autoFocus
      />
      <MoneyInput
        currency={toCcy.code}
        value={to}
        label={t('You receive')}
        onChange={(value: string) => handleChange(isBuy ? 'cryptocurrency' : 'currency', value)}
      />
    </>
  );

  const tValues = {
    currency: paymethod.currency,
    cryptocurrency: advert.cryptocurrency,
    paymethod: paymethod.description,
    username: advert.owner,
  };
  const header = isBuy ? t('ad.buy', tValues) : t('ad.sell', tValues);

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
            <Button fullWidth onClick={handleClickStartMobile}>
              {t('Start trade')}
            </Button>
          </Box>
        </Box>
        <Box p="5x" display="flex" flexDirection="column" gap="4x">
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
            {t('ad.trade.info')}
          </Box>
        </Box>
        <Modal show={show} onClose={handleClickCancelMobile}>
          <ModalHeader>{t('Start trade')}</ModalHeader>
          <ModalBody>
            <Box display="flex" flexDirection="column" gap="3x">
              {dealInfoEl}
            </Box>
            <Box mt="7x" flex={1} display="flex" flexDirection="column" gap="4x">
              {inputsEl}
            </Box>
          </ModalBody>
          <ModalFooter>
            <Box flexGrow={1} display="flex" flexDirection="column" gap="4x">
              <Button color="secondary" onClick={handleClickStart}>
                {t('Confirm')}
              </Button>
              <Button variant="outlined" color="secondary" onClick={handleClickCancelMobile}>
                {t('Cancel')}
              </Button>
            </Box>
          </ModalFooter>
        </Modal>
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
            <Box flex={1} display="flex" flexDirection="column" gap="4x">
              {inputsEl}
              <Button onClick={handleClickStart}>{t('Start trade')}</Button>
            </Box>
            <Box flex={1} bg="paginationItemBgHover" borderRadius="1.5x" display="flex">
              <Box
                py="5x"
                px="6x"
                fontSize="medium"
                flexGrow={1}
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
              >
                {dealInfoEl}
              </Box>
            </Box>
          </Box>
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
    </Container>
  );
};
