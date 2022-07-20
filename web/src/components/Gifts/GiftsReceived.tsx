import { FC, useState } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { Text } from 'web/src/components/ui/Text';
import { useT } from 'web/src/hooks/useT';
import { Table, TableHeader, TableBody } from 'web/src/components/Gifts/Table';
import { TableHeaderColumn } from 'web/src/components/Gifts/TableColumn';
import { useFetchICashedVouchers } from 'web/src/hooks/data/useFetchVouchers';
import { Pagination, PER_PAGE_DEFAULT } from 'web/src/components/ui/Pagination';
import { useIsMobileDevice } from 'web/src/components/app/AppContext';
import { GiftsReceivedItem } from './GiftsReceivedItem';

type Params = {
  skip: number;
  limit: number;
};

const DEFAULT_PARAMS = {
  skip: 0,
  limit: PER_PAGE_DEFAULT,
} as const;

export const GiftsReceived: FC = () => {
  const t = useT();
  const isMobileDevice = useIsMobileDevice();
  const [params, setParams] = useState<Params>(DEFAULT_PARAMS);
  const { data } = useFetchICashedVouchers(params);

  const handleUpdateParams = (upd: Partial<Params>) => {
    setParams((current) => ({ ...current, ...upd }));
  };

  const handleChangePage = (value: number) => {
    handleUpdateParams({ skip: (value - 1) * params.limit });

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleChangePerPage = (value: number) => {
    handleUpdateParams({ limit: value, skip: 0 });
  };

  const header = isMobileDevice ? null : (
    <TableHeader>
      <TableHeaderColumn size="medium">
        <Box pl="4x">
          <Text variant="caption" fontWeight="strong">
            {t('Date')}
          </Text>
        </Box>
      </TableHeaderColumn>
      <TableHeaderColumn size="medium">
        <Text variant="caption" fontWeight="strong">
          {t('Amount')}
        </Text>
      </TableHeaderColumn>
      <TableHeaderColumn size="medium">
        <Text variant="caption" fontWeight="strong">
          {t('Sender')}
        </Text>
      </TableHeaderColumn>
    </TableHeader>
  );

  const emptyContent = (
    <Box display="flex" flexDirection="column" alignItems="center" py="15x">
      <Text color="textMuted" textAlign="center" fontWeight="medium">
        {t('gifts.emptyReceivedGifts')}
      </Text>
    </Box>
  );

  return (
    <>
      <Table header={header} isLoading={!data?.data} emptyContent={emptyContent}>
        {data && data.data.length > 0 && (
          <TableBody>
            {data.data.map((gift) => {
              return <GiftsReceivedItem key={gift.deepLinkCode} gift={gift} />;
            })}
          </TableBody>
        )}
      </Table>

      {data && (
        <Pagination
          page={params.skip / params.limit + 1}
          total={data.total}
          perPage={params.limit}
          onChange={handleChangePage}
          onChangePerPage={handleChangePerPage}
        />
      )}
    </>
  );
};
