import React from 'react';
import { Label } from 'src/components/Label/Label';
import { useT } from 'src/hooks/useT';
import { OrderStatusType } from 'src/modules/types';

interface Props {
  value: OrderStatusType;
}

export const OrderStatus: React.FC<Props> = ({ value }) => {
  const t = useT();

  switch (value) {
    case 'done':
      return <Label successColor>{t('page.body.openOrders.content.status.done')}</Label>;

    case 'cancel':
      return <Label secondaryColor>{t('page.body.openOrders.content.status.cancel')}</Label>;

    case 'wait':
      return <Label warningColor>{t('page.body.openOrders.content.status.wait')}</Label>;

    case 'reject':
      return <Label failedColor>{t('page.body.openOrders.content.status.reject')}</Label>;

    default:
      return (
        <Label secondaryColor capitalize>
          {value}
        </Label>
      );
  }
};
