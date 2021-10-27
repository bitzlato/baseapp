import * as React from 'react';
import { useSelector } from 'react-redux';
import { Box } from 'src/components/Box';
import { OpenOrders } from '../../';
import { OrderBook, OrderComponent } from '../../../../containers';
import { selectUserLoggedIn } from '../../../../modules';

const CreateOrderComponent = (props) => {
  const userLoggedIn = useSelector(selectUserLoggedIn);

  return (
    <div className="pg-mobile-create-order">
      <Box grow padding="2x" row spacing="2x" className="pg-mobile-create-order__row-double">
        <OrderBook />
        <OrderComponent defaultTabIndex={props.currentOrderTypeIndex} />
      </Box>
      {userLoggedIn ? <OpenOrders /> : null}
    </div>
  );
};

export const CreateOrder = React.memo(CreateOrderComponent);
