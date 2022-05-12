import { FC } from 'react';
import { useT } from 'src/hooks/useT';
import { Box } from 'src/components/Box';
import { WarningIcon } from 'web/src/mobile/assets/images/WarningIcon';

export const DepositWarning: FC = () => {
  const t = useT();

  return (
    <Box col spacing>
      <Box row spacing>
        <WarningIcon />
        <Box textColor="warning" textSize="lg">
          {t('page.body.wallets.tabs.deposit.ccy.message.warning')}
        </Box>
      </Box>
      <Box row spacing>
        <WarningIcon />
        <Box textColor="warning" textSize="lg">
          {t('deposit.contract')}
        </Box>
      </Box>
    </Box>
  );
};
