import React, { useCallback, useMemo, useState } from 'react';
import { Form, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Currency } from '@bitzlato/money-js';
import cn from 'classnames';

import { useOpenOrdersFetch } from 'src/hooks';
import { useT } from 'src/hooks/useT';
import { CloseIcon } from '../../assets/images/CloseIcon';
import { Table } from '../../components';
import { localeDate } from '../../helpers';
import {
  openOrdersCancelFetch,
  ordersCancelAllFetch,
  selectCurrentMarket,
  selectMarkets,
  selectOpenOrdersFetching,
  selectOpenOrdersList,
  selectUserLoggedIn,
} from '../../modules';
import { OrderCommon } from '../../modules/types';
import { getTriggerSign } from './helpers';
import { MarketName } from 'src/components/MarketName/MarketName';
import { Box } from 'src/components/Box';
import { Label } from 'src/components/Label';
import { AmountFormat } from 'src/components/AmountFormat/AmountFormat';
import { MoneyFormat } from 'src/components/MoneyFormat/MoneyFormat';
import { createMoney } from 'src/helpers/money';
import { getActualPrice } from 'src/modules/helpers';

export const OpenOrdersComponent: React.FC = () => {
  const [hideOtherPairs, setHideOtherPairs] = useState(true);
  const dispatch = useDispatch();
  const currentMarket = useSelector(selectCurrentMarket);
  const list = useSelector(selectOpenOrdersList);
  const loading = useSelector(selectOpenOrdersFetching);
  const markets = useSelector(selectMarkets);
  const userLoggedIn = useSelector(selectUserLoggedIn);
  const t = useT();

  useOpenOrdersFetch(currentMarket, hideOtherPairs);

  const headers = useMemo(
    () => [
      t('page.body.trade.header.openOrders.content.date'),
      t('page.body.trade.header.openOrders.content.market'),
      t('page.body.trade.header.openOrders.content.side'),
      t('page.body.trade.header.openOrders.content.type'),
      t('page.body.trade.header.openOrders.content.price'),
      t('page.body.trade.header.openOrders.content.amount'),
      t('page.body.trade.header.openOrders.content.total'),
      t('page.body.trade.header.openOrders.content.trigger'),
      t('page.body.trade.header.openOrders.content.filled'),
      '',
    ],
    [],
  );

  const renderData = useCallback(
    (data: OrderCommon[]) => {
      if (!data.length) {
        return [
          [[''], [''], [''], [''], <Label color="secondary">{t('page.noDataToShow')}</Label>, ['']],
        ];
      }

      return data.map((item: OrderCommon) => {
        const {
          created_at,
          remaining_volume,
          origin_volume,
          side,
          ord_type,
          market,
          trigger_price,
        } = item;
        const executedVolume = Number(origin_volume) - Number(remaining_volume);
        const filled = createMoney(
          ((executedVolume / Number(origin_volume)) * 100).toFixed(2),
          FILLED_CURRENCY,
        );
        const curMarket = markets.find((i) => i.id === market);
        const priceCurrency = getCurrency('', curMarket?.price_precision || 0);
        const amountCurrency = getCurrency(
          curMarket?.quote_unit ?? '',
          curMarket?.amount_precision || 0,
        );
        const color = side === 'buy' ? 'bid' : 'ask';
        const actualPrice = getActualPrice(item);
        const total = createMoney(origin_volume, amountCurrency).multiply(actualPrice);

        return [
          <Box col textSize="sm">
            <Label color="secondary">{localeDate(created_at, 'date')}</Label>
            <span>{localeDate(created_at, 'time')}</span>
          </Box>,
          <span className="bold">{curMarket?.name && <MarketName name={curMarket?.name} />}</span>,
          <Label color={color}>
            {t(`page.body.trade.header.openOrders.content.side.${side}`)}
          </Label>,
          <span>
            {ord_type ? t(`page.body.trade.header.openOrders.content.type.${ord_type}`) : '-'}
          </span>,
          <Label color={color}>
            <AmountFormat money={createMoney(actualPrice, priceCurrency)} />
          </Label>,
          <AmountFormat money={createMoney(origin_volume, amountCurrency)} />,
          <MoneyFormat money={total} />,
          <span>
            {trigger_price ? (
              <React.Fragment>
                <span>{t('page.body.trade.header.openOrders.lastPrice')}</span>
                &nbsp;
                {getTriggerSign(ord_type ?? '', side)}&nbsp;
                <Label color={color}>
                  <AmountFormat money={createMoney(trigger_price, priceCurrency)} />
                </Label>
              </React.Fragment>
            ) : (
              '-'
            )}
          </span>,
          <Label color={color}>
            <AmountFormat money={filled} />%
          </Label>,
          <CloseIcon className="close" onClick={() => handleCancel(item)} />,
        ];
      });
    },
    [markets],
  );

  const handleCancel = (order: OrderCommon) => {
    dispatch(
      openOrdersCancelFetch({
        order,
        list,
      }),
    );
  };

  const handleCancelAll = () => {
    currentMarket && dispatch(ordersCancelAllFetch({ market: currentMarket.id }));
  };

  const classNames = cn('pg-open-orders', {
    'pg-open-orders--empty': !list.length,
    'pg-open-orders--loading': loading,
  });

  const handleToggleCheckbox = (event: React.MouseEvent<HTMLFormElement>) => {
    event.preventDefault();
    setHideOtherPairs(!hideOtherPairs);
  };

  return (
    <div className={classNames}>
      <div className="cr-table-header__content">
        <Box grow>
          <Box col spacing="sm">
            <span>{t('page.body.trade.header.openOrders')}</span>
            <Form className="cr-title-component__checkbox" onClick={handleToggleCheckbox}>
              <Form.Check
                type="checkbox"
                custom
                id="hideOtherPairs"
                checked={hideOtherPairs}
                readOnly={true}
                label={t('page.body.trade.header.openOrders.hideOtherPairs')}
              />
            </Form>
          </Box>
        </Box>
        <Box row spacing>
          {userLoggedIn && (
            <>
              <Box
                row
                spacing
                as="button"
                className="cr-percentage-button"
                disabled={!userLoggedIn}
                onClick={handleCancelAll}
              >
                <CloseIcon />
                <span>{t('page.body.openOrders.header.button.cancelAll')}</span>
              </Box>
            </>
          )}
        </Box>
      </div>
      {loading ? (
        <div className="open-order-loading">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <div className="cr-open-orders">
          <Table header={headers} data={renderData(list)} />
        </div>
      )}
    </div>
  );
};

function getCurrency(code: Currency['code'], minorUnit: Currency['minorUnit']) {
  return {
    code,
    minorUnit,
  };
}

const FILLED_CURRENCY = getCurrency('', 2);
