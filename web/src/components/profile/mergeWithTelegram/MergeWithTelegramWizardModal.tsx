import { FC } from 'react';
import { useT } from 'web/src/hooks/useT';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'web/src/components/ui/Modal';
import { Button } from 'web/src/components/ui/Button';
import { Box } from 'web/src/components/ui/Box';
import { Text } from 'web/src/components/ui/Text';
import { TextInput } from 'web/src/components/Input/TextInput';
import { CopyField } from 'web/src/components/ui/CopyField';
import {
  State,
  STATUS_IDLE,
  STATUS_INVALID,
  STATUS_QUESTION,
  STATUS_STARTED,
  STATUS_CODE,
} from './useMergeWithTelegram';

interface Props {
  state: State;
  show: boolean;
  onNextClick: () => void;
  onInvalidClick: () => void;
  onTelegramCodeChange: (telegramCode: string) => void;
  onCancel: () => void;
}

export const MergeWithTelegramWizardModal: FC<Props> = ({
  state,
  show,
  onNextClick,
  onInvalidClick,
  onTelegramCodeChange,
  onCancel,
}) => {
  const t = useT();

  const isWebDirection = state.direction === 'web';

  let body;
  let footer = <ModalFooter />;
  switch (state.status) {
    case STATUS_STARTED: {
      body = isWebDirection ? t('merge.web_start_text') : t('merge.telegram_start_text');
      footer = (
        <ModalFooter>
          <Button color="secondary" onClick={onNextClick}>
            {t('merge.answer_question')}
          </Button>
        </ModalFooter>
      );

      break;
    }

    case STATUS_QUESTION: {
      body = isWebDirection
        ? t('merge.web_security_question', { br: <br /> })
        : t('merge.telegram_security_question', { br: <br /> });
      footer = (
        <Box display="flex" alignItems="center" px="6x" py="4x" gap="4x">
          <Button color="secondary" fullWidth onClick={onNextClick}>
            {t('Yes')}
          </Button>
          <Button color="secondary" variant="outlined" fullWidth onClick={onInvalidClick}>
            {t('No')}
          </Button>
        </Box>
      );

      break;
    }

    case STATUS_INVALID: {
      body = isWebDirection ? t('merge.web_test_failed') : t('merge.telegram_test_failed');
      footer = (
        <ModalFooter>
          <Button color="secondary" onClick={onCancel}>
            {t('Close')}
          </Button>
        </ModalFooter>
      );

      break;
    }

    case STATUS_CODE: {
      if (isWebDirection) {
        if (state.errorText) {
          body = (
            <Text variant="label" color="danger">
              {t('Error!')} {t(state.errorText)}
            </Text>
          );

          break;
        }

        body = (
          <>
            {t('Token')}:
            <CopyField value={state.webCode} />
          </>
        );
      } else {
        body = (
          <>
            <Box mb="4x">{t('merge.enter_token')}</Box>
            <TextInput
              label={t('Enter code')}
              labelVisible
              value={state.telegramCode}
              onChange={onTelegramCodeChange}
              error={state.errorText ? t(state.errorText) : undefined}
              autoFocus
            />
          </>
        );
        footer = (
          <ModalFooter>
            <Button
              color="secondary"
              size="large"
              fullWidth
              disabled={state.isLoading}
              onClick={onNextClick}
            >
              {t('merge.token_send')}
            </Button>
          </ModalFooter>
        );
      }

      break;
    }

    case STATUS_IDLE:
    default: {
      body = null;
      break;
    }
  }

  return (
    <Modal show={show} onClose={onCancel}>
      <ModalHeader>{isWebDirection ? t('merge.web_title') : t('merge.telegram_title')}</ModalHeader>
      <ModalBody loading={'isLoading' in state && state.isLoading}>{body}</ModalBody>
      {footer}
    </Modal>
  );
};
