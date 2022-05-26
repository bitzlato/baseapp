import { FC, useEffect, useState } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { useT } from 'web/src/hooks/useT';
import { Stack } from 'web/src/components/ui/Stack';
import { Text } from 'web/src/components/ui/Text';
import LikeIcon from 'web/src/assets/svg/LikeIcon.svg';
import UnLikeIcon from 'web/src/assets/svg/UnLikeIcon.svg';
import VerifiedIcon from 'web/src/assets/svg/VerifiedIcon.svg';
import BlockedUserIcon from 'web/src/assets/svg/BlockedUserIcon.svg';
import FavoriteIcon from 'web/src/assets/svg/FavoriteIcon.svg';
import BlockedUserIconActive from 'web/src/assets/svg/BlockedUserIconActive.svg';
import BlockedStatusIcon from 'web/src/assets/svg/BlockedStatusIcon.svg';
import cn from 'classnames';
import { useFetchUser } from 'web/src/hooks/data/useFetchP2PUser';
import { Notes } from './Notes';
import { Chat } from './Chat';
import { Deals } from './Deals';
import { Stat, StatLabel } from '../ui/Stat';
import { VariantSwitcher } from '../ui/VariantSwitcher';
import * as styles from './TraderInfo.css';
import { IconButton } from '../IconButton/IconButton';
import { TrustedButton } from './TrustedButton';

interface TraderInfoProps {
  publicName: string;
}

export const TraderInfo: FC<TraderInfoProps> = ({ publicName }) => {
  const t = useT();
  const [favoriteStatus, setFavoriteStatus] = useState(false);
  const [blockedStatus, setBlockedStatus] = useState(false);
  const [value, setValue] = useState('info');

  const { data } = useFetchUser(publicName);

  useEffect(() => {
    if (data !== undefined) {
      setBlockedStatus(Boolean(data.blocked));
    }
  }, [data]);

  if (!data) return null;

  const isOnline = Date.now() - data.lastActivity < 60000 * 5;

  return (
    <Box
      p="3x"
      display="flex"
      flexDirection="column"
      backgroundColor="dropdown"
      className={styles.sideBlock}
    >
      <Box mb="4x" pb="4x" borderBottomWidth="1x" borderColor="traderBorder" borderStyle="solid">
        <Text variant="title" fontWeight="regular">
          {t('trader.block.profileTrader')}
        </Text>
      </Box>
      <Box mb="2x">
        <Box display="flex" justifyContent="space-between" mb="2x">
          <Stack display="flex" marginRight="2x" alignItems="center">
            <Text variant="h5" fontWeight="regular">
              {data.name}
            </Text>
            {data && data.trusted && <VerifiedIcon />}
            {favoriteStatus && <FavoriteIcon />}
            {blockedStatus && <BlockedStatusIcon />}
          </Stack>
          <Box display="flex" alignItems="stretch" justifyContent="space-between">
            <IconButton
              onClick={() => setBlockedStatus(!blockedStatus)}
              className={cn(styles.iconButton, blockedStatus && styles.blocked)}
            >
              {blockedStatus ? <BlockedUserIconActive /> : <BlockedUserIcon />}
            </IconButton>
            <TrustedButton
              onClick={() => setFavoriteStatus(!favoriteStatus)}
              trusted={favoriteStatus}
            />
          </Box>
        </Box>
        <Box display="flex" alignItems="center" mb="5x">
          {isOnline ? (
            <Box width="2x" height="2x" borderRadius="circle" backgroundColor="success" mr="2x" />
          ) : (
            <Box width="2x" height="2x" borderRadius="circle" backgroundColor="warning" mr="2x" />
          )}
          <Text>{isOnline ? t('trader.block.online') : t('trader.block.offline')}</Text>
        </Box>
      </Box>

      <VariantSwitcher
        target="tabs"
        variants={[
          { label: t('trader.block.tabInfo'), value: 'info' },
          { label: t('trader.block.tabChat'), value: 'chat' },
          { label: t('trader.block.tabNotes'), value: 'notes' },
        ]}
        value={value}
        onChange={setValue}
      />

      <Box display="flex" position="relative" flexDirection="column" flexGrow={1}>
        {data && value === 'info' && (
          <>
            <Box mt="4x" mb="4x" display="flex" alignItems="stretch" justifyContent="space-between">
              <Box display="flex" w="full" mr="2x">
                <Stat>
                  <StatLabel>{t('trader.block.rating')}</StatLabel>
                  <Box mb="2x">
                    <Text textAlign="right">{data.rating}</Text>
                  </Box>
                  <Box display="flex" alignItems="center" justifyContent="flex-end">
                    <LikeIcon />
                    <Box ml="2x" mr="4x">
                      <Text>118</Text>
                    </Box>
                    <UnLikeIcon />
                    <Box ml="2x">
                      <Text>15</Text>
                    </Box>
                  </Box>
                </Stat>
              </Box>
              <Box display="flex" w="full">
                <Stat>
                  <StatLabel>{t('trader.block.reputation')}</StatLabel>
                  <Text textAlign="right" variant="lead">
                    {data.safetyIndex}
                  </Text>
                </Stat>
              </Box>
            </Box>
            <Deals data={data.dealStats} />
          </>
        )}
        {value === 'chat' && <Chat />}
        {value === 'notes' && <Notes />}
      </Box>
    </Box>
  );
};
