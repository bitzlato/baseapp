import cn from 'classnames';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { useT } from 'src/hooks/useT';
import { selectMobileDeviceState } from 'src/modules/public/globalSettings/selectors';
import { AMOUNT_PERCENTAGE_ARRAY, TRIGGER_BUY_PRICE_MULT } from '../../constants';
import { cleanPositiveFloatInput, precisionRegExp } from '../../helpers';
import { OrderInput as OrderInputMobile } from '../../mobile/components';
import { OrderProps, OrderType, FormType } from '../Order';
import { OrderInput } from '../OrderInput';
import { PercentageButton } from '../PercentageButton';
import { getTriggerSign } from 'src/containers/OpenOrders/helpers';
import { CurrencyTicker } from 'src/components/CurrencyTicker/CurrencyTicker';
import { Box } from 'src/components/Box/Box';
import { Label } from 'src/components/Label/Label';
import { isLimit, isMarket, isTrigger, isTriggerByPrice } from 'src/helpers/order';
import { DropdownComponent } from 'src/containers/QuickExchange/Dropdown';
import { AmountFormat } from '../AmountFormat/AmountFormat';
import { MoneyFormat } from '../MoneyFormat/MoneyFormat';
import { createCcy, createMoney } from 'src/helpers/money';
import { StorageKeys } from 'src/helpers/storageKeys';

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
  obTrigger?: number;
  /**
   * Type of form, can be 'buy' or 'sell'
   */
  type: FormType;
  /**
   * Available types of order
   */
  orderTypes: OrderType[];
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
  onAmountChange: (amount: string, type: FormType) => void;
  onChangeAmountByButton: (
    value: number,
    orderType: string | React.ReactNode,
    price: string,
    type: string,
  ) => void;
  minAmount: string;
}

