import { FC } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { Text } from 'web/src/components/ui/Text';
import { Button } from 'web/src/components/ui/Button';
import TelegramIcon from 'web/src/assets/svg/TelegramIcon.svg';
import WebIcon from 'web/src/assets/svg/WebIcon.svg';
import { useT } from 'web/src/hooks/useT';
import {
  MODAL_MERGE_WITH_TELEGRAM,
  MODAL_OTP,
  MODAL_PROPOSAL_TO_ENABLED_OTP,
  useMergeWithTelegram,
} from 'web/src/components/profile/mergeWithTelegram/useMergeWithTelegram';
import { MergeWithTelegramWizardModal } from 'web/src/components/profile/mergeWithTelegram/MergeWithTelegramWizardModal';
import { ProposalToEnableOTP } from 'web/src/components/profile/ProposalToEnableOTP';
import { TwoFactorModal } from 'web/src/containers/ProfileAuthDetails/TwoFactorModal';
import { useIsMobileDevice } from 'web/src/components/app/AppContext';
import * as s from './MergeWithTelegramControls.css';

export const MergeWithTelegramControls: FC = () => {
  const isMobileDevice = useIsMobileDevice();
  const t = useT();
  const {
    state,
    handleMergeCancel,
    handleGetCodeClick,
    handleEnterCodeClick,
    handleInvalidClick,
    handleNextClick,
    handleTelegramCodeChange,
  } = useMergeWithTelegram();

  return (
    <div className={s.row}>
      <Box
        bg={isMobileDevice ? 'block' : 'statBg'}
        borderRadius="1x"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        px="4x"
        py="7x"
      >
        <Box flexShrink={0} color="text" mr="4x">
          <WebIcon width="60" height="60" />
        </Box>
        <Box
          display="flex"
          alignItems={{ mobile: 'flex-end', desktop: 'center' }}
          flexDirection={{ mobile: 'column', desktop: 'row' }}
        >
          <Text variant="label" textAlign={isMobileDevice ? 'right' : 'left'}>
            {t('merge.web_with_telegram')}
          </Text>
          <Box flexShrink={0} ml={{ desktop: '4x' }} mt={{ mobile: '4x', desktop: '0' }}>
            <Button color="secondary" onClick={handleGetCodeClick}>
              {t('merge.web_get_code')}
            </Button>
          </Box>
        </Box>
      </Box>

      <Box
        bg={isMobileDevice ? 'block' : 'statBg'}
        borderRadius="1x"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        px="4x"
        py="7x"
      >
        <Box flexShrink={0} color="text" mr="4x">
          <TelegramIcon width="60px" height="60px" />
        </Box>
        <Box
          display="flex"
          alignItems={{ mobile: 'flex-end', desktop: 'center' }}
          flexDirection={{ mobile: 'column', desktop: 'row' }}
        >
          <Text variant="label" textAlign={isMobileDevice ? 'right' : 'left'}>
            {t('merge.telegram_with_web')}
          </Text>
          <Box flexShrink={0} ml={{ desktop: '4x' }} mt={{ mobile: '4x', desktop: '0' }}>
            <Button color="secondary" onClick={handleEnterCodeClick}>
              {t('merge.web_enter_code')}
            </Button>
          </Box>
        </Box>
      </Box>

      <MergeWithTelegramWizardModal
        show={state.currentModal === MODAL_MERGE_WITH_TELEGRAM}
        state={state}
        onNextClick={handleNextClick}
        onInvalidClick={handleInvalidClick}
        onTelegramCodeChange={handleTelegramCodeChange}
        onCancel={handleMergeCancel}
      />

      <ProposalToEnableOTP
        show={state.currentModal === MODAL_PROPOSAL_TO_ENABLED_OTP}
        onClose={handleMergeCancel}
        onSend={handleMergeCancel}
      />

      <TwoFactorModal
        show={state.currentModal === MODAL_OTP}
        buttonText={t('Send')}
        onClose={handleMergeCancel}
        onSend={handleNextClick}
      />
    </div>
  );
};
