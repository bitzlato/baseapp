import { useMemo, useState } from 'react';
import { SelectOption } from 'web/src/components/Select/Select';
import { WalletItemData } from 'web/src/components/WalletItem/WalletItem';
import { CurrencyRate } from 'web/src/modules/p2p/rate-types';

export const enum TabId {
  deposit = 'deposit',
  withdraw = 'withdraw',
  transfer = 'transfer',
  gift = 'gift',
  rate = 'rate',
}

const TABS: SelectOption[] = [
  { value: TabId.deposit, label: 'Deposit.noun' },
  { value: TabId.withdraw, label: 'Withdraw.noun' },
  { value: TabId.transfer, label: 'Transfer.noun' },
  { value: TabId.gift, label: 'Gifts' },
  { value: TabId.rate, label: 'Rate' },
];

function findTabByValue(tabs: SelectOption[], value?: string): SelectOption {
  const valueLower = value?.toLowerCase();
  return tabs.find((d) => d.value === valueLower) ?? tabs[0]!;
}

export function useWalletTab(
  queryTab: string | undefined,
  general: WalletItemData,
  rate: CurrencyRate | null,
) {
  const [tabState, setTabState] = useState(queryTab);

  const tabs = useMemo(() => {
    return TABS.filter((d) => {
      switch (d.value) {
        case TabId.transfer:
          return general.hasTransfer;

        case TabId.gift:
          return general.hasGift;

        case TabId.rate:
          return rate;

        default:
          return general.hasDepositWithdraw;
      }
    });
  }, [general.hasDepositWithdraw, general.hasTransfer, general.hasGift, rate]);

  const setTab = (value: string | undefined): string | undefined => {
    const newValue = findTabByValue(tabs, value)?.value;
    setTabState(newValue);
    return newValue;
  };

  const tab = findTabByValue(tabs, queryTab ?? tabState)?.value;

  return { tabs, tab, setTab };
}
