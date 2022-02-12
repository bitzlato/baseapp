import { FC, memo, useState } from 'react';
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
  MarketWithTicker,
  Ticker,
} from '../../modules';

const defaultTicker: Ticker = {
  amount: '0.0',
  last: '0.0',
  high: '0.0',
  open: '0.0',
  low: '0.0',
  price_change_percent: '+0.00%',
  volume: '0.0',
  avg_price: '0.0',
};

interface Props {
  handleChangeCurrentMarket?: ((market: Market) => void) | undefined;
  markets?: readonly Market[] | undefined;
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
  const [currentBidUnit, setCurrentBidUnit] = useState('');

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

  const formattedMarkets: MarketWithTicker[] = currentBidUnitMarkets
    .filter(
      (market) =>
        !(
          market.state &&
          market.state === 'hidden' &&
          userData.role !== 'admin' &&
          userData.role !== 'superadmin'
        ),
    )
    .map<MarketWithTicker>((market) => {
      const ticker = marketTickers[market.id] ?? defaultTicker;
      return {
        id: market.id,
        name: market.name,
        last: createMoneyWithoutCcy(ticker.last, market.amount_precision),
        open: createMoneyWithoutCcy(ticker.open, market.price_precision),
        price_change_percent: ticker.price_change_percent,
        high: createMoneyWithoutCcy(ticker.high, market.amount_precision),
        low: createMoneyWithoutCcy(ticker.low, market.amount_precision),
        volume: createMoneyWithoutCcy(ticker.volume, market.amount_precision),
      };
    });

  return (
    <TickerTable
      currentBidUnit={currentBidUnit}
      currentBidUnitsList={currentBidUnitsList}
      markets={formattedMarkets}
      redirectToTrading={handleRedirectToTrading}
      setCurrentBidUnit={setCurrentBidUnit}
    />
  );
};

export const MarketsTable = memo(MarketsTableComponent);
