import cn from 'classnames';
import React, { useCallback, useMemo, useState } from 'react';
import { Form, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useOpenOrdersFetch } from 'src/hooks';
import { CloseIcon } from '../../assets/images/CloseIcon';
import { Decimal, OpenOrders } from '../../components';
import { localeDate, setTradeColor } from '../../helpers';
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
import { CurrencyTicker } from 'src/components/CurrencyTicker/CurrencyTicker';
import { MarketName } from 'src/components/MarketName/MarketName';
import { Box } from 'src/components/Box';
import { Label } from 'src/components/Label';
import { useT } from 'src/hooks/useT';

export const OpenOrdersComponent: React.FC = () => {
  const [hideOtherPairs, setHideOtherPairs] = useState<boolean>(true);
  const dispatch = useDispatch();
  const currentMarket = useSelector(selectCurrentMarket);
  const list = useSelector(selectOpenOrdersList);
  const loading = useSelector(selectOpenOrdersFetching);
  const markets = useSelector(selectMarkets);
  const userLoggedIn = useSelector(selectUserLoggedIn);
  const t = useT();

  useOpenOrdersFetch(currentMarket, hideOtherPairs);

  const headersKeys = useMemo(
    () => ['Date', 'Market', 'Type', 'Price', 'Amount', 'Total', 'Trigger', 'Filled', ''],
    [],
  );

  const renderHeaders = useMemo(
    () => [
      t('page.body.trade.header.openOrders.content.date'),
      t('page.body.trade.header.openOrders.content.market'),
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
        return [[[''], [''], [''], <Label secondaryColor>{t('page.noDataToShow')}</Label>, ['']]];
      }

      return data.map((item: OrderCommon) => {
        const {
          id,
          price,
          created_at,
          remaining_volume,
          origin_volume,
          side,
          ord_type,
          market,
          trigger_price,
        } = item;
        const executedVolume = Number(origin_volume) - Number(remaining_volume);
        const filled = ((executedVolume / Number(origin_volume)) * 100).toFixed(2);
        const curMarket = markets.find((i) => i.id === market);
        const priceFixed = curMarket?.price_precision || 0;
        const amountFixed = curMarket?.amount_precision || 0;

        return [
          <span key={id} className="split-lines">
            <span className="secondary">{localeDate(created_at, 'date')}</span>&nbsp;
            <span>{localeDate(created_at, 'time')}</span>
          </span>,
          <span key={id} className="bold">
            {curMarket?.name && <MarketName name={curMarket?.name} />}
          </span>,
          <span key={id}>
            {ord_type ? t(`page.body.trade.header.openOrders.content.type.${ord_type}`) : '-'}
          </span>,
          <span style={{ color: setTradeColor(side).color }} key={id}>
            <Decimal fixed={priceFixed} thousSep=",">
              {price}
            </Decimal>
          </span>,
          <span key={id}>
            <Decimal fixed={amountFixed} thousSep=",">
              {+remaining_volume}
            </Decimal>
          </span>,
          <span key={id}>
            <Decimal fixed={amountFixed} thousSep=",">
              {+remaining_volume * +price}
            </Decimal>{' '}
            <span className="cr-text__opacity">
              {curMarket?.quote_unit && <CurrencyTicker symbol={curMarket?.quote_unit} />}
            </span>
          </span>,
          <span key={id} className="split-lines">
            {trigger_price ? (
              <React.Fragment>
                <span>{t('page.body.trade.header.openOrders.lastPrice')}</span>&nbsp;
                {getTriggerSign(ord_type ?? '', side)}&nbsp;&nbsp;
                <span style={{ color: setTradeColor(side).color }}>
                  {Decimal.format(trigger_price, priceFixed, ',')}
                </span>
              </React.Fragment>
            ) : (
              '-'
            )}
          </span>,
          <span style={{ color: setTradeColor(side).color }} key={id}>
            <Decimal fixed={2} thousSep=",">
              {+filled}
            </Decimal>
            %
          </span>,
          side,
        ];
      });
    },
    [markets],
  );

  const handleCancel = (index: number) => {
    dispatch(
      openOrdersCancelFetch({
        order: list[index],
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

  const renderContent = useMemo(() => {
    if (loading) {
      return (
        <div className="open-order-loading">
          <Spinner animation="border" variant="primary" />
        </div>
      );
    }

    return (
      <OpenOrders
        headersKeys={headersKeys}
        headers={renderHeaders}
        data={renderData(list)}
        onCancel={handleCancel}
      />
    );
  }, [loading, list, markets]);

  return (
    <div className={classNames}>
      <div className="cr-table-header__content">
        <Box grow>
          {t('page.body.trade.header.openOrders')}
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
      {renderContent}
    </div>
  );
};
