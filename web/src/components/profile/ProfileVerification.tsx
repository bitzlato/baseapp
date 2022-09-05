import { Button } from 'web/src/components/ui/Button';
import { Text } from 'web/src/components/ui/Text';
import { Box } from 'web/src/components/ui/Box';
import SuccessCircle from 'web/src/assets/svg/SuccessCircle.svg';
import { FC, useEffect, useState } from 'react';
import { useT } from 'web/src/hooks/useT';

interface ProfileVerificationProps {
  status: boolean;
  url: string;
}

export const ProfileVerification: FC<ProfileVerificationProps> = ({ status, url }) => {
  const t = useT();
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let timeout: number;
    if (busy) {
      timeout = window.setTimeout(() => {
        document.getElementById('verificationLink')?.click();
      }, 2000);
    }

    return () => {
      if (timeout) {
        window.clearTimeout(timeout);
      }
    };
  }, [busy]);

  if (busy) {
    return (
      <Text variant="label" textAlign="center">
        <Box mb="7x">{t('profile.verification_link_1')}</Box>
        <Box
          as="a"
          id="verificationLink"
          data-gtm-click="get_verified"
          href={url}
          color={{ default: 'textHighlighted', hover: 'textHighlighted' }}
          fontWeight="strong"
          textDecoration={{ hover: 'underline' }}
        >
          {t('profile.verification_link_2')}
        </Box>
      </Text>
    );
  }

  const handleClick = () => {
    setBusy(true);
  };

  return !status ? (
    <>
      <Text variant="label" color="danger" textAlign="center" fontWeight="strong">
        {t('profile.verification_no')}
      </Text>
      <Button color="primary" fullWidth onClick={handleClick}>
        {t('profile.verification_goto')}
      </Button>
    </>
  ) : (
    <>
      <Box display="flex" justifyContent="center" mb="6x">
        <SuccessCircle />
      </Box>
      <Text variant="label" color="success" fontWeight="strong" textAlign="center">
        {t('profile.verification_yes')}
      </Text>
    </>
  );
};
