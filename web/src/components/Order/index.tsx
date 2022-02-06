import * as React from 'react';
import { createMoneyWithoutCcy } from 'src/helpers/money';
import { OrderForm } from '../';
import { TabPanel } from '../../components';
import { getAmount, getTotalPrice } from '../../helpers';
import { Box } from '../Box';
import { OrderFormProps } from '../OrderForm';

export type FormType = 'buy' | 'sell';
export type OrderType =
  | 'Limit'
  | 'Stop-loss'
  | 'Take-profit'
  | 'Stop-limit'
  | 'Take-limit'
  | 'Market';

export interface OrderProps {
  type: FormType;
  orderType: OrderType;
  price?: number | string;
  trigger?: number | string;
  amount: number | string;
  available: number;
}

export interface OrderComponentProps {
  /**
   * Amount of money in base currency wallet
   */
  availableBase: number;
  /**
   * Amount of money in quote currency wallet
   */
  availableQuote: number;
  /**
   * Callback which is called when a form is submitted
   */
  onSubmit: (order: OrderProps) => boolean;
  /**
   * If orderType is 'Market' this value will be used as price for buy tab
   */
  priceMarketBuy: number;
  /**
   * If orderType is 'Market' this value will be used as price for sell tab
   */
  priceMarketSell: number;
  /**
   * If orderType is 'Limit' this value will be used as price
   */
  priceLimit?: number | undefined;
  /**
   * If orderType is 'Stop-loss', 'Take-profit', 'Stop-limit', 'Take-limit' this value will be used as trigger price
   */
  trigger?: number | undefined;
  /**
   * Name of currency for price field
   */
  from: string;
  /**
   * Name of currency for amount field
   */
  to: string;
  /**
   * Whether order is disabled to execute
   */
  disabled?: boolean | undefined;
  handleSendType?: ((index: number, label: string) => void) | undefined;
  /**
   * Index of tab to switch on
   */
  /**
   * Precision of amount, total, available, fee value
   */
  currentMarketAskPrecision: number;
  /**
   * Precision of price value
   */
  currentMarketBidPrecision: number;
  minAmount: string;
  orderTypes: OrderType[];
  /**
   *
   */
  width?: number | undefined;
  /**
   * proposals for buy
   */
  bids: string[][];
  /**
   * proposals for sell
   */
  asks: string[][];
  /**
   * start handling change price
   */
  listenInputPrice?: (() => void) | undefined;
  /**
   * start handling change trigger price
   */
  listenInputTrigger?: (() => void) | undefined;
  /**
   * default tab index
   */
  defaultTabIndex?: number | undefined;
  isMobileDevice?: boolean | undefined;
  translate: (id: string, value?: any) => string;
}

interface State {
  index: number;
  amountSell: string;
  amountBuy: string;
}

const splitBorder = 449;
const defaultWidth = 635;

export class Order extends React.Component<OrderComponentProps, State> {
  public state = {
    index: 0,
    amountSell: '',
    amountBuy: '',
  };

  public componentDidMount() {
    const { defaultTabIndex } = this.props;

    if (defaultTabIndex !== undefined) {
      this.handleChangeTab(defaultTabIndex);
    }
  }

  public render() {
    const { width = defaultWidth } = this.props;

    if (width < splitBorder) {
      return (
        <div className="cr-order">
          <TabPanel
            fixed={true}
            panels={this.getPanels()}
            onTabChange={this.handleChangeTab}
            currentTabIndex={this.state.index}
          />
        </div>
      );
    }

    return (
      <Box row spacing align="start" className="cr-order cr-order--extended">
        <div className="cr-order--extended__buy">
          <TabPanel
            fixed={true}
            panels={[this.getPanel('buy')]}
            onTabChange={this.handleChangeTab}
            currentTabIndex={this.state.index}
          />
        </div>
        <div className="cr-order--extended__sell">
          <TabPanel
            fixed={true}
            panels={[this.getPanel('sell')]}
            onTabChange={this.handleChangeTab}
            currentTabIndex={this.state.index}
          />
        </div>
      </Box>
    );
  }

