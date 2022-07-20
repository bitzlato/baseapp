import { FC } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { Button } from 'web/src/components/ui/Button';
import { Text } from 'web/src/components/ui/Text';
import { Modal } from 'web/src/components/ui/Modal';
import { P2PVoucher } from 'web/src/modules/account/voucher-types';
import { MoneyFormat } from 'web/src/components/MoneyFormat/MoneyFormat';
import { createMoney } from 'web/src/helpers/money';
import { useT } from 'web/src/hooks/useT';
import { useP2PCryptoCurrencies } from 'web/src/hooks/useP2PCryptoCurrencies';
import { useP2PWalletOptions } from 'web/src/hooks/useP2PWalletOptions';
import { useP2PFiatCurrencies } from 'web/src/hooks/useP2PFiatCurrencies';
import SuccessDeletedGift from 'web/src/assets/svg/SuccessDeletedGift.svg';
import * as s from './GiftDeletedModal.css';

interface Props {
  gift: P2PVoucher;
  onClose: () => void;
}

export const GiftDeletedModal: FC<Props> = ({ gift, onClose }) => {
  const t = useT();
  const { getCryptoCurrency } = useP2PCryptoCurrencies();
  const { getFiatCurrency } = useP2PFiatCurrencies();
  const { walletOptions } = useP2PWalletOptions(getFiatCurrency);
  const cryptoCurrencyBalance = walletOptions.find(
    (wallet) => wallet.code === gift.cryptocurrency.code,
  );

  const amountMoney = createMoney(
    gift.cryptocurrency.amount,
    getCryptoCurrency(gift.cryptocurrency.code),
  );
  const availableBalance = cryptoCurrencyBalance?.balance;

  return (
    <Modal show={gift !== null} size="lg" onClose={onClose}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        px={{ mobile: '6x', tablet: '10x' }}
        pt="15x"
        pb="7x"
      >
        <SuccessDeletedGift />

        <Box as={Text} variant="title" fontWeight="strong" mt="5x" textAlign="center">
          {t('gifts.deletedWithAmount', {
            type:
              gift.timesToWithdrawal > 1
                ? t('Reusable').toLowerCase()
                : t('Single use').toLowerCase(),
            amount: <MoneyFormat money={amountMoney} />,
          })}
        </Box>
        {availableBalance ? (
          <Box as={Text} mt="3x" textAlign="center" color="textMuted">
            {t('gifts.availableBalance', { amount: <MoneyFormat money={availableBalance} /> })}
          </Box>
        ) : null}

        <Box className={s.buttonOkContainer} mt="8x">
          <Button fullWidth onClick={onClose}>
            {t('OK')}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
