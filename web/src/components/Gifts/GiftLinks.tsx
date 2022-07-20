import { FC } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { Text } from 'web/src/components/ui/Text';
import { CopyField } from 'web/src/components/Gifts/CopyField';
import { useT } from 'web/src/hooks/useT';
import { P2PVoucherLink } from 'web/src/modules/account/voucher-types';

interface Props {
  links: P2PVoucherLink[];
}

export const GiftLinks: FC<Props> = ({ links }) => {
  const t = useT();
  const telegramLink = links.find((link) => link.type.indexOf('telegram') > -1)?.url;
  const appLink = links.find((link) => link.type.indexOf('web') > -1)?.url;

  return (
    <Box display="flex" flexDirection="column" gap="3x" width="full">
      {telegramLink ? (
        <Box>
          <Box as={Text} mb="0.5x">
            {t('gifts.forBot')}:
          </Box>
          <CopyField value={telegramLink} />
        </Box>
      ) : null}

      {appLink ? (
        <Box>
          <Box as={Text} mb="0.5x">
            {t('gifts.forApp')}:
          </Box>
          <CopyField value={appLink} />
        </Box>
      ) : null}
    </Box>
  );
};
