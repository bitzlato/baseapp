import { useState } from 'react';
import { Select } from 'web/src/components/Select/Select';
import { Text } from 'web/src/components/ui/Text';
import { Box } from 'web/src/components/ui/Box';
import { useT } from 'web/src/hooks/useT';
import { NotificationSettingStatus } from 'web/src/modules/user/profile/types';
import * as s from './BaseCurrencyField.css';

type NotificationSettingOption = {
  value: NotificationSettingStatus;
  label: string;
};

interface NotificationSettingFieldProps {
  defaultValue?: string | null | undefined;
  helpText: string;
  label: string;
  onChange: (value: NotificationSettingStatus) => void;
}

export const NotificationSettingField = ({
  defaultValue,
  helpText,
  label,
  onChange,
}: NotificationSettingFieldProps) => {
  const t = useT();
  const defaultNotificationSettingOption: NotificationSettingOption = {
    value: 'on',
    label: t('notification_setting.on'),
  };
  const notificationSettingOptions: NotificationSettingOption[] = [
    { value: 'off', label: t('notification_setting.off') },
    defaultNotificationSettingOption,
    { value: 'silent', label: t('notification_setting.silent') },
    { value: 'no-nighttime', label: t('notification_setting.no-nighttime') },
    { value: 'silent,no-nighttime', label: t('notification_setting.silent,no-nighttime') },
  ];

  const [notificationSettingOption, setNotificationSettingOption] =
    useState<NotificationSettingOption>(
      () =>
        notificationSettingOptions.find(({ value }) => value === defaultValue) ??
        defaultNotificationSettingOption,
    );

  const handleChangeNotificationSetting = (newValue: NotificationSettingOption | null) => {
    if (newValue) {
      setNotificationSettingOption(newValue);
      onChange(newValue.value);
    }
  };

  return (
    <Box as="label" display="block">
      <Box mb="2x">
        <Text variant="label">{label}</Text>
      </Box>
      <Box mb="4x">
        <Text variant="label" color="textMuted">
          {helpText}
        </Text>
      </Box>
      <Select
        className={s.select}
        options={notificationSettingOptions}
        value={notificationSettingOption ?? defaultNotificationSettingOption}
        defaultValue={defaultNotificationSettingOption}
        menuPlacement="auto"
        isSearchable
        onChange={handleChangeNotificationSetting}
      />
    </Box>
  );
};
