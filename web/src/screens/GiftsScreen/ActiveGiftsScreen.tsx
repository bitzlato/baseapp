import { FC, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Adapter } from 'web/src/components/shared/Adapter';
import { Breadcrumbs, BreadcrumbsItem } from 'web/src/components/ui/Breadcrumbs';
import { Container } from 'web/src/components/ui/Container';
import { Box } from 'web/src/components/ui/Box';
import { Card } from 'web/src/components/ui/Card';
import { Button } from 'web/src/components/ui/Button';
import { Text } from 'web/src/components/ui/Text';
import { useDocumentTitle } from 'src/hooks/useDocumentTitle';
import { useT } from 'web/src/hooks/useT';
import { GiftsNavigation } from 'web/src/components/Gifts/GiftsNavigation';
import { Table, TableHeader, TableBody } from 'web/src/components/Gifts/Table';
import { TableHeaderColumn } from 'web/src/components/Gifts/TableColumn';
import { useFetchMyVouchers } from 'web/src/hooks/data/useFetchVouchers';
import { Pagination, PER_PAGE_DEFAULT } from 'web/src/components/ui/Pagination';
import { GiftItem } from 'web/src/components/Gifts/GiftItem';
import { P2PVoucher } from 'web/src/modules/account/voucher-types';
import { GiftDeletedModal } from 'web/src/components/Gifts/GiftDeletedModal';
import { useIsMobileDevice } from 'web/src/components/app/AppContext';
import * as s from './GiftsScreen.css';

type Params = {
  skip: number;
  limit: number;
};

const DEFAULT_PARAMS = {
  skip: 0,
  limit: PER_PAGE_DEFAULT,
} as const;

export const ActiveGiftsScreen: FC = () => {
  useDocumentTitle('Active Gifts');
  const t = useT();
  const history = useHistory();
  const isMobileDevice = useIsMobileDevice();
  const [params, setParams] = useState<Params>(DEFAULT_PARAMS);
  const { data, mutate: mutateVouchers } = useFetchMyVouchers(params);
  const [deletedGift, setDeletedGift] = useState<P2PVoucher | null | undefined>();

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

  const handleDeleteGift = async (gift: P2PVoucher) => {
    mutateVouchers();
    setDeletedGift(gift);
  };

  const handleEditGift = async () => {
    mutateVouchers();
  };

  const header = isMobileDevice ? null : (
    <TableHeader>
      <TableHeaderColumn size="medium">
        <Box pl="6x">
          <Text variant="caption" fontWeight="strong">
            {t('Date')}
          </Text>
        </Box>
      </TableHeaderColumn>
      <TableHeaderColumn size="medium">
        <Text variant="caption" fontWeight="strong">
          {t('Gift type')}
        </Text>
      </TableHeaderColumn>
      <TableHeaderColumn size="medium">
        <Text variant="caption" fontWeight="strong">
          {t('Amount')}
        </Text>
      </TableHeaderColumn>
      <TableHeaderColumn size="medium">
        <Text variant="caption" fontWeight="strong">
          {t('Comment')}
        </Text>
      </TableHeaderColumn>
      <TableHeaderColumn size="medium">
        <Text variant="caption" fontWeight="strong">
          {t('Status')}
        </Text>
      </TableHeaderColumn>
      <TableHeaderColumn size="small" />
    </TableHeader>
  );

  const emptyContent = (
    <Box display="flex" flexDirection="column" alignItems="center" py="15x">
      <Text color="textMuted" textAlign="center" fontWeight="medium">
        {t('gifts.emptyActiveGifts')}
      </Text>

      <Box mt="5x">
        <Button as={Link} to="/gifts">
          {t('gifts.createGift')}
        </Button>
      </Box>
    </Box>
  );

  return (
    <Adapter Link={Link} history={history}>
      <Box px="8x">
        <Breadcrumbs>
          <BreadcrumbsItem>{t('Gifts')}</BreadcrumbsItem>
          <BreadcrumbsItem>{t('gifts.activeGifts')}</BreadcrumbsItem>
        </Breadcrumbs>
      </Box>
      <Container maxWidth="xl" my="6x">
        <Card
          display="flex"
          flexDirection="column"
          pt="6x"
          pb="9x"
          px={{ tablet: '6x', desktop: '15x' }}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            px={{ mobile: '5x', tablet: '0' }}
          >
            <Text variant="h4">{t('gifts.activeGifts')}</Text>
            <Box display={{ mobile: 'none', tablet: 'block' }}>
              <GiftsNavigation />
            </Box>
          </Box>

          <Box
            className={s.notice}
            as={Text}
            variant="body"
            color="textMuted"
            mt={{ mobile: '3x', tablet: '2x', desktop: '1x' }}
            px={{ mobile: '5x', tablet: '0' }}
          >
            {t('gifts.activeGifts.notice')}
          </Box>

          <Box
            pt={{ mobile: '5x', tablet: '15x', desktop: '25x' }}
            pb="7x"
            px={{ mobile: '4x', tablet: '0' }}
          >
            <Table header={header} isLoading={!data?.data} emptyContent={emptyContent}>
              {data && data.data.length > 0 && (
                <TableBody>
                  {data.data.map((gift) => {
                    return (
                      <GiftItem
                        key={gift.deepLinkCode}
                        gift={gift}
                        onDelete={handleDeleteGift}
                        onEdit={handleEditGift}
                      />
                    );
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
          </Box>
        </Card>
      </Container>

      {deletedGift ? (
        <GiftDeletedModal gift={deletedGift} onClose={() => setDeletedGift(null)} />
      ) : null}
    </Adapter>
  );
};
