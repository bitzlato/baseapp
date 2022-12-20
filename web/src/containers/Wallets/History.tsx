import { FC, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { DepositStatus } from 'web/src/components/History/DepositStatus';
import { WithdrawStatus } from 'web/src/components/History/WithdrawStatus';
import { AmountFormat } from 'web/src/components/AmountFormat/AmountFormat';
import { createMoney } from 'web/src/helpers/money';
import { useT } from 'web/src/hooks/useT';
import { DEFAULT_BLOCKCHAIN } from 'web/src/modules/public/blockchains/defaults';
import { alertPush, Deposit, Withdraw } from 'web/src/modules';
import { localeDate, sliceString, sortByDateDesc, truncateMiddle } from 'web/src/helpers';
import { Box } from 'web/src/components/Box/Box';
import { Button } from 'web/src/components/ui/Button';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'web/src/components/ui/Modal';
import { Text } from 'web/src/components/ui/Text';
import {
  changeTransaction,
  useFetchP2PTransactions,
} from 'web/src/hooks/data/useFetchP2PTransactions';
import { ExternalLink } from 'web/src/components/History/ExternalLink';
import { None } from 'web/src/components/None';
import { MoneyFormat } from 'web/src/components/MoneyFormat/MoneyFormat';
import { useFetchHistory } from 'web/src/hooks/data/useFetchHistory';
import { Pagination } from 'web/src/components/Pagination/Pagination';
import { TextInput } from 'web/src/components/Input/TextInput';
import { P2PDepositTransaction, P2PTransaction } from 'web/src/modules/p2p/types';
import { WalletItemData } from 'web/src/components/WalletItem/WalletItem';
import { WalletType } from 'web/src/modules/account/types';
import { useHandleFetchError } from 'web/src/components/app/AppContext';
import { Table } from 'web/src/components/Table';
import { useFetchBlockchains } from 'web/src/hooks/data/belomor/useFetchBlockchains';
import { getBlockchainLink } from 'web/src/helpers/getBlockchainLink';
import s from './TransferHistory.postcss';

export const LIMIT = 6;

interface Props {
  type: 'deposits' | 'withdraws';
  general: WalletItemData;
}

export const ExchangeHistory: FC<Props> = ({ type, general }) => {
  const t = useT();
  const { data: blockchains = [] } = useFetchBlockchains();

  const [page, setPage] = useState(0);

  const ccy = general.balanceTotal.currency;
  const resp = useFetchHistory(type, {
    currency: ccy.code.toLowerCase(),
    limit: LIMIT,
    page,
  });

  const data = resp.data?.data ?? [];
  const total = resp.data?.total ?? 0;
  const isDeposit = type === 'deposits';

  const headers = useMemo(
    () => [
      t('page.body.history.deposit.header.txid'),
      t('Date'),
      t('Status'),
      t('Amount'),
      t('page.body.history.withdraw.header.fee'),
    ],
    [t],
  );

  const tableData = data
    .sort((a, b) => sortByDateDesc(a.created_at, b.created_at))
    .map((d) => {
      const blockchain = blockchains.find((b) => b.key === d.blockchain_key) ?? DEFAULT_BLOCKCHAIN;
      const blockchainLink = isDeposit
        ? getBlockchainLink(blockchain, (d as Deposit).txid)
        : getBlockchainLink(blockchain, (d as Withdraw).blockchain_txid);
      return [
        <a href={blockchainLink} target="_blank" rel="noopener noreferrer">
          {truncateMiddle(isDeposit ? (d as Deposit).txid : (d as Withdraw).blockchain_txid, 30)}
        </a>,
        <div title={`${d.id} - ${d.state}`}>{localeDate(d.created_at, 'fullDate')}</div>,
        isDeposit ? <DepositStatus item={d as Deposit} /> : <WithdrawStatus item={d as Withdraw} />,
        <AmountFormat key={d.id} money={createMoney(d.amount, ccy)} />,
        <AmountFormat key={d.id} money={createMoney(d.fee, ccy)} />,
      ];
    });

  return (
    <>
      <Table header={headers} data={tableData} tableClassName={s.transferHistory} />
      <Pagination limit={LIMIT} total={total} onChange={setPage} />
    </>
  );
};

function renderStatus(d: P2PDepositTransaction, t: (v: string) => string) {
  switch (d.status) {
    case 'success':
      return <Text color="success">{t('deposit.success')}</Text>;
    case 'aml-seizure':
      return <Text color="danger">{t('deposit.aml-seizure')}</Text>;
    case 'aml-check':
      return <Text color="warning">{t('deposit.aml-check')}</Text>;
    default:
      return <None />;
  }
}

const P2PHistory: FC<Props> = ({ type, general }) => {
  const isDeposit = type === 'deposits';

  const handleFetchError = useHandleFetchError();
  const ccy = general.balanceTotal.currency;

  const [page, setPage] = useState(0);
  const [trx, setTrx] = useState<P2PTransaction | null>(null);
  const [comment, setComment] = useState('');

  const t = useT();
  const dispatch = useDispatch();

  const historyResp = useFetchP2PTransactions({
    cryptocurrency: ccy.code,
    sortKey: 'created',
    sortValue: 'desc',
    limit: LIMIT,
    skip: page * LIMIT,
    type: isDeposit ? 'load' : 'withdrawal',
  });

  const data = historyResp.data?.data ?? [];
  const total = historyResp.data?.total ?? 0;

  const handleChangePage = (value: number) => {
    setPage(value);
    historyResp.mutate();
  };

  const handleClickMore = (value: P2PTransaction) => {
    setTrx(value);
    setComment(value.comment ?? '');
  };

  const handleClickOk = async () => {
    if (trx && comment !== trx?.comment) {
      try {
        await changeTransaction(trx.id, { comment });
        historyResp.mutate();
        dispatch(alertPush({ message: ['Successfully changed'], type: 'success' }));
      } catch (error) {
        handleFetchError(error);
      }
    }
    setTrx(null);
  };

  const header = useMemo(
    () => [
      '',
      t('Date'),
      isDeposit ? t('Status') : undefined,
      t('Address'),
      t('Amount'),
      t('Comment'),
    ],
    [t, isDeposit],
  );

  const tableRows = data.map((d) => [
    <Button
      size="small"
      variant="outlined"
      color="secondary"
      title={`${t('More')}...`}
      onClick={() => handleClickMore(d)}
    >
      ...
    </Button>,
    <div title={`${d.id}`}>{localeDate(d.created, 'fullDate')}</div>,
    isDeposit ? renderStatus(d as P2PDepositTransaction, t) : undefined,
    <ExternalLink href={d.viewUrl}>{truncateMiddle(d.address, 20)}</ExternalLink>,
    <MoneyFormat money={createMoney(d.cryptocurrency.amount, ccy)} />,
    d.comment ? sliceString(d.comment, 30) : <None />,
  ]);

  return (
    <>
      <Table header={header} data={tableRows} tableClassName={s.p2PTransferHistory} />
      <Pagination limit={LIMIT} total={total} onChange={handleChangePage} />
      <Modal show={trx !== null} onClose={() => setTrx(null)}>
        <ModalHeader>{t('Edit comment')}</ModalHeader>
        <ModalBody>
          <TextInput
            as="textarea"
            labelVisible
            value={comment}
            onChange={setComment}
            rows="5"
            maxLength="200"
            noResize
          />
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleClickOk} color="primary">
            {t('OK')}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

interface WalletHistoryProps extends Props {
  walletType: WalletType;
}

export const WalletHistory: FC<WalletHistoryProps> = ({ type, general, walletType }) => {
  const isDeposit = type === 'deposits';

  const t = useT();

  return (
    <Box col spacing="2">
      <Box as="h4" margin="0">
        {isDeposit ? t('Deposit History') : t('Withdrawal History')}
      </Box>
      {walletType === 'p2p' && <P2PHistory type={type} general={general} />}
      {walletType === 'market' && <ExchangeHistory type={type} general={general} />}
    </Box>
  );
};
