import * as React from 'react';
import { CryptoIcon } from '../../../components/CryptoIcon';

interface Props {
    currency: string;
    iconId: string;
    name: string;
}

const WalletHeaderComponent = (props: Props) => {
    return (
        <div className="cr-wallet-mobile-header">
            <div>
                <CryptoIcon className="cr-wallet-item__icon" code={props.iconId} />
            </div>
            <div className="cr-wallet-mobile-header__text">
                <span className="cr-wallet-mobile-header__text-currency">{props.currency}</span>
                <span className="cr-wallet-mobile-header__text-name">{props.name}</span>
            </div>
        </div>
    );
};

const WalletHeader = React.memo(WalletHeaderComponent);

export {
    WalletHeader,
};
