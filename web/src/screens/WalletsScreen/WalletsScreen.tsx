import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
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
import { GeneralBalance } from 'src/modules/account/types';
import { WalletHistory } from 'src/containers/Wallets/History';
import { Withdraw } from 'src/containers/Withdraw/Withdraw';
import { useHistory, useParams } from 'react-router';
import { Transfer } from 'src/containers/Wallets/Transfer';
import { Estimated } from 'src/containers/Wallets/Estimated';
import { accountUrl } from 'src/api';
import type { SelectOption } from 'src/components/Select/Select';
import { Container } from 'web/src/components/Container/Container';
import { getList } from './helpers';
import { Balance } from './Balance';
import { InvoiceExplanation } from './InvoiceExplanation';
import { useFetcher } from 'web/src/hooks/data/useFetcher';

import s from './WalletsScreen.postcss';
import { fetchWithCreds } from 'web/src/helpers/fetcher';

export const WalletsScreen: React.FC = () => {
  const params = useParams<UrlParams>();
  const history = useHistory();
  const wallets = useSelector(selectWallets);
  const [listIndex, setListIndex] = useState(0);
  const [tab, setTab] = useState(params.tab);

  const t = useT();
  useWalletsFetch();
  useDocumentTitle('Wallets');

  const shouldFetch = process.env.REACT_APP_RELEASE_STAGE !== 'sandbox';

  const balanceResponse = useFetcher<GeneralBalance[]>(
    shouldFetch ? `${accountUrl()}/balances` : null,
    fetchWithCreds,
  );

  const list = useMemo(
    () => getList(wallets, balanceResponse.data ?? []),
    [wallets, balanceResponse.data],
  );

  useEffect(() => {
    const currency = params.currency?.toUpperCase();
    const index = list.findIndex((d) => d.currency === currency);
    if (index !== -1) {
      setListIndex(index);
    }
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

  const onListSelected = (index: number) => {
    setListIndex(index);
    const tabn = getTab(tabs, tab)?.value;
    setTab(tabn);
    replaceHistory(index, tabn);
  };

  const onTabSelected = (value: string) => {
    setTab(value);
    replaceHistory(listIndex, value);
  };

  const item = list[listIndex];
  const wallet = wallets.find((d) => d.currency.code === item?.currency);

  const tabs = useMemo(() => {
    return TABS.filter((d) => {
      return item?.balanceMarket && (d.value !== TabId.transfer || item?.hasTransfer);
    });
  }, [item?.hasTransfer, item?.balanceMarket]);

  const tabValue = getTab(tabs, tab)?.value ?? '';

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
            <Box flex1 self="stretch" col className={s.walletsCoin}>
              {item && (
                <Tabs value={tabValue} onSelectionChange={onTabSelected}>
                  <Box padding="5" col spacing="5" textColor="primary">
                    <Box row spacing="2">
                      <CryptoCurrencyIcon size="large" currency={item.currency} />
                      <Box col align="start" textAlign="start">
                        <span className={walletItemS.title}>
                          {getCurrencyCodeSymbol(item.currency)}
                        </span>
                        <span className={walletItemS.description}>{item.name}</span>
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
                      <Balance title={t('P2P Balance')} money={item.balanceP2P} />
                      <Balance title={t('Exchange Balance')} money={item.balanceMarket} />
                      <Balance title={t('Locked')} money={item.locked} />
                    </Box>
                    <TabPanel value={TabId.deposit}>
                      {wallet && (
                        <>
                          {item.currency === 'BTC' ? (
                            <InvoiceExplanation
                              currency={item.currency}
                              onClick={() => onTabSelected(TabId.transfer)}
                            />
                          ) : (
                            <DepositCrypto wallet={wallet} />
                          )}
                          <WalletHistory
                            label="deposit"
                            type="deposits"
                            currency={wallet.currency.code.toLowerCase()}
                          />
                        </>
                      )}
                    </TabPanel>
                    <TabPanel value={TabId.withdraw}>
                      {wallet && (
                        <>
                          {item.currency === 'BTC' ? (
                            <InvoiceExplanation
                              currency={item.currency}
                              onClick={() => onTabSelected(TabId.transfer)}
                            />
                          ) : (
                            <Withdraw wallet={wallet} />
                          )}
                          <WalletHistory
                            label="withdraw"
                            type="withdraws"
                            currency={wallet.currency.code.toLowerCase()}
                          />
                        </>
                      )}
                    </TabPanel>
                    <TabPanel value={TabId.transfer}>
                      {item.hasTransfer && (
                        <Transfer
                          currency={item.balanceTotal.currency}
                          balanceMarket={item.balanceMarket?.toString() ?? '0'}
                          balanceP2P={item.balanceP2P?.toString() ?? '0'}
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

const enum TabId {
  deposit = 'deposit',
  withdraw = 'withdraw',
  transfer = 'transfer',
}

const TABS: SelectOption[] = [
  { value: TabId.deposit, label: 'Deposit.noun' },
  { value: TabId.withdraw, label: 'Withdraw.noun' },
  { value: TabId.transfer, label: 'Transfer.noun' },
];

function getTab(tabs: SelectOption[], value?: string) {
  value = value?.toLowerCase();
  return tabs.find((d) => d.value === value) ?? tabs[0];
}
