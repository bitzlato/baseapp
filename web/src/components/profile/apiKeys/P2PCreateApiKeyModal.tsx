import { ChangeEvent, FC, FormEvent, ReactNode, useEffect, useReducer } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'web/src/components/ui/Modal';
import { Button } from 'web/src/components/ui/Button';
import { Text } from 'web/src/components/ui/Text';
import { Box } from 'web/src/components/ui/Box';
import { Stack } from 'web/src/components/ui/Stack';
import { Checkbox } from 'web/src/components/form/Checkbox';
import { useT } from 'web/src/hooks/useT';
import { TextInput } from 'web/src/components/Input/TextInput';
import { ApiKeysParams } from 'web/src/hooks/mutations/useP2PAddApiKey';
import { CopyField } from 'web/src/components/ui/CopyField';

interface Props {
  show: boolean;
  onSubmit: (apiKeysParams: ApiKeysParams) => Promise<void>;
  onClose: () => void;
}

const ACTION_IDLE = 'idle' as const;
const ACTION_EDIT = 'edit' as const;
const ACTION_GENERATE = 'generate' as const;
const ACTION_SET_KEY = 'set_key' as const;
const ACTION_SEND = 'send' as const;
const ACTION_ERROR = 'error' as const;

type Action =
  | {
      type: typeof ACTION_EDIT;
      payload: Record<string, string | boolean>;
    }
  | {
      type: typeof ACTION_GENERATE;
    }
  | {
      type: typeof ACTION_SET_KEY;
      payload: {
        privateKey: string;
        publicKey: string;
      };
    }
  | {
      type: typeof ACTION_SEND;
    }
  | {
      type: typeof ACTION_ERROR;
      payload?: { error: string } | undefined;
    }
  | { type: typeof ACTION_IDLE };

type StepName = 'idle' | 'keys';

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

  // status
  step: StepName;
  isWaiting: boolean;
}

const initialState: State = {
  keyName: '',
  // twoFACode: '',
  active: true,
  read: false,
  trade: false,
  transfer: false,

  step: 'idle',
  isWaiting: false,
};

const reducer = (prevState: State, action: Action): State => {
  switch (action.type) {
    case ACTION_EDIT: {
      return {
        ...prevState,
        ...action.payload,
        error: undefined,
      };
    }

    case ACTION_GENERATE: {
      return {
        ...prevState,
        isWaiting: true,
        error: undefined,
      };
    }

    case ACTION_SET_KEY: {
      return {
        ...prevState,
        privateKey: action.payload.privateKey,
        publicKey: action.payload.publicKey,
        step: 'keys',
        isWaiting: false,
      };
    }

    case ACTION_SEND: {
      return {
        ...prevState,
        isWaiting: true,
      };
    }

    case ACTION_ERROR: {
      return {
        ...prevState,
        error: action.payload?.error,
        isWaiting: false,
      };
    }

    case ACTION_IDLE: {
      return initialState;
    }

    default:
      throw new Error('Action not supported');
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

export const P2PCreateApiKeyModal: FC<Props> = ({ show, onSubmit, onClose }) => {
  const t = useT();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (!show) {
      dispatch({ type: ACTION_IDLE });
    }
  }, [show]);

  let body: ReactNode;
  switch (state.step) {
    case 'keys': {
      const handleClickAddApiKey = async () => {
        try {
          await onSubmit(createApiKeysParams(state));
        } catch (err: any) {
          dispatch({
            type: ACTION_ERROR,
          });
        }
      };

      body = (
        <>
          <ModalHeader>{t('Create API key')}</ModalHeader>
          <ModalBody loading={state.isWaiting}>
            <Stack direction="column" marginBottom="3x">
              <CopyField label={t('Private key')} value={state.privateKey ?? ''} multiline />

              <Text color="danger">{t('p2p.apiKeys.warning')}</Text>

              <Text>{t('p2p.apiKeys.copy_key')}</Text>

              <CopyField label={t('Public key')} value={state.publicKey ?? ''} multiline />

              <Text>{t('p2p.apiKeys.send_desc')}</Text>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button color="secondary" disabled={state.isWaiting} onClick={handleClickAddApiKey}>
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
    default: {
      const handleChangeKeyName = (value: string) => {
        dispatch({
          type: ACTION_EDIT,
          payload: { keyName: value },
        });
      };
      const handleSubmitGenerateKey = async (event: FormEvent) => {
        event.preventDefault();

        if (!state.keyName) {
          dispatch({
            type: ACTION_ERROR,
            payload: { error: t('p2p.apiKeys.enter_key_name') },
          });

          return;
        }

        dispatch({ type: ACTION_GENERATE });

        const jose = await import('node-jose');
        const keyPair = await jose.JWK.createKeyStore().generate('EC', 'P-256', { alg: 'ES256' });

        dispatch({
          type: ACTION_SET_KEY,
          payload: {
            privateKey: JSON.stringify(keyPair.toJSON(true, ['kid'])),
            publicKey: JSON.stringify(keyPair.toJSON(false, ['kid'])),
          },
        });
      };
      const handleChangeCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
        const paramName = event.target.name as 'active' | 'read' | 'trade' | 'transfer';

        dispatch({ type: ACTION_EDIT, payload: { [paramName]: !state[paramName] } });
      };

      body = (
        <>
          <ModalHeader>{t('Create API key')}</ModalHeader>
          <form onSubmit={handleSubmitGenerateKey}>
            <ModalBody loading={state.isWaiting}>
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
              <Button type="submit" color="secondary" disabled={state.isWaiting}>
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
    <Modal size="lg" show={show} onClose={onClose}>
      {body}
    </Modal>
  );
};
