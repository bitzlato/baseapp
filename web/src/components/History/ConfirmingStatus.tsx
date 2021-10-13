import * as React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrencies } from 'src/modules';
import { BlockchainLink } from './ExternalLink';
import { PendingStatus } from './PendingStatus';
import { Box } from '../Box';
import { Label } from '../Label';

interface Props {
  currency: string;
  txid: string;
  confirmations: number;
}

export const ConfirmingStatus: React.FC<Props> = ({ txid, currency, confirmations }) => {
  const currencies = useSelector(selectCurrencies);
  const itemCurrency = currencies.find((cur) => cur.id === currency);
  const min: number | undefined = itemCurrency?.min_confirmations;
  const content = min !== undefined ? ` ${confirmations}/${min}` : '';
  return (
    <Box row spacing justifyEnd>
      <BlockchainLink txid={txid} currency={currency}>
        <Label warningColor>{content}</Label>
      </BlockchainLink>
      <PendingStatus />
    </Box>
  );
};
