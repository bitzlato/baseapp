import * as React from 'react';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Box } from 'src/components/Box/Box';
import { CurrencyTicker } from 'src/components/CurrencyTicker/CurrencyTicker';
import { useT } from 'src/hooks/useT';
import { selectCurrentMarket } from '../../../modules';

interface Props {
  redirectToCreateOrder: (index: number) => void;
}

const OrderButtonsComponent: React.FC<Props> = (props) => {
  const t = useT();
  const currentMarket = useSelector(selectCurrentMarket);
  const token = currentMarket?.base_unit.toUpperCase();

  return (
    <div className="cr-mobile-order-buttons">
      <Box
        as={Button}
        onClick={() => props.redirectToCreateOrder(0)}
        size="lg"
        variant="success"
        row
        spacing
      >
        <span>{t(`page.body.openOrders.header.side.buy`)}</span>
        <CurrencyTicker symbol={token} />
      </Box>
      <Box
        as={Button}
        onClick={() => props.redirectToCreateOrder(1)}
        size="lg"
        variant="danger"
        row
        spacing
      >
        <span>{t(`page.body.openOrders.header.side.sell`)}</span>
        <CurrencyTicker symbol={token} />
      </Box>
    </div>
  );
};

export const OrderButtons = React.memo(OrderButtonsComponent);
