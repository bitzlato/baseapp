import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import { useT } from 'src/hooks/useT';
import { setDocumentTitle } from '../../helpers';
import s from './Fees.postcss';
import { Table } from 'src/components';
import { currenciesFetch } from 'src/modules/public/currencies/actions';
import { selectCurrencies } from 'src/modules/public/currencies/selectors';
import { CryptoCurrencyIcon } from 'src/components/CryptoCurrencyIcon/CryptoCurrencyIcon';
import { ccy, money, MoneyFormat } from 'src/components/MoneyFormat/MoneyFormat';
import { Box } from 'src/components/Box';

export const Fees: React.FC = () => {
  const t = useT();
  const dispatch = useDispatch();

  useEffect(() => {
    setDocumentTitle(t('page.body.landing.footer.fees'));
    dispatch(currenciesFetch());
  }, [dispatch]);

  const currencies = useSelector(selectCurrencies);

  const header = [
    t('page.fees.table.coin'),
    t('page.fees.table.name'),
    t('page.fees.table.network'),
    t('page.body.wallets.tabs.deposit.ccy.message.fee'),
    t('page.fees.table.min_deposit'),
    t('page.body.wallets.tabs.withdraw.content.fee'),
    t('page.fees.table.min_withdraw'),
  ];

  const data = currencies.map((d) => {
    const [token, network] = d.id.toUpperCase().split('-');
    const mccy = ccy(d.id, d.precision);
    return [
      <Box row spacing>
        <CryptoCurrencyIcon currency={d.id} icon={d.icon_url} iconId={d.icon_id} size="small" />
        <span>{token.toUpperCase()}</span>
      </Box>,
      d.name,
      network || token,
      Number(d.deposit_fee) == 0 ? (
        t('page.body.wallets.tabs.deposit.ccy.message.fee.free')
      ) : (
        <MoneyFormat money={money(d.deposit_fee, mccy)} />
      ),
      <MoneyFormat money={money(d.min_deposit_amount, mccy)} />,
      <MoneyFormat money={money(d.withdraw_fee, mccy)} />,
      <MoneyFormat money={money(d.min_withdraw_amount, mccy)} />,
    ];
  });

  return (
    <Box padding='2x' className='container'>
      <div className={s.card}>
        <div className={cn('cr-table-header__content', s.feesHeader)}>
          <h3>{t('page.body.landing.footer.fees')}</h3>
        </div>
        <div className={s.feesTable}>
          <Table header={header} data={data} />
        </div>
      </div>
    </Box>
  );
};
