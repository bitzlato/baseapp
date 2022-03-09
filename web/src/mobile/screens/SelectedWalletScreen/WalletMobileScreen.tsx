import { useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { Subheader } from 'src/mobile/components';
import { Box } from 'src/components/Box/Box';
import { useT } from 'src/hooks/useT';
import { useGeneralWallets } from 'src/hooks/useGeneralWallets';
import { Tab, TabList, TabPanel, Tabs } from 'src/components/Tabs';
import { DepositCrypto } from 'src/components/DepositCrypto/DepositCrypto';
import { WalletHistory } from 'src/containers/Wallets/History';
import { Withdraw } from 'src/containers/Withdraw/Withdraw';
import { Transfer } from 'src/containers/Wallets/Transfer';
import { selectWallet } from 'src/modules/user/wallets/selectors';
import { InvoiceExplanation } from 'src/screens/WalletsScreen/InvoiceExplanation';
import { WalletMobileBalance } from './WalletMobileBalance';
import { TabId, useWalletTab } from 'web/src/screens/WalletsScreen/useWalletTab';
import { Gift } from 'web/src/containers/Gift/Gift';
import { DEFAULT_WALLET_ITEM } from 'web/src/components/WalletItem/defaults';

export const WalletMobileScreen: React.FC = () => {
  const params = useParams<UrlParams>();
  const currency = params.currency?.toUpperCase() ?? '';
  const history = useHistory();
  const t = useT();
  const wallet = useSelector(selectWallet(currency));

  const generals = useGeneralWallets();

  const handleTabSelection = (value: TabId) => {
    setTab(value);
    history.replace(`/wallets/${currency.toLowerCase()}/${value}`);
  };

  const general = generals.find((d) => d.currency === currency) ?? DEFAULT_WALLET_ITEM;

  const { tabs, tab, setTab } = useWalletTab(params.tab, general);

  return (
    <Box col spacing="sm">
      <Subheader
        title={t('page.body.wallets.balance')}
        backTitle={t('page.mobile.wallets.title')}
        onGoBack={() => history.push('/wallets')}
      />
      {general && (
        <>
          <WalletMobileBalance wallet={general} />
          {wallet && (
            <Box bgColor="body" padding="2X3" col spacing="2">
              <Tabs value={tab} onSelectionChange={handleTabSelection as any}>
                <Box grow justify="around" as={TabList}>
                  {tabs.map((d) => (
                    <Tab key={d.value} value={d.value} size="small">
                      {t(d.label)}
                    </Tab>
                  ))}
                </Box>
                <TabPanel value="deposit">
                  {general.currency === 'BTC' ? (
                    <InvoiceExplanation
                      currency={general.currency}
                      onClick={() => handleTabSelection(TabId.transfer)}
                    />
                  ) : (
                    <DepositCrypto wallet={wallet} />
                  )}
                  <WalletHistory
                    label="deposit"
                    type="deposits"
                    currency={currency.toLowerCase()}
                  />
                </TabPanel>
                <TabPanel value="withdraw">
                  {general.currency === 'BTC' ? (
                    <InvoiceExplanation
                      currency={general.currency}
                      onClick={() => handleTabSelection(TabId.transfer)}
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
                      currency={general.balanceTotal.currency}
                      balanceMarket={general.balanceMarket?.toString() ?? '0'}
                      balanceP2P={general.balanceP2P?.toString() ?? '0'}
                    />
                  )}
                </TabPanel>
                <TabPanel value={TabId.gift}>
                  {general.balanceP2P && (
                    <Gift
                      currency={general.balanceTotal.currency}
                      balanceP2P={general.balanceP2P}
                    />
                  )}
                </TabPanel>
              </Tabs>
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

interface UrlParams {
  currency?: string;
  tab?: string;
}
