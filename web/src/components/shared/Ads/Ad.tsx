import { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from 'web/src/components/ui/Box';
import { Text } from 'web/src/components/ui/Text';
import { Container } from 'web/src/components/Container/Container';
import { useSharedT } from 'web/src/components/shared/Adapter';
import { useFetchAdvert } from 'web/src/hooks/data/useFetchAds';
import { useFetchPaymethod } from 'web/src/hooks/data/useFetchPaymethod';
import { Spinner } from 'web/src/components/ui/Spinner';
import ShieldIcon from 'web/src/assets/svg/ShieldIcon.svg';
import TrustIcon from 'web/src/assets/svg/TrustIcon.svg';
import { useFetchUser } from 'web/src/hooks/data/useFetchP2PUser';
import { Tooltip } from 'web/src/components/ui/Tooltip';
import { Button } from 'web/src/components/ui/Button';
import { useLanguage } from 'web/src/components/app/AppContext';
import { MoneyInput } from 'web/src/components/Input/MoneyInput';
import { P2PFiatFormat } from 'web/src/components/money/P2PFiatFormat';
import { useFiatCurrencies } from 'web/src/hooks/data/useFetchP2PCurrencies';
import { useCryptoCurrencies } from 'web/src/hooks/useCryptoCurrencies';
import { createMoney } from 'web/src/helpers/money';
import { P2PMoneyFormat } from 'web/src/components/money/P2PFiatMoney';
import { OnlineStatusByLastActivity } from './OnlineStatus';

interface UrlParams {
  type: 'buy' | 'sell';
  id: string;
}

interface Props {}

export const Ad: FC<Props> = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const t = useSharedT();
  const params = useParams<UrlParams>();
  const lang = useLanguage();
  const { data: advert } = useFetchAdvert(params.id);
  const { data: paymethod } = useFetchPaymethod(advert?.paymethod, lang);
  const { data: owner } = useFetchUser(advert?.owner);
  const { getFiatCurrency } = useFiatCurrencies();
  const { getCryptoCurrency } = useCryptoCurrencies();

  if (advert === undefined || paymethod === undefined || owner === undefined) {
    return (
      <Box display="flex" justifyContent="center" py="20x">
        <Spinner />
      </Box>
    );
  }

  const isBuy = advert.type === 'purchase';

  const tValues = {
    currency: paymethod.currency,
    cryptocurrency: advert.cryptocurrency,
    paymethod: paymethod.description,
    username: advert.owner,
  };

  const fiatCcy = getFiatCurrency(paymethod.currency);
  const cryptoCcy = getCryptoCurrency(advert.cryptocurrency);
  const rate = createMoney(advert.rate, fiatCcy);
  const min = createMoney(advert.limitCurrency.min, fiatCcy);
  const max = createMoney(advert.limitCurrency.max, fiatCcy);
  const fromCcy = isBuy ? fiatCcy : cryptoCcy;
  const toCcy = isBuy ? cryptoCcy : fiatCcy;

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
        <Box p="6x" backgroundColor="adTrade" color="btnPrimaryText">
          <Box as="h2" fontSize="lead30">
            {isBuy ? t('ad.buy', tValues) : t('ad.sell', tValues)}
          </Box>
          <Box mt="6x" display="flex" gap="6x">
            <Box flex={1} display="flex" flexDirection="column" gap="4x">
              <MoneyInput
                currency={fromCcy.code}
                value={from}
                label={t('You pay')}
                onChange={setFrom}
              />
              <MoneyInput
                currency={toCcy.code}
                value={to}
                label={t('You receive')}
                onChange={setTo}
              />
              <Button>{t('Start trade')}</Button>
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
                <Text variant="h6" color="adHeaderText">
                  {t('Deal info')}
                </Text>
                <Box display="flex" justifyContent="space-between">
                  <Text fontSize="medium" color="adHeaderLabel" fontWeight="strong">
                    {t('Rate')}
                  </Text>
                  <P2PMoneyFormat money={rate} cryptoCurrency={cryptoCcy} />
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Text fontSize="medium" color="adHeaderLabel" fontWeight="strong">
                    {t('Limits')}
                  </Text>
                  <span>
                    <P2PFiatFormat money={min} cryptoCurrency={cryptoCcy} /> —{' '}
                    <P2PMoneyFormat money={max} cryptoCurrency={cryptoCcy} />
                  </span>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Text fontSize="medium" color="adHeaderLabel" fontWeight="strong">
                    {t('Bitzlato fee')}
                  </Text>
                  <span>0%</span>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box p="6x" display="flex" flexDirection="column" gap="6x">
          <Box p="6x" backgroundColor="adBg" borderRadius="1.5x">
            <Box display="flex" mb="2x" alignItems="center" gap="2x">
              <Box as="p" fontSize="lead24">
                {advert.owner}
              </Box>
              <Tooltip label={t('Trusted user')} placement="top">
                <div>
                  <Box as={TrustIcon} display="block" />
                </div>
              </Tooltip>
            </Box>
            <OnlineStatusByLastActivity lastActivity={owner.lastActivity} />
          </Box>
          <Box p="6x" backgroundColor="adBg" borderRadius="1.5x">
            <Text variant="title">{t('Trade terms')}</Text>
            <Box marginTop="6x" whiteSpace="pre-line">
              <Text>{advert.terms}</Text>
            </Box>
          </Box>
          <Box display="flex" alignItems="center" gap="6x">
            <ShieldIcon />
            <Text color="secondary">{t('ad.trade.info')}</Text>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};
