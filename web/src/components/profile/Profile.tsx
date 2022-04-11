import { FC } from 'react';
import { Container } from 'web/src/components/Container/Container';
import { useT } from 'web/src/hooks/useT';
import { Card } from 'web/src/components/Card/Card';
import { Box } from 'web/src/components/ui/Box';
import { Text } from 'web/src/components/ui/Text';
import { Stack } from 'web/src/components/ui/Stack';
import { Stat, StatLabel, StatValue } from 'web/src/components/ui/Stat';
import { useSelector } from 'react-redux';
import { selectUserInfo } from 'web/src/modules/user/profile/selectors';
import ThumbUp from 'web/src/assets/svg/ThumbUp.svg';
import ThumbDown from 'web/src/assets/svg/ThumbDown.svg';
import WarningCircleIcon from 'web/src/assets/svg/WarningCircleIcon.svg';
import { useTradeStats } from 'web/src/hooks/data/useFetchTradeStatistics';
import { Skeleton } from 'web/src/components/ui/Skeleton';
import { selectMobileDeviceState } from 'web/src/modules/public/globalSettings/selectors';
import { useFetchSessionsMe } from 'web/src/hooks/data/useFetchSessionsMe';
import { parseNumeric } from 'web/src/helpers/parseNumeric';
import ReportIcon from 'web/src/assets/svg/ReportIcon.svg';
import { ProfileDealsStats } from './ProfileDealsStats';
import * as s from './Profile.css';
import { ProfileVerification } from './ProfileVerification';
import { ProfileReferalLinks } from './ProfileReferralLinks';
import { ProfileSwitchAccount } from './ProfileSwitchAccount';
import { FreezeAccount } from './FreezeAccount';
import { ChangePublicName } from './ChangePublicName';
import { ChangePassword } from './ChangePassword';

const formatRating = (rating: string) =>
  parseNumeric(rating, {
    maxFractionDigits: 4,
    allowNegativeNumeric: true,
  });

