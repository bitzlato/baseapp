import { ChangeEvent, FC, FormEvent, ReactNode, useRef, useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'web/src/components/ui/Modal';
import { Button } from 'web/src/components/ui/Button';
import { Text } from 'web/src/components/ui/Text';
import { Box } from 'web/src/components/ui/Box';
import { Stack } from 'web/src/components/ui/Stack';
import { Checkbox } from 'web/src/components/form/Checkbox';
import { useT } from 'web/src/hooks/useT';
import { TextInput } from 'web/src/components/Input/TextInput';
import { copy } from 'web/src/helpers/copy';
import { IconButton } from 'web/src/components/IconButton/IconButton';
import { CopyIcon } from 'src/assets/icons/CopyIcon';
import { useP2PAddApiKey } from 'web/src/hooks/mutations/useP2PAddApiKey';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserInfo } from 'web/src/modules/user/profile/selectors';
import { isValidCode, OTP_TIMEOUT } from 'web/src/helpers/codeValidation';
import { formatSeconds } from 'web/src/helpers/formatSeconds';
import { useCountdown } from 'web/src/hooks/useCountdown';
import { alertPush } from 'web/src/modules/public/alert/actions';
import * as s from './P2PCreateApiKeyModal.css';

interface Props {
  onClose: () => void;
}

type Action =
  | 'edit'
  | 'generate'
  | 'error'
  | 'generated'
  | '2FA_code_request'
  | '2FA_code_edit'
  | 'request_confirm_by_email';

type StatusName = 'idle' | 'generating' | 'generated' | '2FA' | 'confirm_by_email';

interface State {
  // params
  keyName: string;
  active: boolean;
  read: boolean;
  trade: boolean;
  transfer: boolean;
  privateKey?: string | undefined;
  publicKey?: string | undefined;
  error?: string | undefined;
  twoFACode: string;
  email?: string | undefined;

  // status
  status: StatusName;
}

const initialState: State = {
  keyName: '',
  twoFACode: '',
  active: true,
  read: false,
  trade: false,
  transfer: false,
  status: 'idle',
};

const generateState =
  (action: Action, params: Partial<State> = {}) =>
  (prevState: State): State => {
    switch (action) {
      case 'edit':
        return {
          ...prevState,
          ...params,
          error: undefined,
        };

      case 'generate':
        return {
          ...prevState,
          status: 'generating',
          error: undefined,
        };

      case 'error':
        return {
          ...prevState,
          error: params.error,
        };

      case 'generated':
        return {
          ...prevState,
          privateKey: params.privateKey,
          publicKey: params.publicKey,
          status: 'generated',
        };

      case '2FA_code_request':
        return {
          ...prevState,
          status: '2FA',
          twoFACode: '',
        };

      case '2FA_code_edit':
        return {
          ...prevState,
          twoFACode: params.twoFACode ?? '',
        };

      case 'request_confirm_by_email':
        return {
          ...prevState,
          status: 'confirm_by_email',
          email: params.email,
        };

      default:
        return initialState;
    }
  };

const swaggerLink = (...chunks: string[]) => (
  <a href="/swagger-ui.html?urls.primaryName=default" target="_blank" rel="noopener noreferrer">
    {chunks}
  </a>
);

const createApiKeysParams = (state: State) => ({
  active: state.active,
  authorities: {
    canRead: state.read,
    canTrade: state.trade,
    canTransfer: state.transfer,
  },
  key: state.publicKey ? JSON.parse(state.publicKey) : '',
  name: state.keyName,
});

