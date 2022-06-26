import classnames from 'classnames';
import * as React from 'react';
import { Spinner } from 'react-bootstrap';
import { injectIntl } from 'react-intl';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { Route, RouteComponentProps, RouterProps, Switch } from 'react-router';
import { Redirect, useLocation, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { FeesScreen } from 'src/screens/Fees/Fees';
import type { IntlProps } from 'src/types';
import { WalletsScreen } from 'src/screens/WalletsScreen/WalletsScreen';
import { VerifyEmailModal } from 'src/screens/VerifyEmail/VerifyEmail';
import { WalletMobileScreen } from 'src/mobile/screens/SelectedWalletScreen/WalletMobileScreen';
import { WalletsMobileScreen } from 'src/mobile/screens/WalletsScreen/WalletsMobileScreen';
import { ProfileScreen } from 'web/src/screens/ProfileScreen/ProfileScreen';
import { minutesUntilAutoLogout, sessionCheckInterval, showLanding, wizardStep } from '../../api';
import { WalletsFetch } from '../../containers';
import { toggleColorTheme } from '../../helpers';
import {
  ConfirmMobileScreen,
  LandingScreenMobile,
  OrdersMobileScreen,
  ProfileAccountActivityMobileScreen,
  ProfileApiKeysMobileScreen,
  ProfileAuthMobileScreen,
  ProfileLanguageMobileScreen,
  ProfileMobileScreen,
  ProfileThemeMobileScreen,
  TradingScreenMobile,
} from '../../mobile/screens';
import {
  logoutFetch,
  Market,
  RootState,
  selectCurrentColorTheme,
  selectCurrentMarket,
  selectMobileDeviceState,
  selectPlatformAccessStatus,
  selectUserFetching,
  selectUserInfo,
  selectUserLoggedIn,
  User,
  userFetch,
  walletsReset,
  AbilitiesInterface,
  selectAbilities,
  selectVerifyEmailAuth0,
  selectVerifyEmail,
  selectUserNeedVerification,
  selectUserFreezed,
} from '../../modules';
import {
  ConfirmScreen,
  DeepLinkPreview,
  DocumentationScreen,
  HistoryScreen,
  InternalTransfer,
  MagicLink,
  MaintenanceScreen,
  OrdersTabScreen,
  RestrictedScreen,
  TradingScreen,
  QuickExchange,
  LandingScreen,
} from '../../screens';
import { ProfileTwoFactorAuthScreen } from 'web/src/screens/ProfileTwoFactorAuthScreen/ProfileTwoFactorAuthScreen';
import { ProfileSettingsMobileScreen } from 'web/src/mobile/screens/ProfileSettingsMobileScreen/ProfileSettingsMobileScreen';
import { SignInAuth0 } from 'web/src/screens/SignInScreen/SignInAuth0';
import { EmailVerificationModal } from 'web/src/screens/EmailVerification/EmailVerificationModal';
import { getSearchParam, setLocation } from 'web/src/helpers/url';
import { FreezedModal } from 'web/src/containers/modals/FreezedModal';
import { SignInScreen } from 'web/src/screens/SignInScreen/SignInScreen';
import { SignInMobileScreen } from 'web/src/mobile/screens/SignInScreen/SignInMobileScreen';
import { SignUpScreen } from 'web/src/screens/SignUpScreen/SignUpScreen';
import { SignUpMobileScreen } from 'web/src/mobile/screens/SignUpScreen/SignUpMobileScreen';
import { ForgotPasswordMobileScreen } from 'web/src/mobile/screens/ForgotPassword/ForgotPasswordMobileScreen';
import { ForgotPasswordScreen } from 'web/src/screens/ForgotPassword/ForgotPasswordScreen';
import { ResetPasswordMobileScreen } from 'web/src/mobile/screens/ResetPassword/ResetPasswordMobileScreen';
import { ResetPasswordScreen } from 'web/src/screens/ResetPassword/ResetPasswordScreen';
import { ExpiredSessionModal } from 'web/src/components/ExpiredSessionModal/ExpiredSessionModal';
import {
  ReportDownloadScreen,
  ReportsMobileScreen,
} from 'web/src/screens/ReportsScreen/ReportsScreen';
import { VerificationScreen } from 'web/src/screens/VerificationScreen/VerificationScreen';
import { SignedOpConfirmScreen } from 'web/src/screens/SignedOpConfirmScreen/SignedOpConfirmScreen';
import { BoardScreen } from 'web/src/screens/p2p/BoardScreen';
import { AdScreen } from 'web/src/screens/p2p/AdScreen';
import { TraderScreen } from 'web/src/screens/p2p/TraderScreen';
import { TradesScreen } from 'web/src/screens/p2p/TradesScreen';
import { SecurityVerificationModal } from 'web/src/containers/modals/SecurityVerificationModal';

interface ReduxProps {
  colorTheme: string;
  currentMarket?: Market | undefined;
  user: User;
  isLoggedIn: boolean;
  isMobileDevice: boolean;
  userLoading?: boolean | undefined;
  platformAccessStatus: string;
  abilities: AbilitiesInterface;
  verifyEmailAuth0: boolean;
  verifyEmail: boolean;
  needVerification: boolean;
  freezed: boolean;
}

interface DispatchProps {
  logout: typeof logoutFetch;
  userFetch: typeof userFetch;
  walletsReset: typeof walletsReset;
}

interface LocationProps extends RouterProps {
  location: {
    pathname: string;
  };
}

interface LayoutState {
  isShownExpSessionModal: boolean;
}

export type LayoutProps = ReduxProps & DispatchProps & LocationProps & IntlProps;

const renderLoader = () => (
  <div className="pg-loader-container">
    <Spinner animation="border" variant="primary" />
  </div>
);

const STORE_KEY = 'lastAction';

// tslint:disable-next-line no-any
const PrivateRoute: React.FunctionComponent<any> = ({
  component: CustomComponent,
  loading,
  isLogged,
  ...rest
}) => {
  const { pathname } = useLocation();

  if (loading) {
    return renderLoader();
  }
  const renderCustomerComponent = (props: RouteComponentProps) => <CustomComponent {...props} />;

  if (isLogged) {
    return <Route {...rest} render={renderCustomerComponent} />;
  }

  return (
    <Route {...rest}>
      <Redirect to={`/signin${pathname ? `?back=${pathname}` : ''}`} />
    </Route>
  );
};

// tslint:disable-next-line no-any
const PublicRoute: React.FunctionComponent<any> = ({
  component: CustomComponent,
  loading,
  isLogged,
  ...rest
}) => {
  if (loading) {
    return renderLoader();
  }

  if (isLogged && rest.path !== '/setup' && rest.path !== '/accounts/confirmation') {
    return (
      <Route {...rest}>
        <Redirect to="/wallets" />
      </Route>
    );
  }

  const renderCustomerComponent = (props: RouteComponentProps) => <CustomComponent {...props} />;

  return <Route {...rest} render={renderCustomerComponent} />;
};

class LayoutComponent extends React.Component<LayoutProps, LayoutState> {
  public static eventsListen = [
    'click',
    'keydown',
    'scroll',
    'resize',
    'mousemove',
    'TabSelect',
    'TabHide',
  ];

  public timer: number | undefined;

  public walletsFetchInterval: number | undefined;

  constructor(props: LayoutProps) {
    super(props);
    this.initListener();

    this.state = {
      isShownExpSessionModal: false,
    };
  }

  public componentDidMount() {
    if (
      !(
        this.props.location.pathname.includes('/magic-link') ||
        this.props.location.pathname.includes('/maintenance') ||
        this.props.location.pathname.includes('/restriction')
      )
    ) {
      switch (this.props.platformAccessStatus) {
        case 'restricted':
          this.props.history.replace('/restriction');
          break;
        case 'maintenance':
          this.props.history.replace('/maintenance');
          break;
        default:
          this.props.userFetch();
          this.initInterval();
          this.check();
      }
    }
  }

  public UNSAFE_componentWillReceiveProps(nextProps: LayoutProps) {
    if (
      !(
        nextProps.location.pathname.includes('/magic-link') ||
        nextProps.location.pathname.includes('/restriction') ||
        nextProps.location.pathname.includes('/maintenance')
      ) ||
      this.props.platformAccessStatus !== nextProps.platformAccessStatus
    ) {
      switch (nextProps.platformAccessStatus) {
        case 'restricted':
          this.props.history.replace('/restriction');
          break;
        case 'maintenance':
          this.props.history.replace('/maintenance');
          break;
        default:
          break;
      }
    }

    // if (
    //   !this.props.user.email &&
    //   nextProps.user.email &&
    //   !this.props.location.pathname.includes('/setup')
    // ) {
    //   this.props.userFetch();
    // }

    if (!this.props.isLoggedIn && nextProps.isLoggedIn && !this.props.user.email) {
      this.initInterval();
      this.check();
    }
  }

  public componentDidUpdate(prevProps: LayoutProps) {
    const { isLoggedIn, userLoading } = this.props;

    if (!isLoggedIn && prevProps.isLoggedIn && !userLoading) {
      this.props.walletsReset();

      if (!this.props.location.pathname.includes('/trading')) {
        setLocation(getSearchParam('back') ?? '/trading/', this.props.history);
      }
    }
  }

  public componentWillUnmount() {
    for (const type of LayoutComponent.eventsListen) {
      document.body.removeEventListener(type, this.reset);
    }
    clearInterval(this.timer);
    clearInterval(this.walletsFetchInterval);
  }

  public translate = (key: string) => this.props.intl.formatMessage({ id: key });

  public render() {
    const { colorTheme, isLoggedIn, isMobileDevice, userLoading, location, platformAccessStatus } =
      this.props;
    const { isShownExpSessionModal } = this.state;
    const desktopCls = classnames('container-fluid pg-layout', {
      'trading-layout': location.pathname.includes('/trading'),
    });
    const mobileCls = classnames('container-fluid pg-layout pg-layout--mobile', {
      'pg-layout--mobile-setup': location.pathname.includes('/setup'),
    });
    toggleColorTheme(colorTheme);

    if (!platformAccessStatus.length) {
      return renderLoader();
    }

    if (this.props.verifyEmailAuth0) {
      return (
        <div className={isMobileDevice ? mobileCls : desktopCls}>
          <VerifyEmailModal />
        </div>
      );
    }

    if (wizardStep() !== 'false' && this.props.location.pathname !== '/setup') {
      return (
        <div className={isMobileDevice ? mobileCls : desktopCls}>
          <Route>
            <Redirect to="/setup" />
          </Route>
        </div>
      );
    }

    const commonRoutes = [
      <Route key="exchange" path="/quick-exchange" component={QuickExchange as any} />,
      <Route key="fees" path="/fees" component={FeesScreen as any} />,
      <PrivateRoute
        key="deeplink"
        exact
        path="/deeplinks/:id?"
        loading={userLoading}
        isLogged={isLoggedIn}
        component={DeepLinkPreview}
      />,
      <Route key="report" exact path="/reports/:code" component={ReportDownloadScreen} />,
      ...(process.env.REACT_APP_RELEASE_STAGE === 'development'
        ? [
            <PrivateRoute
              key="AdScreen"
              loading={userLoading}
              isLogged={isLoggedIn}
              path={[
                '/p2p/exchange/(buy|sell)/:id',
                '/:lang/p2p/exchange/(buy|sell)/:id',
                '/p2p/exchange/:id/*',
                '/:lang/p2p/exchange/:id/*',
              ]}
              component={AdScreen}
            />,
            <Route
              key="TraderScreen"
              path={['/p2p/users/:name', '/:lang/p2p/users/:name']}
              component={TraderScreen}
            />,
            <PrivateRoute
              key="TradesScreen"
              loading={userLoading}
              isLogged={isLoggedIn}
              path={['/p2p/trades/', '/:lang/p2p/trades/']}
              component={TradesScreen}
            />,
            <Route
              key="BoardScreen"
              path={['/p2p/:filter?', '/:lang/p2p/:filter?']}
              component={BoardScreen}
            />,
          ]
        : []),
      // and default fallback
      <Route key="catchall" path="**">
        <Redirect to="/trading/" />
      </Route>,
    ];

    const commonComponents = (
      <>
        {isLoggedIn && <WalletsFetch />}
        {isShownExpSessionModal && (
          <ExpiredSessionModal
            onClose={this.handleChangeExpSessionModalState}
            onSubmit={this.handleSubmitExpSessionModal}
          />
        )}
        {this.props.verifyEmail && <EmailVerificationModal />}
        {this.props.freezed && <FreezedModal />}
        {this.props.needVerification && <SecurityVerificationModal />}
      </>
    );

    if (isMobileDevice) {
      return (
        <div className={mobileCls}>
          <Switch>
            <PublicRoute path="/signed-ops/confirm" component={SignedOpConfirmScreen} />
            <PublicRoute path="/signin0" component={SignInAuth0} />
            <PublicRoute path="/signup0" component={SignInAuth0} />
            <PublicRoute path="/signin" component={SignInMobileScreen} />
            <PublicRoute path="/signup" component={SignUpMobileScreen} />
            <PublicRoute
              loading={userLoading}
              isLogged={isLoggedIn}
              path="/forgot_password"
              component={ForgotPasswordMobileScreen}
            />
            <PublicRoute
              loading={userLoading}
              isLogged={isLoggedIn}
              path="/accounts/password_reset"
              component={ResetPasswordMobileScreen}
            />
            <PublicRoute
              loading={userLoading}
              isLogged={isLoggedIn}
              path="/accounts/confirmation"
              component={VerificationScreen}
            />
            <PrivateRoute
              loading={userLoading}
              isLogged={isLoggedIn}
              path={['/wallets/:currency/:tab?']}
              component={WalletMobileScreen}
            />
            <PrivateRoute
              loading={userLoading}
              isLogged={isLoggedIn}
              path="/wallets"
              component={WalletsMobileScreen}
            />
            <PrivateRoute
              loading={userLoading}
              isLogged={isLoggedIn}
              path="/confirm"
              component={ConfirmMobileScreen}
            />
            <PrivateRoute
              loading={userLoading}
              isLogged={isLoggedIn}
              path="/orders"
              component={OrdersMobileScreen}
            />
            <PrivateRoute
              loading={userLoading}
              isLogged={isLoggedIn}
              path="/profile/settings"
              component={ProfileSettingsMobileScreen}
            />
            <PrivateRoute
              loading={userLoading}
              isLogged={isLoggedIn}
              path="/profile/account-activity"
              component={ProfileAccountActivityMobileScreen}
            />
            <PrivateRoute
              loading={userLoading}
              isLogged={isLoggedIn}
              path="/profile/api-keys"
              component={ProfileApiKeysMobileScreen}
            />
            <PrivateRoute
              loading={userLoading}
              isLogged={isLoggedIn}
              path="/profile/language"
              component={ProfileLanguageMobileScreen}
            />
            <PrivateRoute
              loading={userLoading}
              isLogged={isLoggedIn}
              path="/profile/2fa"
              component={ProfileAuthMobileScreen}
            />
            <PrivateRoute
              loading={userLoading}
              isLogged={isLoggedIn}
              path="/profile/theme"
              component={ProfileThemeMobileScreen}
            />
            <PrivateRoute
              loading={userLoading}
              isLogged={isLoggedIn}
              path="/profile"
              component={ProfileMobileScreen}
            />
            <PrivateRoute
              loading={userLoading}
              isLogged={isLoggedIn}
              path="/reports"
              component={ReportsMobileScreen}
            />
            <Route exact path="/trading/:market?" component={TradingScreenMobile as any} />
            {showLanding() && <Route exact path="/" component={LandingScreenMobile as any} />}
            {commonRoutes}
          </Switch>
          {commonComponents}
        </div>
      );
    }

    return (
      <div className={desktopCls}>
        <Switch>
          <Route path="/magic-link" component={MagicLink as any} />
          <PublicRoute path="/signed-ops/confirm" component={SignedOpConfirmScreen} />
          <PublicRoute path="/signin0" component={SignInAuth0} />
          <PublicRoute path="/signup0" component={SignInAuth0} />
          <PublicRoute path="/signin" component={SignInScreen} />
          <PublicRoute path="/signup" component={SignUpScreen} />
          <PublicRoute
            loading={userLoading}
            isLogged={isLoggedIn}
            path="/accounts/confirmation"
            component={VerificationScreen}
          />
          <PublicRoute
            loading={userLoading}
            isLogged={isLoggedIn}
            path="/forgot_password"
            component={ForgotPasswordScreen}
          />
          <PublicRoute
            loading={userLoading}
            isLogged={isLoggedIn}
            path="/accounts/password_reset"
            component={ResetPasswordScreen}
          />
          <Route path="/docs" component={DocumentationScreen as any} />
          <Route path="/restriction" component={RestrictedScreen as any} />
          <Route path="/maintenance" component={MaintenanceScreen as any} />
          <Route exact path="/trading/:market?" component={TradingScreen as any} />
          {showLanding() && <Route exact path="/" component={LandingScreen as any} />}
          <PrivateRoute
            loading={userLoading}
            isLogged={isLoggedIn}
            path="/orders"
            component={OrdersTabScreen}
          />
          <PrivateRoute
            loading={userLoading}
            isLogged={isLoggedIn}
            path="/history"
            component={HistoryScreen}
          />
          <PrivateRoute
            loading={userLoading}
            isLogged={isLoggedIn}
            path="/confirm"
            component={ConfirmScreen}
          />
          <PrivateRoute
            loading={userLoading}
            isLogged={isLoggedIn}
            path="/profile/2fa"
            component={ProfileTwoFactorAuthScreen}
          />
          <PrivateRoute
            loading={userLoading}
            isLogged={isLoggedIn}
            path="/profile"
            component={ProfileScreen}
          />
          <PrivateRoute
            loading={userLoading}
            isLogged={isLoggedIn}
            path="/reports"
            component={ProfileScreen}
          />
          <PrivateRoute
            loading={userLoading}
            isLogged={isLoggedIn}
            path={['/wallets/:currency?/:tab?', '/wallets']}
            component={WalletsScreen}
          />
          <PrivateRoute
            loading={userLoading}
            isLogged={isLoggedIn}
            path="/internal-transfer"
            component={InternalTransfer}
          />
          {commonRoutes}
        </Switch>
        {commonComponents}
      </div>
    );
  }

  private getLastAction = () => {
    if (localStorage.getItem(STORE_KEY) !== null) {
      return parseInt(localStorage.getItem(STORE_KEY) || '0', 10);
    }

    return 0;
  };

  private setLastAction = (lastAction: number) => {
    localStorage.setItem(STORE_KEY, lastAction.toString());
  };

  private initListener = () => {
    this.reset();
    for (const type of LayoutComponent.eventsListen) {
      document.body.addEventListener(type, this.reset);
    }
  };

  private reset = () => {
    this.setLastAction(Date.now());
  };

  private initInterval = () => {
    this.timer = window.setInterval(() => {
      this.check();
    }, parseFloat(sessionCheckInterval()));
  };

  private check = () => {
    const { user } = this.props;
    const now = Date.now();
    const timeleft = this.getLastAction() + parseFloat(minutesUntilAutoLogout()) * 60 * 1000;
    const diff = timeleft - now;
    const isTimeout = diff < 0;

    if (isTimeout && user.email) {
      if (user.state === 'active') {
        this.handleChangeExpSessionModalState();
      }

      this.props.logout();
      clearInterval(this.timer);
    }
  };

  private handleSubmitExpSessionModal = () => {
    this.handleChangeExpSessionModalState();
    this.props.history.replace('/signin');
  };

  private handleChangeExpSessionModalState = () => {
    this.setState({
      isShownExpSessionModal: !this.state.isShownExpSessionModal,
    });
  };
}

const mapStateToProps: MapStateToProps<ReduxProps, {}, RootState> = (state): ReduxProps => ({
  colorTheme: selectCurrentColorTheme(state),
  currentMarket: selectCurrentMarket(state),
  user: selectUserInfo(state),
  isLoggedIn: selectUserLoggedIn(state),
  isMobileDevice: selectMobileDeviceState(state),
  userLoading: selectUserFetching(state),
  platformAccessStatus: selectPlatformAccessStatus(state),
  abilities: selectAbilities(state),
  verifyEmailAuth0: selectVerifyEmailAuth0(state),
  verifyEmail: selectVerifyEmail(state),
  needVerification: selectUserNeedVerification(state),
  freezed: selectUserFreezed(state),
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = (dispatch): DispatchProps => ({
  logout: () => dispatch(logoutFetch()),
  userFetch: () => dispatch(userFetch()),
  walletsReset: () => dispatch(walletsReset()),
});

export const Layout = compose(
  injectIntl,
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(LayoutComponent) as any;
