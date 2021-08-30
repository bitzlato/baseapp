import classnames from 'classnames';
import { History } from 'history';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect, MapDispatchToPropsFunction } from 'react-redux';
import { Link, RouteProps, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { LogoutIcon } from '../../assets/images/sidebar/LogoutIcon';
import { ProfileIcon } from '../../assets/images/sidebar/ProfileIcon';
import { SidebarIcons } from '../../assets/images/sidebar/SidebarIcons';
import { pgRoutes } from '../../constants';
import {
    changeLanguage,
    changeUserDataFetch,
    logoutFetch,
    Market,
    RootState,
    selectCurrentColorTheme,
    selectCurrentLanguage,
    selectCurrentMarket,
    selectSidebarState,
    selectUserInfo,
    selectUserLoggedIn,
    toggleSidebar,
    selectAbilities,
    AbilitiesInterface,
    User,
} from '../../modules';
import { CanCan } from '../';

import s from './Sidebar.postcss';

interface DispatchProps {
    changeLanguage: typeof changeLanguage;
    toggleSidebar: typeof toggleSidebar;
    logoutFetch: typeof logoutFetch;
}

interface ReduxProps {
    lang: string;
    colorTheme: string;
    isLoggedIn: boolean;
    currentMarket: Market | undefined;
    isActive: boolean;
    user: User;
    abilities: AbilitiesInterface;
}

interface OwnProps {
    onLinkChange?: () => void;
    history: History;
    location: {
        pathnname: string;
    };
    changeUserDataFetch: typeof changeUserDataFetch;
}

type Props = OwnProps & ReduxProps & RouteProps & DispatchProps;

class SidebarContainer extends React.Component<Props> {
    private elementRef = React.createRef<HTMLDivElement>();

    public componentWillReceiveProps(nextProps: Props) {
        if (this.props.location.pathname !== nextProps.location.pathname && nextProps.isActive) {
            this.props.toggleSidebar(false);
        }
    }

    public componentDidMount() {
        document.addEventListener('mousedown', this.handleOutsideClick);
        document.addEventListener('touchstart', this.handleOutsideClick);
        window.addEventListener('keydown', this.handleEscapeKeyDown);
    }

    public componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleOutsideClick);
        document.removeEventListener('touchstart', this.handleOutsideClick);
        window.removeEventListener('keydown', this.handleEscapeKeyDown);
    }

    public render() {
        const { isLoggedIn, isActive } = this.props;
        const address = this.props.history.location ? this.props.history.location.pathname : '';
        const sidebarClassName = classnames('pg-sidebar-wrapper', {
            [s.sidebar]: true,
            [s.sidebarActive]: isActive,
        });

        return (
            <div className={sidebarClassName} ref={this.elementRef}>
                {this.renderProfileLink()}
                {pgRoutes(isLoggedIn, CanCan.checkAbilityByAction('read', 'QuickExchange', this.props.abilities)).map(
                    this.renderNavItems(address)
                )}
                {this.renderLogout()}
            </div>
        );
    }

    public renderNavItems = (address: string) => (values: string[], index: number) => {
        const { currentMarket } = this.props;

        const [name, url, img] = values;
        const handleLinkChange = () => this.props.toggleSidebar(false);
        const path = url.includes('/trading') && currentMarket ? `/trading/${currentMarket.id}` : url;
        const isActive = (url === '/trading/' && address.includes('/trading')) || address === url;

        return (
            <Link
                className={classnames(s.item, isActive && s.itemActive)}
                key={index}
                to={path}
                onClick={handleLinkChange}
            >
                <span className={s.itemIcon}>
                    <SidebarIcons name={img} />
                </span>
                <FormattedMessage id={name} />
            </Link>
        );
    };

    public renderProfileLink = () => {
        const { isLoggedIn, location } = this.props;
        const handleLinkChange = () => this.props.toggleSidebar(false);
        const address = location ? location.pathname : '';
        const isActive = address === '/profile';

        return (
            isLoggedIn && (
                <Link className={classnames(s.item, isActive && s.itemActive)} to="/profile" onClick={handleLinkChange}>
                    <span className={s.itemIcon}>
                        <ProfileIcon />
                    </span>
                    <FormattedMessage id={'page.header.navbar.profile'} />
                </Link>
            )
        );
    };

    public renderLogout = () => {
        const { isLoggedIn } = this.props;
        return (
            isLoggedIn && (
                <button className={s.item} type="button" tabIndex={-1} onClick={this.props.logoutFetch}>
                    <span className={s.itemIcon}>
                        <LogoutIcon />
                    </span>
                    <FormattedMessage id={'page.body.profile.content.action.logout'} />
                </button>
            )
        );
    };

    private handleOutsideClick = (event: MouseEvent | TouchEvent) => {
        const { isActive, toggleSidebar } = this.props;

        if (isActive) {
            const target = event.target as HTMLElement;
            if (
                !this.elementRef.current ||
                this.elementRef.current.contains(target) ||
                target.className.includes('pg-sidebar__toggler')
            ) {
                return;
            }

            toggleSidebar(false);
        }
    };

    private handleEscapeKeyDown = (event: KeyboardEvent) => {
        const { isActive, toggleSidebar } = this.props;

        if (event.key === 'Escape' && isActive) {
            toggleSidebar(false);
        }
    };
}

const mapStateToProps = (state: RootState): ReduxProps => ({
    colorTheme: selectCurrentColorTheme(state),
    isLoggedIn: selectUserLoggedIn(state),
    currentMarket: selectCurrentMarket(state),
    lang: selectCurrentLanguage(state),
    isActive: selectSidebarState(state),
    abilities: selectAbilities(state),
    user: selectUserInfo(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> = (dispatch) => ({
    changeLanguage: (payload) => dispatch(changeLanguage(payload)),
    toggleSidebar: (payload) => dispatch(toggleSidebar(payload)),
    logoutFetch: () => dispatch(logoutFetch()),
    changeUserDataFetch: (payload) => dispatch(changeUserDataFetch(payload)),
});

export const Sidebar = compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(SidebarContainer) as React.ComponentClass;