export const Profile: FC = () => {
  const t = useT();
  const title = t('page.body.profile.header.account');
  const user = useSelector(selectUserInfo);
  const isMobileDevice = useSelector(selectMobileDeviceState);
  const swr = useTradeStats();
  const { data: sessionsMe } = useFetchSessionsMe();

  if (swr.error) {
    return null; // TODO: Add throw and error boundary screen
  }

  const { bitzlato_user: bitzlatoUser } = user;

  const body = (
    <Card header={!isMobileDevice ? <h4>{title}</h4> : undefined}>
      <Box
        display="flex"
        flexDirection={isMobileDevice ? 'column' : 'row'}
        mb={isMobileDevice ? '4x' : '7x'}
      >
        <Box flexGrow={1} mr={isMobileDevice ? '0' : '4x'} mb={isMobileDevice ? '4x' : '0'}>
          {bitzlatoUser && (
            <Box display="flex" alignItems="center" pb="2x">
              <Text variant="h4" className={s.publicName}>
                {bitzlatoUser.user_profile.public_name ?? bitzlatoUser.user_profile.generated_name}
              </Text>
              {bitzlatoUser?.user_profile.public_name === null && <ChangePublicName />}
            </Box>
          )}

          <Box mb="2x">
            <Text variant={isMobileDevice ? 'label' : 'title'} color="textMuted">
              {user.email}
            </Text>
          </Box>
          <Text variant="label" color="textMuted">
            UID: {user.uid} {sessionsMe && `(${sessionsMe.auth_sub})`}
          </Text>
        </Box>

        <Text>
          {user.account_statements_url && (
            <Box
              as="a"
              href={user.account_statements_url}
              target="_blank"
              rel="noopener noreferrer"
              display="flex"
              alignItems="center"
              color={{ default: 'text', hover: 'textHighlighted' }}
              textDecoration={{ hover: 'none' }}
            >
              <Box mr="2x">
                <ReportIcon />
              </Box>
              {t('Account Statement')}
            </Box>
          )}
        </Text>
      </Box>
      <Box mb="7x">
        <Stack
          direction={{ mobile: 'column', tablet: 'row' }}
          marginBottom={{ mobile: '3x', tablet: '0' }}
          marginRight={{ mobile: '0', tablet: '3x' }}
        >
          {user.available_auth_subjects.length >= 2 && (
            <ProfileSwitchAccount
              authSubjects={user.available_auth_subjects}
              currentSubject={sessionsMe?.auth_sub}
            />
          )}

          <ProfileReferalLinks />
          <ChangePassword />
          {user.bitzlato_user && (
            <FreezeAccount isSelfFrozen={user.bitzlato_user.user_profile.self_frozen} />
          )}
        </Stack>
      </Box>
      <Box className={s.stats} mb={isMobileDevice ? '8x' : undefined}>
        <div className={s.stat}>
          <Stat>
            {!bitzlatoUser?.user_profile.suspicious ? (
              <ProfileVerification
                status={bitzlatoUser?.user_profile.verified ?? false}
                url={user.kyc_verification_url}
              />
            ) : (
              <>
                <Box display="flex" justifyContent="center" mb="6x">
                  <WarningCircleIcon />
                </Box>
                <Text variant="label" color="warning" fontWeight="strong" textAlign="center">
                  {t('profile.verification_suspicious')}
                </Text>
              </>
            )}
          </Stat>
        </div>
        {!isMobileDevice && (
          <>
            <div className={s.stat}>
              <Stat>
                <StatLabel>{t('Rating')}</StatLabel>
                <Text
                  as="div"
                  variant="h3"
                  textOverflow="ellipsis"
                  title={bitzlatoUser?.user_profile.rating}
                >
                  {bitzlatoUser ? formatRating(bitzlatoUser.user_profile.rating) : '-'}
                </Text>
              </Stat>
            </div>
            <div className={s.stat}>
              <Stat>
                <StatLabel>{t('Comments')}</StatLabel>
                <Stack display="flex" marginRight="5x">
                  <>
                    <Box color="statIcon" display="flex" alignItems="center" mr="2x">
                      <ThumbUp />
                    </Box>
                    <Text variant="h3" as="div">
                      {swr.data?.totalPositiveFeedbacksCount ?? <Skeleton w="10x" />}
                    </Text>
                  </>

                  <>
                    <Box color="statIcon" display="flex" alignItems="center" mr="2x">
                      <ThumbDown />
                    </Box>
                    <Text variant="h3" as="div">
                      {swr.data?.totalNegativeFeedbacksCount ?? <Skeleton w="10x" />}
                    </Text>
                  </>
                </Stack>
              </Stat>
            </div>
            <div className={s.stat}>
              <Stat>
                <StatLabel>{t('Deals completed')}</StatLabel>
                {swr.data ? (
                  <Box display="flex" justifyContent="space-between" alignItems="flex-end">
                    <Text variant="h3" as="div">
                      {swr.data.totalDeals}
                    </Text>
                    <ProfileDealsStats />
                  </Box>
                ) : (
                  <StatValue>
                    <Skeleton />
                  </StatValue>
                )}
              </Stat>
            </div>
          </>
        )}
      </Box>
      {isMobileDevice && (
        <Stack direction="column" marginBottom="4x">
          <Box display="flex" justifyContent="space-between">
            <Text variant="label">{t('Rating')}</Text>
            <Text variant="label" fontWeight="strong">
              {bitzlatoUser ? formatRating(bitzlatoUser.user_profile.rating) : '-'}
            </Text>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Text variant="label">{t('Comments')}</Text>
            <Stack display="flex" marginRight="5x">
              <>
                <Box color="statIcon" display="flex" alignItems="center" mr="2x">
                  <ThumbUp />
                </Box>
                <Text variant="label" fontWeight="strong">
                  {swr.data?.totalPositiveFeedbacksCount ?? <Skeleton w="5x" />}
                </Text>
              </>

              <>
                <Box color="statIcon" display="flex" alignItems="center" mr="2x">
                  <ThumbDown />
                </Box>
                <Text variant="label" fontWeight="strong">
                  {swr.data?.totalNegativeFeedbacksCount ?? <Skeleton w="5x" />}
                </Text>
              </>
            </Stack>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Text variant="label">{t('Deals completed')}</Text>
            {swr.data ? (
              <Text variant="label" fontWeight="strong">
                {swr.data.totalDeals}
              </Text>
            ) : (
              <Skeleton w="5x" />
            )}
          </Box>
          <ProfileDealsStats />
        </Stack>
      )}
    </Card>
  );

  return isMobileDevice ? (
    <Box my="1x" w="full">
      {body}
    </Box>
  ) : (
    <Container maxWidth="xl" my="4">
      {body}
    </Container>
  );
};
