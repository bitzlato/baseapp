import { FC } from 'react';
import { Tooltip } from 'web/src/components/ui/Tooltip';
import { Box } from 'web/src/components/ui/Box';
import VerifiedIcon from 'web/src/assets/svg/VerifiedIcon.svg';
import BlockedUserIcon from 'web/src/assets/svg/BlockedUserIcon.svg';
import SuspiciousUserIcon from 'web/src/assets/svg/SuspiciousUserIcon.svg';
import TrustIcon from 'web/src/assets/svg/TrustIcon.svg';
import { UserInfo } from 'web/src/modules/p2p/user.types';
import { useSharedT } from 'web/src/components/shared/Adapter';

interface Props {
  traderInfo: UserInfo;
}

export const TraderIcons: FC<Props> = ({ traderInfo }) => {
  const t = useSharedT();

  return (
    <>
      {traderInfo.verification && (
        <Tooltip label={t('Verified user')} placement="top">
          <div>
            <VerifiedIcon width="14" height="14" />
          </div>
        </Tooltip>
      )}

      {traderInfo.trusted && (
        <Tooltip label={t('Trusted user')} placement="top">
          <Box color="success">
            <TrustIcon />
          </Box>
        </Tooltip>
      )}

      {traderInfo.blocked && (
        <Tooltip label={t('Blocked user')} placement="top">
          <Box color="traderBlocked">
            <BlockedUserIcon width="14" height="14" />
          </Box>
        </Tooltip>
      )}

      {traderInfo.suspicious && (
        <Tooltip label={t('Suspicious user')} placement="top">
          <Box color="traderSuspicious" mt="0.5x">
            <SuspiciousUserIcon width="16" height="16" />
          </Box>
        </Tooltip>
      )}
    </>
  );
};
