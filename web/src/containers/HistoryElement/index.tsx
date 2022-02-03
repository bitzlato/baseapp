import React, { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { DepositStatus } from 'src/components/History/DepositStatus';
import { getBlockchainLink } from 'src/helpers/getBlockchainLink';
import { CurrencyTicker } from 'src/components/CurrencyTicker/CurrencyTicker';
import { MarketName } from 'src/components/MarketName/MarketName';
import { History, Pagination } from '../../components';
import { localeDate, setTradesType, truncateMiddle } from '../../helpers';
import {
  currenciesFetch,
  Deposit,
  fetchHistory,
  selectCurrencies,
  selectCurrentPage,
  selectHistory,
  selectHistoryLoading,
  selectMarkets,
  selectNextPageExists,
  selectWallets,
  WalletHistoryElement,
  Withdraw,
  PrivateTrade,
  selectFirstElemIndex,
  RootState,
  selectLastElemIndex,
} from '../../modules';
import { WithdrawStatus } from 'src/components/History/WithdrawStatus';
import { TransferHistory } from '../Wallets/TransferHistory';
import { AmountFormat } from 'src/components/AmountFormat/AmountFormat';
import { createMoneyWithoutCcy } from 'src/helpers/money';
import { useT } from 'src/hooks/useT';

interface Props {
  type: string;
}

export const HistoryElement: React.FC<Props> = ({ type }) => {
  const dispatch = useDispatch();
  const currencies = useSelector(selectCurrencies);
  const markets = useSelector(selectMarkets);
  const wallets = useSelector(selectWallets) || [];
  const list = useSelector(selectHistory);
  const fetching = useSelector(selectHistoryLoading);
  const page = useSelector(selectCurrentPage);
  const firstElemIndex = useSelector((state: RootState) => selectFirstElemIndex(state, 25));
  const lastElemIndex = useSelector((state: RootState) => selectLastElemIndex(state, 25));
  const nextPageExists = useSelector(selectNextPageExists);
  const t = useT();

  useEffect(() => {
    dispatch(fetchHistory({ page: 0, type, limit: 25 }));
    if (currencies.length === 0) {
      dispatch(currenciesFetch());
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(currenciesFetch());
  }, [dispatch, currencies.length]);

  if (type === 'transfers') {
    return (
      <div className="pg-history-elem">
        <TransferHistory wallets={wallets} />
      </div>
    );
  }

  const onClickPrevPage = () => {
    dispatch(fetchHistory({ page: Number(page) - 1, type, limit: 25 }));
  };

  const onClickNextPage = () => {
    dispatch(fetchHistory({ page: Number(page) + 1, type, limit: 25 }));
  };

  const getHeaders = () => {
    switch (type) {
      case 'deposits':
        return [
          t('page.body.history.deposit.header.txid'),
          t('page.body.history.deposit.header.date'),
          t('page.body.history.deposit.header.currency'),
          t('page.body.history.deposit.header.amount'),
          t('page.body.history.deposit.header.status'),
        ];
      case 'withdraws':
        return [
          t('page.body.history.withdraw.header.address'),
          t('page.body.history.withdraw.header.date'),
          t('page.body.history.withdraw.header.currency'),
          t('page.body.history.withdraw.header.amount'),
          t('page.body.history.withdraw.header.fee'),
          t('page.body.history.withdraw.header.status'),
        ];
      case 'trades':
        return [
          t('page.body.history.trade.header.date'),
          t('page.body.history.trade.header.side'),
          t('page.body.history.trade.header.market'),
          t('page.body.history.trade.header.price'),
          t('page.body.history.trade.header.amount'),
          t('page.body.history.trade.header.total'),
        ];
      default:
        return [];
    }
  };

  const renderTableRow = (item: WalletHistoryElement) => {
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
          wallet && createMoneyWithoutCcy(amount, wallet.precision).toFormat(),
          <DepositStatus item={item as Deposit} currency={currency} />,
        ];
      }
      case 'withdraws': {
        const { created_at, currency, amount, fee, rid } = item as Withdraw;
        const wallet = wallets.find(
          (obj) => obj.currency.code.toLowerCase() === currency.toLowerCase(),
        );
        const blockchainLink = getBlockchainLink(wallet, '', rid);

        return [
          <div className="pg-history-elem__hide" key={rid}>
            <a href={blockchainLink} target="_blank" rel="noopener noreferrer">
              {truncateMiddle(rid, 30)}
            </a>
          </div>,
          localeDate(created_at, 'fullDate'),
          <CurrencyTicker symbol={currency} />,
          wallet && createMoneyWithoutCcy(amount, wallet.precision).toFormat(),
          wallet && createMoneyWithoutCcy(fee, wallet.precision).toFormat(),
          <WithdrawStatus key="status" currency={currency} item={item as Withdraw} />,
        ];
      }
      case 'trades': {
        const { id, created_at, side, market, price, amount, total } = item as PrivateTrade;
        const marketToDisplay = markets.find((m) => m.id === market) || {
          name: '',
          price_precision: 0,
          amount_precision: 0,
        };
        const marketName = marketToDisplay ? marketToDisplay.name : market;
        const sideText = setTradesType(side).text.toLowerCase()
          ? t(`page.body.history.trade.content.side.${setTradesType(side).text.toLowerCase()}`)
          : '';

        return [
          localeDate(created_at, 'fullDate'),
          <span style={{ color: setTradesType(side).color }} key={id}>
            {sideText}
          </span>,
          <MarketName name={marketName} />,
          <AmountFormat
            key={id}
            money={createMoneyWithoutCcy(price ?? 0, marketToDisplay.price_precision)}
          />,
          <AmountFormat
            key={id}
            money={createMoneyWithoutCcy(amount ?? 0, marketToDisplay.amount_precision)}
          />,
          <AmountFormat
            key={id}
            money={createMoneyWithoutCcy(total ?? 0, marketToDisplay.amount_precision)}
          />,
        ];
      }
      default: {
        return [];
      }
    }
  };

  const data = list.map((item) => renderTableRow(item));

  return (
    <div className={`pg-history-elem ${list.length ? '' : 'pg-history-elem-empty'}`}>
      {fetching && (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      )}
      {list.length ? (
        <React.Fragment>
          <History headers={getHeaders()} data={data} />
          <Pagination
            firstElemIndex={firstElemIndex}
            lastElemIndex={lastElemIndex}
            page={page}
            nextPageExists={nextPageExists}
            onClickPrevPage={onClickPrevPage}
            onClickNextPage={onClickNextPage}
          />
        </React.Fragment>
      ) : null}
      {!list.length && !fetching ? (
        <p className="pg-history-elem__empty">{t('page.noDataToShow')}</p>
      ) : null}
    </div>
  );
};
