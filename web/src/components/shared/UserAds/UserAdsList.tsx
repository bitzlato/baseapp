import { FC } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { Button } from 'web/src/components/ui/Button';
import { Text } from 'web/src/components/ui/Text';
import { useAdapterContext } from 'web/src/components/shared/Adapter';
import {
  AdsTable,
  AdsTableBody,
  AdsTableHeader,
} from 'web/src/components/shared/AdsTable/AdsTable';
import { AdsTableHeaderColumn } from 'web/src/components/shared/AdsTable/AdsTableColumn';
import { useAppContext } from 'web/src/components/app/AppContext';
import { UserAdvert } from 'web/src/modules/p2p/types';
import { UserAdsListItem } from 'web/src/components/shared/UserAds/UserAdsListItem';
import { Spinner } from 'web/src/components/ui/Spinner';
import RefreshIcon from 'web/src/assets/svg/RefreshIcon.svg';
import { UserAdsFilterParams } from './UserAdsFilter';
import { UserAdsTradingStatusSwitch } from './UserAdsTradingStatusSwitch';

interface Props {
  data?: UserAdvert[] | undefined;
  params: UserAdsFilterParams;
  isLoading?: boolean;
  isRefreshing?: boolean;
  onRefresh?: () => void;
}

export const UserAdsList: FC<Props> = ({
  data,
  params,
  isLoading = false,
  isRefreshing = false,
  onRefresh,
}) => {
  const { isMobileDevice } = useAppContext();
  const { t, Link } = useAdapterContext();

  const isEmpty = !data || data.length === 0;
  const isAllEnabled = data?.every((ad) => ad.status === 'active') ?? false;

  const buttonRefresh = (
    <Button variant="text" color="clarified" size="small" onClick={onRefresh}>
      <Box as="span" mr="2x">
        {isRefreshing ? <Spinner size="4x" /> : <Box as={RefreshIcon} display="block" />}
      </Box>
      {t('Refresh')}
    </Button>
  );

  const header = isMobileDevice ? (
    <Box mb="4x">{buttonRefresh}</Box>
  ) : (
    <AdsTableHeader>
      <AdsTableHeaderColumn size="small">{t('Type')}</AdsTableHeaderColumn>
      <AdsTableHeaderColumn size="small">{t('Currency')}</AdsTableHeaderColumn>
      <AdsTableHeaderColumn size="small">{t('Payment method')}</AdsTableHeaderColumn>
      <AdsTableHeaderColumn size="small">{t('Rate')}</AdsTableHeaderColumn>
      <AdsTableHeaderColumn size="small">{t('Limits')}</AdsTableHeaderColumn>
      <AdsTableHeaderColumn size={isEmpty ? 'small' : 'large'}>
        {isEmpty ? (
          buttonRefresh
        ) : (
          <UserAdsTradingStatusSwitch
            type={params.type}
            cryptocurrency={params.cryptocurrency}
            isEnabled={isAllEnabled}
          />
        )}
      </AdsTableHeaderColumn>
    </AdsTableHeader>
  );

  const emptyContent = (
    <Box textAlign="center" py="20x" px="4x">
      <Box mb="6x">
        <Box
          as={Text}
          variant="label"
          fontWeight="medium"
          display="flex"
          flexDirection="column"
          textAlign="center"
        >
          <span>{t('userAds.empty1')}</span>
          <span>{t('userAds.empty2')}</span>
        </Box>
      </Box>
      <Button as={Link} to="/p2p/adverts/create">
        {t('Create advert')}
      </Button>
    </Box>
  );

  return (
    <AdsTable header={header} emptyContent={emptyContent} isLoading={isLoading}>
      {data && data.length > 0 && (
        <AdsTableBody>
          {data.map((ad) => (
            <UserAdsListItem key={ad.id} ad={ad} />
          ))}
        </AdsTableBody>
      )}
    </AdsTable>
  );
};
