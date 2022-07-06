import { FC, useCallback, useMemo } from 'react';
import { Container } from 'web/src/components/Container/Container';
import { Card } from 'web/src/components/Card/Card';
import { Box } from 'web/src/components/ui/Box';
import { Text } from 'web/src/components/ui/Text';
import { useSelector } from 'react-redux';
import { selectUserInfo } from 'web/src/modules/user/profile/selectors';
import { Stack } from 'web/src/components/ui/Stack';
import { useT } from 'web/src/hooks/useT';
import { selectMobileDeviceState } from 'web/src/modules/public/globalSettings/selectors';
import { useUpdateProfile } from 'web/src/hooks/mutations/useUpdateProfile';
import { useSaveSettings } from 'web/src/hooks/mutations/useSaveSettings';
import { NotificationSettingStatus } from 'web/src/modules/user/profile/types';
import * as s from './ProfileSettings.css';
import { BaseCurrencyField } from './BaseCurrencyField';
import { TimezoneField } from './TimezoneField';
import { SwitchField } from './SwitchField';
import { TwoFactorAuthSwitcher } from './TwoFactorAuthSwitcher';
import { SafeModeSwitcher } from './SafeModeSwitcher';
import { NotificationSettingField } from './NotificationSettingField';

const notificationsSettings = [
  'newReferral',
  'dividendsReceived',
  'comissionReturn',
  'userMessage',
] as const;

export const ProfileSettings: FC = () => {
  const t = useT();
  const isMobileDevice = useSelector(selectMobileDeviceState);
  const user = useSelector(selectUserInfo);
  const updateProfile = useUpdateProfile();
  const saveSettings = useSaveSettings();

  const handleChangeBaseCurrency = (currency: string) => {
    updateProfile({ currency });
  };

  const handleChangeTimezone = (timezone: string) => {
    updateProfile({ timezone });
  };

  const handleChangeSaveRequisites = useCallback(
    (saveRequisites: boolean) => {
      saveSettings({ saveRequisites });
    },
    [saveSettings],
  );

  const changeNotificationSettingHandles = useMemo(
    () =>
      notificationsSettings.reduce((acc, notificationSetting) => {
        acc[notificationSetting] = (nextValue: NotificationSettingStatus) => {
          saveSettings({ notifications: { [notificationSetting]: nextValue } });
        };

        return acc;
      }, {} as Record<typeof notificationsSettings[number], (nextValue: NotificationSettingStatus) => void>),
    [saveSettings],
  );

  if (user.bitzlato_user === null) {
    return null;
  }

  const body = (
    <Card header={!isMobileDevice ? <h4>{t('Settings')}</h4> : undefined}>
      <Box
        className={s.block}
        display="flex"
        justifyContent="space-between"
        py="8x"
        px="5x"
        borderBottomWidth="1x"
        borderBottomStyle="solid"
        borderBottomColor="modalHeaderBorderBottom"
      >
        <Box className={s.label} mb="6x">
          <Text variant="label" fontWeight="strong">
            {t('General')}
          </Text>
        </Box>
        <div className={s.controls}>
          <Stack direction="column" marginBottom="8x">
            <BaseCurrencyField
              defaultValue={user.bitzlato_user.user_profile.currency}
              onChange={handleChangeBaseCurrency}
            />

            <TimezoneField
              defaultValue={user.bitzlato_user.user_profile.timezone}
              onChange={handleChangeTimezone}
            />

            <SwitchField
              id="save_requisites"
              label={t('settings.save_requisites')}
              defaultValue={user.bitzlato_user.user_setting?.save_requisites}
              onChange={handleChangeSaveRequisites}
            />
          </Stack>
        </div>
      </Box>
      <Box
        className={s.block}
        display="flex"
        justifyContent="space-between"
        py="8x"
        px="5x"
        borderBottomWidth="1x"
        borderBottomStyle="solid"
        borderBottomColor="modalHeaderBorderBottom"
      >
        <Box className={s.label} mb="6x">
          <Text variant="label" fontWeight="strong">
            {t('Security')}
          </Text>
        </Box>
        <div className={s.controls}>
          <Stack direction="column" marginBottom="8x">
            <TwoFactorAuthSwitcher value={user.otp} />
            <SafeModeSwitcher value={user.bitzlato_user.user_profile.safe_mode_enabled} />
          </Stack>
        </div>
      </Box>

      <Box
        className={s.block}
        display="flex"
        justifyContent="space-between"
        py="8x"
        px="5x"
        borderBottomColor="modalHeaderBorderBottom"
      >
        <Box className={s.label} mb="6x">
          <Text as="p" variant="label" fontWeight="strong">
            {t('Notifications')}
          </Text>
          <Text as="p" variant="label" color="textMuted">
            {t('settings.notifications_help')}
          </Text>
        </Box>
        <div className={s.controls}>
          <Stack direction="column" marginBottom="8x">
            <NotificationSettingField
              label={t('settings.new_referral')}
              helpText={t('settings.new_referral_help')}
              defaultValue={user.bitzlato_user.user_setting?.new_referral}
              onChange={changeNotificationSettingHandles.newReferral}
            />

            <NotificationSettingField
              label={t('settings.dividends_received')}
              helpText={t('settings.dividends_received_help')}
              defaultValue={user.bitzlato_user.user_setting?.dividends_received}
              onChange={changeNotificationSettingHandles.dividendsReceived}
            />

            <NotificationSettingField
              label={t('settings.comission_return')}
              helpText={t('settings.comission_return_help')}
              defaultValue={user.bitzlato_user.user_setting?.comission_return}
              onChange={changeNotificationSettingHandles.comissionReturn}
            />

            <NotificationSettingField
              label={t('settings.user_message')}
              helpText={t('settings.user_message_help')}
              defaultValue={user.bitzlato_user.user_setting?.user_message}
              onChange={changeNotificationSettingHandles.userMessage}
            />
          </Stack>
        </div>
      </Box>
    </Card>
  );

  return isMobileDevice ? (
    <Box my="1x">{body}</Box>
  ) : (
    <Container maxWidth="xl" my="6x">
      {body}
    </Container>
  );
};
