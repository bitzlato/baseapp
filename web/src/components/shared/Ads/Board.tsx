import { FC } from 'react';
import { useUser } from 'web/src/components/app/AppContext';
import { Container } from 'web/src/components/ui/Container';
import { Box } from 'web/src/components/ui/Box';
import { Pagination } from 'web/src/components/ui/Pagination';
import { Spinner } from 'web/src/components/ui/Spinner';
import { useAds } from 'web/src/hooks/data/useFetchAds';
import { useP2PFiatCurrencies } from 'web/src/hooks/useP2PFiatCurrencies';
import { AdvertParams } from 'web/src/modules/p2p/types';
import { P2PCryptoCurrencySource } from 'web/src/modules/p2p/wallet-types';
import { useFetchP2PLastFilter } from 'web/src/hooks/data/useFetchP2PLastFilter';
import { P2PFiatCurrencies } from 'web/src/types/currencies.types';
import { useFetchP2PCryptoCurrencies } from 'web/src/hooks/data/p2p/useFetchP2PCryptoCurrencies';
import { Ads } from './Ads';
import { Filter, FilterMobile } from './Filter';
import { useBoardFilter } from './useBoardFilter';
import * as s from './Board.css';

type BoardBodyProps = {
  fiatCurrencies: P2PFiatCurrencies;
  cryptoCurrencies: P2PCryptoCurrencySource[];
  lastFilter?: Partial<AdvertParams> | undefined;
};

export const BoardBody: FC<BoardBodyProps> = ({ fiatCurrencies, cryptoCurrencies, lastFilter }) => {
  const { filterParams, handleChangeFilter } = useBoardFilter({
    fiatCurrencies,
    cryptoCurrencies,
    lastFilter,
  });
  const { data, mutate, isValidating } = useAds(filterParams);

  const handleChangePage = (value: number) => {
    handleChangeFilter({ skip: (value - 1) * filterParams.limit });

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  const handleChangePerPage = (value: number) => {
    handleChangeFilter({ limit: value, skip: 0 });
  };

  const handleRefresh = () => mutate();

  const ads = (
    <>
      <Ads
        data={data?.data}
        fiatSign={fiatCurrencies[filterParams.currency]?.sign ?? ''}
        cryptoSign={filterParams.cryptocurrency}
        isLoading={!data?.data}
        isRefreshing={isValidating}
        onRefresh={handleRefresh}
      />
      {data && (
        <Pagination
          page={filterParams.skip / filterParams.limit + 1}
          total={data.total}
          perPage={filterParams.limit}
          onChange={handleChangePage}
          onChangePerPage={handleChangePerPage}
        />
      )}
    </>
  );

  return (
    <>
      <Box className={s.layoutWithoutSidebar} flexDirection="column" width="full">
        <Box
          backgroundColor="headerBg"
          px="5x"
          py="4x"
          display="flex"
          flexDirection="column"
          gap="4x"
        >
          <FilterMobile params={filterParams} onChange={handleChangeFilter} />
        </Box>
        <Box px="5x" py="4x" backgroundColor="block">
          {ads}
        </Box>
      </Box>
      <Box className={s.layoutWithSidebar} p="8x" width="full" alignItems="flex-start">
        <Box
          className={s.filter}
          backgroundColor="block"
          p="6x"
          borderRadius="1.5x"
          marginRight="6x"
        >
          <Filter params={filterParams} onChange={handleChangeFilter} />
        </Box>
        <Box backgroundColor="block" py="5x" px="6x" borderRadius="1.5x" flexGrow={1}>
          {ads}
        </Box>
      </Box>
    </>
  );
};

export const Board: FC = () => {
  const user = useUser();
  const fiatCurrenciesValue = useP2PFiatCurrencies();
  const cryptoCurrenciesValue = useFetchP2PCryptoCurrencies();
  const lastFilterValue = useFetchP2PLastFilter();

  return (
    <Container maxWidth="fullhd">
      {fiatCurrenciesValue.fiatCurrencies === undefined ||
      cryptoCurrenciesValue.data === undefined ||
      (lastFilterValue.data === undefined && user) ? (
        <Box display="flex" justifyContent="center" py="20x" width="full">
          <Spinner />
        </Box>
      ) : (
        <BoardBody
          fiatCurrencies={fiatCurrenciesValue.fiatCurrencies}
          cryptoCurrencies={cryptoCurrenciesValue.data}
          lastFilter={lastFilterValue.data}
        />
      )}
    </Container>
  );
};
