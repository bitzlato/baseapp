import { useCallback, useReducer } from 'react';
import { FetchError } from 'web/src/helpers/fetch';
import { useP2PGenerateMergeToken } from 'web/src/hooks/mutations/useP2PGenerateMergeToken';
import { useP2PMergeProfile } from 'web/src/hooks/mutations/useP2PMergeProfile';

export const STATUS_IDLE = 'idle' as const;
export const STATUS_STARTED = 'started' as const;
export const STATUS_QUESTION = 'question' as const;
export const STATUS_INVALID = 'invalid' as const;
export const STATUS_CODE = 'code' as const;

export const MODAL_MERGE_WITH_TELEGRAM = 'merge_with_telegram' as const;
export const MODAL_PROPOSAL_TO_ENABLED_OTP = 'proposal_to_enabled_otp' as const;
export const MODAL_OTP = 'otp' as const;

export const MERGE_DIRECTION_WEB = 'web' as const;
export const MERGE_DIRECTION_TELEGRAM = 'telegram' as const;

type CurrentModal =
  | typeof MODAL_MERGE_WITH_TELEGRAM
  | typeof MODAL_PROPOSAL_TO_ENABLED_OTP
  | typeof MODAL_OTP;
export type MergeDirection = typeof MERGE_DIRECTION_WEB | typeof MERGE_DIRECTION_TELEGRAM;

export type State =
  | {
      status: typeof STATUS_IDLE;
      direction: undefined;
      currentModal: undefined;
    }
  | {
      status: typeof STATUS_STARTED;
      direction: MergeDirection;
      currentModal?: typeof MODAL_MERGE_WITH_TELEGRAM | undefined;
    }
  | {
      status: typeof STATUS_QUESTION;
      direction: MergeDirection;
      currentModal?: typeof MODAL_MERGE_WITH_TELEGRAM | undefined;
    }
  | {
      status: typeof STATUS_INVALID;
      direction: MergeDirection;
      currentModal?: typeof MODAL_MERGE_WITH_TELEGRAM | undefined;
    }
  | {
      status: typeof STATUS_CODE;
      direction: typeof MERGE_DIRECTION_WEB;
      webCode: string;
      isLoading: boolean;
      errorText?: string | undefined;
      currentModal?: CurrentModal | undefined;
    }
  | {
      status: typeof STATUS_CODE;
      direction: typeof MERGE_DIRECTION_TELEGRAM;
      telegramCode: string;
      isLoading: boolean;
      errorText?: string | undefined;
      currentModal?: CurrentModal | undefined;
    };

const initialState: State = {
  status: 'idle',
  direction: undefined,
  currentModal: undefined,
};

const ACTION_RESET = 'reset' as const;
const ACTION_START = 'start' as const;
const ACTION_SHOW_QUESTION = 'show_question' as const;
const ACTION_INVALID_ANSWER = 'invalid_answer' as const;
const ACTION_SET_ERROR = 'set_error' as const;
const ACTION_LOADING_WEB_CODE = 'loading_web_code' as const;
const ACTION_SET_WEB_CODE = 'set_web_code' as const;
const ACTION_LOADING_TELEGRAM_CODE = 'loading_telegram_code' as const;
const ACTION_SET_TELEGRAM_CODE = 'set_telegram_code' as const;
const ACTION_SHOW_PROPOSAL_TO_ENABLED_OTP = 'show_proposal_to_enabled_otp' as const;
const ACTION_SHOW_OTP = 'show_otp' as const;

type Action =
  | { type: typeof ACTION_RESET }
  | {
      type: typeof ACTION_START;
      payload: {
        direction: MergeDirection;
      };
    }
  | { type: typeof ACTION_SHOW_QUESTION }
  | { type: typeof ACTION_INVALID_ANSWER }
  | { type: typeof ACTION_SET_ERROR; payload: { errorText: string } }
  | { type: typeof ACTION_LOADING_WEB_CODE }
  | { type: typeof ACTION_SET_WEB_CODE; payload: { webCode: string } }
  | { type: typeof ACTION_LOADING_TELEGRAM_CODE }
  | { type: typeof ACTION_SET_TELEGRAM_CODE; payload: { telegramCode: string } }
  | { type: typeof ACTION_SHOW_PROPOSAL_TO_ENABLED_OTP }
  | { type: typeof ACTION_SHOW_OTP }
  | { type: typeof ACTION_RESET };

