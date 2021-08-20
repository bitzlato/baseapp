import * as React from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useMarketsFetch, useMarketsTickersFetch, useRangerConnectFetch, useWalletsFetch } from 'src/hooks';
import { formatWithSeparators } from '../../../components';
import { valuationPrimaryCurrency, valuationPrimaryCurrencyName, valuationSecondaryCurrency, valuationSecondaryCurrencyName } from '../../../api';
import { estimateUnitValue, estimateValue } from '../../../helpers/estimateValue';
import {
    selectCurrencies,
    selectMarkets,
    selectMarketTickers,
    Wallet,
} from '../../../modules';

interface EstimatedValueProps {
    wallets: Wallet[];
}

type Props = EstimatedValueProps;

const EstimatedValue: React.FC<Props> = (props: Props): React.ReactElement => {
    const { formatMessage } = useIntl();
    const translate = React.useCallback((id: string, value?: any) => formatMessage({ id: id }, { ...value }), [formatMessage]);

    const { wallets } = props;
    const currencies = useSelector(selectCurrencies);
    const markets = useSelector(selectMarkets);
    const tickers = useSelector(selectMarketTickers);

    useMarketsTickersFetch();
    useMarketsFetch();
    useWalletsFetch();
    useRangerConnectFetch();

    const renderSecondaryCurrencyValuation = React.useCallback((value: string) => {
        const estimatedValueSecondary = estimateUnitValue(valuationSecondaryCurrency(), valuationPrimaryCurrency(), +value, currencies, markets, tickers);

        return (
            <span className="value-container">
                <span className="value">
                    {formatWithSeparators(estimatedValueSecondary, ',')}
                </span>
                <span className="value-sign">{valuationSecondaryCurrencyName().toUpperCase()}</span>
            </span>
        );
    }, [currencies, markets, tickers]);

    const estimatedValue = React.useMemo(() => {
        return estimateValue(valuationPrimaryCurrency(), currencies, wallets, markets, tickers);
    }, [currencies, wallets, markets, tickers]);

    return (
        <div className="pg-estimated-value">
            <span className="pg-estimated-value__title">{translate('page.body.wallets.estimated_value')}</span>
            <div className="pg-estimated-value__container">
                <span className="value-container">
                    <span className="value">
                        {formatWithSeparators(estimatedValue, ',')}
                    </span>
                    <span className="value-sign">{valuationPrimaryCurrencyName().toUpperCase()}</span>
                </span>
                {valuationSecondaryCurrency() && renderSecondaryCurrencyValuation(estimatedValue)}
            </div>
        </div>
    );
}

export { EstimatedValue };
