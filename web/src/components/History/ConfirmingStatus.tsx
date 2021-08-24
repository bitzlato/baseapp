import * as React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrencies } from 'src/modules';
import { Status } from './Status';
import { BlockchainLink } from './ExternalLink';
import { PendingStatus } from './PendingStatus';
import classNames from 'classnames';

interface Props {
    currency: string;
    txid: string;
    confirmations: number;
}

export const ConfirmingStatus: React.FC<Props> = ({ txid, currency, confirmations }) => {
    const currencies = useSelector(selectCurrencies);
    const itemCurrency = currencies.find(cur => cur.id === currency);
    const min: number | undefined = itemCurrency?.min_confirmations;
    const content = min !== undefined ? ` ${confirmations}/${min}` : '';
    return (
        <div className={classNames('cr-row', 'cr-row-spacing', 'cr-justify-end')}>
            <BlockchainLink txid={txid} currency={currency}>
                <Status type="pending">{content}</Status>
            </BlockchainLink>
            <PendingStatus />
        </div>
    );
};
