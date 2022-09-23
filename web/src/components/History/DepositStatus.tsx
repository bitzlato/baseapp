import { FC } from 'react';
import { Deposit } from 'src/modules/user/history/types';
import { useT } from 'src/hooks/useT';
import { join } from 'src/helpers/join';
import { Text } from 'web/src/components/ui/Text';
import { ExternalLink } from './ExternalLink';
import { ConfirmingStatus } from './ConfirmingStatus';

interface Props {
  item: Deposit;
  minConfirmations: number;
}

export const DepositStatus: FC<Props> = ({ item, minConfirmations }) => {
  const t = useT();

  switch (item.state) {
    case 'dispatched':
      return <Text color="success">{t('page.body.history.deposit.content.status.confirmed')}</Text>;

    case 'errored':
      return (
        <Text color="danger">
          {item.public_message || t('page.body.history.deposit.content.status.errored')}
        </Text>
      );

    case 'skipped':
      return <Text color="danger">{t('page.body.history.deposit.content.status.skipped')}</Text>;

    case 'rejected':
      return <Text color="danger">{t('page.body.history.deposit.content.status.canceled')}</Text>;

    case 'canceled':
      return <Text color="danger">{t('page.body.history.deposit.content.status.canceled')}</Text>;

    case 'submitted':
      return (
        <Text color="warning">{t('page.body.history.deposit.content.status.confirming')}</Text>
      );

    case 'invoiced':
      return item.transfer_links ? (
        <>
          <Text key="Text" color="warning">
            {t('page.body.history.deposit.content.status.wait_payment')}{' '}
          </Text>
          {join(
            item.transfer_links.map((d) => (
              <ExternalLink key={d.title} href={d.url}>
                {d.title}
              </ExternalLink>
            )),
            <Text key="sep" color="secondary">
              <span> / </span>
            </Text>,
          )}
        </>
      ) : (
        <Text color="warning">{t('page.body.wallets.table.invoiced')}</Text>
      );

    case 'accepted':
      return (
        <ConfirmingStatus
          confirmations={item.confirmations ?? 0}
          minConfirmations={minConfirmations}
        />
      );

    case 'refunding':
      return <Text color="warning">{t('page.body.history.deposit.content.status.refunding')}</Text>;

    default:
      return (
        <Text color="secondary" textTransform="capitalize">
          {item.state}
        </Text>
      );
  }
};
