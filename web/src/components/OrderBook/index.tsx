import * as React from 'react';
import { CellData, Table } from '../Table';

export interface OrderBookProps {
  /**
   * Data which is used to render Table.
   */
  data: CellData[][];
  /**
   * Max value of volume which is used to calculate width of background row
   */
  maxVolume?: number | undefined;
  /**
   * Data which is used to calculate width of each background row
   */
  orderBookEntry?: number[] | undefined;
  /**
   * Defines a position of background row
   */
  side?: 'left' | 'right';
  /**
   * Renders table header
   */
  headers?: React.ReactNode[] | undefined;
  /**
   * Renders table title
   */
  title?: React.ReactNode | undefined;
  /**
   * Sets row background color
   */
  rowBackgroundColor?: string | undefined;
  /**
   * Callback that is called when a market is selected
   */
  onSelect: (orderIndex: string) => void;
}

export const mapValues = (maxVolume?: number, data?: number[]) => {
  const resultData =
    data && maxVolume && data.length
      ? data.map((currentVolume) => {
          // tslint:disable-next-line:no-magic-numbers
          return { value: (currentVolume / maxVolume) * 100 };
        })
      : [];

  return resultData;
};

export class OrderBook extends React.PureComponent<OrderBookProps> {
  public render() {
    const { data, maxVolume, orderBookEntry, side, headers, title, rowBackgroundColor, onSelect } =
      this.props;
    const resultData = mapValues(maxVolume, orderBookEntry);

    const getRowWidth = (index: number) => {
      if (resultData && resultData.length) {
        return {
          width: `${resultData[index]?.value}%`,
        };
      }

      return {
        display: 'none',
      };
    };

    return (
      <div className="cr-order-book">
        <Table
          rowBackground={getRowWidth}
          data={data}
          side={side}
          header={headers}
          rowBackgroundColor={rowBackgroundColor}
          titleComponent={title}
          onSelect={onSelect}
        />
      </div>
    );
  }
}
