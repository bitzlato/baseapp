import * as React from 'react';
import { Spinner } from 'react-bootstrap';
import { injectIntl } from 'react-intl';
import { connect, MapDispatchToPropsFunction } from 'react-redux';
import { compose } from 'redux';
import { DepositStatus } from 'src/components/History/DepositStatus';
import { getBlockchainLink } from 'src/helpers/getBlockchainLink';
import { CurrencyTicker } from 'src/components/CurrencyTicker/CurrencyTicker';
import { MarketName } from 'src/components/MarketName/MarketName';
import { IntlProps } from '../../';
import { Decimal, History, Pagination } from '../../components';
import { localeDate, setTradesType, setTransferStatusColor, truncateMiddle } from '../../helpers';
import {
  currenciesFetch,
  ApiCurrency,
  Deposit,
  fetchHistory,
  Market,
  RootState,
  selectCurrencies,
  selectCurrentPage,
  selectFirstElemIndex,
  selectHistory,
  selectHistoryLoading,
  selectLastElemIndex,
  selectMarkets,
  selectNextPageExists,
  selectWallets,
  Wallet,
  WalletHistoryElement,
  WalletHistoryList,
  Withdraw,
} from '../../modules';
import { WithdrawStatus } from 'src/components/History/WithdrawStatus';

interface HistoryProps {
  type: string;
}

interface ReduxProps {
  currencies: ApiCurrency[];
  marketsData: Market[];
  wallets: Wallet[];
  list: WalletHistoryList;
  fetching: boolean;
  page: number;
  firstElemIndex: number;
  lastElemIndex: number;
  nextPageExists: boolean;
}

interface DispatchProps {
  fetchCurrencies: typeof currenciesFetch;
  fetchHistory: typeof fetchHistory;
}

type Props = HistoryProps & ReduxProps & DispatchProps & IntlProps;

class HistoryComponent extends React.Component<Props> {
  public componentDidMount() {
    const { currencies, type } = this.props;
    this.props.fetchHistory({ page: 0, type, limit: 25 });

    if (currencies.length === 0) {
      this.props.fetchCurrencies();
    }
  }

  public UNSAFE_componentWillReceiveProps(nextProps: Props) {
    const { currencies } = this.props;

    if (!currencies.length && nextProps.currencies.length) {
      this.props.fetchCurrencies();
    }
  }

  public render() {
    const { list, fetching } = this.props;

    return (
      <div className={`pg-history-elem ${list.length ? '' : 'pg-history-elem-empty'}`}>
        {fetching && (
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
          </div>
        )}
        {list.length ? this.renderContent() : null}
        {!list.length && !fetching ? (
          <p className="pg-history-elem__empty">
            {this.props.intl.formatMessage({ id: 'page.noDataToShow' })}
          </p>
        ) : null}
      </div>
    );
  }

  public renderContent = () => {
    const { type, firstElemIndex, lastElemIndex, page, nextPageExists } = this.props;

    return (
      <React.Fragment>
        <History headers={this.renderHeaders(type)} data={this.retrieveData()} />
        <Pagination
          firstElemIndex={firstElemIndex}
          lastElemIndex={lastElemIndex}
          page={page}
          nextPageExists={nextPageExists}
          onClickPrevPage={this.onClickPrevPage}
          onClickNextPage={this.onClickNextPage}
        />
      </React.Fragment>
    );
  };

  private onClickPrevPage = () => {
    const { page, type } = this.props;
    this.props.fetchHistory({ page: Number(page) - 1, type, limit: 25 });
  };

  private onClickNextPage = () => {
    const { page, type } = this.props;
    this.props.fetchHistory({ page: Number(page) + 1, type, limit: 25 });
  };

  private renderHeaders = (type: string) => {
    switch (type) {
      case 'deposits':
        return [
          this.props.intl.formatMessage({ id: 'page.body.history.deposit.header.txid' }),
          this.props.intl.formatMessage({ id: 'page.body.history.deposit.header.date' }),
          this.props.intl.formatMessage({ id: 'page.body.history.deposit.header.currency' }),
          this.props.intl.formatMessage({ id: 'page.body.history.deposit.header.amount' }),
          this.props.intl.formatMessage({ id: 'page.body.history.deposit.header.status' }),
        ];
      case 'withdraws':
        return [
          this.props.intl.formatMessage({ id: 'page.body.history.withdraw.header.address' }),
          this.props.intl.formatMessage({ id: 'page.body.history.withdraw.header.date' }),
          this.props.intl.formatMessage({ id: 'page.body.history.withdraw.header.currency' }),
          this.props.intl.formatMessage({ id: 'page.body.history.withdraw.header.amount' }),
          this.props.intl.formatMessage({ id: 'page.body.history.withdraw.header.fee' }),
          this.props.intl.formatMessage({ id: 'page.body.history.withdraw.header.status' }),
        ];
      case 'trades':
        return [
          this.props.intl.formatMessage({ id: 'page.body.history.trade.header.date' }),
          this.props.intl.formatMessage({ id: 'page.body.history.trade.header.side' }),
          this.props.intl.formatMessage({ id: 'page.body.history.trade.header.market' }),
          this.props.intl.formatMessage({ id: 'page.body.history.trade.header.price' }),
          this.props.intl.formatMessage({ id: 'page.body.history.trade.header.amount' }),
          this.props.intl.formatMessage({ id: 'page.body.history.trade.header.total' }),
        ];
      case 'transfers':
        return [
          this.props.intl.formatMessage({ id: 'page.body.history.transfer.header.date' }),
          this.props.intl.formatMessage({ id: 'page.body.history.transfer.header.amount' }),
          this.props.intl.formatMessage({ id: 'page.body.history.transfer.header.currency' }),
          this.props.intl.formatMessage({ id: 'page.body.history.transfer.header.direction' }),
          this.props.intl.formatMessage({ id: 'page.body.history.transfer.header.toAccount' }),
          this.props.intl.formatMessage({ id: 'page.body.history.transfer.header.status' }),
        ];
      default:
        return [];
    }
  };

