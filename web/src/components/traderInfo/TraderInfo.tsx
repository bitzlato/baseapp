import { FC, useState } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { Text } from 'web/src/components/ui/Text';
import { Button } from 'web/src/components/ui/Button';
import { VariantSwitcher } from 'web/src/components/ui/VariantSwitcher';
import { Stat, StatLabel } from 'web/src/components/ui/Stat';
import ThumbUp from 'web/src/assets/svg/ThumbUp.svg';
import ThumbDown from 'web/src/assets/svg/ThumbDown.svg';
import { Card, CardHeader } from 'web/src/components/ui/Card';
import { OnlineStatusByLastActivity } from 'web/src/components/ui/OnlineStatus';
import { useSharedT } from 'web/src/components/shared/Adapter';
import { ActionOnTraderButton } from 'web/src/components/p2p/ActionOnTraderButton';
import { useIsMobileDevice, useUser } from 'web/src/components/app/AppContext';
import { formatRating } from 'web/src/helpers/formatRating';
import { CollapsibleBox } from 'web/src/components/collapsibleBox/CollapsibleBox';
import { UserInfo } from 'web/src/modules/p2p/user.types';
import { NotAvailable } from 'web/src/components/traderInfo/NotAvailable';
import { TraderIcons } from 'web/src/components/traderInfo/TraderIcons';
import { UserUnreadChatMessages } from 'web/src/components/traderInfo/UserUnreadChatMessages';
import { Notes } from './Notes';
import { Deals } from './Deals';
import { UserChat } from './UserChat';
import * as s from './TraderInfo.css';

interface TraderInfoProps {
  traderInfo: UserInfo;
  onSingleMode?: (name: string) => void;
  onBlock: () => void;
  onTrust: () => void;
}

