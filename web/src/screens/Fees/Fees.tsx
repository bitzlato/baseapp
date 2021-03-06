import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useT } from 'src/hooks/useT';
import { CellData, Table } from 'src/components';
import { currenciesFetch } from 'src/modules/public/currencies/actions';
import { selectCurrencies } from 'src/modules/public/currencies/selectors';
import { selectMobileDeviceState } from 'src/modules/public/globalSettings/selectors';
import { CryptoCurrencyIcon } from 'web/src/components/ui/CryptoCurrencyIcon';
import { AmountFormat } from 'src/components/AmountFormat/AmountFormat';
import { Box } from 'src/components/Box';
import { Card } from 'src/components/Card/Card';
import { TradingFees } from 'src/containers/Fees/TradingFees';
import { TradingFee } from 'src/modules/public/tradingFees/types';
import { setDocumentTitle } from '../../helpers';
import s from './Fees.postcss';
import { Container } from 'web/src/components/ui/Container';
import { tradeUrl } from 'web/src/api/config';
import { CurrencyTicker } from 'web/src/components/CurrencyTicker/CurrencyTicker';
import { useFetch } from 'web/src/hooks/data/useFetch';
import { useFetchBlockchains } from 'web/src/hooks/data/belomor/useFetchBlockchains';

export const FeesScreen: React.FC = () => {
  const t = useT();
  const dispatch = useDispatch();
  const isMobile = useSelector(selectMobileDeviceState);

  const isDesktop = !isMobile ? true : undefined;

  useEffect(() => {
    setDocumentTitle(t('page.body.landing.footer.fees'));
    dispatch(currenciesFetch());
  }, [dispatch]);

  const currencies = useSelector(selectCurrencies);

  const { data = [] } = useFetch<TradingFee[]>(`${tradeUrl()}/public/trading_fees`);

  const { data: blockchains = [] } = useFetchBlockchains();

  const header = [
    t('page.fees.table.coin'),
    isDesktop && t('page.fees.table.name'),
    t('page.fees.table.network'),
    t('page.fees.table.deposit_fee'),
    t('page.fees.table.min_deposit'),
    t('page.fees.table.withdraw_fee'),
    t('page.fees.table.min_withdraw'),
  ];

  const tableData: CellData[][] = [];

  for (let c of currencies) {
    for (let bc of c.blockchain_currencies) {
      const ccy = c.id.toUpperCase();
      const [token, network] = ccy.split('-');
      const blockchain = blockchains.find((d) => d.key === bc.blockchain_key);
      tableData.push([
        isDesktop ? (
          <Box row spacing>
            <CryptoCurrencyIcon currency={c.id} size="6x" />
            <span>{token}</span>
          </Box>
        ) : network ? (
          <CurrencyTicker symbol={ccy} />
        ) : (
          <span>{token}</span>
        ),
        isDesktop && c.name,
        blockchain?.name ?? network ?? token,
        c.deposit_fee.isZero() ? (
          t('page.body.wallets.tabs.deposit.ccy.message.fee.free')
        ) : (
          <AmountFormat money={c.deposit_fee} />
        ),
        <AmountFormat money={bc.min_deposit_amount} />,
        <AmountFormat money={bc.withdraw_fee} />,
        <AmountFormat money={c.min_withdraw_amount} />,
      ]);
    }
  }

  if (isMobile) {
    return (
      <Box col spacing="sm">
        <Box bgColor="body" padding="2X3">
          <TradingFees tradingFees={data} />
        </Box>
        <Box bgColor="body" padding="2X3">
          <Box col spacing="2">
            <Box textColor="primary" as="h4">
              {t('page.fees.table.header')}
            </Box>
            <Table tableClassName={s.feesTable} header={header} data={tableData} />
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" my="6x">
      <Card header={<h3>{t('page.body.landing.footer.fees')}</h3>}>
        <Box col spacing="4">
          <TradingFees tradingFees={data} />
          <Box textColor="primary" as="h4">
            {t('page.fees.table.header')}
          </Box>
          <Table tableClassName={s.feesTable} header={header} data={tableData} />
        </Box>
      </Card>
    </Container>
  );
};
