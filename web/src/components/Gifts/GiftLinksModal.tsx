import { FC } from 'react';
import { Money } from '@bitzlato/money-js';
import { P2PVoucherLink } from 'web/src/modules/account/voucher-types';
import { useT } from 'web/src/hooks/useT';
import { GiftLinks } from 'web/src/components/Gifts/GiftLinks';
import { Modal, ModalBody } from 'web/src/components/ui/Modal';
import { Box } from 'web/src/components/ui/Box';
import { Text } from 'web/src/components/ui/Text';
import { MoneyFormat } from 'web/src/components/MoneyFormat/MoneyFormat';

interface Props {
  show: boolean;
  amountMoney: Money;
  links: P2PVoucherLink[];
  onClose: () => void;
}

export const GiftLinksModal: FC<Props> = ({ show, amountMoney, links, onClose }) => {
  const t = useT();

  return (
    <Modal size="lg" show={show} onClose={onClose}>
      <ModalBody>
        <Box pt="14x" pb="10x">
          <Box as={Text} variant="title" fontWeight="strong" textAlign="center">
            {t('gifts.viewWithAmount', {
              amount: <MoneyFormat money={amountMoney} />,
            })}
          </Box>
          <Box as={Text} mt="2x" textAlign="center" color="textMuted">
            {t('gifts.createdCopy')}
          </Box>

          <Box mt="8x">
            <GiftLinks links={links} />
          </Box>
        </Box>
      </ModalBody>
    </Modal>
  );
};
