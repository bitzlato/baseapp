import * as React from 'react';
import cn from 'classnames';
import { WarningIcon } from 'src/mobile/assets/images/WarningIcon';
import { useT } from 'src/hooks/useT';

interface Props {
    currency: string;
    minDepositAmount: string;
}

export const MinAmountWarning: React.FC<Props> = props => {
    const t = useT();

    if (!props.minDepositAmount) {
        return null;
    }

    const minAmountText = t('page.body.wallets.tabs.deposit.ccy.message.minimum', {
        amount: props.minDepositAmount,
        currency: props.currency.toUpperCase(),
    });

    return (
        <div className={cn('cr-row', 'cr-align-start', 'cr-row-spacing')}>
            <WarningIcon className="cr-self-start" />
            <div className={cn('cr-col-spacing', 'cr-warning-text')}>
                <div style={{ lineHeight: '28px' }}>{minAmountText}</div>
                <div>{t('page.body.wallets.tabs.deposit.ccy.message.warning')}</div>
            </div>
        </div>
    );
};
