import React from 'react';
import { useIntl } from 'react-intl';
import { MarketName } from 'src/components/MarketName/MarketName';
import { CurrencyTicker } from 'src/components/CurrencyTicker/CurrencyTicker';
import { MarketWithTicker } from '../../modules';
import { Box } from '../Box/Box';
import { AmountFormat } from '../AmountFormat/AmountFormat';

interface Props {
  currentBidUnit: string;
  currentBidUnitsList: string[];
  markets: MarketWithTicker[];
  redirectToTrading: (key: string) => void;
  setCurrentBidUnit: (key: string) => void;
}

export const TickerTable: React.FC<Props> = ({
  currentBidUnit,
  markets,
  setCurrentBidUnit,
  currentBidUnitsList,
  redirectToTrading,
}) => {
  const { formatMessage } = useIntl();

  const renderItem = (market: MarketWithTicker, index: number) => {
    return (
      <tr key={index} onClick={() => redirectToTrading(market.id)}>
        <td className="pg-ticker-table__col--fixed">
          {market && <MarketName name={market.name} />}
        </td>
        <td>
          <span>
            <AmountFormat money={market.last} />
          </span>
        </td>
        <td>
          <Box as="span" textColor={market.price_change_percent[0] === '-' ? 'ask' : 'bid'}>
            {market.price_change_percent}
          </Box>
        </td>
        <td>
          <span>
            <AmountFormat money={market.high} />
          </span>
        </td>
        <td>
          <span>
            <AmountFormat money={market.low} />
          </span>
        </td>
        <td>
          <span>
            <AmountFormat money={market.volume} />
          </span>
        </td>
      </tr>
    );
  };

  return (
    <div className="pg-ticker-table">
      <div className="pg-ticker-table__filter">
        <ul className="navigation" role="tablist">
          {currentBidUnitsList.map((item, i) => (
            <li
              key={i}
              className={`navigation__item ${
                item === currentBidUnit && 'navigation__item--active'
              }`}
              onClick={() => setCurrentBidUnit(item)}
            >
              <span className="navigation__item__link">
                {item ? (
                  <CurrencyTicker symbol={item} />
                ) : (
                  formatMessage({ id: 'page.body.marketsTable.filter.all' })
                )}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="pg-ticker-table__table-wrap">
        <table className="pg-ticker-table__table">
          <thead className="pg-ticker-table__head--fixed">
            <tr>
              <th scope="col" className="pg-ticker-table__col--fixed">
                {formatMessage({ id: 'page.body.marketsTable.header.pair' })}
              </th>
              <th scope="col">
                {formatMessage({ id: 'page.body.marketsTable.header.lastPrice' })}
              </th>
              <th scope="col">{formatMessage({ id: 'page.body.marketsTable.header.change' })}</th>
              <th scope="col">{formatMessage({ id: 'page.body.marketsTable.header.high' })}</th>
              <th scope="col">{formatMessage({ id: 'page.body.marketsTable.header.low' })}</th>
              <th scope="col">{formatMessage({ id: 'page.body.marketsTable.header.volume' })}</th>
            </tr>
          </thead>
          <tbody>
            {markets[0] ? (
              markets.map(renderItem)
            ) : (
              <tr>
                <td>
                  <span className="no-data">{formatMessage({ id: 'page.noDataToShow' })}</span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
