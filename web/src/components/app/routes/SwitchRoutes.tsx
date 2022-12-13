import { FC } from 'react';
import cn from 'classnames';
import { Switch, useLocation } from 'react-router-dom';
import { ROUTES } from 'web/src/app/routes';
import { DeepLinkPreview } from 'web/src/screens/DeepLinkPreview/DeepLinkPreview';
import { FeesScreen } from 'web/src/screens/Fees/Fees';
import { ActiveGiftsScreen } from 'web/src/screens/GiftsScreen/ActiveGiftsScreen';
import { GiftsScreen } from 'web/src/screens/GiftsScreen/GiftsScreen';
import { HistoryGiftsScreen } from 'web/src/screens/GiftsScreen/HistoryGiftsScreen';
import { QuickExchange } from 'web/src/screens/QuickExchange';
import {
  ReportDownloadScreen,
  ReportsMobileScreen,
} from 'web/src/screens/ReportsScreen/ReportsScreen';
import { TradingViewScreen } from 'web/src/screens/TradingViewScreen/TradingViewScreen';
import { WalletsStatScreen } from 'web/src/screens/WalletsStat/WalletsStat';
import { AdScreen } from 'web/src/screens/p2p/AdScreen';
import { TraderScreen } from 'web/src/screens/p2p/TraderScreen';
import { TradeScreen } from 'web/src/screens/p2p/Trade/Trade';
import { TradesScreen } from 'web/src/screens/p2p/TradesScreen';
import { UserAdsScreen } from 'web/src/screens/p2p/UserAdsScreen';
import { CreateAdScreen } from 'web/src/screens/p2p/CreateAdScreen';
import { UserAdScreen } from 'web/src/screens/p2p/UserAdScreen';
import { BoardScreen } from 'web/src/screens/p2p/BoardScreen';
import { DocumentationScreen } from 'web/src/screens/DocumentationScreen';
import { SignedOpConfirmScreen } from 'web/src/screens/SignedOpConfirmScreen/SignedOpConfirmScreen';
import { SignInMobileScreen } from 'web/src/mobile/screens/SignInScreen/SignInMobileScreen';
import { SignUpMobileScreen } from 'web/src/mobile/screens/SignUpScreen/SignUpMobileScreen';
import { useIsMobileDevice } from 'web/src/components/app/AppContext';
import { ForgotPasswordMobileScreen } from 'web/src/mobile/screens/ForgotPassword/ForgotPasswordMobileScreen';
import { ResetPasswordMobileScreen } from 'web/src/mobile/screens/ResetPassword/ResetPasswordMobileScreen';
import { VerificationScreen } from 'web/src/screens/VerificationScreen/VerificationScreen';
import { WalletsMobileScreen } from 'web/src/mobile/screens/WalletsScreen/WalletsMobileScreen';
import { WalletMobileScreen } from 'web/src/mobile/screens/SelectedWalletScreen/WalletMobileScreen';
import { ConfirmMobileScreen } from 'web/src/mobile/screens/ConfirmScreen';
import { OrdersMobileScreen } from 'web/src/mobile/screens/Orders';
import { ProfileSettingsMobileScreen } from 'web/src/mobile/screens/ProfileSettingsMobileScreen/ProfileSettingsMobileScreen';
import { ProfileThemeMobileScreen } from 'web/src/mobile/screens/ProfileColorTheme';
import { LandingScreenMobile } from 'web/src/mobile/screens/Landing';
import { showLanding } from 'web/src/api/config';
import { ProfileAccountActivityMobileScreen } from 'web/src/mobile/screens/ProfileAccountActivity';
import { ProfileApiKeysMobileScreen } from 'web/src/mobile/screens/ProfileApiKeys';
import { ProfileLanguageMobileScreen } from 'web/src/mobile/screens/ProfileLanguage';
import { ProfileAuthMobileScreen } from 'web/src/mobile/screens/ProfileAuth';
import { ProfileTelegramMobileScreen } from 'web/src/mobile/screens/ProfileTelegramMobileScreen';
import { ProfileMobileScreen } from 'web/src/mobile/screens/Profile';
import { SignInScreen } from 'web/src/screens/SignInScreen/SignInScreen';
import { ResetPasswordScreen } from 'web/src/screens/ResetPassword/ResetPasswordScreen';
import { ForgotPasswordScreen } from 'web/src/screens/ForgotPassword/ForgotPasswordScreen';
import { ComponentsScreen } from 'web/src/screens/docs/ComponentsScreen';
import { SignUpScreen } from 'web/src/screens/SignUpScreen/SignUpScreen';
import { TradingScreen } from 'web/src/screens/TradingScreen';
import { LandingScreen } from 'web/src/screens/LandingScreen/LandingScreen';
import { OrdersTabScreen } from 'web/src/screens/OrdersTabScreen';
import { HistoryScreen } from 'web/src/screens/History';
import { ProfileTwoFactorAuthScreen } from 'web/src/screens/ProfileTwoFactorAuthScreen/ProfileTwoFactorAuthScreen';
import { ProfileScreen } from 'web/src/screens/ProfileScreen/ProfileScreen';
import { WalletsScreen } from 'web/src/screens/WalletsScreen/WalletsScreen';
import { NotFound } from './NotFound';
import { Route } from './Route';
import { RemoveLangParam } from './RemoveLangParam';

