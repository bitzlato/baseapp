import { FC } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { Text } from 'web/src/components/ui/Text';
import { Tooltip } from 'web/src/components/ui/Tooltip';
import { useUpdateAdsTradingStatus } from 'web/src/hooks/mutations/useUpdateAdsTradingStatus';
import { AdvertType } from 'web/src/modules/p2p/types';
import { useAdapterContext } from 'web/src/components/shared/Adapter';
import { useAppContext } from 'web/src/components/app/AppContext';
import { SwitchField } from './SwitchField';
import * as s from './UserAdsTradingStatusSwitch.css';

interface Props {
  type: AdvertType;
  cryptocurrency: string;
  isEnabled: boolean;
}

export const UserAdsTradingStatusSwitch: FC<Props> = ({ type, cryptocurrency, isEnabled }) => {
  const { lang } = useAppContext();
  const { t } = useAdapterContext();
  const [updateAdsTradingStatus, { status: updateAdsTradingStatusState }] =
    useUpdateAdsTradingStatus(lang);

  const handleUpdateAdsTradingStatus = (value: boolean) => {
    updateAdsTradingStatus({
      type,
      cryptocurrency,
      status: value ? 'active' : 'pause',
    });
  };

  return (
    <Tooltip
      label={
        <Box
          as="span"
          display="block"
          textAlign="center"
          fontSize="caption"
          style={{ maxWidth: '150px' }}
        >
          {t('userAds.allAds.trading.enable', {
            type:
              type === 'purchase'
                ? t('userAds.allAds.trading.enable.purchase')
                : t('userAds.allAds.trading.enable.selling'),
            enable: isEnabled ? t('Disable') : t('Enable'),
          })}
        </Box>
      }
      placement="top"
    >
      <Box display="flex" justifyContent="flex-end">
        <SwitchField
          key={`enable_currency_ads_trading-${cryptocurrency}-${type}`}
          label={
            <Box as={Text} variant="label" whiteSpace="nowrap" className={s.label}>
              {isEnabled ? t('Disable all') : t('Enable all')}
            </Box>
          }
          isLoading={updateAdsTradingStatusState === 'running'}
          value={isEnabled}
          onChange={handleUpdateAdsTradingStatus}
        />
      </Box>
    </Tooltip>
  );
};
