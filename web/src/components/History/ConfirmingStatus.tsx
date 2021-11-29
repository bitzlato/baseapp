import * as React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrencies } from 'src/modules';
import { BlockchainLink } from './ExternalLink';
import { Label } from '../Label';
import { useT } from 'src/hooks/useT';

interface Props {
  currency: string;
  txid: string;
  confirmations: number;
}

export const ConfirmingStatus: React.FC<Props> = ({ txid, currency, confirmations }) => {
  const t = useT();
  const currencies = useSelector(selectCurrencies);
  const itemCurrency = currencies.find((cur) => cur.id === currency);
  const min = itemCurrency?.min_confirmations;
  const content = min !== undefined ? ` ${confirmations}/${min}` : '';
  return (
    <>
      <Label color="warning">{t('page.body.history.deposit.content.status.confirming')} </Label>
      <BlockchainLink txid={txid} currency={currency}>
        <Label color="warning">{content}</Label>
      </BlockchainLink>
    </>
  );
};
