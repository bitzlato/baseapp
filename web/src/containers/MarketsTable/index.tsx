import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createMoneyWithoutCcy } from 'src/helpers/money';
import { TickerTable } from '../../components';
import { useMarketsFetch, useMarketsTickersFetch, useRangerConnectFetch } from '../../hooks';
import {
  Market,
  selectMarkets,
  selectMarketTickers,
  setCurrentMarket,
  selectUserInfo,
} from '../../modules';

const defaultTicker = {
  amount: '0.0',
  last: '0.0',
  high: '0.0',
  open: '0.0',
  low: '0.0',
  price_change_percent: '+0.00%',
  volume: '0.0',
};

interface Props {
  handleChangeCurrentMarket?: (market: Market) => void;
  markets: readonly Market[];
}

const MarketsTableComponent: FC<Props> = (props) => {
  useMarketsFetch();
  useMarketsTickersFetch();
  useRangerConnectFetch();
  const history = useHistory();
  const dispatch = useDispatch();
  const markets = useSelector(selectMarkets);
  const marketTickers = useSelector(selectMarketTickers);
  const userData = useSelector(selectUserInfo);
  const [currentBidUnit, setCurrentBidUnit] = React.useState('');

  const handleRedirectToTrading = (id: string) => {
    const currentMarket: Market | undefined = markets.find((item) => item.id === id);

    if (currentMarket) {
      props.handleChangeCurrentMarket && props.handleChangeCurrentMarket(currentMarket);
      dispatch(setCurrentMarket(currentMarket));
      history.push(`/trading/${currentMarket.id}`);
    }
  };

  const formatFilteredMarkets = (list: string[], market: Market) => {
    if (
      market.state &&
      market.state === 'hidden' &&
      userData.role !== 'admin' &&
      userData.role !== 'superadmin'
    ) {
      return list;
    }

    if (!list.includes(market.base_unit)) {
      list.push(market.base_unit);
    }

    if (!list.includes(market.quote_unit)) {
      list.push(market.quote_unit);
    }

    return list;
  };

  let currentBidUnitsList: string[] = [''];

  if (markets.length > 0) {
    currentBidUnitsList = markets.reduce(formatFilteredMarkets, currentBidUnitsList);
  }

  let currentBidUnitMarkets = props.markets || markets;

  if (currentBidUnit) {
    currentBidUnitMarkets = currentBidUnitMarkets.length
      ? currentBidUnitMarkets.filter(
          (market) => market.quote_unit === currentBidUnit || market.base_unit === currentBidUnit,
        )
      : [];
  }

  const formattedMarkets = currentBidUnitMarkets.length
    ? currentBidUnitMarkets
        .map((market) => ({
          ...market,
          last: createMoneyWithoutCcy(
            Number((marketTickers[market.id] || defaultTicker).last),
            market.amount_precision,
          ).toFormat(),
          open: createMoneyWithoutCcy(
            Number((marketTickers[market.id] || defaultTicker).open),
            market.price_precision,
          ).toFormat(),
          price_change_percent: String(
            (marketTickers[market.id] || defaultTicker).price_change_percent,
          ),
          high: createMoneyWithoutCcy(
            Number((marketTickers[market.id] || defaultTicker).high),
            market.amount_precision,
          ).toFormat(),
          low: createMoneyWithoutCcy(
            Number((marketTickers[market.id] || defaultTicker).low),
            market.amount_precision,
          ).toFormat(),
          volume: createMoneyWithoutCcy(
            Number((marketTickers[market.id] || defaultTicker).volume),
            market.amount_precision,
          ).toFormat(),
        }))
        .map((market) => ({
          ...market,
          change: createMoneyWithoutCcy(
            (+market.last - +market.open).toFixed(market.price_precision),
            market.price_precision,
          ).toFormat(),
        }))
    : [];

  const filteredMarkets = formattedMarkets.filter(
    (market) =>
      !(
        market.state &&
        market.state === 'hidden' &&
        userData.role !== 'admin' &&
        userData.role !== 'superadmin'
      ),
  );

  return (
    <TickerTable
      currentBidUnit={currentBidUnit}
      currentBidUnitsList={currentBidUnitsList}
      markets={filteredMarkets}
      redirectToTrading={handleRedirectToTrading}
      setCurrentBidUnit={setCurrentBidUnit}
    />
  );
};

export const MarketsTable = React.memo(MarketsTableComponent);
