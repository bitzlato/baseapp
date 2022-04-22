import React from 'react';
import { Text } from 'web/src/components/ui/Text';
import { useT } from 'src/hooks/useT';
import { OrderStatusType } from 'src/modules/types';

interface Props {
  value: OrderStatusType;
}

export const OrderStatus: React.FC<Props> = ({ value }) => {
  const t = useT();

  switch (value) {
    case 'done':
      return <Text color="success">{t('page.body.openOrders.content.status.done')}</Text>;

    case 'cancel':
      return <Text color="secondary">{t('page.body.openOrders.content.status.cancel')}</Text>;

    case 'wait':
      return <Text color="warning">{t('page.body.openOrders.content.status.wait')}</Text>;

    case 'reject':
      return <Text color="danger">{t('page.body.openOrders.content.status.reject')}</Text>;

    default:
      return (
        <Text color="secondary" textTransform="capitalize">
          {value}
        </Text>
      );
  }
};
