import classnames from 'classnames';
import * as React from 'react';
import { Spinner } from 'react-bootstrap';
import { injectIntl } from 'react-intl';
import { connect, MapDispatchToProps } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { Box } from 'src/components/Box';
import { Withdraw } from 'src/containers/Withdraw';
import { defaultBeneficiary } from 'src/modules/user/beneficiaries/defaults';
import { defaultWallet } from 'src/modules/user/wallets/defaults';
import { IntlProps } from '../../';
import {
  Blur,
  CurrencyInfo,
  DepositCrypto,
  DepositFiat,
  TabPanel,
  WalletList,
} from '../../components';
import { DEFAULT_CCY_PRECISION } from '../../constants';
import { EstimatedValue } from '../../containers/Wallets/EstimatedValue';
import { WalletHistory } from '../../containers/Wallets/History';
import { setDocumentTitle } from '../../helpers';
import {
  alertPush,
  beneficiariesFetch,
  Beneficiary,
  currenciesFetch,
  ApiCurrency,
  MemberLevels,
  memberLevelsFetch,
  RootState,
  selectBeneficiariesActivateSuccess,
  selectBeneficiariesCreateSuccess,
  selectBeneficiariesDeleteSuccess,
  selectCurrencies,
  selectHistory,
  selectMemberLevels,
  selectMobileWalletUi,
  selectUserInfo,
  selectWallets,
  selectWithdrawSuccess,
  setMobileWalletUi,
  User,
  Wallet,
  WalletHistoryList,
  walletsAddressFetch,
  walletsData,
  walletsFetch,
  walletsWithdrawCcyFetch,
} from '../../modules';
import { getCurrencyIndex, getTabIndex, TABS } from './helpers';

interface ReduxProps {
  user: User;
  wallets: Wallet[];
  walletsLoading?: boolean;
  historyList: WalletHistoryList;
  mobileWalletChosen: string;
  beneficiariesActivateSuccess: boolean;
  beneficiariesDeleteSuccess: boolean;
  beneficiariesAddSuccess: boolean;
  currencies: ApiCurrency[];
  memberLevels?: MemberLevels;
}

interface DispatchProps {
  fetchBeneficiaries: typeof beneficiariesFetch;
  fetchAddress: typeof walletsAddressFetch;
  fetchWallets: typeof walletsFetch;
  clearWallets: () => void;
  walletsWithdrawCcy: typeof walletsWithdrawCcyFetch;
  fetchSuccess: typeof alertPush;
  setMobileWalletUi: typeof setMobileWalletUi;
  currenciesFetch: typeof currenciesFetch;
  memberLevelsFetch: typeof memberLevelsFetch;
}

interface WalletsState {
  walletIndex: number;
  beneficiary: Beneficiary;
  tabIndex: number;
}

interface OwnProps {}

interface UrlParams {
  currency?: string;
  tab?: string;
}

type Props = ReduxProps & DispatchProps & RouteComponentProps<UrlParams> & IntlProps & OwnProps;

class WalletsComponent extends React.Component<Props, WalletsState> {
  constructor(props: Props) {
    super(props);

    this.state = {
      walletIndex: getCurrencyIndex(props.wallets, props.match.params.currency),
      tabIndex: getTabIndex(props.match.params.tab),
      beneficiary: defaultBeneficiary,
    };
  }

  //tslint:disable member-ordering
  public translate = (id: string) => this.props.intl.formatMessage({ id });

  private title = this.translate('page.body.wallets.tabs.deposit.fiat.message1');
  private description = this.translate('page.body.wallets.tabs.deposit.fiat.message2');

  public componentDidMount() {
    setDocumentTitle('Wallets');
    const { wallets, memberLevels } = this.props;
    const { walletIndex } = this.state;

    if (this.props.wallets.length === 0) {
      this.props.fetchWallets();
    }

    if (walletIndex === -1 && wallets.length) {
      this.setState({
        walletIndex: getCurrencyIndex(this.props.wallets, this.props.match.params.currency),
      });
      wallets[0]?.currency &&
        this.props.fetchBeneficiaries({ currency_id: wallets[0].currency.code.toLowerCase() });
    }

    if (!this.props.currencies.length) {
      this.props.currenciesFetch();
    }

    if (!memberLevels) {
      this.props.memberLevelsFetch();
    }
  }

  public componentWillUnmount() {
    this.props.clearWallets();
  }

