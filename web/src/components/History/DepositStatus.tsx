import * as React from 'react';
import { useSelector } from 'react-redux';
import { getBlockchainLink } from 'src/helpers/getBlockchainLink';
import { selectCurrencies, selectWallets } from 'src/modules';
import { Deposit } from 'src/modules/user/history/types';
import { Status } from './Status';
import { SucceedIcon } from '../../containers/Wallets/SucceedIcon';
import { useT } from 'src/hooks/useT';
import { ExternalLink } from './ExternalLink';

interface Props {
    currency: string;
    item: Deposit;
}

export const DepositStatus: React.FC<Props> = ({ item, currency }) => {
    const t = useT();
    switch (item.state) {
        case 'dispatched':
            return (
                <Status type="success">
                    <SucceedIcon />
                </Status>
            );
        case 'errored':
            return item.public_message ? (
                <Status type="failed">{item.public_message}</Status>
            ) : (
                <Status type="failed">{t('page.body.history.deposit.content.status.errored')}</Status>
            );
        case 'skipped':
            return <Status type="failed">{t('page.body.history.deposit.content.status.skipped')}</Status>;
        case 'rejected':
            return <Status type="failed">{t('page.body.history.deposit.content.status.canceled')}</Status>;
        case 'submitted':
            return <Status type="pending">{t('page.body.history.deposit.content.status.processing')}</Status>;
        case 'invoiced':
            return item.transfer_links ? (
                <div className="cr-row-spacing">
                    {item.transfer_links.map(d => (
                        <ExternalLink key={d.title} href={d.url}>
                            <Status type="pending">{d.title}</Status>
                        </ExternalLink>
                    ))}
                </div>
            ) : (
                <Status type="pending">{t('page.body.wallets.table.invoiced')}</Status>
            );
        case 'canceled':
            return <Status type="failed">{t('page.body.history.deposit.content.status.canceled')}</Status>;
        case 'accepted':
            return <DepositStatusAccepted item={item} currency={currency} />;
        case 'refunding':
            return <Status type="pending">{t('page.body.history.deposit.content.status.refunding')}</Status>;
        default:
            return (
                <Status type="failed" style={{ textTransform: 'capitalize' }}>
                    {item.state}
                </Status>
            );
    }
};

const DepositStatusAccepted: React.FC<Props> = ({ item, currency }) => {
    const t = useT();
    const wallets = useSelector(selectWallets);
    const currencies = useSelector(selectCurrencies);
    const blockchainLink = getBlockchainLink(wallets, currency, item.txid);
    const itemCurrency = currencies.find(cur => cur.id === currency);
    const min: number | undefined = itemCurrency?.min_confirmations;
    const content =
        t('page.body.history.withdraw.content.status.confirming') +
        (min !== undefined ? ` ${item.confirmations}/${min}` : '');
    return (
        <ExternalLink href={blockchainLink}>
            <Status type="pending">{content}</Status>
        </ExternalLink>
    );
};
