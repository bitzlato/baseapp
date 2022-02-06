import * as React from 'react';
import { injectIntl } from 'react-intl';
import { connect, MapDispatchToPropsFunction } from 'react-redux';
import { RouterProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { Sidebar } from 'src/containers/Sidebar/Sidebar';
import { MarketSelector } from 'src/containers/MarketSelector/MarketSelector';
import { IntlProps } from 'src/types';
import { showLanding } from '../../api';
import { Logo } from '../../components';
import {
  RootState,
  selectCurrentColorTheme,
  selectMobileWalletUi,
  setMobileWalletUi,
  toggleSidebar,
} from '../../modules';
import { HeaderToolbar } from '../HeaderToolbar/HeaderToolbar';
import { NavBar } from '../NavBar';
import { HeaderNavigation } from './HeaderNavigation/HeaderNavigation';

import backIcon from './back.svg';
import backLightIcon from './backLight.svg';
import s from './Header.postcss';

interface ReduxProps {
  colorTheme: string;
  mobileWallet: string;
}

interface DispatchProps {
  setMobileWalletUi: typeof setMobileWalletUi;
  toggleSidebar: typeof toggleSidebar;
}

interface LocationProps extends RouterProps {
  location: {
    pathname: string;
  };
}

const noHeaderRoutes = ['/confirm', '/restriction', '/maintenance', '/setup'];

type Props = ReduxProps & DispatchProps & IntlProps & LocationProps;

class Head extends React.Component<Props> {
  public render() {
    const { mobileWallet, location } = this.props;
    const isTradingPage = location.pathname.includes('/trading');
    const tradingCls = isTradingPage ? 'pg-container-trading' : '';
    const shouldRenderHeader = !noHeaderRoutes.some((r) => location.pathname.includes(r));

    if (!shouldRenderHeader) {
      return <React.Fragment />;
    }

    return (
      <>
        <header className={`pg-header ${s.header}`}>
          <div className={`pg-container pg-header__content ${tradingCls} ${s.headerContent}`}>
            <Sidebar />
            <div onClick={() => this.redirectToLanding()} className="pg-header__logo">
              <Logo />
            </div>
            {this.renderMarketToggler()}
            <div className="pg-header__location">
              {mobileWallet ? (
                <span>{mobileWallet}</span>
              ) : (
                <span>{location.pathname.split('/')[1]}</span>
              )}
            </div>
            {this.renderMobileWalletNav()}
            <div className="pg-header__navbar">
              {this.renderMarketToolbar()}
              <NavBar responsiveMode={isTradingPage} />
            </div>
          </div>
        </header>
      </>
    );
  }

  public renderMobileWalletNav = () => {
    const { colorTheme, mobileWallet } = this.props;
    return (
      mobileWallet && (
        <div onClick={this.backWallets} className="pg-header__toggler">
          <img alt="" src={colorTheme === 'light' ? backLightIcon : backIcon} />
        </div>
      )
    );
  };

  public translate = (id: string) => {
    return id ? this.props.intl.formatMessage({ id }) : '';
  };

  private renderMarketToolbar = () => {
    if (!this.props.location.pathname.includes('/trading/')) {
      return null;
    }

    return <HeaderToolbar />;
  };

  private renderMarketToggler = () => {
    if (!this.props.location.pathname.includes('/trading/')) {
      return <HeaderNavigation />;
    }

    return <MarketSelector />;
  };

  private redirectToLanding = () => {
    this.props.toggleSidebar(false);
    this.props.history.push(`${showLanding() ? '/' : '/trading'}`);
  };

  private backWallets = () => this.props.setMobileWalletUi('');
}

const mapStateToProps = (state: RootState): ReduxProps => ({
  colorTheme: selectCurrentColorTheme(state),
  mobileWallet: selectMobileWalletUi(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> = (dispatch) => ({
  setMobileWalletUi: (payload) => dispatch(setMobileWalletUi(payload)),
  toggleSidebar: (payload) => dispatch(toggleSidebar(payload)),
});

export const Header = compose(
  injectIntl,
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(Head) as React.ComponentClass;