  public UNSAFE_componentWillReceiveProps(next: Props) {
    const {
      wallets,
      beneficiariesActivateSuccess,
      beneficiariesDeleteSuccess,
      beneficiariesAddSuccess,
    } = this.props;
    const { walletIndex } = this.state;

    if (!wallets.length && next.wallets.length) {
      const index = getCurrencyIndex(next.wallets, next.match.params.currency)

      this.setState({
        walletIndex: index,
      });

      index > 0 && next.wallets[index]?.currency &&
        this.props.fetchBeneficiaries({ currency_id: next.wallets[index].currency.code.toLowerCase() });
    }

    if (
      (next.beneficiariesActivateSuccess && !beneficiariesActivateSuccess) ||
      (next.beneficiariesDeleteSuccess && !beneficiariesDeleteSuccess) ||
      (next.beneficiariesAddSuccess && !beneficiariesAddSuccess)
    ) {
      const selectedCurrency = (next.wallets[walletIndex] || { currency: '' }).currency;

      this.props.fetchBeneficiaries({ currency_id: selectedCurrency.code.toLowerCase() });
    }
  }

  public render() {
    const { wallets, historyList, mobileWalletChosen, walletsLoading } = this.props;
    const { beneficiary, walletIndex: selectedWalletIndex, tabIndex: currentTabIndex } = this.state;
    const formattedWallets = wallets.map(
      (wallet: Wallet): Wallet => ({
        ...wallet,
        icon_url: wallet.icon_url ? wallet.icon_url : '',
      }),
    );
    let confirmationAddress = '';
    let selectedWalletPrecision = DEFAULT_CCY_PRECISION;

    if (wallets[selectedWalletIndex]) {
      selectedWalletPrecision = wallets[selectedWalletIndex].precision;
      confirmationAddress =
        wallets[selectedWalletIndex].type === 'fiat'
          ? beneficiary.name
          : beneficiary.data
          ? (beneficiary.data.address as string)
          : '';
    }

    return (
      <React.Fragment>
        <EstimatedValue wallets={wallets} />
        <div className="pg-container pg-wallet">
          {walletsLoading && (
            <div className="text-center">
              <Spinner animation="border" variant="primary" />
            </div>
          )}
          <div
            className={`row no-gutters pg-wallet__tabs-content ${
              !historyList.length && 'pg-wallet__tabs-content-height'
            }`}
          >
            <div
              className={`col-md-5 col-sm-12 col-12 ${mobileWalletChosen && 'd-none d-md-block'}`}
            >
              <WalletList
                onWalletSelectionChange={this.onWalletSelectionChange}
                walletItems={formattedWallets}
                activeIndex={this.state.walletIndex}
              />
            </div>
            <div
              className={`pg-wallet__tabs col-md-7 col-sm-12 col-12 ${
                !mobileWalletChosen && 'd-none d-md-block'
              }`}
            >
              <TabPanel
                panels={this.renderTabs()}
                currentTabIndex={currentTabIndex}
                onCurrentTabChange={this.onCurrentTabChange}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

  private replaceHistory(walletIndex: number, tabIndex: number) {
    const currency = this.props.wallets[walletIndex].currency.code.toLowerCase();
    this.props.history.replace(`/wallets/${currency}/${TABS[tabIndex]}`);
  }

  private onCurrentTabChange = (tabIndex: number) => {
    this.replaceHistory(this.state.walletIndex, tabIndex);
    this.setState({ tabIndex });
  };

  private renderTabs() {
    const { tabIndex: currentTabIndex, walletIndex: selectedWalletIndex } = this.state;
    const { wallets } = this.props;

    if (selectedWalletIndex === -1) {
      return [{ content: null, label: '' }];
    }

    const showWithdraw =
      wallets[selectedWalletIndex].type === 'fiat' || wallets[selectedWalletIndex].balance;

    const tab = TABS[currentTabIndex];

    return [
      {
        content: tab === 'deposit' ? this.renderDeposit(!!showWithdraw) : null,
        label: this.translate('page.body.wallets.tabs.deposit'),
      },
      {
        content: tab === 'withdraw' ? this.renderWithdraw() : null,
        label: this.translate('page.body.wallets.tabs.withdraw'),
        disabled: !showWithdraw,
      },
    ];
  }

  private getBlurDeposit = (isAccountActivated: boolean) => {
    const { user, wallets, memberLevels, currencies } = this.props;
    const { walletIndex: selectedWalletIndex } = this.state;
    const wallet: Wallet = wallets[selectedWalletIndex] || defaultWallet;
    const currencyItem = (currencies &&
      currencies.find((item) => item.id === wallet.currency.code.toLowerCase())) || {
      min_confirmations: 6,
      deposit_enabled: false,
    };

    const blurClassName = classnames(`pg-blur-deposit-${wallets[selectedWalletIndex].type}`, {
      'pg-blur-deposit-coin--active':
        isAccountActivated && wallets[selectedWalletIndex].type === 'coin',
      'pg-blur-deposit-fiat--active':
        isAccountActivated && wallets[selectedWalletIndex].type === 'fiat',
    });

    if (!currencyItem?.deposit_enabled) {
      return (
        <Blur
          className={blurClassName}
          text={this.translate('page.body.wallets.tabs.deposit.disabled.message')}
        />
      );
    }

    if (memberLevels && user.level < memberLevels?.deposit.minimum_level) {
      return (
        <Blur
          className={blurClassName}
          text={this.translate('page.body.wallets.warning.deposit.verification')}
          onClick={() => this.props.history.push('/confirm')}
          linkText={this.translate('page.body.wallets.warning.deposit.verification.button')}
        />
      );
    }

    return null;
  };

  private renderDeposit = (isAccountActivated: boolean) => {
    const { user, wallets } = this.props;
    const { walletIndex: selectedWalletIndex } = this.state;
    const wallet = wallets[selectedWalletIndex] || defaultWallet;

    if (wallet.type === 'coin') {
      return (
        <React.Fragment>
          <CurrencyInfo wallet={wallet} />
          {this.getBlurDeposit(isAccountActivated)}
          <Box padding="3" style={{ paddingBottom: 0 }}>
            <DepositCrypto wallet={wallet} />
          </Box>
          {wallet.currency && (
            <Box padding="3">
              <WalletHistory
                label="deposit"
                type="deposits"
                currency={wallet.currency.code.toLowerCase()}
              />
            </Box>
          )}
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <CurrencyInfo wallet={wallet} />
          {this.getBlurDeposit(isAccountActivated)}
          <DepositFiat
            title={this.title}
            description={this.description}
            uid={user ? user.uid : ''}
          />
          {wallet.currency && (
            <Box padding="3">
              <WalletHistory
                label="deposit"
                type="deposits"
                currency={wallet.currency.code.toLowerCase()}
              />
            </Box>
          )}
        </React.Fragment>
      );
    }
  };

  private renderWithdraw = () => {
    const { user, wallets } = this.props;
    const wallet = wallets[this.state.walletIndex] || defaultWallet;

    return (
      <React.Fragment>
        <CurrencyInfo wallet={wallet} />
        <Box padding="3" style={{ paddingBottom: 0 }}>
          <Withdraw wallet={wallet} />
        </Box>
        {user.otp && wallet.currency && (
          <Box padding="3">
            <WalletHistory
              label="withdraw"
              type="withdraws"
              currency={wallet.currency.code.toLowerCase()}
            />
          </Box>
        )}
      </React.Fragment>
    );
  };

  private onWalletSelectionChange = (value: Wallet, walletIndex: number) => {
    const { wallets } = this.props;

    const nextWalletIndex = this.props.wallets.findIndex(
      (wallet) => wallet.currency.code.toLowerCase() === value.currency.code.toLowerCase(),
    );

    this.setState({
      walletIndex: nextWalletIndex,
    });

    this.props.fetchBeneficiaries({ currency_id: value.currency.code.toLowerCase() });
    this.props.setMobileWalletUi(wallets[nextWalletIndex].name);

    this.replaceHistory(walletIndex, this.state.tabIndex);
    this.setState({ walletIndex });
  };
}

const mapStateToProps = (state: RootState): ReduxProps => ({
  user: selectUserInfo(state),
  wallets: selectWallets(state),
  historyList: selectHistory(state),
  mobileWalletChosen: selectMobileWalletUi(state),
  beneficiariesActivateSuccess: selectBeneficiariesActivateSuccess(state),
  beneficiariesDeleteSuccess: selectBeneficiariesDeleteSuccess(state),
  currencies: selectCurrencies(state),
  beneficiariesAddSuccess: selectBeneficiariesCreateSuccess(state),
  memberLevels: selectMemberLevels(state),
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = (dispatch) => ({
  fetchBeneficiaries: (params) => dispatch(beneficiariesFetch(params)),
  fetchWallets: () => dispatch(walletsFetch()),
  fetchAddress: ({ currency }) => dispatch(walletsAddressFetch({ currency })),
  walletsWithdrawCcy: (params) => dispatch(walletsWithdrawCcyFetch(params)),
  clearWallets: () => dispatch(walletsData([])),
  fetchSuccess: (payload) => dispatch(alertPush(payload)),
  setMobileWalletUi: (payload) => dispatch(setMobileWalletUi(payload)),
  currenciesFetch: () => dispatch(currenciesFetch()),
  memberLevelsFetch: () => dispatch(memberLevelsFetch()),
});

export const WalletsScreen = compose(
  injectIntl,
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(WalletsComponent) as React.ComponentClass;
