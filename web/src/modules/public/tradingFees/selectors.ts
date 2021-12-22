import { RootState } from 'src/modules';

export const selectTradingFees = (state: RootState) => state.public.tradingFees.list;
