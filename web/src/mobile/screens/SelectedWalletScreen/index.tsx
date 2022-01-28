import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { Subheader, WalletsButtons } from 'src/mobile/components';
import { WalletsHistory } from 'src/mobile/screens/WalletsHistory';
import { Box } from 'src/components/Box/Box';
import { useT } from 'src/hooks/useT';
import { SelectOption } from 'src/components/Select/Select';
import { WalletMobileBalance } from './WalletMobileBalance';
import { useGeneralWallets } from 'src/hooks/useGeneralWallets';
import { Tab, TabList, Tabs } from 'src/components/Tabs';

export const SelectedWalletMobileScreen: React.FC = () => {
  const [tab, setTab] = useState('deposit');
  const currency = useParams<{ currency?: string }>().currency?.toUpperCase() ?? '';
  const history = useHistory();
  const t = useT();

  const wallets = useGeneralWallets();
  const wallet = wallets.find((d) => d.currency === currency);

  return (
    <Box col spacing="sm">
      <Subheader
        title={t('page.body.wallets.balance')}
        backTitle={t('page.mobile.wallets.title')}
        onGoBack={() => history.push('/wallets')}
      />
      {wallet && (
        <>
          <WalletMobileBalance wallet={wallet} />
          <Box bgColor="body" padding="2X3" row>
            <Tabs value={tab} onSelectionChange={setTab as any}>
              <Box grow justify="around" as={TabList}>
                <Tab size="small" value="deposit">
                  {t('Deposit.noun')}
                </Tab>
                <Tab size="small" value="withdraw">
                  {t('Withdraw.noun')}
                </Tab>
                {wallet.hasTransfer && (
                  <Tab size="small" value="transfer">
                    {t('Transfer.noun')}
                  </Tab>
                )}
              </Box>
            </Tabs>
          </Box>
          <WalletsHistory />
          <WalletsButtons
            currency={currency}
            options={TABS.filter((d) => d.value !== 'transfer' || wallet.hasTransfer)}
          />
        </>
      )}
    </Box>
  );
};

type TabId = 'deposit' | 'withdraw' | 'transfer' | 'gift';

const TABS: SelectOption<TabId>[] = [
  { value: 'deposit', label: 'Deposit.noun' },
  { value: 'withdraw', label: 'Withdraw.noun' },
  { value: 'transfer', label: 'Transfer.noun' },
];
