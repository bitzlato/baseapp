import * as React from 'react';
import { useSelector } from 'react-redux';
import { getBlockchainLink } from 'src/helpers/getBlockchainLink';
import { selectWallets } from 'src/modules/user/wallets/selectors';

interface Props {
  href: string;
}

export const ExternalLink: React.FC<Props> = (props) => (
  <a href={props.href} target="_blank" rel="noopener noreferrer">
    {props.children}
  </a>
);

interface BlockchainLinkProps {
  txid: string;
  currency: string;
}

export const BlockchainLink: React.FC<BlockchainLinkProps> = (props) => {
  const wallets = useSelector(selectWallets);
  const link = getBlockchainLink(wallets, props.currency, props.txid);
  return <ExternalLink href={link}>{props.children}</ExternalLink>;
};
