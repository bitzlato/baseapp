import * as React from 'react';
import { useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { MarketDepths } from '../../components/MarketDepths';
import {
  selectCurrentColorTheme,
  selectCurrentMarket,
  selectDepthAsks,
  selectDepthBids,
  selectOrderBookLoading,
} from '../../modules';
import { createMoneyWithoutCcy } from 'src/helpers/money';

export const MarketDepthsComponent = () => {
  const asksItems = useSelector(selectDepthAsks);
  const bidsItems = useSelector(selectDepthBids);
  const colorTheme = useSelector(selectCurrentColorTheme);
  const currentMarket = useSelector(selectCurrentMarket)!;
  const loading = useSelector(selectOrderBookLoading);

  const settings = React.useMemo(() => {
    return {
      tooltip: true,
      dataKeyX: 'price',
      dataKeyY: 'cumulativeVolume',
    };
  }, []);

  const tipLayout = React.useCallback(
    ({ volume, price, cumulativeVolume, cumulativePrice }) => {
      const [askCurrency, bidCurrency] = [
        currentMarket.base_unit.toUpperCase(),
        currentMarket.quote_unit.toUpperCase(),
      ];

      return (
        <span className="pg-market-depth__tooltip">
          <span>
            <FormattedMessage id="page.body.trade.header.marketDepths.content.price" /> :{' '}
            {createMoneyWithoutCcy(price, currentMarket.price_precision).toFormat()} {bidCurrency}
          </span>
          <span>
            <FormattedMessage id="page.body.trade.header.marketDepths.content.volume" /> :{' '}
            {createMoneyWithoutCcy(volume, currentMarket.amount_precision).toFormat()} {askCurrency}
          </span>
          <span>
            <FormattedMessage id="page.body.trade.header.marketDepths.content.cumulativeVolume" /> :{' '}
            {createMoneyWithoutCcy(cumulativeVolume, currentMarket.amount_precision).toFormat()}{' '}
            {askCurrency}
          </span>
          <span>
            <FormattedMessage id="page.body.trade.header.marketDepths.content.cumulativeValue" /> :{' '}
            {createMoneyWithoutCcy(cumulativePrice, currentMarket.price_precision).toFormat()}{' '}
            {bidCurrency}
          </span>
        </span>
      );
    },
    [currentMarket],
  );

  const cumulative = React.useCallback(
    (data, type) => {
      let cumulativeVolumeData = 0;
      let cumulativePriceData = 0;

      return data.map((item: any) => {
        const [price, volume] = item;

        const numberVolume = createMoneyWithoutCcy(
          volume,
          currentMarket.amount_precision,
        ).toString();
        const numberPrice = createMoneyWithoutCcy(price, currentMarket.price_precision).toString();

        cumulativeVolumeData = +numberVolume + cumulativeVolumeData;
        const cumulativeVolumeDataFormated = createMoneyWithoutCcy(
          cumulativeVolumeData,
          currentMarket.amount_precision,
        ).toFormat();

        cumulativePriceData = cumulativePriceData + +numberPrice * +numberVolume;
        const cumulativePriceDataFormated = createMoneyWithoutCcy(
          cumulativePriceData,
          currentMarket.price_precision,
        ).toFormat();

        const volumeFormated = createMoneyWithoutCcy(
          +volume,
          currentMarket.amount_precision,
        ).toFormat();
        const priceFormated = createMoneyWithoutCcy(
          +numberPrice,
          currentMarket.price_precision,
        ).toFormat();

        return {
          [type]: cumulativeVolumeDataFormated,
          cumulativePrice: cumulativePriceDataFormated,
          cumulativeVolume: +cumulativeVolumeDataFormated,
          volume: volumeFormated,
          price: priceFormated,
          name: tipLayout({
            volume,
            price,
            cumulativeVolume: cumulativeVolumeData,
            cumulativePrice: cumulativePriceData,
          }),
        };
      });
    },
    [currentMarket],
  );

  const convertToCumulative = React.useCallback((data, type) => {
    const cumulativeData = cumulative(data, type);

    return type === 'bid'
      ? cumulativeData.sort((a: any, b: any) => b.bid - a.bid)
      : cumulativeData.sort((a: any, b: any) => a.ask - b.ask);
  }, []);

  const convertToDepthFormat = React.useMemo(() => {
    const resultLength = asksItems.length > bidsItems.length ? bidsItems.length : asksItems.length;

    const asks = asksItems.slice(0, resultLength);
    const bids = bidsItems.slice(0, resultLength);

    const asksVolume = convertToCumulative(asks, 'ask');
    const bidsVolume = convertToCumulative(bids, 'bid');

    return [...bidsVolume, ...asksVolume];
  }, [asksItems, bidsItems]);

  const renderMarketDepths = React.useMemo(() => {
    return (
      <MarketDepths
        settings={settings}
        className="pg-market-depth"
        data={convertToDepthFormat}
        colorTheme={colorTheme}
      />
    );
  }, [settings, colorTheme, asksItems, bidsItems]);

  if (loading) {
    return null;
  }

  return <div className="cr-market-depth">{renderMarketDepths}</div>;
};
