import * as React from 'react';
import { useSelector } from 'react-redux';
import { DepositStatus } from 'src/components/History/DepositStatus';
import { WithdrawStatus } from 'src/components/History/WithdrawStatus';
import { Pagination, Table } from '../../../components';
import { DEFAULT_CCY_PRECISION } from '../../../constants';
import { sortByDateDesc } from '../../../helpers';
import { useHistoryFetch, useWalletsFetch } from '../../../hooks';
import {
  RootState,
  selectCurrentPage,
  selectLastElemIndex,
  selectNextPageExists,
} from '../../../modules';
import { selectFirstElemIndex, selectHistory, TransferLink } from '../../../modules/user/history';
import { selectWallets } from '../../../modules/user/wallets';
import { RowItem } from './Rowitem';

const DEFAULT_LIMIT = 6;

interface Props {
  type: 'deposits' | 'withdraws';
  currency: string;
}

const HistoryTable = (props: Props) => {
  const [currentPage, setCurrentPage] = React.useState(0);
  const page = useSelector(selectCurrentPage);
  const list = useSelector(selectHistory);
  const wallets = useSelector(selectWallets);
  const firstElemIndex = useSelector((state: RootState) =>
    selectFirstElemIndex(state, DEFAULT_LIMIT),
  );
  const lastElemIndex = useSelector((state: RootState) =>
    selectLastElemIndex(state, DEFAULT_LIMIT),
  );
  const nextPageExists = useSelector((state: RootState) =>
    selectNextPageExists(state, DEFAULT_LIMIT),
  );

  useWalletsFetch();
  useHistoryFetch({
    type: props.type,
    currency: props.currency,
    limit: DEFAULT_LIMIT,
    page: currentPage,
  });

  const onClickPrevPage = () => {
    setCurrentPage(Number(page) - 1);
  };
  const onClickNextPage = () => {
    setCurrentPage(Number(page) + 1);
  };
  const retrieveData = () => {
    const { currency, type } = props;
    const { precision } = wallets.find(
      (w) => w.currency.code.toLowerCase() === currency.toLowerCase(),
    ) || {
      precision: DEFAULT_CCY_PRECISION,
    };
    if (list.length === 0) {
      return [[]];
    }

    return list
      .sort((a, b) => sortByDateDesc(a.created_at, b.created_at))
      .map((item: any) => {
        const amount =
          'amount' in item ? Number(item.amount) : Number(item.price) * Number(item.volume);

        return [
          <RowItem
            amount={amount}
            fixed={precision}
            currency={currency}
            createdAt={item.created_at}
          />,
          type === 'deposits' ? (
            <DepositStatus item={item} currency={currency} />
          ) : (
            <WithdrawStatus item={item} currency={currency} />
          ),
        ];
      });
  };

  return (
    <div className="cr-mobile-history-table">
      <Table data={retrieveData()} />
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

export { HistoryTable };
