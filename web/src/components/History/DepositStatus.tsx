import { FC } from 'react';
import { Deposit } from 'src/modules/user/history/types';
import { useT } from 'src/hooks/useT';
import { ExternalLink } from './ExternalLink';
import { ConfirmingStatus } from './ConfirmingStatus';
import { Label } from '../Label/Label';
import { join } from 'src/helpers/join';

interface Props {
  item: Deposit;
  minConfirmations: number;
}

export const DepositStatus: FC<Props> = ({ item, minConfirmations }) => {
  const t = useT();

  switch (item.state) {
    case 'dispatched':
      return (
        <Label color="success">{t('page.body.history.deposit.content.status.confirmed')}</Label>
      );

    case 'errored':
      return (
        <Label color="failed">
          {item.public_message || t('page.body.history.deposit.content.status.errored')}
        </Label>
      );

    case 'skipped':
      return <Label color="failed">{t('page.body.history.deposit.content.status.skipped')}</Label>;

    case 'rejected':
      return <Label color="failed">{t('page.body.history.deposit.content.status.canceled')}</Label>;

    case 'canceled':
      return <Label color="failed">{t('page.body.history.deposit.content.status.canceled')}</Label>;

    case 'submitted':
      return (
        <Label color="warning">{t('page.body.history.deposit.content.status.confirming')}</Label>
      );

    case 'invoiced':
      return item.transfer_links ? (
        <>
          <Label key="label" color="warning">
            {t('page.body.history.deposit.content.status.wait_payment')}{' '}
          </Label>
          {join(
            item.transfer_links.map((d) => (
              <ExternalLink key={d.title} href={d.url}>
                {d.title}
              </ExternalLink>
            )),
            <Label key="sep" color="secondary">
              <span> / </span>
            </Label>,
          )}
        </>
      ) : (
        <Label color="warning">{t('page.body.wallets.table.invoiced')}</Label>
      );

    case 'accepted':
      return (
        <ConfirmingStatus confirmations={item.confirmations} minConfirmations={minConfirmations} />
      );

    case 'refunding':
      return (
        <Label color="warning">{t('page.body.history.deposit.content.status.refunding')}</Label>
      );

    default:
      return (
        <Label color="secondary" tr="capitalize">
          {item.state}
        </Label>
      );
  }
};
