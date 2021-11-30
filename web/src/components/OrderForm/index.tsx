import cn from 'classnames';
import * as React from 'react';
import { Button } from 'react-bootstrap';
import { AMOUNT_PERCENTAGE_ARRAY, TRIGGER_BUY_PRICE_MULT } from '../../constants';
import { cleanPositiveFloatInput, precisionRegExp } from '../../helpers';
import { OrderInput as OrderInputMobile } from '../../mobile/components';
import { Decimal } from '../Decimal';
import { DropdownComponent } from '../Dropdown';
import { OrderProps, OrderType, FormType } from '../Order';
import { OrderInput } from '../OrderInput';
import { PercentageButton } from '../PercentageButton';
import { getTriggerSign } from 'src/containers/OpenOrders/helpers';
import { CurrencyTicker } from 'src/components/CurrencyTicker/CurrencyTicker';
import { Box } from 'src/components/Box/Box';
import { Label } from 'src/components/Label/Label';
import { isLimit, isMarket, isTrigger, isTriggerByPrice } from 'src/helpers/order';

import s from './Input.postcss';

export interface OrderFormProps {
  /**
   * Price that is applied during total order amount calculation when type is Market
   */
  priceMarket: number;
  /**
   * Price that is applied during total order amount calculation when type is Market
   */
  priceLimit?: number;
  /**
   * Price that is applied when user clicks orderbook row
   */
  trigger?: number;
  /**
   * Type of form, can be 'buy' or 'sell'
   */
  type: FormType;
  /**
   * Available types of order
   */
  orderTypes: OrderType[];
  /**
   * Available types of order without translations
   */
  orderTypesIndex: OrderType[];
  /**
   * Additional class name. By default element receives `cr-order` class
   * @default empty
   */
  className?: string;
  /**
   * Name of currency for price field
   */
  from: string;
  /**
   * Name of currency for amount field
   */
  to: string;
  /**
   * Amount of money in a wallet
   */
  available?: number;
  /**
   * Precision of amount, total, available, fee value
   */
  currentMarketAskPrecision: number;
  /**
   * Precision of price value
   */
  currentMarketBidPrecision: number;
  /**
   * Best ask price
   */
  bestAsk?: string;
  /**
   * Best boid price
   */
  bestBid?: string;
  /**
   * Whether order is disabled to execute
   */
  disabled?: boolean;
  /**
   * Callback that is called when form is submitted
   */
  onSubmit: (order: OrderProps) => boolean;
  /**
   * start handling change price
   */
  listenInputPrice?: () => void;
  /**
   * start handling change trigger price
   */
  listenInputTrigger?: () => void;
  totalPrice: number;
  amount: string;
  isMobileDevice?: boolean;
  handleAmountChange: (amount: string, type: FormType) => void;
  handleChangeAmountByButton: (
    value: number,
    orderType: string | React.ReactNode,
    price: string,
    type: string,
  ) => void;
  translate: (id: string, value?: any) => string;
}

interface OrderFormState {
  orderType: OrderType;
  price: string;
  priceMarket: number;
  trigger: string;
  side: string;
}

export class OrderForm extends React.PureComponent<OrderFormProps, OrderFormState> {
  constructor(props: OrderFormProps) {
    super(props);
    this.state = {
      side: this.props.type,
      orderType: 'Limit',
      price: '',
      priceMarket: this.props.priceMarket,
      trigger: '',
    };
  }

