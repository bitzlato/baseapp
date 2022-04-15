import { FC, useEffect, useRef, useState } from 'react';
import { useT } from 'web/src/hooks/useT';
import { Button } from 'web/src/components/ui/Button';
import { ApiKeysParams, useP2PAddApiKey } from 'web/src/hooks/mutations/useP2PAddApiKey';
import { alertPush, selectOtpEnabled } from 'web/src/modules';
import { useDispatch, useSelector } from 'react-redux';
import { TwoFactorModal } from 'web/src/containers/ProfileAuthDetails/TwoFactorModal';
import { ProposalToEnableOTP } from 'web/src/components/profile/ProposalToEnableOTP';
import { P2PCreateApiKeyModal } from './P2PCreateApiKeyModal';
import { P2PCreateApiKeyConfirmModal } from './P2PCreateApiKeyConfirmModal';

interface Props {
  keysCount: number;
}

const MODAL_CREATE = 'create' as const;
const MODAL_PROPOSAL_OTP = 'proposal_otp' as const;
const MODAL_OTP = 'otp' as const;
const MODAL_CONFIRM = 'confirm' as const;

type State = {
  modal?:
    | typeof MODAL_CREATE
    | typeof MODAL_PROPOSAL_OTP
    | typeof MODAL_OTP
    | typeof MODAL_CONFIRM
    | undefined;
  apiKeysParams?: ApiKeysParams | undefined;
  email?: string | undefined;
};

const initialState = {};

export const P2PCreateApiKey: FC<Props> = ({ keysCount }) => {
  const t = useT();
  const dispatch = useDispatch();
  const otpEnabled = useSelector(selectOtpEnabled);
  const [state, setState] = useState<State>(initialState);
  const [addApiKeyMutate] = useP2PAddApiKey();
  const prevKeysCount = useRef(keysCount);

  useEffect(() => {
    if (keysCount > prevKeysCount.current) {
      setState({});
    }

    prevKeysCount.current = keysCount;
  }, [keysCount]);

  const addApiKey = async (apiKeysParams: ApiKeysParams, otp: string | null = null) => {
    const response = await addApiKeyMutate({
      params: apiKeysParams,
      twoFACode: otp,
    });

    dispatch(alertPush({ message: ['p2p.apiKeys.sended'], type: 'success' }));

    return response;
  };

  const handleClick = () => setState({ modal: MODAL_CREATE });
  const handleClose = () => setState({});
  const handleSubmit = async (apiKeysParams: ApiKeysParams) => {
    setState({ modal: otpEnabled ? MODAL_OTP : MODAL_PROPOSAL_OTP, apiKeysParams });
  };
  const handleSend = async (otp: string | null = null) => {
    if (!state.apiKeysParams) {
      return;
    }

    try {
      const response = await addApiKey(state.apiKeysParams, otp);

      if (response && 'email' in response) {
        setState((prev) => ({
          ...prev,
          modal: MODAL_CONFIRM,
          email: response.email,
        }));
      }
    } catch (err: any) {
      // Ignore errors
    }
  };
  const handleResend = async () => {
    if (state.apiKeysParams) {
      if (otpEnabled) {
        setState((prev) => ({ ...prev, modal: MODAL_OTP }));
      } else {
        try {
          await addApiKey(state.apiKeysParams, null);
        } catch (err: any) {
          // Ignore errors
        }
      }
    }
  };

  return (
    <>
      <Button color="secondary" onClick={handleClick}>
        {t('Create API key')}
      </Button>
      <P2PCreateApiKeyModal
        show={state.modal === MODAL_CREATE}
        onSubmit={handleSubmit}
        onClose={handleClose}
      />
      <ProposalToEnableOTP
        show={state.modal === MODAL_PROPOSAL_OTP}
        onSend={handleSend}
        onClose={handleClose}
      />
      <TwoFactorModal
        show={state.modal === MODAL_OTP}
        buttonText={t('p2p.apiKeys.send')}
        onSend={handleSend}
        onClose={handleClose}
      />
      <P2PCreateApiKeyConfirmModal
        email={state.email}
        show={state.modal === MODAL_CONFIRM}
        onResend={handleResend}
        onClose={handleClose}
      />
    </>
  );
};