export const SwitchRoutes: FC = () => {
  const isMobileDevice = useIsMobileDevice();
  const { pathname } = useLocation();

  return (
    <div
      className={cn('container-fluid', 'pg-layout', {
        'trading-layout': !isMobileDevice && pathname.includes('/trading'),
        'pg-layout--mobile': isMobileDevice,
      })}
    >
      <Switch>
        <Route
          type="onlyAnonymous"
          path={ROUTES.signin}
          component={isMobileDevice ? SignInMobileScreen : SignInScreen}
          exact
        />
        <Route
          type="onlyAnonymous"
          path={ROUTES.signup}
          component={isMobileDevice ? SignUpMobileScreen : SignUpScreen}
          exact
        />
        <Route
          type="onlyAnonymous"
          path={ROUTES.forgotPassword}
          component={isMobileDevice ? ForgotPasswordMobileScreen : ForgotPasswordScreen}
          exact
        />
        <Route
          type="onlyAnonymous"
          path={ROUTES.resetPassword}
          component={isMobileDevice ? ResetPasswordMobileScreen : ResetPasswordScreen}
          exact
        />

        <Route path={ROUTES.confirmation} component={VerificationScreen} exact />
        <Route path={ROUTES.signedOpsConfirm} component={SignedOpConfirmScreen} exact />
        <Route path={ROUTES.trading} component={TradingScreen} exact />
        <Route path={ROUTES.quickExchange} component={QuickExchange} exact />
        <Route path={ROUTES.fees} component={FeesScreen} exact />
        <Route path={ROUTES.tradingView} component={TradingViewScreen} exact />
        <Route path={ROUTES.walletsStat} component={WalletsStatScreen} exact />
        <Route path={ROUTES.docs} component={DocumentationScreen} exact />
        {process.env.REACT_APP_RELEASE_STAGE === 'development' && (
          <Route path={ROUTES.docsComponents} component={ComponentsScreen} exact />
        )}

        <Route type="protected" path={ROUTES.deeplink} component={DeepLinkPreview} exact />
        <Route type="protected" path={ROUTES.gifts} component={GiftsScreen} exact />
        <Route type="protected" path={ROUTES.giftsActive} component={ActiveGiftsScreen} exact />
        <Route type="protected" path={ROUTES.giftsHistory} component={HistoryGiftsScreen} exact />
        <Route type="protected" path={ROUTES.report} component={ReportDownloadScreen} exact />
        <Route
          type="protected"
          path={ROUTES.wallet}
          component={isMobileDevice ? WalletMobileScreen : WalletsScreen}
          exact
        />
        <Route
          type="protected"
          path={ROUTES.wallets}
          component={isMobileDevice ? WalletsMobileScreen : WalletsScreen}
          exact
        />
        <Route type="protected" path={ROUTES.confirm} component={ConfirmMobileScreen} exact />
        <Route
          type="protected"
          path={ROUTES.orders}
          component={isMobileDevice ? OrdersMobileScreen : OrdersTabScreen}
          exact
        />
        <Route type="protected" path={ROUTES.history} component={HistoryScreen} exact />
        <Route
          type="protected"
          path={ROUTES.profileSettings}
          component={isMobileDevice ? ProfileSettingsMobileScreen : ProfileScreen}
          exact
        />
        <Route
          type="protected"
          path={ROUTES.profileActivity}
          component={isMobileDevice ? ProfileAccountActivityMobileScreen : ProfileScreen}
          exact
        />
        <Route
          type="protected"
          path={ROUTES.profileApiKeys}
          component={isMobileDevice ? ProfileApiKeysMobileScreen : ProfileScreen}
          exact
        />
        <Route
          type="protected"
          path={ROUTES.profileLanguage}
          component={isMobileDevice ? ProfileLanguageMobileScreen : ProfileScreen}
          exact
        />
        <Route
          type="protected"
          path={ROUTES.profile2FA}
          component={isMobileDevice ? ProfileAuthMobileScreen : ProfileTwoFactorAuthScreen}
          exact
        />
        <Route
          type="protected"
          path={ROUTES.profileTheme}
          component={isMobileDevice ? ProfileThemeMobileScreen : ProfileScreen}
          exact
        />
        <Route
          type="protected"
          path={ROUTES.profileTelegram}
          component={isMobileDevice ? ProfileTelegramMobileScreen : ProfileScreen}
          exact
        />
        <Route
          type="protected"
          path={ROUTES.profileReports}
          component={isMobileDevice ? ReportsMobileScreen : ProfileScreen}
          exact
        />
        <Route
          type="protected"
          path={ROUTES.profile}
          component={isMobileDevice ? ProfileMobileScreen : ProfileScreen}
          exact
        />

        <Route path={ROUTES.advert} component={AdScreen} />
        <Route path={ROUTES.trader} component={TraderScreen} />
        <Route path={ROUTES.board} component={BoardScreen} />

        <Route type="protected" path={ROUTES.deal} component={TradeScreen} exact />
        <Route type="protected" path={ROUTES.deals} component={TradesScreen} exact />

        <Route type="protected" path={ROUTES.myAdverts} component={UserAdsScreen} exact />
        <Route type="protected" path={ROUTES.createAdvert} component={CreateAdScreen} exact />
        <Route type="protected" path={ROUTES.myAdvert} component={UserAdScreen} exact />

        <Route path={ROUTES.withLang} component={RemoveLangParam} exact />

        {showLanding() && (
          <Route
            exact
            path={ROUTES.main}
            component={isMobileDevice ? LandingScreenMobile : LandingScreen}
          />
        )}

        <NotFound />
      </Switch>
    </div>
  );
};
