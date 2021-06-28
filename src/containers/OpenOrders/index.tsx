import classnames from 'classnames';
import * as React from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect, MapDispatchToPropsFunction } from 'react-redux';
import { IntlProps } from '../../';
import { openOrdersFetchInterval } from '../../api';
import { CloseIcon } from '../../assets/images/CloseIcon';
import { Decimal, OpenOrders } from '../../components';
import { localeDate, setTradeColor } from '../../helpers';
import {
    Market,
    openOrdersCancelFetch,
    ordersCancelAllFetch,
    RootState,
    selectCancelOpenOrdersFetching,
    selectCurrentMarket,
    selectOpenOrdersFetching,
    selectOpenOrdersList,
    selectUserLoggedIn,
    userOpenOrdersFetch,
} from '../../modules';
import { OrderCommon } from '../../modules/types';

interface ReduxProps {
    currentMarket: Market | undefined;
    list: OrderCommon[];
    fetching: boolean;
    cancelFetching: boolean;
    userLoggedIn: boolean;
}

interface DispatchProps {
    userOpenOrdersFetch: typeof userOpenOrdersFetch;
    openOrdersCancelFetch: typeof openOrdersCancelFetch;
    ordersCancelAll: typeof ordersCancelAllFetch;
}

type Props = ReduxProps & DispatchProps & IntlProps;

interface State {
    showLoading: boolean;
}

export class OpenOrdersContainer extends React.Component<Props, State> {
    private openOrdersFetchTimeout;

    constructor(props: Props) {
        super(props);
        this.state = {
            showLoading: true,
        };
    }

    private fetchOpenOrders = (
        userLoggedIn = this.props.userLoggedIn,
        market: Market | undefined = this.props.currentMarket
    ) => {
        clearTimeout(this.openOrdersFetchTimeout);

        if (userLoggedIn && market) {
            this.props.userOpenOrdersFetch({ market });

            this.openOrdersFetchTimeout = setTimeout(this.fetchOpenOrders, openOrdersFetchInterval());
        }
    }

    public componentDidMount() {
        this.fetchOpenOrders();
    }

    public componentWillUnmount() {
        clearTimeout(this.openOrdersFetchTimeout);
    }

    public componentWillReceiveProps(next: Props) {
        const { userLoggedIn, currentMarket } = next;

        if (!this.props.userLoggedIn || this.props.currentMarket !== currentMarket) {
            this.fetchOpenOrders(userLoggedIn, currentMarket);
        }

        if (this.props.fetching && !next.fetching) {
            this.setState({ showLoading: false });
        }
    }

    public render() {
        const { list, fetching, userLoggedIn } = this.props;
        const loading = fetching && this.state.showLoading;
        const classNames = classnames('pg-open-orders', {
            'pg-open-orders--empty': !list.length,
            'pg-open-orders--loading': loading,
        });

        return (
            <div className={classNames}>
                <div className="cr-table-header__content">
                    <div className="cr-grow">
                        <FormattedMessage id="page.body.trade.header.openOrders" />
                    </div>
                    <div className={classnames('cr-row', 'cr-row-spacing')}>
                        <Button disabled={!userLoggedIn} variant="light" onClick={this.handleRefresh}>
                            <FormattedMessage id="page.body.openOrders.header.button.refresh" />
                        </Button>
                        <Button
                            variant="light"
                            className={classnames('cr-row', 'cr-row-spacing')}
                            onClick={this.handleCancelAll}>
                            <CloseIcon />
                            <span>
                                <FormattedMessage id="page.body.openOrders.header.button.cancelAll" />
                            </span>
                        </Button>
                    </div>
                </div>
                {loading ? (
                    <div className="open-order-loading">
                        <Spinner animation="border" variant="primary" />
                    </div>
                ) : (
                    this.openOrders()
                )}
            </div>
        );
    }

    private renderHeadersKeys = () => {
        return [
            'Date',
            'Price',
            'Amount',
            'Total',
            'Filled',
            '',
        ];
    };

    private renderHeaders = () => {
        const currentAskUnit = this.props.currentMarket ? ` (${this.props.currentMarket.base_unit.toUpperCase()})` : '';
        const currentBidUnit = this.props.currentMarket ? ` (${this.props.currentMarket.quote_unit.toUpperCase()})` : '';

        return [
            this.translate('page.body.trade.header.openOrders.content.date'),
            this.translate('page.body.trade.header.openOrders.content.price').concat(currentBidUnit),
            this.translate('page.body.trade.header.openOrders.content.amount').concat(currentAskUnit),
            this.translate('page.body.trade.header.openOrders.content.total').concat(currentBidUnit),
            this.translate('page.body.trade.header.openOrders.content.filled'),
            '',
        ];
    };

    private openOrders = () => {
        return (
            <OpenOrders
                headersKeys={this.renderHeadersKeys()}
                headers={this.renderHeaders()}
                data={this.renderData()}
                onCancel={this.handleCancel}
            />
        );
    };

    private renderData = () => {
        const { list, currentMarket } = this.props;

        if (list.length === 0) {
            return [[[''], [''], this.translate('page.noDataToShow')]];
        }

        return list.map((item: OrderCommon) => {
            const { id, price, created_at, remaining_volume, origin_volume, side } = item;
            const executedVolume = Number(origin_volume) - Number(remaining_volume);
            const remainingAmount = Number(remaining_volume);
            const total = Number(origin_volume) * Number(price);
            const filled = ((executedVolume / Number(origin_volume)) * 100).toFixed(2);
            const priceFixed = currentMarket ? currentMarket.price_precision : 0;
            const amountFixed = currentMarket ? currentMarket.amount_precision : 0;

            return [
                localeDate(created_at, 'fullDate'),
                <span style={{ color: setTradeColor(side).color }} key={id}>{Decimal.format(price, priceFixed, ',')}</span>,
                <span style={{ color: setTradeColor(side).color }} key={id}>{Decimal.format(remainingAmount, amountFixed, ',')}</span>,
                <span style={{ color: setTradeColor(side).color }} key={id}>{Decimal.format(total, amountFixed, ',')}</span>,
                <span style={{ color: setTradeColor(side).color }} key={id}>{filled}%</span>,
                side,
            ];
        });
    };

    private translate = (e: string) => this.props.intl.formatMessage({ id: e });

    private handleCancel = (index: number) => {
        const { list } = this.props;
        const orderToDelete = list[index];
        this.props.openOrdersCancelFetch({ order: orderToDelete, list });
    };

    private handleCancelAll = () => {
        const { currentMarket } = this.props;
        currentMarket && this.props.ordersCancelAll({ market: currentMarket.id });
    };
   
    private handleRefresh = () => {
        this.fetchOpenOrders();
    };
}

const mapStateToProps = (state: RootState): ReduxProps => ({
    currentMarket: selectCurrentMarket(state),
    list: selectOpenOrdersList(state),
    fetching: selectOpenOrdersFetching(state),
    cancelFetching: selectCancelOpenOrdersFetching(state),
    userLoggedIn: selectUserLoggedIn(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> = dispatch => ({
    userOpenOrdersFetch: payload => dispatch(userOpenOrdersFetch(payload)),
    openOrdersCancelFetch: payload => dispatch(openOrdersCancelFetch(payload)),
    ordersCancelAll: payload => dispatch(ordersCancelAllFetch(payload)),
});

export type OpenOrdersProps = ReduxProps;

export const OpenOrdersComponent = injectIntl(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(OpenOrdersContainer),
) as React.FunctionComponent;