export const P2PCreateApiKeyModal: FC<Props> = ({ onClose }) => {
  const t = useT();
  const dispatch = useDispatch();
  const { start, countdown } = useCountdown();
  const user = useSelector(selectUserInfo);
  const [state, setState] = useState(initialState);
  const [addApiKey, addApiKeyState] = useP2PAddApiKey({
    onSuccess: (email?: string) => {
      if (email) {
        setState(generateState('request_confirm_by_email', { email }));
      } else {
        dispatch(alertPush({ message: ['p2p.apiKeys.sended'], type: 'success' }));
        onClose();
      }
    },
    onNo2FAUserApprove: () => {
      addApiKey({
        params: createApiKeysParams(state),
        twoFACode: null,
      });
    },
    on2FACodeRequest: () => setState(generateState('2FA_code_request')),
  });
  const privateRef = useRef<HTMLTextAreaElement>(null);
  const publicRef = useRef<HTMLTextAreaElement>(null);

  let body: ReactNode;
  switch (state.status) {
    case 'confirm_by_email': {
      const handleClickResend = () => {
        addApiKey({
          params: createApiKeysParams(state),
          twoFACode: state.twoFACode,
        });
      };

      body = (
        <>
          <ModalHeader>{t('Confirmation')}</ModalHeader>
          <ModalBody>
            <Stack direction="column" marginBottom="3x">
              <span>{t('gift.confirmation_email', { email: state.email })}</span>
              <span>{t('gift.check_spam')}</span>
            </Stack>
          </ModalBody>

          <Box display="flex" justifyContent="center" py="4x">
            <Button color="primary" variant="outlined" onClick={handleClickResend}>
              {t('Send an email again')}
            </Button>
          </Box>
        </>
      );

      break;
    }

    case '2FA': {
      const disabled =
        (state.twoFACode && !isValidCode(state.twoFACode)) ||
        countdown > 0 ||
        addApiKeyState.status === 'running';
      const handleChange2FACode = (value: string) => {
        setState(generateState('2FA_code_edit', { twoFACode: value }));
      };
      const handleSubmitAddApiKeyWith2FA = (event: FormEvent) => {
        event.preventDefault();

        start(OTP_TIMEOUT);

        addApiKey({
          params: createApiKeysParams(state),
          twoFACode: state.twoFACode,
        });
      };

      body = (
        <>
          <ModalHeader>{t('2FA Verification')}</ModalHeader>
          <form onSubmit={handleSubmitAddApiKeyWith2FA}>
            <ModalBody loading={addApiKeyState.status === 'running'}>
              <Stack direction="column" marginBottom="3x">
                <Text>
                  {user.bitzlato_user
                    ? t('Enter 2FA code from the app for', {
                        name: (
                          <strong>{`${
                            user.bitzlato_user.user_profile.public_name ??
                            user.bitzlato_user.user_profile.generated_name
                          }@Bitzlato.com`}</strong>
                        ),
                      })
                    : undefined}
                </Text>

                <Box
                  fontSize="caption"
                  display="flex"
                  mb="2x"
                  as={TextInput}
                  label={t('2FA code')}
                  value={state.twoFACode}
                  maxLength={6}
                  autoFocus
                  onChange={handleChange2FACode}
                />
              </Stack>
            </ModalBody>

            <ModalFooter>
              <Button type="submit" color="secondary" disabled={disabled}>
                {countdown > 0 ? formatSeconds(countdown) : t('p2p.apiKeys.send')}
              </Button>
              <Box w="2x" />
              <Button color="secondary" variant="outlined" onClick={onClose}>
                {t('Cancel')}
              </Button>
            </ModalFooter>
          </form>
        </>
      );

      break;
    }

    case 'generated': {
      const handleClickPrivateCopy = () => {
        if (privateRef.current) {
          copy(privateRef.current);
        }
      };
      const handleClickPublicCopy = () => {
        if (privateRef.current) {
          copy(privateRef.current);
        }
      };
      const handleClickAddApiKey = () => {
        addApiKey({
          params: createApiKeysParams(state),
        });
      };

      body = (
        <>
          <ModalHeader>{t('Create API key')}</ModalHeader>
          <ModalBody loading={addApiKeyState.status === 'running'}>
            <Stack direction="column" marginBottom="3x">
              <>
                <Text variant="label" fontWeight="strong">
                  {t('Private key')}:
                </Text>
                <Box display="flex" alignItems="center">
                  <Box flexGrow={1}>
                    <Box
                      ref={privateRef}
                      as="textarea"
                      className={s.textareaKey}
                      color="text"
                      fontSize="small"
                      value={state.privateKey}
                      readOnly
                    />
                  </Box>
                  <IconButton
                    onClick={handleClickPrivateCopy}
                    title={t('page.body.profile.apiKeys.modal.btn.copy')}
                  >
                    <CopyIcon />
                  </IconButton>
                </Box>
              </>

              <Text color="danger">{t('p2p.apiKeys.warning')}</Text>

              <Text>{t('p2p.apiKeys.copy_key')}</Text>

              <>
                <Text variant="label" fontWeight="strong">
                  {t('Public key')}:
                </Text>
                <Box display="flex" alignItems="center">
                  <Box flexGrow={1}>
                    <Box
                      ref={publicRef}
                      as="textarea"
                      className={s.textareaKey}
                      color="text"
                      fontSize="small"
                      value={state.publicKey}
                      readOnly
                    />
                  </Box>
                  <IconButton
                    onClick={handleClickPublicCopy}
                    title={t('page.body.profile.apiKeys.modal.btn.copy')}
                  >
                    <CopyIcon />
                  </IconButton>
                </Box>
              </>

              <Text>{t('p2p.apiKeys.send_desc')}</Text>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button
              color="secondary"
              disabled={addApiKeyState.status === 'running'}
              onClick={handleClickAddApiKey}
            >
              {t('p2p.apiKeys.send')}
            </Button>
            <Box w="2x" />
            <Button color="secondary" variant="outlined" onClick={onClose}>
              {t('Cancel')}
            </Button>
          </ModalFooter>
        </>
      );

      break;
    }

    case 'idle':
    case 'generating':
    default: {
      const handleChangeKeyName = (value: string) => {
        setState(generateState('edit', { keyName: value }));
      };
      const handleSubmitGenerateKey = async (event: FormEvent) => {
        event.preventDefault();

        if (!state.keyName) {
          setState(generateState('error', { error: t('p2p.apiKeys.enter_key_name') }));

          return;
        }

        setState(generateState('generate'));

        const jose = await import('node-jose');
        const keyPair = await jose.JWK.createKeyStore().generate('EC', 'P-256', { alg: 'ES256' });

        setState(
          generateState('generated', {
            privateKey: JSON.stringify(keyPair.toJSON(true, ['kid'])),
            publicKey: JSON.stringify(keyPair.toJSON(false, ['kid'])),
          }),
        );
      };
      const handleChangeCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
        const paramName = event.target.name as 'active' | 'read' | 'trade' | 'transfer';

        setState(generateState('edit', { [paramName]: !state[paramName] }));
      };

      body = (
        <>
          <ModalHeader>{t('Create API key')}</ModalHeader>
          <form onSubmit={handleSubmitGenerateKey}>
            <ModalBody loading={state.status === 'generating'}>
              <Stack direction="column" marginBottom="3x">
                <Text>{t('p2p.apiKeys.descr', { link: swaggerLink })}</Text>

                <Box
                  fontSize="caption"
                  display="flex"
                  mb="2x"
                  as={TextInput}
                  label={t('Key name')}
                  value={state.keyName}
                  error={state.error}
                  onChange={handleChangeKeyName}
                />

                <Checkbox name="active" checked={state.active} onChange={handleChangeCheckbox}>
                  <Box display="flex" flexDirection="column" fontSize="caption">
                    <strong>{t('Active')}</strong>
                    {t('p2p.apiKeys.active_tooltip')}
                  </Box>
                </Checkbox>

                <Checkbox name="read" checked={state.read} onChange={handleChangeCheckbox}>
                  <Box display="flex" flexDirection="column" fontSize="caption">
                    <strong>{t('Read')}</strong>
                    {t('p2p.apiKeys.read_tooltip')}
                  </Box>
                </Checkbox>

                <Checkbox name="trade" checked={state.trade} onChange={handleChangeCheckbox}>
                  <Box display="flex" flexDirection="column" fontSize="caption">
                    <strong>{t('Trade')}</strong>
                    {t('p2p.apiKeys.trade_tooltip')}
                  </Box>
                </Checkbox>

                <Checkbox name="transfer" checked={state.transfer} onChange={handleChangeCheckbox}>
                  <Box display="flex" flexDirection="column" fontSize="caption">
                    <strong>{t('Transfer')}</strong>
                    {t('p2p.apiKeys.transfer_tooltip')}
                  </Box>
                </Checkbox>

                <Text color="danger">{t('p2p.apiKeys.warning')}</Text>
              </Stack>
            </ModalBody>
            <ModalFooter>
              <Button type="submit" color="secondary" disabled={state.status === 'generating'}>
                {t('p2p.apiKeys.gen_new')}
              </Button>
              <Box w="2x" />
              <Button color="secondary" variant="outlined" onClick={onClose}>
                {t('Cancel')}
              </Button>
            </ModalFooter>
          </form>
        </>
      );

      break;
    }
  }

  return (
    <Modal size="lg" show onClose={onClose}>
      {body}
    </Modal>
  );
};