  public getPanel = (type: FormType) => {
    const {
      availableBase,
      availableQuote,
      disabled,
      priceMarketBuy,
      priceMarketSell,
      priceLimit,
      trigger,
      from,
      to,
      currentMarketAskPrecision,
      currentMarketBidPrecision,
      orderTypes,
      asks,
      bids,
      listenInputPrice,
      listenInputTrigger,
      translate,
    } = this.props;
    const { amountSell, amountBuy } = this.state;
    const sell = isSell(type);
    const proposals = sell ? bids : asks;
    const available = sell ? availableBase : availableQuote;
    const priceMarket = sell ? priceMarketSell : priceMarketBuy;
    const amount = sell ? amountSell : amountBuy;
    const preLabel = sell
      ? translate('page.body.trade.header.newOrder.content.tabs.sell')
      : translate('page.body.trade.header.newOrder.content.tabs.buy');
    const label = sell ? 'Sell' : 'Buy';

    return {
      content: (
        <OrderForm
          type={type}
          from={from}
          disabled={sell ? undefined : disabled}
          to={to}
          available={available}
          priceMarket={priceMarket}
          priceLimit={priceLimit}
          obTrigger={trigger}
          onSubmit={this.props.onSubmit}
          orderTypes={orderTypes}
          currentMarketAskPrecision={currentMarketAskPrecision}
          currentMarketBidPrecision={currentMarketBidPrecision}
          totalPrice={getTotalPrice(amount, priceMarket, proposals)}
          amount={amount}
          minAmount={this.props.minAmount}
          bestAsk={bestPrice(asks)}
          bestBid={bestPrice(bids)}
          listenInputPrice={listenInputPrice}
          listenInputTrigger={listenInputTrigger}
          onAmountChange={this.handleAmountChange}
          onChangeAmountByButton={this.handleChangeAmountByButton}
        />
      ),
      label: preLabel || label,
    };
  };

  private getPanels = () => {
    return [this.getPanel('buy'), this.getPanel('sell')];
  };

  private handleChangeTab = (index: number, label?: string) => {
    if (this.props.handleSendType && label) {
      this.props.handleSendType(index, label);
    }

    this.setState({
      index: index,
    });
  };

  private handleAmountChange = (amount: string, type: FormType) => {
    if (type === 'sell') {
      this.setState({ amountSell: amount });
    } else {
      this.setState({ amountBuy: amount });
    }
  };

  private handleChangeAmountByButton: OrderFormProps['onChangeAmountByButton'] = (
    value,
    orderType,
    price,
    type,
  ) => {
    const { bids, asks, availableBase, availableQuote } = this.props;
    const proposals = isSell(type) ? bids : asks;
    const available = isSell(type) ? availableBase : availableQuote;
    let newAmount = '';

    switch (type) {
      case 'buy':
        switch (orderType) {
          case 'Market':
            newAmount = available
              ? createMoneyWithoutCcy(
                  getAmount(Number(available), proposals, value),
                  this.props.currentMarketAskPrecision,
                ).toFormat()
              : '';

            break;
          default:
            newAmount =
              available && +price
                ? createMoneyWithoutCcy(
                    (available / +price) * value,
                    this.props.currentMarketAskPrecision,
                  ).toFormat()
                : '';

            break;
        }
        break;
      case 'sell':
        newAmount = available
          ? createMoneyWithoutCcy(
              available * value,
              this.props.currentMarketAskPrecision,
            ).toFormat()
          : '';

        break;
      default:
        break;
    }

    if (type === 'sell') {
      this.setState({ amountSell: newAmount });
    } else {
      this.setState({ amountBuy: newAmount });
    }
  };
}

const isSell = (type: string) => type === 'sell';

const bestPrice = (list: string[][]) => list[0] && list[0][0];
