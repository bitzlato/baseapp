import { FC } from 'react';
import { KeyedMutator } from 'swr';
import { FetchError } from 'web/src/helpers/fetch';
import { useUpdateUserAd } from 'web/src/hooks/mutations/useUpdateUserAd';
import { UserAdvertDetails, UserAdvertSource } from 'web/src/modules/p2p/types';
import { Box } from 'web/src/components/ui/Box';
import { Text } from 'web/src/components/ui/Text';
import { SwitchField } from 'web/src/components/shared/UserAds/SwitchField';
import { useAppContext } from 'web/src/components/app/AppContext';
import { useAdapterContext } from 'web/src/components/shared/Adapter';
import { UserAdBlock } from './UserAdBlock';
import { UserAdUnactiveAlert } from './UserAdUnactiveAlert';

interface Props {
  ad: UserAdvertDetails;
  mutateAd: KeyedMutator<UserAdvertSource>;
}

export const UserAdStatusStep: FC<Props> = ({ ad, mutateAd }) => {
  const { t } = useAdapterContext();
  const { isMobileDevice, lang } = useAppContext();
  const [updateUserAd, { status }] = useUpdateUserAd(lang);
  const isActive = ad.status === 'active';

  const handleUpdateStatus = async () => {
    try {
      await updateUserAd({ id: ad.id, values: { status: isActive ? 'pause' : 'active' } });
      mutateAd();
    } catch (error) {
      if (error instanceof FetchError) {
        switch (error.payload.code) {
          default:
            break;
        }
      }
    }
  };

  return (
    <UserAdBlock
      title={t('Status')}
      right={
        <SwitchField
          id="enable_advert"
          label={
            <Text variant="body" fontStyle="italic">
              {isActive ? t('userAds.status.active') : t('userAds.status.inactive')}
            </Text>
          }
          labelPosition="right"
          isLoading={status === 'running'}
          value={isActive}
          onChange={handleUpdateStatus}
        />
      }
      error={isMobileDevice ? ad.unactiveReason : undefined}
      customError={
        <Box display={{ mobile: 'block', tablet: 'none' }} mt={{ mobile: '3x', tablet: '0' }}>
          <UserAdUnactiveAlert ad={ad} />
        </Box>
      }
    />
  );
};
