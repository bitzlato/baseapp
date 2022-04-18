/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-prop-types */
import { FC, useState } from 'react';
import { useFetchAds } from 'web/src/hooks/data/useFetchAds';
import { AdvertisementsParams } from 'web/src/modules/p2p/ad-types';
import { useAppContext } from 'web/src/components/app/AppContext';
import { createT } from 'web/src/components/shared/sharedI18n';
import { Box } from 'web/src/components/ui/Box';
import { Text } from 'web/src/components/ui/Text';
import { Button } from 'web/src/components/ui/Button';
import { Stack } from 'web/src/components/ui/Stack';
import { createCcy, createMoney } from 'web/src/helpers/money';
import { AmountFormat } from 'web/src/components/AmountFormat/AmountFormat';
import { Pagination } from 'web/src/components/ui/Pagination';
import { ads, col1, col2, col3, col4, col5 } from './Ads.css';

interface Props extends Omit<AdvertisementsParams, 'skip' | 'lang' | 'limit'> {}

export const Ads: FC<Props> = (p) => {
  const limit = 15;
  const [page, setPage] = useState(0);

  const { lang } = useAppContext();

  const t = createT(lang);

  const resp = useFetchAds({
    limit,
    skip: page * limit,
    lang,
    ...p,
  });

  const handleChangePage = (value: number) => {
    setPage(value);
    resp.mutate();
  };

  const total = resp.data?.total ?? 0;
  const data = resp.data?.data ?? [];
  const isSell = p.type === 'selling';

  return (
    <Box backgroundColor="dropdown">
      <Box display="flex" alignItems="center" justifyContent="space-between" height="20x" px="4x">
        <Text color="secondary" className={col1}>
          {t('Traider')}
        </Text>
        <Text color="secondary" className={col2}>
          {t('Payment method')}
        </Text>
        <Text color="secondary" className={col3}>
          {t('Rate')}
        </Text>
        <Text color="secondary" className={col4}>
          {t('Limits')}
        </Text>
        <Text color="secondary" className={col5} />
      </Box>
      <Stack className={ads} direction="column" marginBottom="4x">
        {data.map((d) => {
          const ccy = createCcy(d.currency, 2);
          return (
            <Box
              key={d.id}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              height="20x"
              px="4x"
              backgroundColor="adBg"
              borderRadius="1.5x"
            >
              <Text className={col1}>{d.owner}</Text>
              <Text className={col2}>{d.paymethod.name}</Text>
              <Text className={col3}>
                <AmountFormat money={createMoney(d.rate, ccy)} maxFractionDigits={0} />
              </Text>
              <Text className={col4}>
                <AmountFormat money={createMoney(d.limitCurrency.min, ccy)} maxFractionDigits={0} />{' '}
                -{' '}
                <AmountFormat money={createMoney(d.limitCurrency.max, ccy)} maxFractionDigits={0} />
              </Text>
              <div className={col5}>
                <Button fullWidth>{isSell ? t('Sell') : t('Buy')}</Button>
              </div>
            </Box>
          );
        })}
        <Pagination total={total} limit={limit} onChange={handleChangePage} />
      </Stack>
    </Box>
  );
};