  public componentWillReceiveProps(next: OrderFormProps) {
    const nextPriceLimitTruncated = Decimal.format(
      next.priceLimit,
      this.props.currentMarketBidPrecision,
    );

    if (
      isLimit(this.state.orderType) &&
      next.priceLimit &&
      nextPriceLimitTruncated !== this.state.price
    ) {
      this.handlePriceChange(nextPriceLimitTruncated);
    }

    const nextTriggerTruncated = Decimal.format(next.trigger, this.props.currentMarketBidPrecision);

    if (
      ['Stop-loss', 'Take-profit'].includes(String(this.state.orderType)) &&
      next.trigger &&
      nextTriggerTruncated !== this.state.trigger
    ) {
      this.handleTriggerChange(nextTriggerTruncated);
    }

    if (this.state.priceMarket !== next.priceMarket) {
      this.setState({
        priceMarket: next.priceMarket,
      });
    }

    if (this.props.to !== next.to || this.props.from !== next.from) {
      this.setState({ price: '', trigger: '' });
      this.props.handleAmountChange('', next.type);
    }
  }

  public renderPrice = () => {
    const { price } = this.state;
    const { from, isMobileDevice, currentMarketBidPrecision, translate } = this.props;

    const priceText = translate('page.body.trade.header.newOrder.content.price');

    return (
      <React.Fragment>
        {isMobileDevice ? (
          <OrderInputMobile
            label={priceText}
            placeholder={translate('page.mobile.order.price.placeholder', {
              currency: from ? from.toUpperCase() : '',
            })}
            value={price || ''}
            precision={currentMarketBidPrecision}
            handleChangeValue={this.handlePriceChange}
            handleFocusInput={this.props.listenInputPrice}
          />
        ) : (
          <OrderInput
            currency={from}
            label={priceText}
            placeholder={priceText}
            value={price || ''}
            handleChangeValue={this.handlePriceChange}
            handleFocusInput={this.props.listenInputPrice}
          />
        )}
      </React.Fragment>
    );
  };

  public renderTrigger = () => {
    const { orderType, trigger } = this.state;
    const { type, from, isMobileDevice, currentMarketBidPrecision, translate } = this.props;

    const triggerText = translate(`page.body.trade.header.newOrder.content.triggerPrice`, {
      sign: getTriggerSign(String(orderType).toLowerCase(), type),
    });

    return (
      <React.Fragment>
        {isMobileDevice ? (
          <OrderInputMobile
            label={triggerText}
            placeholder={translate(
              `page.mobile.order.trigger.placeholder.${
                orderType.includes('Stop') ? 'stop' : 'take'
              }`,
              { currency: from ? from.toUpperCase() : '' },
            )}
            value={trigger || ''}
            precision={currentMarketBidPrecision}
            handleChangeValue={this.handleTriggerChange}
            handleFocusInput={this.props.listenInputTrigger}
          />
        ) : (
          <OrderInput
            currency={from}
            label={triggerText}
            placeholder={triggerText}
            value={trigger || ''}
            handleChangeValue={this.handleTriggerChange}
            handleFocusInput={this.props.listenInputTrigger}
          />
        )}
      </React.Fragment>
    );
  };

  public getPriceInputs = () => {
    const { orderType, priceMarket } = this.state;
    const { from, totalPrice, amount, currentMarketBidPrecision, translate, isMobileDevice } =
      this.props;

    switch (orderType) {
      case 'Limit':
        return this.renderPrice();
      case 'Stop-loss':
      case 'Take-profit':
        return this.renderTrigger();
      case 'Stop-limit':
      case 'Take-limit':
        return (
          <div className="cr-price-inputs">
            <div className="cr-price-inputs__trigger">{this.renderTrigger()}</div>
            {this.renderPrice()}
          </div>
        );
      case 'Market':
        const safePrice = totalPrice / Number(amount) || priceMarket;
        const priceText = translate('page.body.trade.header.newOrder.content.price');

        return (
          <Box grow padding row spacing className={s.input}>
            <label className={s.inputLabel}>{priceText}</label>
            <Label ellipsis size={isMobileDevice ? 'sm' : undefined} bold>
              &asymp;{' '}
              <Label color="primary">
                {Decimal.format(safePrice, currentMarketBidPrecision, ',') || '0'}
              </Label>
            </Label>
            <Label size={isMobileDevice ? 'sm' : undefined}>
              <CurrencyTicker symbol={from} />
            </Label>
          </Box>
        );
      default:
        break;
    }
  };