const reducer = (prevState: State, action: Action): State => {
  switch (action.type) {
    case ACTION_START: {
      return {
        status: STATUS_STARTED,
        currentModal: MODAL_MERGE_WITH_TELEGRAM,
        ...action.payload,
      };
    }

    case ACTION_SHOW_QUESTION: {
      if (!prevState.direction) {
        throw new Error('direction is undefined');
      }

      return {
        status: STATUS_QUESTION,
        direction: prevState.direction,
        currentModal: MODAL_MERGE_WITH_TELEGRAM,
      };
    }

    case ACTION_INVALID_ANSWER: {
      if (!prevState.direction) {
        throw new Error('direction is undefined');
      }

      return {
        status: STATUS_INVALID,
        direction: prevState.direction,
        currentModal: MODAL_MERGE_WITH_TELEGRAM,
      };
    }

    case ACTION_LOADING_WEB_CODE: {
      return {
        status: STATUS_CODE,
        direction: MERGE_DIRECTION_WEB,
        isLoading: true,
        webCode: '',
        errorText: undefined,
        currentModal: MODAL_MERGE_WITH_TELEGRAM,
      };
    }

    case ACTION_SET_WEB_CODE: {
      return {
        status: STATUS_CODE,
        direction: MERGE_DIRECTION_WEB,
        isLoading: false,
        errorText: undefined,
        currentModal: MODAL_MERGE_WITH_TELEGRAM,
        ...action.payload,
      };
    }

    case ACTION_LOADING_TELEGRAM_CODE: {
      return {
        status: STATUS_CODE,
        direction: MERGE_DIRECTION_TELEGRAM,
        isLoading: true,
        telegramCode: 'telegramCode' in prevState ? prevState.telegramCode : '',
        errorText: undefined,
        currentModal: MODAL_MERGE_WITH_TELEGRAM,
      };
    }

    case ACTION_SET_TELEGRAM_CODE: {
      return {
        status: STATUS_CODE,
        direction: MERGE_DIRECTION_TELEGRAM,
        isLoading: false,
        errorText: undefined,
        currentModal: MODAL_MERGE_WITH_TELEGRAM,
        ...action.payload,
      };
    }

    case ACTION_SET_ERROR: {
      if (prevState.status !== STATUS_CODE) {
        throw new Error('status is not STATUS_CODE');
      }

      return {
        ...prevState,
        ...action.payload,
        isLoading: false,
      };
    }

    case ACTION_SHOW_PROPOSAL_TO_ENABLED_OTP: {
      if (prevState.status !== STATUS_CODE) {
        throw new Error('status is not STATUS_CODE');
      }

      return {
        ...prevState,
        currentModal: MODAL_PROPOSAL_TO_ENABLED_OTP,
      };
    }

    case ACTION_SHOW_OTP: {
      if (prevState.status !== STATUS_CODE) {
        throw new Error('status is not STATUS_CODE');
      }

      return {
        ...prevState,
        currentModal: MODAL_OTP,
      };
    }

    case ACTION_RESET: {
      return {
        ...prevState,
        currentModal: undefined,
      };
    }

    default:
      throw new Error('Action not supported');
  }
};

export const useMergeWithTelegram = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleFailure = ({ error }: { error: unknown }) => {
    if (error instanceof FetchError) {
      // code is not used because wrong 2FA comes with same value - MfaRequired
      if (error.code === 478 && error.payload.message === '2FA Token Required') {
        dispatch({ type: ACTION_SHOW_OTP });
        return;
      }

      if (error.code === 409 && error.payload.code === 'NoTwoFaUserApprove') {
        dispatch({ type: ACTION_SHOW_PROPOSAL_TO_ENABLED_OTP });
        return;
      }

      if (typeof error.payload.message === 'string') {
        dispatch({ type: ACTION_SET_ERROR, payload: { errorText: error.payload.message } });
        return;
      }
    }

    dispatch({ type: ACTION_SET_ERROR, payload: { errorText: 'Unknown Error' } });
  };

  const [generateMergeToken] = useP2PGenerateMergeToken({
    onMutate: () => dispatch({ type: ACTION_LOADING_WEB_CODE }),
    onSuccess: ({ data }) =>
      dispatch({ type: ACTION_SET_WEB_CODE, payload: { webCode: data.token } }),
    onFailure: handleFailure,
  });
  const [mergeProfile] = useP2PMergeProfile({
    onMutate: () => dispatch({ type: ACTION_LOADING_TELEGRAM_CODE }),
    onFailure: handleFailure,
  });

  const telegramCode = 'telegramCode' in state ? state.telegramCode : undefined;

  return {
    state,

    handleMergeCancel: useCallback(() => {
      dispatch({ type: ACTION_RESET });
    }, []),

    handleGetCodeClick: useCallback(() => {
      dispatch({ type: ACTION_START, payload: { direction: MERGE_DIRECTION_WEB } });
    }, []),
    handleEnterCodeClick: useCallback(() => {
      dispatch({ type: ACTION_START, payload: { direction: MERGE_DIRECTION_TELEGRAM } });
    }, []),

    handleInvalidClick: useCallback(() => {
      dispatch({ type: ACTION_INVALID_ANSWER });
    }, []),

    handleNextClick: useCallback(
      (param?: Event | string | undefined) => {
        const otp = typeof param === 'string' ? param : undefined;

        if (state.status === STATUS_STARTED) {
          dispatch({ type: ACTION_SHOW_QUESTION });
          return;
        }

        if (
          state.direction === MERGE_DIRECTION_WEB &&
          (state.status === STATUS_QUESTION || state.currentModal === MODAL_OTP)
        ) {
          generateMergeToken({ otp });
          return;
        }

        if (state.status === STATUS_QUESTION && state.direction === MERGE_DIRECTION_TELEGRAM) {
          dispatch({ type: ACTION_SET_TELEGRAM_CODE, payload: { telegramCode: '' } });
          return;
        }

        if (
          state.direction === MERGE_DIRECTION_TELEGRAM &&
          telegramCode &&
          state.status === STATUS_CODE
        ) {
          mergeProfile({ token: telegramCode, otp });
        }
      },
      [
        generateMergeToken,
        mergeProfile,
        state.currentModal,
        state.direction,
        state.status,
        telegramCode,
      ],
    ),

    handleTelegramCodeChange: useCallback((value: string) => {
      dispatch({ type: ACTION_SET_TELEGRAM_CODE, payload: { telegramCode: value } });
    }, []),
  };
};