export const TraderInfo: FC<TraderInfoProps> = ({ traderInfo, onSingleMode, onBlock, onTrust }) => {
  const isMobileDevice = useIsMobileDevice();
  const user = useUser();
  const t = useSharedT();
  const [value, setValue] = useState('info');

  const yourself = user && user.bitzlato_user?.id === traderInfo.id;
  const canActionOnTrader = user && !yourself;

  const [thumbUp, thumbDown] = (traderInfo.feedbacks ?? []).reduce<[number, number]>(
    (acc, item) => {
      if (item.type === 'thumb_up') {
        acc[0] = item.count;
      } else {
        acc[1] = item.count;
      }

      return acc;
    },
    [0, 0],
  );

  const traderStats = traderInfo.dealStats.find((item) => item.cryptocurrency === 'common');
  const tabs = isMobileDevice ? (
    <Box display="flex" gap="3x">
      <Box w="full">
        <Button
          variant="outlined"
          color="secondary"
          fullWidth
          onClick={() => onSingleMode?.('notes')}
        >
          {t('Notes')}
        </Button>
      </Box>
      <Box w="full">
        <Button color="secondary" fullWidth onClick={() => onSingleMode?.('chat')}>
          {t('Chat')}

          <Box as="span" ml="2x">
            <UserUnreadChatMessages publicName={traderInfo.name} />
          </Box>
        </Button>
      </Box>
    </Box>
  ) : (
    <VariantSwitcher
      target="tabs"
      variants={[
        { label: t('Information'), value: 'info' },
        {
          label: (
            <>
              {t('Chat')}
              {value !== 'chat' && (
                <Box as="span" ml="2x">
                  <UserUnreadChatMessages publicName={traderInfo.name} />
                </Box>
              )}
            </>
          ),
          value: 'chat',
        },
        { label: t('Notes'), value: 'notes' },
      ]}
      value={value}
      onChange={setValue}
    />
  );
  const body = (
    <Box display="flex" flexDirection="column" py={{ mobile: '4x', tablet: '5x' }} px="5x">
      <Box mb="2x">
        <Box display="flex" justifyContent="space-between" mb="2x">
          <Box>
            <Box display="flex" alignItems="center" gap="2x" mb="2x">
              <Text variant="label" fontWeight={isMobileDevice ? 'regular' : 'strong'}>
                {traderInfo.name}
              </Text>

              <TraderIcons traderInfo={traderInfo} />
            </Box>
            <OnlineStatusByLastActivity lastActivity={traderInfo.lastActivity} />
          </Box>
          {canActionOnTrader && (
            <Box display="flex" alignItems="stretch" justifyContent="space-between">
              <ActionOnTraderButton
                variant="block"
                active={traderInfo.blocked ?? false}
                title={t('Block')}
                activeTitle={t('Unblock')}
                onClick={onBlock}
              />
              <ActionOnTraderButton
                variant="trust"
                active={traderInfo.trusted ?? false}
                title={t('Add to the list of trusted')}
                activeTitle={t('Remove from the list of trusted')}
                onClick={onTrust}
              />
            </Box>
          )}
        </Box>
      </Box>

      {!yourself && tabs}

      <Box display="flex" position="relative" flexDirection="column" flexGrow={1}>
        {value === 'info' && (
          <>
            {isMobileDevice ? (
              <Box my="4x">
                <CollapsibleBox
                  visible={
                    <>
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        py="2x"
                      >
                        <Text variant="label" fontWeight="strong">
                          {t('Rating')}
                        </Text>
                        <Box display="flex" alignItems="center">
                          <Box display="flex" alignItems="center" gap="2x" mr="6x">
                            <Box as={ThumbUp} color="statIcon" />
                            <Text fontSize="medium">{thumbUp}</Text>
                            <Box as={ThumbDown} color="statIcon" />
                            <Text fontSize="medium">{thumbDown}</Text>
                          </Box>
                          <Text fontSize="medium">{traderInfo.rating}</Text>
                        </Box>
                      </Box>
                      <Box display="flex" w="full" justifyContent="space-between" py="2x">
                        <Text variant="label" fontWeight="strong">
                          {t('Successful deals')}
                        </Text>
                        <Text fontSize="medium">{traderStats?.successDeals}</Text>
                      </Box>
                      <Box display="flex" w="full" justifyContent="space-between" py="2x">
                        <Text variant="label" fontWeight="strong">
                          {t('Canceled deals')}
                        </Text>
                        <Text fontSize="medium">{traderStats?.canceledDeals}</Text>
                      </Box>
                    </>
                  }
                  hidden={
                    <>
                      <Box display="flex" w="full" justifyContent="space-between" py="2x">
                        <Text variant="label" fontWeight="strong">
                          {t('Defeat in dispute')}
                        </Text>
                        <Text fontSize="medium">{traderStats?.defeatInDisputes}</Text>
                      </Box>
                      <Box display="flex" w="full" justifyContent="space-between" py="2x">
                        <Text variant="label" fontWeight="strong">
                          {t('Trusted')}
                        </Text>
                        <Text fontSize="medium">{traderInfo.trustsCount}</Text>
                      </Box>
                      <Box display="flex" justifyContent="space-between" w="full" py="2x">
                        <Text variant="label" fontWeight="strong">
                          {t('Blacklisted')}
                        </Text>
                        <Text fontSize="medium">{traderInfo.blacklistedTimes ?? 0}</Text>
                      </Box>
                    </>
                  }
                />
              </Box>
            ) : (
              <Box my="4x" display="flex" gap="4x">
                <Box width="full">
                  <Stat>
                    <StatLabel>{t('Rating')}</StatLabel>
                    <Text
                      as="div"
                      variant="title"
                      textOverflow="ellipsis"
                      textAlign="right"
                      title={traderInfo.rating.toString()}
                    >
                      {formatRating(traderInfo.rating.toString())}
                    </Text>
                  </Stat>
                </Box>
                <Box width="full">
                  <Stat>
                    <StatLabel>{t('Comments')}</StatLabel>
                    <Box display="flex" justifyContent="flex-end" flexWrap="wrap" gap="5x">
                      <Box display="flex" alignItems="center">
                        <Box color="statIcon" display="flex" alignItems="center" mr="2x">
                          <ThumbUp />
                        </Box>
                        <Text variant="label">{thumbUp}</Text>
                      </Box>

                      <Box display="flex" alignItems="center">
                        <Box color="statIcon" display="flex" alignItems="center" mr="2x">
                          <ThumbDown />
                        </Box>
                        <Text variant="label">{thumbDown}</Text>
                      </Box>
                    </Box>
                  </Stat>
                </Box>
              </Box>
            )}
            <Deals deals={traderInfo.dealStats} />
          </>
        )}
        {value === 'chat' &&
          (user === undefined ? (
            <NotAvailable signin>{t('Sign in to send messages')}</NotAvailable>
          ) : (
            <Box className={s.tabBody} pt="4x">
              <UserChat publicName={traderInfo.name} available={traderInfo.chatAvailable ?? true} />
            </Box>
          ))}
        {value === 'notes' &&
          (user === undefined ? (
            <NotAvailable signin>{t('Sign in to save notes')}</NotAvailable>
          ) : (
            <div className={s.tabBody}>
              <Notes publicName={traderInfo.name} />
            </div>
          ))}
      </Box>
    </Box>
  );

  return (
    <Card display="flex" flexDirection="column">
      <CardHeader>{t('Trader profile')}</CardHeader>
      {body}
    </Card>
  );
};
