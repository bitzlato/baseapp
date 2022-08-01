import { FC } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { Text } from 'web/src/components/ui/Text';
import { Tooltip } from 'web/src/components/ui/Tooltip';
import { useAdapterContext } from 'web/src/components/shared/Adapter';
import { SwitchField } from './SwitchField';

interface Props {
  isEnabled: boolean;
  onChange: () => void;
}

export const UserAdsEnableTradingSwitch: FC<Props> = ({ isEnabled, onChange }) => {
  const { t } = useAdapterContext();

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
          {t('userAds.enableTrading', {
            on: isEnabled ? t('userAds.enableTrading.off') : t('userAds.enableTrading.on'),
          })}
        </Box>
      }
      placement="bottom"
    >
      <Box display="flex" justifyContent="flex-end">
        <SwitchField
          label={
            <Text variant="label" fontWeight="strong">
              {isEnabled ? t('Trading enabled') : t('Enable trading')}
            </Text>
          }
          value={isEnabled}
          onChange={onChange}
        />
      </Box>
    </Tooltip>
  );
};
