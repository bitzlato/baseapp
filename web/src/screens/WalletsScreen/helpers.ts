import { Wallet } from 'src/modules/user/wallets/types';

type TabId = 'deposit' | 'withdraw';

export const TABS: TabId[] = ['deposit', 'withdraw'];

export function getCurrencyIndex(wallets: Wallet[], currency?: string): number {
  if (currency) {
    currency = currency.toUpperCase();
    const index = wallets.findIndex((d) => d.currency.code === currency);
    if (index !== -1) {
      return index;
    }
  }
  return wallets.length ? 0 : -1;
}

export function getTabIndex(tab?: string): number {
  const index = TABS.indexOf(tab as any);
  return index !== -1 ? index : 0;
}
