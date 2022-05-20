export enum ISignedOpCommand {
  CANCEL_2FA = 'TwoFA.Cancel',
  WITHDRAW_SUBMIT = 'Withdraw.Submit',
  VOUCHER_CREATE = 'Voucher.Create',
  API_KEY_CREATED = 'ApiKey.Create',
}

export type SignedOpError =
  | 'TokenIsExpired'
  | 'TokenIsNotFound'
  | 'MalformedToken'
  | 'NotAllowed'
  | 'Failed'
  | string;

export type SignedOpsResult = {
  command: ISignedOpCommand;
  error?: SignedOpError | undefined;
  to: string;
  result?:
    | {
        cryptocurrency?: { code: string };
        aud?: 'usr' | 'mob';
      }
    | undefined;
};
