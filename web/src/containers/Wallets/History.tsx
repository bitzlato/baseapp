import { useDispatch, useSelector } from 'react-redux';
import { DepositStatus } from 'src/components/History/DepositStatus';
import { WithdrawStatus } from 'src/components/History/WithdrawStatus';
import { FC, useEffect } from 'react';
import { AmountFormat } from 'src/components/AmountFormat/AmountFormat';
import { createMoneyWithoutCcy } from 'src/helpers/money';
import { useT } from 'web/src/hooks/useT';
import { Blockchain } from 'web/src/modules/public/blockchains/types';
import { tradeUrl } from 'web/src/api/config';
import { DEFAULT_BLOCKCHAIN } from 'web/src/modules/public/blockchains/defaults';
import s from './TransferHistory.postcss';
import {
  currenciesFetch,
  fetchHistory,
  resetHistory,
  RootState,
  selectCurrencies,
  selectCurrentPage,
  selectFirstElemIndex,
  selectHistory,
  selectLastElemIndex,
  selectNextPageExists,
  selectWallets,
  WalletHistoryList,
  selectWithdrawSuccess,
  Deposit,
  Withdraw,
} from '../../modules';
import { localeDate, sortByDateDesc } from '../../helpers';
import { History, Pagination } from '../../components';
import { useFetch } from 'web/src/hooks/data/useFetch';

interface Props {
  label: string;
  type: 'deposits' | 'withdraws';
  currency: string;
}

export const WalletHistory: FC<Props> = (props) => {
  const { type, currency, label } = props;
  const dispatch = useDispatch();
  const currencies = useSelector(selectCurrencies);
  const wallets = useSelector(selectWallets) || [];
  const list = useSelector(selectHistory);
  const page = useSelector(selectCurrentPage);
  const firstElemIndex = useSelector((state: RootState) => selectFirstElemIndex(state, 25));
  const lastElemIndex = useSelector((state: RootState) => selectLastElemIndex(state, 25));
  const nextPageExists = useSelector(selectNextPageExists);
  const withdrawSuccess = useSelector(selectWithdrawSuccess);
  const t = useT();

  const { data: blockchains = [] } = useFetch<Blockchain[]>(`${tradeUrl()}/public/blockchains`);

  useEffect(() => {
    dispatch(fetchHistory({ currency, page: 0, type, limit: 6 }));
    if (currencies.length === 0) {
      dispatch(currenciesFetch());
    }
    return () => {
      dispatch(resetHistory());
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(resetHistory());
    dispatch(fetchHistory({ currency, page: 0, type, limit: 6 }));
  }, [dispatch, type, currency, withdrawSuccess]);

  useEffect(() => {
    dispatch(currenciesFetch());
  }, [dispatch, currencies.length]);

  const getHeaders = (label: string) => [
    t(`page.body.history.${label}.header.date`),
    t(`page.body.history.${label}.header.status`),
    t(`page.body.history.${label}.header.amount`),
  ];

  const onClickPrevPage = () => {
    dispatch(fetchHistory({ currency, page: Number(page) - 1, type, limit: 6 }));
  };

  const onClickNextPage = () => {
    dispatch(fetchHistory({ currency, page: Number(page) + 1, type, limit: 6 }));
  };

  const retrieveData = (list: WalletHistoryList) => {
    const { precision } = wallets.find(
      (w) => w.currency.code.toLowerCase() === currency.toLowerCase(),
    ) || { precision: 8 };

    if (!list.length) {
      return [[]];
    }

    return (list as (Withdraw | Deposit)[])
      .sort((a, b) => sortByDateDesc(a.created_at, b.created_at))
      .map((item, index) => {
        const blockchain =
          blockchains.find((d) => d.id === item.blockchain_id) ?? DEFAULT_BLOCKCHAIN;
        return [
          <div title={`${item.id} - ${item.state}`}>{localeDate(item.created_at, 'fullDate')}</div>,
          type === 'deposits' ? (
            <DepositStatus item={item as Deposit} minConfirmations={blockchain.min_confirmations} />
          ) : (
            <WithdrawStatus
              item={item as Withdraw}
              minConfirmations={blockchain.min_confirmations}
            />
          ),
          <AmountFormat
            key={index}
            money={createMoneyWithoutCcy(Number(item.amount), precision)}
          />,
        ];
      });
  };

  if (!list.length) {
    return null;
  }

  return (
    <div className="pg-history-elem__wallet">
      <h4>{t(`page.body.history.${label}`)}</h4>
      <History
        headers={getHeaders(label)}
        data={retrieveData(list)}
        tableClassName={s.transferHistory}
      />
      <Pagination
        firstElemIndex={firstElemIndex}
        lastElemIndex={lastElemIndex}
        page={page}
        nextPageExists={nextPageExists}
        onClickPrevPage={onClickPrevPage}
        onClickNextPage={onClickNextPage}
      />
    </div>
  );
};