  public getTotal = () => {
    const { orderType, price, trigger, side } = this.state;
    const { totalPrice, amount } = this.props;
    const safeAmount = Number(amount) || 0;

    if (isMarket(orderType)) {
      return totalPrice;
    } else if (isLimit(orderType)) {
      return safeAmount * (Number(price) || 0);
    } else if (side === 'buy') {
      return TRIGGER_BUY_PRICE_MULT * safeAmount * (Number(trigger) || 0);
    } else {
      return safeAmount * (Number(trigger) || 0);
    }
  };

  public render() {
    const {
      type,
      orderTypes,
      className,
      from,
      to,
      available,
      currentMarketAskPrecision,
      currentMarketBidPrecision,
      amount,
      isMobileDevice,
      bestBid,
      bestAsk,
      translate,
    } = this.props;
    const { orderType } = this.state;

    const total = this.getTotal();

    const isBuy = type === 'buy';
    const availablePrecision = isBuy ? currentMarketBidPrecision : currentMarketAskPrecision;
    const availableCurrency = isBuy ? from : to;

    const amountText = this.props.translate('page.body.trade.header.newOrder.content.amount');

    return (
      <div className={cn('cr-order-form', className)} onKeyPress={this.handleEnterPress}>
        <div className="cr-order-item">
          <div className="cr-order-item__dropdown__label">
            {translate('page.body.trade.header.newOrder.content.orderType')}
          </div>
          <DropdownComponent
            list={orderTypes}
            onSelect={this.handleOrderTypeChange}
            placeholder=""
          />
        </div>
        <div className="cr-order-item">{this.getPriceInputs()}</div>
        <div className="cr-order-item">
          {!isMobileDevice && (bestBid || bestAsk) ? (
            <div className="cr-order-item__prices">
              {bestBid ? (
                <span className="bids">
                  &#x25B2; {Decimal.format(bestBid, currentMarketBidPrecision, ',')}
                </span>
              ) : null}
              {bestAsk ? (
                <span className="asks">
                  &#x25BC; {Decimal.format(bestAsk, currentMarketBidPrecision, ',')}
                </span>
              ) : null}
            </div>
          ) : null}
        </div>
        <div className="cr-order-item">
          {isMobileDevice ? (
            <OrderInputMobile
              label={amountText}
              placeholder={translate('page.mobile.order.amount.placeholder', {
                currency: to ? to.toUpperCase() : '',
              })}
              value={amount || ''}
              precision={currentMarketAskPrecision}
              handleChangeValue={this.handleAmountChange}
            />
          ) : (
            <OrderInput
              currency={to}
              label={amountText}
              placeholder={amountText}
              value={amount || ''}
              handleChangeValue={this.handleAmountChange}
            />
          )}
        </div>

        <div className="cr-order-item">
          <div className="cr-order-item__percentage-buttons">
            {AMOUNT_PERCENTAGE_ARRAY.map((value, index) => (
              <PercentageButton
                value={value}
                key={index}
                onClick={this.handleChangeAmountByButton}
              />
            ))}
          </div>
        </div>

        <div className="cr-order-item">
          <Box selfStretch row justifyBetween wrap textSize="lg">
            <label>{translate('page.body.trade.header.newOrder.content.total')}</label>
            <Box row spacing="sm">
              {isMarket(orderType) ? <Label color="secondary">&asymp;</Label> : null}
              <Label color="primary">
                {Decimal.format(total, currentMarketAskPrecision + currentMarketBidPrecision, ',')}
              </Label>
              <Label color="secondary">
                <CurrencyTicker symbol={from} />
              </Label>
            </Box>
          </Box>
        </div>
        <div className="cr-order-item">
          <Box selfStretch row justifyBetween wrap>
            <label>{translate('page.body.trade.header.newOrder.content.available')}</label>
            <Box row spacing="sm">
              <Label color="primary">{Decimal.format(available, availablePrecision, ',')}</Label>
              <Label color="secondary">
                <CurrencyTicker symbol={availableCurrency} />
              </Label>
            </Box>
          </Box>
        </div>
        <div className="cr-order-item">
          <Box
            as={Button}
            block={true}
            className="btn-block mr-1 mt-1 btn-lg"
            disabled={this.checkButtonIsDisabled()}
            onClick={this.handleSubmit}
            size="lg"
            variant={type === 'buy' ? 'success' : 'danger'}
            row
            spacing
          >
            <span>{translate(`page.body.openOrders.header.side.${type}`)}</span>
            <CurrencyTicker symbol={to} />
          </Box>
        </div>
      </div>
    );
  }

