import { FC, useEffect, useState } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { useT } from 'web/src/hooks/useT';
import { Stack } from 'web/src/components/ui/Stack';
import { Text } from 'web/src/components/ui/Text';
import VerifiedIcon from 'web/src/assets/svg/VerifiedIcon.svg';
import BlockedUserIcon from 'web/src/assets/svg/BlockedUserIcon.svg';
import FavoriteIcon from 'web/src/assets/svg/FavoriteIcon.svg';
import FavoriteIconActive from 'web/src/assets/svg/FavoriteIconActive.svg';
import BlockedUserIconActive from 'web/src/assets/svg/BlockedUserIconActive.svg';
import BlockedStatusIcon from 'web/src/assets/svg/BlockedStatusIcon.svg';
import { useUserInfo } from 'web/src/hooks/useUserInfo';
import { Button } from 'web/src/components/ui/Button';
import { useBlockUser } from 'web/src/hooks/mutations/useBlockUser';
import { useTrustUser } from 'web/src/hooks/mutations/useTrustUser';
import { VariantSwitcher } from 'web/src/components/ui/VariantSwitcher';
import { IconButton } from 'web/src/components/IconButton/IconButton';
import { TraderStats } from 'web/src/components/traderStats/TraderStats';
import { Notes } from './Notes';
import { Deals } from './Deals';
import * as styles from './TraderInfo.css';
import { UserChat } from './UserChat';

interface TraderInfoProps {
  publicName: string;
  onSingleMode?: (name: string) => void;
}

export const TraderInfo: FC<TraderInfoProps> = ({ publicName, onSingleMode }) => {
  const t = useT();
  const [favoriteStatus, setFavoriteStatus] = useState(false);
  const [blockedStatus, setBlockedStatus] = useState(false);
  const [value, setValue] = useState('info');

  const { data } = useUserInfo(publicName);

  const userBlock = useBlockUser();
  const userTrust = useTrustUser();

  useEffect(() => {
    if (data !== undefined) {
      setBlockedStatus(data.blocked);
      setFavoriteStatus(data.trusted);
    }
  }, [data]);

  const onClickBlock = () => {
    userBlock({
      publicName,
      flag: !blockedStatus,
    });

    setBlockedStatus(!blockedStatus);
  };

  const onClickTrust = () => {
    userTrust({
      publicName,
      flag: !favoriteStatus,
    });

    setFavoriteStatus(!favoriteStatus);
  };

  if (!data) return null;

  const isOnline = Date.now() - data.lastActivity < 60000 * 5;

  return (
    <Box display="flex" mb="4x" flexDirection="column" className={styles.sideBlock}>
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
              onClick={onClickBlock}
              className={styles.iconButton[blockedStatus ? 'blocked' : 'default']}
            >
              {blockedStatus ? <BlockedUserIconActive /> : <BlockedUserIcon />}
            </IconButton>
            <IconButton
              onClick={onClickTrust}
              className={styles.iconButton[favoriteStatus ? 'favorited' : 'default']}
            >
              {favoriteStatus ? <FavoriteIconActive /> : <FavoriteIcon />}
            </IconButton>
          </Box>
        </Box>
        <Box display="flex" alignItems="center" mb="5x">
          {isOnline ? (
            <Box width="2x" height="2x" borderRadius="circle" backgroundColor="success" mr="2x" />
          ) : (
            <Box width="2x" height="2x" borderRadius="circle" backgroundColor="warning" mr="2x" />
          )}
          <Text>{isOnline ? t('online') : t('offline')}</Text>
        </Box>
      </Box>

      <Box display={{ mobile: 'none', desktop: 'flex' }}>
        <VariantSwitcher
          target="tabs"
          variants={[
            { label: t('info'), value: 'info' },
            { label: t('chat'), value: 'chat' },
            { label: t('notes'), value: 'notes' },
          ]}
          value={value}
          onChange={setValue}
        />
      </Box>

      <Box display={{ mobile: 'flex', desktop: 'none' }}>
        <Box mr="2x" w="full">
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            onClick={() => onSingleMode?.('chat')}
          >
            {t('chat')}
          </Button>
        </Box>
        <Box w="full">
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            onClick={() => onSingleMode?.('notes')}
          >
            {t('notes')}
          </Button>
        </Box>
      </Box>

      <Box display="flex" position="relative" flexDirection="column" flexGrow={1}>
        {data && value === 'info' && (
          <>
            <Box mt="4x" mb="4x" display="flex">
              <TraderStats publicName={publicName} showBasicOnly />
            </Box>
            <Deals data={data.dealStats} />
          </>
        )}
        {value === 'chat' && <UserChat publicName={publicName} />}
        {value === 'notes' && <Notes publicName={publicName} />}
      </Box>
    </Box>
  );
};
