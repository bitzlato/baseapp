import * as React from 'react';
import { useHistory } from 'react-router';
import { Box } from 'src/components/Box';
import { WalletList } from 'src/components/WalletList';
import { Estimated } from 'src/containers/Wallets/Estimated';
import { useGeneralWallets } from 'src/hooks/useGeneralWallets';
import { useDocumentTitle } from '../../../hooks';

export const WalletsMobileScreen: React.FC = () => {
  useDocumentTitle('Wallets');
  const history = useHistory();

  const list = useGeneralWallets();

  const handleSelection = (i: number) => {
    history.push(`/wallets/${list[i]!.currency.toLowerCase()}`);
  };

  return (
    <Box col spacing="sm">
      <div />
      <Box bgColor="body" padding="2X3">
        <Estimated />
      </Box>
      <Box
        bgColor="body"
        as={WalletList}
        walletItems={list}
        activeIndex={-1}
        onWalletSelectionChange={handleSelection}
        isMobileDevice
      />
    </Box>
  );
};
