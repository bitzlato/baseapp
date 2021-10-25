import * as React from 'react';
import { useSelector } from 'react-redux';
import { getBlockchainLink } from 'src/helpers/getBlockchainLink';
import { selectWallet } from 'src/modules/user/wallets/selectors';

interface Props {
  href: string;
}

export const ExternalLink: React.FC<Props> = ({ href, children }) => (
  <a href={href} target="_blank" rel="noopener noreferrer">
    {children}
  </a>
);

interface BlockchainLinkProps {
  txid: string;
  currency: string;
}

export const BlockchainLink: React.FC<BlockchainLinkProps> = ({ children, currency, txid }) => {
  const wallet = useSelector(selectWallet(currency));
  const link = getBlockchainLink(wallet, txid);

  return <ExternalLink href={link}>{children}</ExternalLink>;
};
