import { useHistory, useParams } from 'react-router';
import { Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Subheader } from 'src/mobile/components';
import { Box } from 'src/components/Box/Box';
import { useT } from 'src/hooks/useT';
import { useGeneralWallets } from 'src/hooks/useGeneralWallets';
import { Tab, TabList, TabPanel, Tabs } from 'src/components/Tabs';
import { Withdraw } from 'src/containers/Withdraw/Withdraw';
import { Transfer } from 'src/containers/Wallets/Transfer';
import { selectWallet } from 'src/modules/user/wallets/selectors';
import { WalletMobileBalance } from './WalletMobileBalance';
import { TabId, useWalletTab } from 'web/src/screens/WalletsScreen/useWalletTab';
import { Gift } from 'web/src/containers/Gift/Gift';
import { DEFAULT_WALLET_ITEM } from 'web/src/components/WalletItem/defaults';
import { Rate } from 'web/src/screens/WalletsScreen/Rate';
import { selectUserInfo } from 'web/src/modules/user/profile/selectors';
import { useFetchRate } from 'web/src/hooks/data/useFetchRate';
import { Deposit } from 'web/src/components/DepositCrypto/Deposit';

export const WalletMobileScreen: React.FC = () => {
  const params = useParams<UrlParams>();
  const currency = params.currency?.toUpperCase() ?? '';
  const history = useHistory();
  const t = useT();
  const wallet = useSelector(selectWallet(currency));
  const user = useSelector(selectUserInfo);

  const generals = useGeneralWallets();

  const userCurrency = user.bitzlato_user?.user_profile.currency ?? 'USD';
  const general = generals.find((d) => d.currency === currency) ?? DEFAULT_WALLET_ITEM;

  const handleTabSelection = (value: TabId) => {
    setTab(value);
    history.replace(`/wallets/${currency.toLowerCase()}/${value}`);
  };

  const rateResponse = useFetchRate(
    currency,
    general.balanceP2P !== undefined ? userCurrency : undefined,
  );
  const hasRate = rateResponse.data !== undefined;
  const { tabs, tab, setTab } = useWalletTab(params.tab, general, hasRate);

  if (generals.length === 0) {
    return (
      <div className="pg-loader-container">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <Box col spacing="sm">
      <Subheader
        title={t('page.body.wallets.balance')}
        backTitle={t('page.mobile.wallets.title')}
        onGoBack={() => history.push('/wallets')}
      />
      <WalletMobileBalance wallet={general} />
      <Box bgColor="body" padding="2X3" col spacing="2">
        <Tabs value={tab} onSelectionChange={handleTabSelection as any}>
          <Box grow justify="around" as={TabList}>
            {tabs.map((tabItem) => (
              <Tab
                key={tabItem.value}
                value={tabItem.value}
                disabled={tabItem.disabled}
                size="small"
              >
                {t(tabItem.label)}
              </Tab>
            ))}
          </Box>
          <TabPanel value="deposit">
            <Deposit general={general} wallet={wallet} />
          </TabPanel>
          <TabPanel value="withdraw">
            <Withdraw general={general} wallet={wallet} />
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
              <Gift currency={general.balanceTotal.currency} balanceP2P={general.balanceP2P} />
            )}
          </TabPanel>
          <TabPanel value={TabId.rate}>
            <Rate
              cryptoCurrency={currency}
              fiatCurrency={userCurrency}
              fetchRate={general.balanceP2P !== undefined}
            />
          </TabPanel>
        </Tabs>
      </Box>
    </Box>
  );
};

interface UrlParams {
  currency?: string;
  tab?: string;
}
