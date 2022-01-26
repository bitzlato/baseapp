import * as React from 'react';
import { injectIntl } from 'react-intl';
import { connect, MapDispatchToPropsFunction } from 'react-redux';
import { compose } from 'redux';
import { IntlProps } from '../../bootstrap';
import { History, Pagination } from '../../components';
import { localeDate, sortByDateDesc } from '../../helpers';
import {
  currenciesFetch,
  ApiCurrency,
  fetchHistory,
  resetHistory,
  RootState,
  selectCurrencies,
  selectCurrentPage,
  selectFirstElemIndex,
  selectHistory,
  selectHistoryLoading,
  selectLastElemIndex,
  selectNextPageExists,
  selectWallets,
  Wallet,
  WalletHistoryList,
  selectWithdrawSuccess,
  Deposit,
  Withdraw,
} from '../../modules';
import { DepositStatus } from 'src/components/History/DepositStatus';
import { WithdrawStatus } from 'src/components/History/WithdrawStatus';
import { FC } from 'react';
import s from './TransferHistory.postcss';
import { AmountFormat } from 'src/components/AmountFormat/AmountFormat';
import { createMoneyWithoutCcy } from 'src/helpers/money';

export interface HistoryProps {
  label: string;
  type: 'deposits' | 'withdraws';
  currency: string;
}

export interface ReduxProps {
  currencies: ApiCurrency[];
  list: WalletHistoryList;
  wallets: Wallet[];
  fetching: boolean;
  page: number;
  firstElemIndex: number;
  lastElemIndex: number;
  nextPageExists: boolean;
  withdrawSuccess: boolean;
}

interface DispatchProps {
  fetchCurrencies: typeof currenciesFetch;
  fetchHistory: typeof fetchHistory;
  resetHistory: typeof resetHistory;
}

export type Props = HistoryProps & ReduxProps & DispatchProps & IntlProps;

export class WalletTable extends React.Component<Props> {
  public componentDidMount() {
    const { currencies, currency, type } = this.props;
    this.props.fetchHistory({ page: 0, currency, type, limit: 6 });

    if (!currencies.length) {
      this.props.fetchCurrencies();
    }
  }

  public UNSAFE_componentWillReceiveProps(nextProps: Props) {
    const { currencies, currency, type, withdrawSuccess } = this.props;
    if (nextProps.currency !== currency || nextProps.type !== type) {
      this.props.resetHistory();
      this.props.fetchHistory({ page: 0, currency: nextProps.currency, type, limit: 6 });
    }

    if (!currencies.length && nextProps.currencies.length) {
      this.props.fetchCurrencies();
    }

    if (!withdrawSuccess && nextProps.withdrawSuccess) {
      this.props.fetchHistory({ page: 0, currency, type, limit: 6 });
    }
  }

  public componentWillUnmount() {
    this.props.resetHistory();
  }

  public render() {
    const { label, list, firstElemIndex, lastElemIndex, page, nextPageExists } = this.props;

    if (!list.length) {
      return null;
    }

    return (
      <div className="pg-history-elem__wallet">
        <h4>{this.props.intl.formatMessage({ id: `page.body.history.${label}` })}</h4>
        <History
          headers={this.getHeaders(label)}
          data={this.retrieveData(list)}
          tableClassName={s.transferHistory}
        />
        <Pagination
          firstElemIndex={firstElemIndex}
          lastElemIndex={lastElemIndex}
          page={page}
          nextPageExists={nextPageExists}
          onClickPrevPage={this.onClickPrevPage}
          onClickNextPage={this.onClickNextPage}
        />
      </div>
    );
  }

  private getHeaders = (label: string) => [
    this.props.intl.formatMessage({ id: `page.body.history.${label}.header.date` }),
    this.props.intl.formatMessage({ id: `page.body.history.${label}.header.status` }),
    this.props.intl.formatMessage({ id: `page.body.history.${label}.header.amount` }),
  ];

  private onClickPrevPage = () => {
    const { page, type, currency } = this.props;
    this.props.fetchHistory({ page: Number(page) - 1, currency, type, limit: 6 });
  };

  private onClickNextPage = () => {
    const { page, type, currency } = this.props;
    this.props.fetchHistory({ page: Number(page) + 1, currency, type, limit: 6 });
  };

  private retrieveData = (list: WalletHistoryList) => {
    const { currency, type, wallets } = this.props;
    const { precision } = wallets.find(
      (w) => w.currency.code.toLowerCase() === currency.toLowerCase(),
    ) || { precision: 8 };

    if (!list.length) {
      return [[]];
    }

    return list
      .sort((a, b) => sortByDateDesc(a.created_at, b.created_at))
      .map((item, index) => {
        return [
          <div title={`${item.id} - ${item.state}`}>{localeDate(item.created_at, 'fullDate')}</div>,
          type === 'deposits' ? (
            <DepositStatus item={item as Deposit} currency={currency} />
          ) : (
            <WithdrawStatus item={item as Withdraw} currency={currency} />
          ),
          <AmountFormat key={index} money={createMoneyWithoutCcy(Number(item.amount), precision)} />
        ];
      });
  };
}

export const mapStateToProps = (state: RootState): ReduxProps => ({
  currencies: selectCurrencies(state),
  list: selectHistory(state),
  wallets: selectWallets(state),
  fetching: selectHistoryLoading(state),
  page: selectCurrentPage(state),
  firstElemIndex: selectFirstElemIndex(state, 6),
  lastElemIndex: selectLastElemIndex(state, 6),
  nextPageExists: selectNextPageExists(state, 6),
  withdrawSuccess: selectWithdrawSuccess(state),
});

export const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> = (dispatch) => ({
  fetchCurrencies: () => dispatch(currenciesFetch()),
  fetchHistory: (params) => dispatch(fetchHistory(params)),
  resetHistory: () => dispatch(resetHistory()),
});

export const WalletHistory = compose(
  connect(mapStateToProps, mapDispatchToProps),
  injectIntl,
)(WalletTable) as FC<HistoryProps>;