export const OrderForm: React.FC<OrderFormProps> = ({
  type,
  orderTypes,
  className,
  from,
  to,
  available,
  currentMarketAskPrecision,
  currentMarketBidPrecision,
  amount,
  bestBid,
  bestAsk,
  priceLimit,
  obTrigger,
  priceMarket,
  disabled,
  totalPrice,
  onSubmit,
  listenInputPrice,
  listenInputTrigger,
  onAmountChange,
  onChangeAmountByButton,
  minAmount,
}) => {
  const [orderType, setorderType] = React.useState<OrderType>(
    (localStorage.getItem(`${StorageKeys.orderType}-${type}`) as OrderType) ?? 'Market',
  );

  const [price, setprice] = React.useState('');
  const [trigger, settrigger] = React.useState('');

  const t = useT();
  const isMobileDevice = useSelector(selectMobileDeviceState);

  React.useEffect(() => {
    const nextPriceLimitTruncated = createMoney(priceLimit!, bidCcy).toFormat();
    if (isLimit(orderType) && priceLimit && nextPriceLimitTruncated !== price) {
      handlePriceChange(nextPriceLimitTruncated);
    }
  }, [priceLimit]);

  React.useEffect(() => {
    const nextTriggerTruncated = createMoney(obTrigger!, bidCcy).toFormat();
    if (isTriggerByPrice(orderType) && obTrigger && nextTriggerTruncated !== trigger) {
      handleTriggerChange(nextTriggerTruncated);
    }
  }, [obTrigger]);

  React.useEffect(() => {
    setprice('');
    settrigger('');
    onAmountChange('', type);
  }, [from, to]);

  const handleOrderTypeChange = (value: OrderType) => {
    localStorage.setItem(`${StorageKeys.orderType}-${type}`, value);
    setorderType(value);
  };

  const handlePriceChange = (value: string) => {
    const convertedValue = cleanPositiveFloatInput(String(value));
    if (convertedValue.match(precisionRegExp(currentMarketBidPrecision))) {
      setprice(convertedValue);
    }
    listenInputPrice?.();
  };

  const handleTriggerChange = (value: string) => {
    const convertedValue = cleanPositiveFloatInput(String(value));
    if (convertedValue.match(precisionRegExp(currentMarketBidPrecision))) {
      settrigger(convertedValue);
    }
    listenInputTrigger?.();
  };

  const handleAmountChange = (value: string) => {
    const convertedValue = cleanPositiveFloatInput(String(value));
    if (convertedValue.match(precisionRegExp(currentMarketAskPrecision))) {
      onAmountChange(convertedValue, type);
    }
  };

  const handleChangeAmountByButton = (value: number) => {
    let priceToUse = isLimit(orderType) || isMarket(orderType) ? price : trigger;
    if (type === 'buy' && isTriggerByPrice(orderType)) {
      priceToUse = (Number(priceToUse) * TRIGGER_BUY_PRICE_MULT).toString();
    }
    onChangeAmountByButton(value, orderType, priceToUse, type);
  };

  const handleSubmit = () => {
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

    const orderAllowed = onSubmit(order);
    if (orderAllowed) {
      handlePriceChange('');
      handleTriggerChange('');
      onAmountChange('', type);
    }
  };

  const checkButtonIsDisabled = (): boolean => {
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

  const handleEnterPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSubmit();
    }
  };

  const renderPrice = () => {
    const priceText = t('page.body.trade.header.newOrder.content.price');

    return (
      <React.Fragment>
        {isMobileDevice ? (
          <OrderInputMobile
            label={priceText}
            placeholder={t('page.mobile.order.price.placeholder', {
              currency: from ? from.toUpperCase() : '',
            })}
            value={price || ''}
            precision={currentMarketBidPrecision}
            handleChangeValue={handlePriceChange}
            handleFocusInput={listenInputPrice}
          />
        ) : (
          <OrderInput
            currency={from}
            label={priceText}
            placeholder={priceText}
            value={price || ''}
            handleChangeValue={handlePriceChange}
            handleFocusInput={listenInputPrice}
          />
        )}
      </React.Fragment>
    );
  };

  const renderTrigger = () => {
    const triggerText = t(`page.body.trade.header.newOrder.content.triggerPrice`, {
      sign: getTriggerSign(String(orderType).toLowerCase(), type),
    });

    return (
      <React.Fragment>
        {isMobileDevice ? (
          <OrderInputMobile
            label={triggerText}
            placeholder={t(
              `page.mobile.order.trigger.placeholder.${
                orderType.includes('Stop') ? 'stop' : 'take'
              }`,
              { currency: from ? from.toUpperCase() : '' },
            )}
            value={trigger || ''}
            precision={currentMarketBidPrecision}
            handleChangeValue={handleTriggerChange}
            handleFocusInput={listenInputTrigger}
          />
        ) : (
          <OrderInput
            currency={from}
            label={triggerText}
            placeholder={triggerText}
            value={trigger || ''}
            handleChangeValue={handleTriggerChange}
            handleFocusInput={listenInputTrigger}
          />
        )}
      </React.Fragment>
    );
  };

  const getPriceInputs = () => {
    switch (orderType) {
      case 'Limit':
        return renderPrice();
      case 'Stop-loss':
      case 'Take-profit':
        return renderTrigger();
      case 'Stop-limit':
      case 'Take-limit':
        return (
          <div className="cr-price-inputs">
            <div className="cr-price-inputs__trigger">{renderTrigger()}</div>
            {renderPrice()}
          </div>
        );
      case 'Market':
        const safePrice = totalPrice / Number(amount) || priceMarket;
        const price = createMoney(safePrice, createCcy(from, currentMarketBidPrecision));
        return (
          <Box grow padding row className={s.input}>
            <label className={s.inputLabel}>
              {t('page.body.trade.header.newOrder.content.price')}
            </label>
            <Box grow row spacing="sm" textSize={isMobileDevice ? 'sm' : undefined}>
              <span>&asymp;</span>
              <Box as="span" grow ellipsis textColor="primary" bold>
                <AmountFormat money={price} />
              </Box>
              <CurrencyTicker symbol={from} />
            </Box>
          </Box>
        );
      default:
        break;
    }
  };

  const getTotal = () => {
    const safeAmount = Number(amount) || 0;
    if (isMarket(orderType)) {
      return totalPrice;
    } else if (isLimit(orderType)) {
      return safeAmount * (Number(price) || 0);
    } else if (type === 'buy') {
      return TRIGGER_BUY_PRICE_MULT * safeAmount * (Number(trigger) || 0);
    } else {
      return safeAmount * (Number(trigger) || 0);
    }
  };

  const total = getTotal();
  const bidCcy = createCcy(from, currentMarketBidPrecision);
  const askCcy = createCcy(to, currentMarketAskPrecision);
  const availableCcy = type === 'buy' ? bidCcy : askCcy;

  const amountText = t('page.body.trade.header.newOrder.content.amount');

  return (
    <div className={cn('cr-order-form', className)} onKeyPress={handleEnterPress}>
      <div className="cr-order-item">
        <div className="cr-order-item__dropdown__label">
          {t('page.body.trade.header.newOrder.content.orderType')}
        </div>
        <DropdownComponent list={orderTypes} value={orderType} onSelect={handleOrderTypeChange} />
      </div>
      <div className="cr-order-item">{getPriceInputs()}</div>
      <div className="cr-order-item">
        {!isMobileDevice && (bestBid || bestAsk) ? (
          <div className="cr-order-item__prices">
            {bestBid ? (
              <Box as="span" textColor="bid" textSize="sm">
                ▲ <AmountFormat money={createMoney(bestBid, bidCcy)} />
              </Box>
            ) : null}
            {bestAsk ? (
              <Box as="span" textColor="ask" textSize="sm">
                ▼ <AmountFormat money={createMoney(bestAsk, bidCcy)} />
              </Box>
            ) : null}
          </div>
        ) : null}
      </div>
      <div className="cr-order-item">
        {isMobileDevice ? (
          <OrderInputMobile
            label={amountText}
            placeholder={t('page.mobile.order.amount.placeholder', {
              currency: to ? to.toUpperCase() : '',
            })}
            value={amount || ''}
            precision={currentMarketAskPrecision}
            handleChangeValue={handleAmountChange}
          />
        ) : (
          <OrderInput
            currency={to}
            label={amountText}
            placeholder={amountText}
            value={amount || ''}
            handleChangeValue={handleAmountChange}
          />
        )}
      </div>

      <div className="cr-order-item">
        <Box self="stretch" row justify="between" wrap>
          <label>{t('page.body.trade.header.newOrder.content.minAmount')}</label>
          <MoneyFormat money={createMoney(minAmount, askCcy)} />
        </Box>
      </div>

      <div className="cr-order-item">
        <div className="cr-order-item__percentage-buttons">
          {AMOUNT_PERCENTAGE_ARRAY.map((value) => (
            <PercentageButton value={value} key={value} onClick={handleChangeAmountByButton} />
          ))}
        </div>
      </div>

      <div className="cr-order-item">
        <Box self="stretch" row justify="between" wrap textSize="lg">
          <label>{t('page.body.trade.header.newOrder.content.total')}</label>
          <Box row spacing="sm">
            {isMarket(orderType) ? <Label color="secondary">&asymp;</Label> : null}
            <MoneyFormat money={createMoney(total, bidCcy)} />
          </Box>
        </Box>
      </div>

      <div className="cr-order-item">
        <Box self="stretch" row justify="between" wrap>
          <label>{t('page.body.trade.header.newOrder.content.available')}</label>
          <MoneyFormat money={createMoney(available!, availableCcy)} />
        </Box>
      </div>

      <div className="cr-order-item">
        <Box
          as={Button}
          block={true}
          disabled={checkButtonIsDisabled()}
          onClick={handleSubmit}
          size="lg"
          variant={type === 'buy' ? 'success' : 'danger'}
          row
          spacing
        >
          <span>{t(`page.body.openOrders.header.side.${type}`)}</span>
          <CurrencyTicker symbol={to} />
        </Box>
      </div>
    </div>
  );
};
