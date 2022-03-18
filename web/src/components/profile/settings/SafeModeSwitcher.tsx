import { FC, useState } from 'react';
import { useUpdateProfile } from 'web/src/hooks/mutations/useUpdateProfile';
import { useT } from 'web/src/hooks/useT';
import { SafeModeWizardModal } from './SafeModeWizardModal';
import { SwitchField } from './SwitchField';

interface Props {
  value: boolean;
}

export const SafeModeSwitcher: FC<Props> = ({ value }) => {
  const t = useT();
  const [showSafeModeWizard, setShowSafeModeWizard] = useState(false);
  const updateProfileMutate = useUpdateProfile({
    onDisableSafeMode: () => setShowSafeModeWizard(true),
  });

  const handleChange = (nextValue: boolean) => {
    updateProfileMutate({ safeModeEnabled: nextValue });
  };

  const handleCloseModal = () => {
    setShowSafeModeWizard(false);
  };

  return (
    <>
      <SwitchField
        id="safe_mode_enabled"
        label={t('Safe Mode')}
        helpText={t('settings.safe_mode_help')}
        value={value}
        onChange={handleChange}
      />
      <SafeModeWizardModal show={showSafeModeWizard} onClose={handleCloseModal} />
    </>
  );
};
