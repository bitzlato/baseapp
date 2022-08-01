import { useMemo, useState } from 'react';
import { SelectOption } from 'web/src/components/Select/Select';
import { WalletItemData } from 'web/src/components/WalletItem/WalletItem';

export const enum TabId {
  deposit = 'deposit',
  withdraw = 'withdraw',
  transfer = 'transfer',
  rate = 'rate',
}

export type TabOption = SelectOption & { disabled?: boolean };

const TABS: TabOption[] = [
  { value: TabId.deposit, label: 'Deposit.noun' },
  { value: TabId.withdraw, label: 'Withdraw.noun' },
  { value: TabId.transfer, label: 'Transfer.noun' },
  { value: TabId.rate, label: 'Rate' },
];

function findTabByValue(tabs: TabOption[], value?: string): TabOption {
  const valueLower = value?.toLowerCase();
  return tabs.find((d) => d.value === valueLower) ?? tabs[0]!;
}

export function useWalletTab(
  queryTab: string | undefined,
  general: WalletItemData,
  hasRate: boolean,
) {
  const [tabState, setTabState] = useState(queryTab);

  const tabs = useMemo(() => {
    return TABS.map((tabItem) => {
      switch (tabItem.value) {
        case TabId.transfer:
          return { ...tabItem, disabled: !general.hasTransfer };

        case TabId.rate:
          return { ...tabItem, disabled: !hasRate };

        default:
          return { ...tabItem, disabled: false };
      }
    });
  }, [general.hasTransfer, hasRate]);

  const setTab = (value: string | undefined): string | undefined => {
    const newValue = findTabByValue(tabs, value)?.value;
    setTabState(newValue);
    return newValue;
  };

  const tab = findTabByValue(tabs, queryTab ?? tabState)?.value;

  return { tabs, tab, setTab };
}