  private retrieveData = () => {
    const { type, list } = this.props;

    return [...list].map((item) => this.renderTableRow(type, item));
  };

  private renderTableRow = (type: string, item: WalletHistoryElement) => {
    const { intl, marketsData, wallets } = this.props;
    switch (type) {
      case 'deposits': {
        const { amount, created_at, currency, txid } = item as Deposit;
        const wallet = wallets.find(
          (obj) => obj.currency.code.toLowerCase() === currency.toLowerCase(),
        );
        const blockchainLink = getBlockchainLink(wallet, txid);

        return [
          <div className="pg-history-elem__hide" key={txid}>
            {blockchainLink ? (
              <a href={blockchainLink} target="_blank" rel="noopener noreferrer">
                {truncateMiddle(txid, 30)}
              </a>
            ) : (
              '-'
            )}
          </div>,
          localeDate(created_at, 'fullDate'),
          <CurrencyTicker symbol={currency} />,
          wallet && Decimal.format(amount, wallet.precision, ','),
          <DepositStatus item={item as Deposit} currency={currency} />,
        ];
      }
      case 'withdraws': {
        const { txid, created_at, currency, amount, fee, rid } = item as Withdraw;
        const wallet = wallets.find(
          (obj) => obj.currency.code.toLowerCase() === currency.toLowerCase(),
        );
        const blockchainLink = getBlockchainLink(wallet, txid, rid);

        return [
          <div className="pg-history-elem__hide" key={txid || rid}>
            <a href={blockchainLink} target="_blank" rel="noopener noreferrer">
              {truncateMiddle(txid || rid, 30)}
            </a>
          </div>,
          localeDate(created_at, 'fullDate'),
          <CurrencyTicker symbol={currency} />,
          wallet && Decimal.format(amount, wallet.precision, ','),
          wallet && Decimal.format(fee, wallet.precision, ','),
          <WithdrawStatus key="status" currency={currency} item={item as Withdraw} />,
        ];
      }
      case 'trades': {
        const { id, created_at, side, market, price, amount, total } = item;
        const marketToDisplay = marketsData.find((m) => m.id === market) || {
          name: '',
          price_precision: 0,
          amount_precision: 0,
        };
        const marketName = marketToDisplay ? marketToDisplay.name : market;
        const sideText = setTradesType(side).text.toLowerCase()
          ? intl.formatMessage({
              id: `page.body.history.trade.content.side.${setTradesType(side).text.toLowerCase()}`,
            })
          : '';

        return [
          localeDate(created_at, 'fullDate'),
          <span style={{ color: setTradesType(side).color }} key={id}>
            {sideText}
          </span>,
          <MarketName name={marketName} />,
          <Decimal key={id} fixed={marketToDisplay.price_precision} thousSep=",">
            {price}
          </Decimal>,
          <Decimal key={id} fixed={marketToDisplay.amount_precision} thousSep=",">
            {amount}
          </Decimal>,
          <Decimal key={id} fixed={marketToDisplay.amount_precision} thousSep=",">
            {total}
          </Decimal>,
        ];
      }
      case 'transfers': {
        const { id, created_at, currency, amount, direction, receiver_username, receiver_uid } =
          item;
        const status = intl.formatMessage({
          id: `page.body.history.transfer.content.status.${item.status}`,
        });
        const wallet = wallets.find((obj) => obj.currency === currency);

        const toAccount = receiver_username?.toUpperCase() || receiver_uid?.toUpperCase();

        return [
          localeDate(created_at, 'fullDate'),
          wallet && Decimal.format(amount, wallet.precision, ','),
          <CurrencyTicker symbol={currency} />,
          direction && direction.replace(/^./, direction[0].toUpperCase()),
          toAccount,
          <span style={{ color: setTransferStatusColor(item.status) }} key={id}>
            {status}
          </span>,
        ];
      }
      default: {
        return [];
      }
    }
  };
}

const mapStateToProps = (state: RootState): ReduxProps => ({
  currencies: selectCurrencies(state),
  marketsData: selectMarkets(state),
  wallets: selectWallets(state),
  list: selectHistory(state),
  fetching: selectHistoryLoading(state),
  page: selectCurrentPage(state),
  firstElemIndex: selectFirstElemIndex(state, 25),
  lastElemIndex: selectLastElemIndex(state, 25),
  nextPageExists: selectNextPageExists(state, 25),
});

export const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> = (dispatch) => ({
  fetchCurrencies: () => dispatch(currenciesFetch()),
  fetchHistory: (params) => dispatch(fetchHistory(params)),
});

export const HistoryElement = compose(
  injectIntl,
  connect(mapStateToProps, mapDispatchToProps),
)(HistoryComponent) as any; // tslint:disable-line