  private handleOrderTypeChange = (index: number) => {
    const { orderTypesIndex } = this.props;
    this.setState({
      orderType: orderTypesIndex[index],
    });
  };

  private handlePriceChange = (value: string) => {
    const { currentMarketBidPrecision } = this.props;
    const convertedValue = cleanPositiveFloatInput(String(value));

    if (convertedValue.match(precisionRegExp(currentMarketBidPrecision))) {
      this.setState({
        price: convertedValue,
      });
    }

    this.props.listenInputPrice && this.props.listenInputPrice();
  };

  private handleTriggerChange = (value: string) => {
    const { currentMarketBidPrecision } = this.props;
    const convertedValue = cleanPositiveFloatInput(String(value));

    if (convertedValue.match(precisionRegExp(currentMarketBidPrecision))) {
      this.setState({
        trigger: convertedValue,
      });
    }

    this.props.listenInputTrigger && this.props.listenInputTrigger();
  };

  private handleAmountChange = (value: string) => {
    const { currentMarketAskPrecision } = this.props;
    const convertedValue = cleanPositiveFloatInput(String(value));

    if (convertedValue.match(precisionRegExp(currentMarketAskPrecision))) {
      this.props.handleAmountChange(convertedValue, this.props.type);
    }
  };

  private handleChangeAmountByButton = (value: number) => {
    const { orderType, price, trigger, side } = this.state;

    let priceToUse = isLimit(orderType) || isMarket(orderType) ? price : trigger;

    if (side === 'buy' && isTriggerByPrice(orderType)) {
      priceToUse = (Number(priceToUse) * TRIGGER_BUY_PRICE_MULT).toString();
    }

    this.props.handleChangeAmountByButton(value, orderType, priceToUse, this.props.type);
  };

  private handleSubmit = () => {
    const { available, type, amount } = this.props;
    const { price, priceMarket, orderType, trigger } = this.state;

    const order: OrderProps = {
      type,
      orderType,
      amount,
      available: available || 0,
    };

    if (isMarket(orderType)) {
      order.price = priceMarket;
    } else if (isLimit(orderType)) {
      order.price = price;
    }

    if (isTrigger(orderType)) {
      order.trigger = trigger;
    }

    const orderAllowed = this.props.onSubmit(order);
    if (orderAllowed) {
      this.handlePriceChange('');
      this.handleTriggerChange('');
      this.props.handleAmountChange('', this.props.type);
    }
  };

  private checkButtonIsDisabled = (): boolean => {
    const { disabled, available, amount, totalPrice } = this.props;
    const { orderType, priceMarket, price, trigger } = this.state;
    const safePrice = totalPrice / Number(amount) || priceMarket;

    const invalidAmount = Number(amount) <= 0;
    const invalidLimitPrice = isLimit(orderType) && Number(price) <= 0;
    const invalidTriggerPrice = isTrigger(orderType) && Number(trigger) <= 0;
    const invalidMarketPrice = safePrice <= 0 && isMarket(orderType);

    return (
      disabled ||
      !available ||
      invalidAmount ||
      invalidLimitPrice ||
      invalidMarketPrice ||
      invalidTriggerPrice
    );
  };

  private handleEnterPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();

      this.handleSubmit();
    }
  };
}
