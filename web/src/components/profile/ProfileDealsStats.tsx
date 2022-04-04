import { FC, useState } from 'react';
import { Modal, ModalBody, ModalHeader } from 'web/src/components/ui/Modal';
import { Box } from 'web/src/components/ui/Box';
import { Text } from 'web/src/components/ui/Text';
import { useTradeStats } from 'web/src/hooks/data/useFetchTradeStatistics';
import { MoneyFormat } from 'web/src/components/MoneyFormat/MoneyFormat';
import { useSelector } from 'react-redux';
import { selectMobileDeviceState } from 'web/src/modules/public/globalSettings/selectors';
import { Stack } from 'web/src/components/ui/Stack';
import { useT } from 'web/src/hooks/useT';

export const ProfileDealsStats: FC = () => {
  const t = useT();
  const isMobileDevice = useSelector(selectMobileDeviceState);
  const { data: tradeStats } = useTradeStats();
  const [open, setOpen] = useState(false);

  if (!tradeStats || tradeStats.totalDeals === 0) {
    return null;
  }

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  if (isMobileDevice) {
    return (
      <Stack direction="column" marginBottom="4x">
        {tradeStats.stats.map(
          (tradeStat) =>
            tradeStat.totalDeals > 0 && (
              <Box key={tradeStat.totalMoney.currency.code} color="textMuted">
                {tradeStat.totalDeals} {t('profile.deals_stat')}{' '}
                <Text as="span" fontWeight="strong" color="textMuted">
                  <MoneyFormat money={tradeStat.totalMoney} />
                </Text>
              </Box>
            ),
        )}
      </Stack>
    );
  }

  return (
    <>
      <Box
        as="button"
        type="button"
        color="textHighlighted"
        fontSize="small"
        fontWeight="strong"
        textDecoration={{ default: 'none', hover: 'underline' }}
        onClick={handleClick}
      >
        {t('Show all')}
      </Box>
      <Modal show={open} onClose={handleClick}>
        <ModalHeader>{t('Deals completed')}</ModalHeader>
        <Box
          mb="6x"
          pb="6x"
          px="6x"
          borderBottomWidth="1x"
          borderBottomColor="modalHeaderBorderBottom"
          borderBottomStyle="solid"
        >
          <Text as="span" variant="h1">
            {tradeStats.totalDeals}
          </Text>
        </Box>
        <ModalBody>
          {tradeStats.stats.map((tradeStat) => (
            <Box
              key={tradeStat.totalMoney.currency.code}
              display="flex"
              justifyContent="space-between"
              mb="4x"
            >
              <div>
                {tradeStat.totalDeals} {t('profile.deals_stat')}
              </div>
              <Text as="span" fontWeight="strong">
                <MoneyFormat money={tradeStat.totalMoney} />
              </Text>
            </Box>
          ))}
        </ModalBody>
      </Modal>
    </>
  );
};
