import { FC, useCallback, useState } from 'react';
import { useAppContext, useNotificationSubscribe } from 'web/src/components/app/AppContext';
import { Container } from 'web/src/components/ui/Container';
import { Box } from 'web/src/components/ui/Box';
import { useUserAds } from 'web/src/hooks/data/useUserAds';
import { TraderAds } from 'web/src/components/shared/TraderAds/TraderAds';
import { TraderInfo } from 'web/src/components/traderInfo/TraderInfo';
import { useAdapterContext } from 'web/src/components/shared/Adapter';
import { UserChat } from 'web/src/components/traderInfo/UserChat';
import { Notes } from 'web/src/components/traderInfo/Notes';
import { TraderHeaderMobile } from 'web/src/components/traderInfo/TraderHeaderMobile';
import { Breadcrumbs, BreadcrumbsItem } from 'web/src/components/ui/Breadcrumbs';
import { useFetchTraderInfo } from 'web/src/hooks/data/useFetchTraderInfo';
import { Text } from 'web/src/components/ui/Text';
import { Spinner } from 'web/src/components/ui/Spinner';
import { useBlockUser } from 'web/src/hooks/mutations/useBlockUser';
import { useTrustUser } from 'web/src/hooks/mutations/useTrustUser';
import { NotAvailable } from 'web/src/components/traderInfo/NotAvailable';
import { NotificationNewMessage } from 'web/src/lib/socket/types';
import { useSWRConfig } from 'swr';
import { getP2PUserChatEndpoint } from 'web/src/hooks/data/p2p/useFetchP2PUserChat';
import { getP2PUserChatUnreadEndpoint } from 'web/src/hooks/data/p2p/useFetchP2PUserChatUnread';
import * as s from './Trader.css';

interface UrlParams {
  name: string;
}

