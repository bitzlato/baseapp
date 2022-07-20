import { FC } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { Text } from 'web/src/components/ui/Text';
import { useT } from 'web/src/hooks/useT';
import WalletIcon from 'web/src/assets/svg/gift-instructions/WalletIcon.svg';
import CountsIcon from 'web/src/assets/svg/gift-instructions/CountsIcon.svg';
import MoneyIcon from 'web/src/assets/svg/gift-instructions/MoneyIcon.svg';
import GiftIcon from 'web/src/assets/svg/gift-instructions/GiftIcon.svg';
import NavigatorIcon from 'web/src/assets/svg/gift-instructions/NavigatorIcon.svg';
import * as s from './GiftsInstructions.css';

export const GiftsInstructions: FC = () => {
  const t = useT();

  return (
    <Box py="6x" bg="giftsInstructionsBg" borderRadius="1.5x" className={s.container}>
      <Box
        display="flex"
        flexDirection="column"
        gap="3x"
        px="11x"
        pb="5x"
        borderBottomWidth="1x"
        borderBottomStyle="solid"
        borderBottomColor="giftsInstructionsBorder"
      >
        <Text variant="h4">{t('Instruction')}</Text>
        <Text variant="caption" fontWeight="medium">
          {t('gifts.instructionNotice')}
        </Text>
      </Box>

      <Box display="flex" flexDirection="column" gap="3x" px="11x" py="7x">
        <Box display="flex" alignItems="center" gap="6x">
          <WalletIcon />
          <Text>{t('gifts.instruction1')}</Text>
        </Box>
        <Box display="flex" alignItems="center" gap="6x">
          <MoneyIcon />
          <Text>{t('gifts.instruction2')}</Text>
        </Box>
        <Box display="flex" alignItems="center" gap="6x">
          <CountsIcon />
          <Text>{t('gifts.instruction3')}</Text>
        </Box>
        <Box display="flex" alignItems="center" gap="6x">
          <GiftIcon />
          <Text>{t('gifts.instruction4')}</Text>
        </Box>
        <Box display="flex" alignItems="center" gap="6x">
          <NavigatorIcon />
          <Text>{t('gifts.instruction5')}</Text>
        </Box>
      </Box>
    </Box>
  );
};
