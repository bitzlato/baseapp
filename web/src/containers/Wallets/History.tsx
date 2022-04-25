import { FC, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { DepositStatus } from 'web/src/components/History/DepositStatus';
import { WithdrawStatus } from 'web/src/components/History/WithdrawStatus';
import { AmountFormat } from 'web/src/components/AmountFormat/AmountFormat';
import { createMoney } from 'web/src/helpers/money';
import { useT } from 'web/src/hooks/useT';
import { Blockchain } from 'web/src/modules/public/blockchains/types';
import { tradeUrl } from 'web/src/api/config';
import { DEFAULT_BLOCKCHAIN } from 'web/src/modules/public/blockchains/defaults';
import { alertPush, Deposit, Withdraw } from 'web/src/modules';
import { localeDate, sliceString, sortByDateDesc, truncateMiddle } from 'web/src/helpers';
import { History } from 'web/src/components';
import { useFetch } from 'web/src/hooks/data/useFetch';
import { Tab, TabList, TabPanel, Tabs } from 'web/src/components/Tabs';
import { Box } from 'web/src/components/Box/Box';
import { Button } from 'web/src/components/ui/Button';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'web/src/components/ui/Modal';
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
import { P2PTransaction } from 'web/src/modules/p2p/types';
import { alertFetchError } from 'web/src/helpers/alertFetchError';

import { WalletItemData } from 'web/src/components/WalletItem/WalletItem';
import s from './TransferHistory.postcss';

const LIMIT = 6;

export const ExchangeHistory: FC<Props> = ({ type, general }) => {
  const ccy = general.balanceTotal.currency;

  const [page, setPage] = useState(0);

  const t = useT();

  const { data: blockchains = [] } = useFetch<Blockchain[]>(`${tradeUrl()}/public/blockchains`);

  const resp = useFetchHistory(type, {
    currency: ccy.code.toLowerCase(),
    limit: LIMIT,
    page,
  });

  const data = resp.data?.data ?? [];
  const total = resp.data?.total ?? 0;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const headers = useMemo(() => [t('Date'), t('Status'), t('Amount')], []);

  const tableData = data
    .sort((a, b) => sortByDateDesc(a.created_at, b.created_at))
    .map((d) => {
      const blockchain = blockchains.find((b) => b.id === d.blockchain_id) ?? DEFAULT_BLOCKCHAIN;
      return [
        <div title={`${d.id} - ${d.state}`}>{localeDate(d.created_at, 'fullDate')}</div>,
        type === 'deposits' ? (
          <DepositStatus item={d as Deposit} minConfirmations={blockchain.min_confirmations} />
        ) : (
          <WithdrawStatus item={d as Withdraw} minConfirmations={blockchain.min_confirmations} />
        ),
        <AmountFormat key={d.id} money={createMoney(d.amount, ccy)} />,
      ];
    });

  return (
    <>
      <History headers={headers} data={tableData} tableClassName={s.transferHistory} />
      <Pagination limit={LIMIT} total={total} onChange={setPage} />
    </>
  );
};

const P2PHistory: FC<Props> = ({ type, general }) => {
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
    type: type === 'deposits' ? 'load' : 'withdrawal',
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
        alertFetchError(dispatch, error);
      }
    }
    setTrx(null);
  };

  const headers = useMemo(() => ['', t('Date'), t('Address'), t('Amount'), t('Comment')], [t]);

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
    <ExternalLink href={d.viewUrl}>{truncateMiddle(d.address, 20)}</ExternalLink>,
    <MoneyFormat money={createMoney(d.cryptocurrency.amount, ccy)} />,
    d.comment ? sliceString(d.comment, 30) : <None />,
  ]);

  return (
    <>
      <History headers={headers} data={tableRows} tableClassName={s.p2PTransferHistory} />
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

interface Props {
  type: 'deposits' | 'withdraws';
  general: WalletItemData;
}

export const WalletHistory: FC<Props> = ({ type, general }) => {
  const isDeposit = type === 'deposits';
  const hasP2P = !!general.balanceP2P;
  const hasExchange = !!general.balanceMarket;

  const [tab, setTab] = useState(hasP2P ? 'p2p' : 'exchange');

  const validTab = useMemo(() => {
    const tabs = [
      { value: 'p2p', enable: hasP2P },
      { value: 'exchange', enable: hasExchange },
    ].filter((d) => d.enable);
    return (tabs.find((d) => d.value === tab) ?? tabs[0])!.value;
  }, [hasP2P, hasExchange, tab]);

  const t = useT();

  return (
    <Box col spacing="2">
      <Tabs value={validTab} onSelectionChange={setTab}>
        <Box row gap="2" wrap>
          <Box as="h4" margin="0">
            {isDeposit ? t('Deposit History') : t('Withdrawal History')}
          </Box>
          <TabList>
            <Tab value="p2p" disabled={!hasP2P}>
              {t('P2P')}
            </Tab>
            <Tab value="exchange" disabled={!hasExchange}>
              {t('Exchange')}
            </Tab>
          </TabList>
        </Box>
        <TabPanel value="p2p">
          <P2PHistory type={type} general={general} />
        </TabPanel>
        <TabPanel value="exchange">
          <ExchangeHistory type={type} general={general} />
        </TabPanel>
      </Tabs>
    </Box>
  );
};
