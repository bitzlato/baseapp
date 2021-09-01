import * as React from 'react';
import { injectIntl } from 'react-intl';
import { connect, MapDispatchToPropsFunction } from 'react-redux';
import { RouterProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import cn from 'classnames';
import { Sidebar } from 'src/containers/Sidebar/Sidebar';
import { IntlProps } from '../../';
import { showLanding } from '../../api';
import { Logo } from '../../components';
import {
    Market,
    RootState,
    selectCurrentColorTheme,
    selectCurrentMarket,
    selectMarketSelectorState,
    selectMobileWalletUi,
    selectSidebarState,
    setMobileWalletUi,
    toggleMarketSelector,
    toggleSidebar,
} from '../../modules';
import { HeaderToolbar } from '../HeaderToolbar';
import { NavBar } from '../NavBar';

// TODO: use one icon with transform
import arrowBottom from './arrows/arrowBottom.svg';
import arrowBottomLight from './arrows/arrowBottomLight.svg';
import arrowRight from './arrows/arrowRight.svg';
import arrowRightLight from './arrows/arrowRightLight.svg';

import backIcon from './back.svg';
import backLightIcon from './backLight.svg';
import s from './Header.postcss'
import { HeaderNavigation } from './HeaderNavigation/HeaderNavigation';

interface ReduxProps {
    currentMarket: Market | undefined;
    colorTheme: string;
    mobileWallet: string;
    sidebarOpened: boolean;
    marketSelectorOpened: boolean;
}

interface DispatchProps {
    setMobileWalletUi: typeof setMobileWalletUi;
    toggleSidebar: typeof toggleSidebar;
    toggleMarketSelector: typeof toggleMarketSelector;
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
        const tradingCls = location.pathname.includes('/trading') ? 'pg-container-trading' : '';
        const shouldRenderHeader =
            !noHeaderRoutes.some((r) => location.pathname.includes(r));

        if (!shouldRenderHeader) {
            return <React.Fragment />;
        }

        return (
            <header className={`pg-header ${s.header}`}>
                <div className={`pg-container pg-header__content ${tradingCls} ${s.headerContent}`}>
                    <Sidebar />
                    <div onClick={(e) => this.redirectToLanding()} className="pg-header__logo">
                        <Logo />
                    </div>
                    {this.renderMarketToggler()}
                    <div className="pg-header__location">
                        {mobileWallet ? <span>{mobileWallet}</span> : <span>{location.pathname.split('/')[1]}</span>}
                    </div>
                    {this.renderMobileWalletNav()}
                    <div className="pg-header__navbar">
                        {this.renderMarketToolbar()}
                        <NavBar />
                    </div>
                </div>
            </header>
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
        const { currentMarket, marketSelectorOpened, colorTheme } = this.props;
        const isLight = colorTheme === 'light';
        if (!this.props.location.pathname.includes('/trading/')) {
            return <HeaderNavigation />;
        }

        return (
            <div className="pg-header__market-selector-toggle" onClick={this.props.toggleMarketSelector}>
                <p className={cn("pg-header__market-selector-toggle-value", s.marketToogleValue)}>{currentMarket && currentMarket.name}</p>
                {marketSelectorOpened ? (
                    <img src={isLight ? arrowBottomLight : arrowBottom} alt="arrow" />
                ) : (
                    <img src={isLight ? arrowRightLight : arrowRight} alt="arrow" />
                )}
            </div>
        );
    };

    private redirectToLanding = () => {
        this.props.toggleSidebar(false);
        this.props.history.push(`${showLanding() ? '/' : '/trading'}`);
    };

    private openSidebar = () => this.props.toggleSidebar(!this.props.sidebarOpened);

    private backWallets = () => this.props.setMobileWalletUi('');

    private closeMenu = (e: any) => this.props.setMobileWalletUi('');
}

const mapStateToProps = (state: RootState): ReduxProps => ({
    currentMarket: selectCurrentMarket(state),
    colorTheme: selectCurrentColorTheme(state),
    mobileWallet: selectMobileWalletUi(state),
    sidebarOpened: selectSidebarState(state),
    marketSelectorOpened: selectMarketSelectorState(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> = (dispatch) => ({
    setMobileWalletUi: (payload) => dispatch(setMobileWalletUi(payload)),
    toggleSidebar: (payload) => dispatch(toggleSidebar(payload)),
    toggleMarketSelector: () => dispatch(toggleMarketSelector()),
});

export const Header = compose(
    injectIntl,
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(Head) as React.ComponentClass;
