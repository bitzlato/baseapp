import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import { Card } from 'src/components/Card/Card';
import { Box } from 'src/components/Box/Box';
import { useT } from 'src/hooks/useT';
import { useDocumentTitle } from 'src/hooks/useDocumentTitle';
import { WalletList } from 'src/components/WalletList';
import { selectWallets } from 'src/modules/user/wallets/selectors';
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
import { useGeneralWallets } from 'web/src/hooks/useGeneralWallets';
import { WalletItemData } from 'web/src/components/WalletItem/WalletItem';
import { selectUserInfo } from 'web/src/modules/user/profile/selectors';
import { useFetchRate } from 'web/src/hooks/data/useFetchRate';
import { TabId, useWalletTab } from './useWalletTab';
import { Balance } from './Balance';
import { InvoiceExplanation } from './InvoiceExplanation';
import { Rate } from './Rate';

import s from './WalletsScreen.postcss';

interface Props {
  list: WalletItemData[];
}

const WalletsScreenContent: React.FC<Props> = ({ list }) => {
  const params = useParams<UrlParams>();
  const history = useHistory();
  const wallets = useSelector(selectWallets);
  const user = useSelector(selectUserInfo);

  const [listIndex, setListIndex] = useState(0);

  const t = useT();

  useEffect(() => {
    const currency = params.currency?.toUpperCase();
    const index = list.findIndex((d) => d.currency === currency);
    if (index !== -1) {
      setListIndex(index);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list.length]);

  const general = list[listIndex]!;
  const wallet = wallets.find((d) => d.currency.code === general?.currency);
  const cryptoCurrency = getCurrencyCodeSymbol(general.currency);
  const userCurrency = user.bitzlato_user?.user_profile.currency ?? 'USD';

  const rateResponse = useFetchRate(
    cryptoCurrency,
    general.balanceP2P !== undefined ? userCurrency : undefined,
  );
  const hasRate = rateResponse.data !== undefined;
  const { tabs, tab, setTab } = useWalletTab(params.tab, general, hasRate);

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
    replaceHistory(index, setTab(tab));
  };

  const onTabSelected = (value: string) => {
    setTab(value);
    replaceHistory(listIndex, value);
  };

  return (
    <Container maxWidth="xl" my="4">
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
              <Tabs value={tab} onSelectionChange={onTabSelected}>
                <Box padding="5" col spacing="5" textColor="primary">
                  <Box row spacing="2" justify="between">
                    <Box row spacing="2">
                      <CryptoCurrencyIcon size="large" currency={general.currency} />
                      <Box col align="start" textAlign="start" spacing>
                        <Box as="span" textSize="title">
                          {cryptoCurrency}
                        </Box>
                        <Box as="span" textSize="description">
                          {general.name}
                        </Box>
                      </Box>
                    </Box>
                    <TabList>
                      {tabs.map((tabItem) => (
                        <Tab
                          key={tabItem.value}
                          size="large"
                          value={tabItem.value}
                          disabled={tabItem.disabled}
                        >
                          {t(tabItem.label)}
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
                  <TabPanel value={TabId.rate}>
                    <Rate
                      cryptoCurrency={cryptoCurrency}
                      fiatCurrency={userCurrency}
                      fetchRate={general.balanceP2P !== undefined}
                    />
                  </TabPanel>
                </Box>
              </Tabs>
            </Box>
          </Box>
        </Card>
      </Box>
    </Container>
  );
};

export const WalletsScreen: React.FC = () => {
  useDocumentTitle('Wallets');
  const list = useGeneralWallets();

  return list.length === 0 ? (
    <div className="pg-loader-container">
      <Spinner animation="border" variant="primary" />
    </div>
  ) : (
    <WalletsScreenContent list={list} />
  );
};

interface UrlParams {
  currency?: string;
  tab?: string;
}
