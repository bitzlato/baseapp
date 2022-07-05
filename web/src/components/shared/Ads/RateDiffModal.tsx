import { FC } from 'react';
import { Money, Currency } from '@bitzlato/money-js';
import { Modal, ModalHeader, ModalBody } from 'web/src/components/ui/Modal';
import { Text } from 'web/src/components/ui/Text';
import { Stack } from 'web/src/components/ui/Stack';
import { Box } from 'web/src/components/ui/Box';
import { Button } from 'web/src/components/ui/Button';
import { P2PMoneyFormat } from 'web/src/components/money/P2PFiatMoney';
import { useSharedT } from 'web/src/components/shared/Adapter';
import { parseNumeric } from 'web/src/helpers/parseNumeric';
import LongDownArrowIcon from 'web/src/assets/svg/LongDownArrowIcon.svg';
import LongUpArrowIcon from 'web/src/assets/svg/LongUpArrowIcon.svg';
import LongRightArrowIcon from 'web/src/assets/svg/LongRightArrowIcon.svg';

interface DiffRateProps {
  prevRate: Money;
  nextRate: Money;
  cryptoCurrency: Currency;
  isBuy: boolean;
}

const DiffRate: FC<DiffRateProps> = ({ prevRate, nextRate, cryptoCurrency, isBuy }) => {
  const t = useSharedT();

  const diff = nextRate.subtract(prevRate);
  const procent = parseNumeric(nextRate.amount.div(prevRate.amount).sub(1).times(100).toString(), {
    maxFractionDigits: 2,
    allowNegativeNumeric: true,
  });
  const color =
    (isBuy && diff.isPositive()) || (!isBuy && diff.isNegative()) ? 'danger' : 'success';
  const plus = diff.isPositive() && '+';

  return (
    <Stack direction="column" marginBottom="3x">
      <Text>{t('ad.rate_changed')}</Text>

      <Stack direction="column" marginBottom="3x">
        <Text variant="title" fontWeight="strong">
          <P2PMoneyFormat money={prevRate} cryptoCurrency={cryptoCurrency} />
          <Box as="span" mx="6x">
            <LongRightArrowIcon />
          </Box>
          <P2PMoneyFormat money={nextRate} cryptoCurrency={cryptoCurrency} />
        </Text>
        <>
          <Text variant="label" fontWeight="strong" color={color}>
            {plus}
            <P2PMoneyFormat money={diff} cryptoCurrency={cryptoCurrency} />
          </Text>
          <Box as="span" color={color} ml="5x" display="inline-flex" alignItems="center">
            {diff.isPositive() ? <LongUpArrowIcon /> : <LongDownArrowIcon />}
            <Box as="span" ml="1x" fontFamily="brand">
              {plus}
              {procent}%
            </Box>
          </Box>
        </>
      </Stack>
      <Text>{t('Do you want to continue?')}</Text>
    </Stack>
  );
};

const DiffExchangeRate: FC<DiffRateProps> = ({ prevRate, nextRate, cryptoCurrency, isBuy }) => {
  const t = useSharedT();

  const actionText = isBuy
    ? t('trade.start.diff.exchage.buy', {
        cryptocurrency: cryptoCurrency.code,
        currency: prevRate.currency.code,
      })
    : t('trade.start.diff.exchage.sell', {
        cryptocurrency: cryptoCurrency.code,
        currency: prevRate.currency.code,
      });

  return (
    <Stack direction="column" marginBottom="6x">
      <Box textAlign="center" px="5x">
        <Text fontSize="medium" fontWeight="strong">
          {t('trade.start.diff')}
        </Text>
      </Box>

      <Box px="20x">
        <Text textAlign="center" fontSize="medium">
          {t('trade.start.diff.exchage.sure')}
          {actionText}
          <Text as="span" fontSize="medium" fontWeight="strong">
            {t('trade.start.diff.advert.rate')}
            <P2PMoneyFormat money={prevRate} cryptoCurrency={cryptoCurrency} />
          </Text>
        </Text>
      </Box>

      <Box borderRadius="1.5x" backgroundColor="adBg" py="3x">
        <Text textAlign="center" fontSize="medium">
          {t('trade.start.diff.exchage.rate')}
          {': '}
          <P2PMoneyFormat money={nextRate} cryptoCurrency={cryptoCurrency} />
        </Text>
      </Box>
    </Stack>
  );
};

interface ConfirmRateProps {
  onConfirm: () => void;
  onClose: () => void;
  title: string;
}

const ConfirmRateModal: FC<ConfirmRateProps> = ({ title, children, onConfirm, onClose }) => {
  const t = useSharedT();

  return (
    <Modal show onClose={onClose}>
      <ModalHeader center>{title}</ModalHeader>
      <ModalBody>{children}</ModalBody>
      <Box display="flex" alignItems="center" px="6x" py="4x">
        <Button color="secondary" variant="outlined" fullWidth onClick={onClose}>
          {t('Cancel')}
        </Button>
        <Box w="4x" flexShrink={0} />
        <Button color="secondary" fullWidth onClick={onConfirm}>
          {t('Confirm')}
        </Button>
      </Box>
    </Modal>
  );
};

interface ConfirmRateChangeProps {
  prevRate: Money;
  nextRate: Money;
  cryptoCurrency: Currency;
  isBuy: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export const ConfirmRateChangeModal: FC<ConfirmRateChangeProps> = ({
  prevRate,
  nextRate,
  cryptoCurrency,
  isBuy,
  onConfirm,
  onClose,
}) => {
  const t = useSharedT();

  return (
    <ConfirmRateModal title={t('Attention!')} onClose={onClose} onConfirm={onConfirm}>
      <DiffRate
        prevRate={prevRate}
        nextRate={nextRate}
        cryptoCurrency={cryptoCurrency}
        isBuy={isBuy}
      />
    </ConfirmRateModal>
  );
};

export const ConfirmDangerRateModal: FC<ConfirmRateChangeProps> = ({
  prevRate,
  nextRate,
  cryptoCurrency,
  isBuy,
  onConfirm,
  onClose,
}) => {
  const t = useSharedT();

  return (
    <ConfirmRateModal
      title={t('trade.start.diff.exchage.header')}
      onClose={onClose}
      onConfirm={onConfirm}
    >
      <DiffExchangeRate
        prevRate={prevRate}
        nextRate={nextRate}
        cryptoCurrency={cryptoCurrency}
        isBuy={isBuy}
      />
    </ConfirmRateModal>
  );
};
