import React, { useMemo, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { Subheader } from 'src/mobile/components';
import { Box } from 'src/components/Box/Box';
import { useT } from 'src/hooks/useT';
import { SelectOption } from 'src/components/Select/Select';
import { WalletMobileBalance } from './WalletMobileBalance';
import { useGeneralWallets } from 'src/hooks/useGeneralWallets';
import { Tab, TabList, TabPanel, Tabs } from 'src/components/Tabs';
import { DepositCrypto } from 'src/components/DepositCrypto';
import { WalletHistory } from 'src/containers/Wallets/History';
import { Withdraw } from 'src/containers/Withdraw';
import { Transfer } from 'src/containers/Wallets/Transfer';
import { selectWallet } from 'src/modules/user/wallets/selectors';
import { InvoiceExplanation } from 'src/screens/WalletsScreen/InvoiceExplanation';

export const WalletMobileScreen: React.FC = () => {
  const params = useParams<UrlParams>();
  const [tab, setTab] = useState(params.tab ?? 'deposit');
  const currency = params.currency?.toUpperCase() ?? '';
  const history = useHistory();
  const t = useT();
  const wallet = useSelector(selectWallet(currency));
  const [transfers, setTransfers] = useState(0);

  const generals = useGeneralWallets([transfers]);

  const handleTabSelection = (value: TabId) => {
    setTab(value);
    history.replace(`/wallets/${currency.toLowerCase()}/${value}`);
  };

  const general = generals.find((d) => d.currency === currency);

  const tabs = useMemo(() => {
    return TABS.filter((d) => {
      return d.value !== 'transfer' || general?.hasTransfer;
    });
  }, [general?.hasTransfer]);

  const tabValue = getTabValue(tabs, tab);

  return (
    <Box col spacing="sm">
      <Subheader
        title={t('page.body.wallets.balance')}
        backTitle={t('page.mobile.wallets.title')}
        onGoBack={() => history.push('/wallets')}
      />
      {general && wallet && (
        <>
          <WalletMobileBalance wallet={general} />
          <Box bgColor="body" padding="2X3" col spacing="2">
            <Tabs value={tabValue} onSelectionChange={handleTabSelection as any}>
              <Box grow justify="around" as={TabList}>
                {tabs.map((d) => (
                  <Tab key={d.value} value={d.value} size="small">
                    {t(d.label)}
                  </Tab>
                ))}
              </Box>
              <TabPanel value="deposit">
                {wallet.enable_invoice ? (
                  <InvoiceExplanation
                    currency={general.currency}
                    onClick={() => handleTabSelection('transfer')}
                  />
                ) : (
                  <DepositCrypto wallet={wallet} />
                )}
                <WalletHistory label="deposit" type="deposits" currency={currency.toLowerCase()} />
              </TabPanel>
              <TabPanel value="withdraw">
                {wallet.enable_invoice ? (
                  <InvoiceExplanation
                    currency={general.currency}
                    onClick={() => handleTabSelection('transfer')}
                  />
                ) : (
                  <Withdraw wallet={wallet} />
                )}
                <WalletHistory
                  label="withdraw"
                  type="withdraws"
                  currency={currency.toLowerCase()}
                />
              </TabPanel>
              <TabPanel value="transfer">
                {general.hasTransfer && (
                  <Transfer
                    currency={general.balance.currency}
                    balanceMarket={general.balanceMarket.toString()}
                    balanceP2P={general.balanceP2P.toString()}
                    transfers={transfers}
                    onChangeTransfers={() => setTransfers(transfers + 1)}
                  />
                )}
              </TabPanel>
            </Tabs>
          </Box>
        </>
      )}
    </Box>
  );
};

interface UrlParams {
  currency?: string;
  tab?: string;
}

type TabId = 'deposit' | 'withdraw' | 'transfer';

const TABS: SelectOption<TabId>[] = [
  { value: 'deposit', label: 'Deposit.noun' },
  { value: 'withdraw', label: 'Withdraw.noun' },
  { value: 'transfer', label: 'Transfer.noun' },
];

function getTabValue(tabs: SelectOption<TabId>[], value?: string): TabId {
  value = value?.toLowerCase();
  return tabs.find((d) => d.value === value)?.value ?? 'deposit';
}
