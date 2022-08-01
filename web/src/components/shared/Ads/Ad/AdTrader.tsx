import { FC } from 'react';
import { useAppContext } from 'web/src/components/app/AppContext';
import { TraderIcons } from 'web/src/components/traderInfo/TraderIcons';
import { Box } from 'web/src/components/ui/Box';
import { OnlineStatusByLastActivity } from 'web/src/components/ui/OnlineStatus';
import { UserInfo } from 'web/src/modules/p2p/user.types';
import { useAdapterContext } from 'web/src/components/shared/Adapter';
import { getLinkToP2PUser } from 'web/src/components/shared/Ads/getLinkToP2PUser';

type Props = {
  trader: UserInfo;
};

export const AdTrader: FC<Props> = ({ trader }) => {
  const { Link } = useAdapterContext();
  const { lang } = useAppContext();

  return (
    <Box>
      <Box display="flex" alignItems="center" gap="2x">
        <Box
          as={Link}
          to={getLinkToP2PUser({ lang, userName: trader.name })}
          color={{ default: 'adTrader', hover: 'adTrader' }}
          display="block"
          textOverflow="ellipsis"
          fontWeight="strong"
          fontSize="lead"
        >
          {trader.name}
        </Box>
        <TraderIcons traderInfo={trader} />
      </Box>
      <OnlineStatusByLastActivity lastActivity={trader.lastActivity} />
    </Box>
  );
};