export const Trader: FC = () => {
  const { mutate } = useSWRConfig();
  const { lang, isMobileDevice, user } = useAppContext();
  const { params, t } = useAdapterContext<UrlParams>();
  const { data = [], error } = useUserAds({ publicName: params.name, lang });
  const traderInfoSWR = useFetchTraderInfo(params.name);
  const traderInfo = traderInfoSWR.data;
  const [singleMode, setSingleMode] = useState('');
  const userBlock = useBlockUser(traderInfoSWR);
  const userTrust = useTrustUser(traderInfoSWR);

  useNotificationSubscribe(
    useCallback(
      (notify) => {
        if (notify.name === 'newChatMessage' && 'tradeId' in notify && notify.tradeId === null) {
          const { from } = notify as NotificationNewMessage;

          mutate(getP2PUserChatEndpoint(from));
          mutate(getP2PUserChatUnreadEndpoint(from));
        }
      },
      [mutate],
    ),
  );

  if (error || traderInfoSWR.error) {
    return null;
  }

  if (!traderInfo) {
    return (
      <Box display="flex" justifyContent="center" py="20x" width="full">
        <Spinner />
      </Box>
    );
  }

  const onSingleMode = (name: string) => {
    setSingleMode(name);
  };

  const handleBlock = () => {
    userBlock({
      publicName: traderInfo.name,
      flag: !traderInfo.blocked,
    });
  };

  const handleTrust = () => {
    userTrust({
      publicName: traderInfo.name,
      flag: !traderInfo.trusted,
    });
  };

  if (singleMode === 'chat' || singleMode === 'notes') {
    const title = `${
      singleMode === 'chat'
        ? t('Chat with', { partner: params.name })
        : t('Notes partner', { partner: params.name })
    }`;

    return (
      <Box
        display="flex"
        position="relative"
        flexDirection="column"
        flexGrow={1}
        height="full"
        mx="3x"
        pb="3x"
        className={s.singleContainer}
      >
        <TraderHeaderMobile
          title={title}
          traderInfo={traderInfo}
          showOnlineStatus={singleMode === 'chat'}
          onGoBack={() => setSingleMode('')}
        />
        {singleMode === 'chat' &&
          (user === undefined || !traderInfo.chatAvailable ? (
            <NotAvailable signin={user === undefined}>
              {!traderInfo.chatAvailable
                ? t('trader.chatUnavailable')
                : t('Sign in to send messages')}
            </NotAvailable>
          ) : (
            <UserChat publicName={params.name} />
          ))}
        {singleMode === 'notes' &&
          (user === undefined ? (
            <NotAvailable>{t('Sign in to save notes')}</NotAvailable>
          ) : (
            <Notes publicName={params.name} />
          ))}
      </Box>
    );
  }

  const traderStats = traderInfo?.dealStats.find((item) => item.cryptocurrency === 'common');
  const trader = (
    <TraderInfo
      traderInfo={traderInfo}
      onSingleMode={onSingleMode}
      onBlock={handleBlock}
      onTrust={handleTrust}
    />
  );
  const ads = <TraderAds data={data} isLoading={!data} />;

  if (isMobileDevice) {
    return (
      <Box display="flex" flexDirection="column" width="full">
        <Box bg="headerBg">{trader}</Box>
        <Box bg="block">{ads}</Box>
      </Box>
    );
  }

  return (
    <Container maxWidth="fullhd">
      <Box px="8x">
        <Breadcrumbs>
          <BreadcrumbsItem to="/p2p">{t('Market')}</BreadcrumbsItem>
          <BreadcrumbsItem>
            {t('Trader profile')} {params.name}
          </BreadcrumbsItem>
        </Breadcrumbs>
      </Box>

      <Box display="flex" px="8x" pb="8x" flexDirection={{ mobile: 'column', desktop: 'row' }}>
        <Box className={s.leftBlock}>{trader}</Box>
        <Box flexGrow={1}>
          <Box className={s.stats}>
            <Box className={s.stat}>
              <Box
                display="flex"
                bg="block"
                borderRadius="1x"
                flexDirection="column"
                justifyContent="space-between"
                px="4x"
                py="5x"
                flexGrow={1}
                height="full"
              >
                <Text variant="label">{t('Successful deals')}</Text>
                <Text as="div" variant="h3">
                  {traderStats?.successDeals}
                </Text>
              </Box>
            </Box>
            <Box className={s.stat}>
              <Box
                display="flex"
                bg="block"
                borderRadius="1x"
                flexDirection="column"
                justifyContent="space-between"
                px="4x"
                py="5x"
                flexGrow={1}
                height="full"
              >
                <Text variant="label">{t('Canceled deals')}</Text>
                <Text as="div" variant="h3">
                  {traderStats?.canceledDeals}
                </Text>
              </Box>
            </Box>
            <Box className={s.stat}>
              <Box
                display="flex"
                bg="block"
                borderRadius="1x"
                flexDirection="column"
                justifyContent="space-between"
                px="4x"
                py="5x"
                flexGrow={1}
                height="full"
              >
                <Text variant="label">{t('Defeat in dispute')}</Text>
                <Text as="div" variant="h3">
                  {traderStats?.defeatInDisputes}
                </Text>
              </Box>
            </Box>
            <Box className={s.stat}>
              <Box
                display="flex"
                bg="block"
                borderRadius="1x"
                flexDirection="column"
                justifyContent="space-between"
                px="4x"
                py="5x"
                flexGrow={1}
                height="full"
              >
                <Text variant="label">{t('Trusted')}</Text>
                <Text as="div" variant="h3">
                  {traderInfo?.trustsCount}
                </Text>
              </Box>
            </Box>
            <Box className={s.stat}>
              <Box
                display="flex"
                bg="block"
                borderRadius="1x"
                flexDirection="column"
                justifyContent="space-between"
                px="4x"
                py="5x"
                flexGrow={1}
                height="full"
              >
                <Text variant="label">{t('Blacklisted')}</Text>
                <Text as="div" variant="h3">
                  {traderInfo?.blacklistedTimes ?? 0}
                </Text>
              </Box>
            </Box>
          </Box>
          {ads}
        </Box>
      </Box>
    </Container>
  );
};
