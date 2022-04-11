import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import { Card } from 'src/components/Card/Card';
import { Box } from 'src/components/Box/Box';
import { useT } from 'src/hooks/useT';
import { useDocumentTitle } from 'src/hooks/useDocumentTitle';
import { WalletList } from 'src/components/WalletList';
import walletItemS from 'src/components/WalletItem/WalletItem.postcss';
import { selectWallets } from 'src/modules/user/wallets/selectors';
import { useWalletsFetch } from 'src/hooks/useWalletsFetch';
import { CryptoCurrencyIcon } from 'src/components/CryptoCurrencyIcon/CryptoCurrencyIcon';
import { Tabs } from 'src/components/Tabs/Tabs';
import { Tab, TabList, TabPanel } from 'src/components/Tabs';
import { getCurrencyCodeSymbol } from 'src/helpers/getCurrencySymbol';
import { DepositCrypto } from 'src/components/DepositCrypto/DepositCrypto';
import { WalletHistory } from 'src/containers/Wallets/History';
import { Withdraw } from 'src/containers/Withdraw/Withdraw';
import { useHistory, useParams } from 'react-router';
import { Transfer } from 'src/containers/Wallets/Transfer';
import { Estimated } from 'src/containers/Wallets/Estimated';
import { Container } from 'web/src/components/Container/Container';
import { Gift } from 'web/src/containers/Gift/Gift';
import { DEFAULT_WALLET_ITEM } from 'web/src/components/WalletItem/defaults';
import { useGeneralWallets } from 'web/src/hooks/useGeneralWallets';
import { TabId, useWalletTab } from './useWalletTab';
import { Balance } from './Balance';
import { InvoiceExplanation } from './InvoiceExplanation';

import s from './WalletsScreen.postcss';

export const WalletsScreen: React.FC = () => {
  const params = useParams<UrlParams>();
  const history = useHistory();
  const wallets = useSelector(selectWallets);
  const [listIndex, setListIndex] = useState(0);

  const t = useT();
  useWalletsFetch();
  useDocumentTitle('Wallets');

  const list = useGeneralWallets();

  useEffect(() => {
    const currency = params.currency?.toUpperCase();
    const index = list.findIndex((d) => d.currency === currency);
    if (index !== -1) {
      setListIndex(index);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list.length]);

  const replaceHistory = (index: number, tabId?: string) => {
    const parts: string[] = [];
    const currency = list[index]?.currency.toLowerCase();
    if (currency) {
      parts.push(currency);
    }
    if (tabId) {
      parts.push(tabId);
    }
    history.replace(`/wallets/${parts.join('/')}`);
  };

  const general = list[listIndex] ?? DEFAULT_WALLET_ITEM;
  const wallet = wallets.find((d) => d.currency.code === general?.currency);

  const { tabs, tab, setTab } = useWalletTab(params.tab, general);

  const onListSelected = (index: number) => {
    setListIndex(index);
    replaceHistory(index, setTab(tab));
  };

  const onTabSelected = (value: string) => {
    setTab(value);
    replaceHistory(listIndex, value);
  };

  if (list.length === 0) {
    return (
      <div className="pg-loader-container">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <Container maxWidth="lg" my="4">
      <Box grow col spacing="4">
        <Estimated />
        <Card>
          <Box row align="start">
            <WalletList
              className={s.walletsList}
              walletItems={list}
              activeIndex={listIndex}
              onWalletSelectionChange={onListSelected}
            />
            <Box flex="1" self="stretch" col className={s.walletsCoin}>
              {general && (
                <Tabs value={tab} onSelectionChange={onTabSelected}>
                  <Box padding="5" col spacing="5" textColor="primary">
                    <Box row spacing="2">
                      <CryptoCurrencyIcon size="large" currency={general.currency} />
                      <Box col align="start" textAlign="start">
                        <Box as="span" textSize="title">
                          {getCurrencyCodeSymbol(general.currency)}
                        </Box>
                        <Box as="span" textSize="description">
                          {general.name}
                        </Box>
                      </Box>
                      <Box grow />
                      <TabList>
                        {tabs.map((d) => (
                          <Tab key={d.value} size="large" value={d.value}>
                            {t(d.label)}
                          </Tab>
                        ))}
                      </TabList>
                    </Box>
                    <Box row gap="5" wrap style={{ marginTop: 'calc(var(--gap) * 5 / 2)' }}>
                      <Balance title={t('P2P Balance')} money={general.balanceP2P} />
                      <Balance title={t('Exchange Balance')} money={general.balanceMarket} />
                      <Balance title={t('Locked')} money={general.locked} />
                    </Box>
                    {wallet && (
                      <>
                        <TabPanel value={TabId.deposit}>
                          {general.currency === 'BTC' ? (
                            <InvoiceExplanation currency={general.currency} />
                          ) : (
                            <DepositCrypto wallet={wallet} />
                          )}
                          <WalletHistory
                            label="deposit"
                            type="deposits"
                            currency={wallet.currency.code.toLowerCase()}
                          />
                        </TabPanel>
                        <TabPanel value={TabId.withdraw}>
                          {general.currency === 'BTC' ? (
                            <InvoiceExplanation currency={general.currency} />
                          ) : (
                            <Withdraw wallet={wallet} />
                          )}
                          <WalletHistory
                            label="withdraw"
                            type="withdraws"
                            currency={wallet.currency.code.toLowerCase()}
                          />
                        </TabPanel>
                      </>
                    )}
                    <TabPanel value={TabId.transfer}>
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
                  </Box>
                </Tabs>
              )}
            </Box>
          </Box>
        </Card>
      </Box>
    </Container>
  );
};

interface UrlParams {
  currency?: string;
  tab?: string;
}
