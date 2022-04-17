import { FC } from 'react';
import { Stack } from 'web/src/components/ui/Stack';
import { Text } from 'web/src/components/ui/Text';
import WarningCircleIcon from 'web/src/assets/svg/WarningCircleIcon.svg';
import { useT } from 'web/src/hooks/useT';
import { Tooltip } from 'web/src/components/ui/Tooltip';

export const UserSuspicious: FC = () => {
  const t = useT();

  return (
    <Stack alignItems="center" marginRight="2x">
      <Tooltip label={t('profile.suspicious_desc')} placement="top">
        <span>
          <WarningCircleIcon />
        </span>
      </Tooltip>
      <Text variant="label" color="warning" fontWeight="strong" textAlign="center">
        {t('profile.suspicious')}
      </Text>
    </Stack>
  );
};
