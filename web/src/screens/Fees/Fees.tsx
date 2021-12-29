import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useT } from 'src/hooks/useT';
import { setDocumentTitle } from '../../helpers';
import { Table } from 'src/components';
import { currenciesFetch } from 'src/modules/public/currencies/actions';
import { selectCurrencies } from 'src/modules/public/currencies/selectors';
import { CryptoCurrencyIcon } from 'src/components/CryptoCurrencyIcon/CryptoCurrencyIcon';
import { AmountFormat } from 'src/components/AmountFormat/AmountFormat';
import { Box } from 'src/components/Box';
import { Card } from 'src/components/Card/Card';
import { selectTradingFees, tradingFeesFetch } from 'src/modules/public/tradingFees';
import { createCcy, createMoney } from 'src/helpers/money';
import s from './Fees.postcss';

export const Fees: React.FC = () => {
  const t = useT();
  const dispatch = useDispatch();

  useEffect(() => {
    setDocumentTitle(t('page.body.landing.footer.fees'));
    dispatch(currenciesFetch());
    dispatch(tradingFeesFetch());
  }, [dispatch]);

  const currencies = useSelector(selectCurrencies);
  const tradingFees = useSelector(selectTradingFees);
  const anyGroup = tradingFees.find((d) => d.group === 'any');

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
    <Box padding="2" className="container">
      <Card header={<h3>{t('page.body.landing.footer.fees')}</h3>}>
        <Box col spacing="4">
          <Box col spacing="2">
            <Box textColor="primary" as="h4">
              {t('page.fees.trading')}
            </Box>
            <Box row textSize="lg" justify="center">
              <Box row spacing="3">
                <Box row justify="center" className={s.feesRect}>
                  <AmountFormat
                    money={createMoney(anyGroup?.taker ?? 0, CCY).multiply(100)}
                    minFractionDigits={1}
                  />
                  &nbsp;%
                </Box>
                <Box textSize="lg" textColor="primary" as="span">
                  {t('page.fees.taker')}
                </Box>
              </Box>
              <Box className={s.feesMaker} row spacing="3">
                <Box row justify="center" className={s.feesRect}>
                  <AmountFormat
                    money={createMoney(anyGroup?.maker ?? 0, CCY).multiply(100)}
                    minFractionDigits={1}
                  />
                  &nbsp;%
                </Box>
                <Box textSize="lg" textColor="primary" as="span">
                  {t('page.fees.maker')}
                </Box>
              </Box>
            </Box>
          </Box>
          <Box col spacing="2">
            <Box textColor="primary" as="h4">
              {t('page.fees.table.header')}
            </Box>
            <Table tableClassName={s.feesTable} header={header} data={data} />
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

const CCY = createCcy('', 2);
