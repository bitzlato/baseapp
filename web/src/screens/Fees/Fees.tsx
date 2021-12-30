import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useT } from 'src/hooks/useT';
import { setDocumentTitle } from '../../helpers';
import { Table } from 'src/components';
import { currenciesFetch } from 'src/modules/public/currencies/actions';
import { selectCurrencies } from 'src/modules/public/currencies/selectors';
import { selectMobileDeviceState } from 'src/modules/public/globalSettings/selectors';
import { selectTradingFees } from 'src/modules/public/tradingFees/selectors';
import { tradingFeesFetch } from 'src/modules/public/tradingFees/actions';
import { CryptoCurrencyIcon } from 'src/components/CryptoCurrencyIcon/CryptoCurrencyIcon';
import { AmountFormat } from 'src/components/AmountFormat/AmountFormat';
import { Box } from 'src/components/Box';
import { Card } from 'src/components/Card/Card';
import { TradingFees } from 'src/containers/Fees/TradingFees';
import { Subheader } from 'src/mobile/components/Subheader';
import { CurrencyTicker } from 'src/components/CurrencyTicker/CurrencyTicker';
import s from './Fees.postcss';

export const FeesScreen: React.FC = () => {
  const t = useT();
  const dispatch = useDispatch();
  const isMobile = useSelector(selectMobileDeviceState);

  const isDesktop = !isMobile ? true : undefined;
  const history = useHistory();

  useEffect(() => {
    setDocumentTitle(t('page.body.landing.footer.fees'));
    dispatch(currenciesFetch());
    dispatch(tradingFeesFetch());
  }, [dispatch]);

  const currencies = useSelector(selectCurrencies);
  const tradingFees = useSelector(selectTradingFees);

  const header = [
    t('page.fees.table.coin'),
    isDesktop && t('page.fees.table.name'),
    isDesktop && t('page.fees.table.network'),
    t('page.fees.table.deposit_fee'),
    t('page.fees.table.min_deposit'),
    t('page.fees.table.withdraw_fee'),
    t('page.fees.table.min_withdraw'),
  ];

  const data = currencies.map((d) => {
    const ccy = d.id.toUpperCase();
    const [token, network] = ccy.split('-');
    return [
      isDesktop ? (
        <Box row spacing>
          <CryptoCurrencyIcon currency={d.id} icon={d.icon_url} iconId={d.icon_id} size="small" />
          <span>{token}</span>
        </Box>
      ) : (
        <CurrencyTicker symbol={ccy} />
      ),
      isDesktop && d.name,
      isDesktop && (network || token),
      d.deposit_fee.isZero() ? (
        t('page.body.wallets.tabs.deposit.ccy.message.fee.free')
      ) : (
        <AmountFormat money={d.deposit_fee} />
      ),
      <AmountFormat money={d.min_deposit_amount} />,
      <AmountFormat money={d.withdraw_fee} />,
      <AmountFormat money={d.min_withdraw_amount} />,
    ];
  });

  if (isMobile) {
    return (
      <>
        <Subheader
          title={t('page.mobile.profileLinks.history.fees')}
          backTitle={t('page.body.profile.header.account')}
          onGoBack={() => history.push('/profile')}
        />
        <Card>
          <TradingFees tradingFees={tradingFees} />
        </Card>
        <Card>
          <Box col spacing="2">
            <Box textColor="primary" as="h4">
              {t('page.fees.table.header')}
            </Box>
            <Table tableClassName={s.feesTable} header={header} data={data} />
          </Box>
        </Card>
      </>
    );
  }

  return (
    <Card size="lg" header={<h3>{t('page.body.landing.footer.fees')}</h3>}>
      <Box col spacing="4">
        <TradingFees tradingFees={tradingFees} />
        <Box textColor="primary" as="h4">
          {t('page.fees.table.header')}
        </Box>
        <Table tableClassName={s.feesTable} header={header} data={data} />
      </Box>
    </Card>
  );
};
