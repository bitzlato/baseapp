import { useMemo, useState } from 'react';
import { SelectOption } from 'web/src/components/Select/Select';
import { WalletItemData } from 'web/src/components/WalletItem/WalletItem';

export const enum TabId {
  deposit = 'deposit',
  withdraw = 'withdraw',
  transfer = 'transfer',
  gift = 'gift',
}

const TABS: SelectOption[] = [
  { value: TabId.deposit, label: 'Deposit.noun' },
  { value: TabId.withdraw, label: 'Withdraw.noun' },
  { value: TabId.transfer, label: 'Transfer.noun' },
  { value: TabId.gift, label: 'Gifts' },
];

function findTabByValue(tabs: SelectOption[], value?: string): SelectOption {
  const valueLower = value?.toLowerCase();
  return tabs.find((d) => d.value === valueLower) ?? tabs[0]!;
}

export function useWalletTab(queryTab: string | undefined, general: WalletItemData) {
  const [tabState, setTabState] = useState(queryTab);

  const tabs = useMemo(() => {
    return TABS.filter((d) => {
      // eslint-disable-next-line no-nested-ternary
      return d.value === TabId.transfer
        ? general.hasTransfer
        : d.value === TabId.gift
        ? general.hasGift
        : general.hasDepositWithdraw;
    });
  }, [general.hasDepositWithdraw, general.hasTransfer, general.hasGift]);

  const setTab = (value: string | undefined): string | undefined => {
    const newValue = findTabByValue(tabs, value)?.value;
    setTabState(newValue);
    return newValue;
  };

  const tab = findTabByValue(tabs, queryTab ?? tabState)?.value;

  return { tabs, tab, setTab };
}
