import { DEFAULT_CCY_PRECISION } from "src/constants";
import { Wallet } from "./types";

export const defaultWallet: Wallet = {
  name: '',
  currency: '',
  balance: '',
  type: 'coin',
  fixed: DEFAULT_CCY_PRECISION,
  fee: 0,
  icon_id: '',
};
