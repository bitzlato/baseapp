import { FC, useEffect } from 'react';
import { Spinner } from 'web/src/components/ui/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { DepositStatus } from 'src/components/History/DepositStatus';
import { getBlockchainLink } from 'src/helpers/getBlockchainLink';
import { CurrencyTicker } from 'src/components/CurrencyTicker/CurrencyTicker';
import { MarketName } from 'src/components/MarketName/MarketName';
import { WithdrawStatus } from 'src/components/History/WithdrawStatus';
import { AmountFormat } from 'src/components/AmountFormat/AmountFormat';
import { createMoneyWithoutCcy } from 'src/helpers/money';
import { useT } from 'src/hooks/useT';
import { DEFAULT_BLOCKCHAIN } from 'web/src/modules/public/blockchains/defaults';
import { TransferHistory } from '../Wallets/TransferHistory';
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
  selectHistoryType,
} from '../../modules';
import { localeDate, setTradesType, truncateMiddle } from '../../helpers';
import { History, Pagination } from '../../components';
import { useFetchBlockchains } from 'web/src/hooks/data/belomor/useFetchBlockchains';

interface Props {
  type: string;
}

export const HistoryElement: FC<Props> = ({ type }) => {
  const dispatch = useDispatch();
  const currencies = useSelector(selectCurrencies);
  const markets = useSelector(selectMarkets);
  const wallets = useSelector(selectWallets) || [];
  const list = useSelector(selectHistory);
  const historyType = useSelector(selectHistoryType);
  const fetching = useSelector(selectHistoryLoading);
  const page = useSelector(selectCurrentPage);
  const firstElemIndex = useSelector((state: RootState) => selectFirstElemIndex(state, 25));
  const lastElemIndex = useSelector((state: RootState) => selectLastElemIndex(state, 25));
  const nextPageExists = useSelector(selectNextPageExists);
  const t = useT();

  const { data: blockchains = [] } = useFetchBlockchains();

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
    return <TransferHistory wallets={wallets} className="pg-history-elem" />;
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
        const { amount, created_at, currency, txid, blockchain_key } = item as Deposit;
        const wallet = wallets.find(
          (obj) => obj.currency.code.toLowerCase() === currency.toLowerCase(),
        );
        const blockchain = blockchains.find((d) => d.key === blockchain_key) ?? DEFAULT_BLOCKCHAIN;
        const blockchainLink = getBlockchainLink(blockchain, txid);

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
          <DepositStatus item={item as Deposit} minConfirmations={blockchain.min_confirmations} />,
        ];
      }
      case 'withdraws': {
        const { created_at, currency, amount, fee, rid, blockchain_key } = item as Withdraw;
        const wallet = wallets.find(
          (obj) => obj.currency.code.toLowerCase() === currency.toLowerCase(),
        );
        const blockchain = blockchains.find((d) => d.key === blockchain_key) ?? DEFAULT_BLOCKCHAIN;
        const blockchainLink = getBlockchainLink(blockchain, '', rid);

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
          <WithdrawStatus
            key="status"
            item={item as Withdraw}
            minConfirmations={blockchain.min_confirmations}
          />,
        ];
      }
      case 'trades': {
        const { id, created_at, side, market, price, amount, total } = item as PrivateTrade;
        const marketToDisplay = markets.find((m) => m.id === market) || {
          name: market,
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

  const tableData = type === historyType ? list.map((item) => renderTableRow(item)) : [];

  return (
    <div className={`pg-history-elem ${list.length ? '' : 'pg-history-elem-empty'}`}>
      {fetching && (
        <div className="text-center">
          <Spinner />
        </div>
      )}
      {list.length ? (
        <>
          <History headers={getHeaders()} data={tableData} />
          <Pagination
            firstElemIndex={firstElemIndex}
            lastElemIndex={lastElemIndex}
            page={page}
            nextPageExists={nextPageExists}
            onClickPrevPage={onClickPrevPage}
            onClickNextPage={onClickNextPage}
          />
        </>
      ) : null}
      {!list.length && !fetching ? (
        <p className="pg-history-elem__empty">{t('page.noDataToShow')}</p>
      ) : null}
    </div>
  );
};
