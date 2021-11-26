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
import { AmountFormat } from 'src/components/AmountFormat/AmountFormat';
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
    t('page.fees.table.deposit_fee'),
    t('page.fees.table.min_deposit'),
    t('page.fees.table.withdraw_fee'),
    t('page.fees.table.min_withdraw'),
  ];

  const data = currencies.map((d) => {
    const [token, network] = d.id.toUpperCase().split('-');
    return [
      <Box row spacing>
        <CryptoCurrencyIcon currency={d.id} icon={d.icon_url} iconId={d.icon_id} size="small" />
        <span>{token.toUpperCase()}</span>
      </Box>,
      d.name,
      network || token,
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

  return (
    <Box padding="2x" className="container">
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
