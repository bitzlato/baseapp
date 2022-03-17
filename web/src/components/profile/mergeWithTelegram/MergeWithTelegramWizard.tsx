import { FC, ReactNode, useRef, useState } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { Button } from 'web/src/components/ui/Button';
import { Text } from 'web/src/components/ui/Text';
import { ModalBody, ModalFooter } from 'web/src/components/ui/Modal';
import { useGenerateMergeToken } from 'web/src/hooks/mutations/useGenerateMergeToken';
import { useT } from 'web/src/hooks/useT';
import { Spinner } from 'web/src/components/ui/Spinner';
import { FetchError } from 'web/src/helpers/fetch';
import { TextInput } from 'web/src/components/Input/TextInput';
import { useMergeProfile } from 'web/src/hooks/mutations/useMergeProfile';
import { copy } from 'web/src/helpers/copy';
import { IconButton } from 'web/src/components/IconButton/IconButton';
import { CopyIcon } from 'src/assets/icons/CopyIcon';
import * as s from './MergeWithTelegramWizard.css';

export type MergeDirection = 'web' | 'telegram';

interface Props {
  direction?: MergeDirection | undefined;
  onClose: () => void;
}

export const MergeWithTelegramWizard: FC<Props> = ({ direction, onClose }) => {
  const t = useT();
  const [generateMergeToken, generateMergeTokenState] = useGenerateMergeToken();
  const [mergeProfile, mergeProfileState] = useMergeProfile();
  const [state, setState] = useState<{ step: number; invalid: boolean }>({
    step: 0,
    invalid: false,
  });
  const [code, setCode] = useState('');
  const urlRef = useRef<HTMLInputElement>(null);

  const handleClickNext = () => {
    const nextStep = state.step + 1;
    if (nextStep === 2 && direction === 'web') {
      generateMergeToken(undefined);
    }

    setState((prev) => ({ ...prev, step: nextStep }));
  };
  const handleClickInvalid = () => setState({ step: 0, invalid: true });
  const handleChangeCode = (value: string) => setCode(value);
  const handleSubmit = () => {
    mergeProfile(code);
  };
  const handleClickCopy = () => {
    if (urlRef.current) {
      copy(urlRef.current);
    }
  };

  let body: ReactNode;
  let footer = <ModalFooter />;

  switch (state.step) {
    case 2: {
      if (direction === 'web') {
        switch (generateMergeTokenState.status) {
          case 'running': {
            body = (
              <Box display="flex" alignItems="center" justifyContent="center">
                <Spinner />
              </Box>
            );
            break;
          }

          case 'failure': {
            if (
              generateMergeTokenState.error instanceof FetchError &&
              typeof generateMergeTokenState.error.payload.message === 'string'
            ) {
              body = (
                <Text variant="label" color="danger">
                  {t('Error!')} {generateMergeTokenState.error.payload.message}
                </Text>
              );
            } else {
              body = (
                <Text variant="label" color="danger">
                  {t('merge.error', { error: t('Unknown Error') })}
                </Text>
              );
            }
            break;
          }

          default: {
            body = (
              <>
                {t('Token')}:
                <Box display="flex" alignItems="center">
                  <Box flexGrow={1} my="4x">
                    <Box
                      ref={urlRef}
                      as="input"
                      className={s.inputToken}
                      color="text"
                      fontSize="small"
                      value={generateMergeTokenState.data?.token}
                      readOnly
                    />
                  </Box>
                  <IconButton
                    onClick={handleClickCopy}
                    title={t('page.body.profile.content.copyLink')}
                  >
                    <CopyIcon />
                  </IconButton>
                </Box>
              </>
            );
            break;
          }
        }
      } else {
        body = (
          <>
            <Box mb="4x">{t('merge.enter_token')}</Box>
            <TextInput
              label={t('Enter code')}
              labelVisible
              value={code}
              onChange={handleChangeCode}
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
              disabled={mergeProfileState.status === 'running'}
              onClick={handleSubmit}
            >
              {t('merge.token_send')}
            </Button>
          </ModalFooter>
        );
      }

      break;
    }

    case 1: {
      body =
        direction === 'web'
          ? t('merge.web_security_question', { br: <br /> })
          : t('merge.telegram_security_question', { br: <br /> });
      footer = (
        <Box display="flex" alignItems="center" px="6x" py="4x">
          <Button color="secondary" fullWidth onClick={handleClickNext}>
            {t('Yes')}
          </Button>
          <Box w="4x" flexShrink={0} />
          <Button color="secondary" variant="outlined" fullWidth onClick={handleClickInvalid}>
            {t('No')}
          </Button>
        </Box>
      );

      break;
    }

    case 0:
    default: {
      if (state.invalid) {
        body = direction === 'web' ? t('merge.web_test_failed') : t('merge.telegram_test_failed');
        footer = (
          <ModalFooter>
            <Button color="secondary" onClick={onClose}>
              {t('Close')}
            </Button>
          </ModalFooter>
        );

        break;
      }

      body = direction === 'web' ? t('merge.web_start_text') : t('merge.telegram_start_text');
      footer = (
        <ModalFooter>
          <Button color="secondary" onClick={handleClickNext}>
            {t('merge.answer_question')}
          </Button>
        </ModalFooter>
      );

      break;
    }
  }

  // <Button color="secondary" onClick={onCancel}>
  // {t('Close')}
  // </Button>

  return (
    <>
      <ModalBody>{body}</ModalBody>
      {footer}
    </>
  );
};
