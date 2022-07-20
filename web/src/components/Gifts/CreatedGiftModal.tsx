import { FC } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { Text } from 'web/src/components/ui/Text';
import { Modal } from 'web/src/components/ui/Modal';
import { P2PVoucher } from 'web/src/modules/account/voucher-types';
import { MoneyFormat } from 'web/src/components/MoneyFormat/MoneyFormat';
import { createMoney } from 'web/src/helpers/money';
import { useT } from 'web/src/hooks/useT';
import { useP2PCryptoCurrencies } from 'web/src/hooks/useP2PCryptoCurrencies';
import SuccessCreatedGift from 'web/src/assets/svg/SuccessCreatedGift.svg';
import { GiftLinks } from './GiftLinks';

interface Props {
  gift: P2PVoucher;
  onClose: () => void;
}

export const CreatedGiftModal: FC<Props> = ({ gift, onClose }) => {
  const t = useT();
  const { getCryptoCurrency } = useP2PCryptoCurrencies();

  const amountMoney = createMoney(
    gift.cryptocurrency.amount,
    getCryptoCurrency(gift.cryptocurrency.code),
  );

  return (
    <Modal show={gift !== null} size="lg" onClose={onClose}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        px={{ mobile: '6x', tablet: '10x' }}
        py="14x"
      >
        <SuccessCreatedGift />

        <Box as={Text} variant="title" fontWeight="strong" mt="1.5x" textAlign="center">
          {t('gifts.createdWithAmount', {
            amount: <MoneyFormat money={amountMoney} />,
          })}
        </Box>
        <Box as={Text} mt="2x" textAlign="center" color="textMuted">
          {t('gifts.createdCopy')}
        </Box>

        <Box width="full" mt="8x">
          <GiftLinks links={gift.links} />
        </Box>
      </Box>
    </Modal>
  );
};
