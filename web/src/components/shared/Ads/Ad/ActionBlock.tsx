import { FC, ReactNode } from 'react';
import { useAppContext } from 'web/src/components/app/AppContext';
import { Box } from 'web/src/components/ui/Box';
import { Text } from 'web/src/components/ui/Text';
import WarningTriangleIcon from 'web/src/assets/svg/WarningTriangleIcon.svg';
import { Button } from 'web/src/components/ui/Button';
import { useAdapterContext } from 'web/src/components/shared/Adapter';

const WarningBlockMobile: FC = ({ children }) => (
  <Box
    bg="paginationItemBgHover"
    display="flex"
    flexDirection="column"
    py="13x"
    justifyContent="center"
    alignItems="center"
    textAlign="center"
    borderRadius="1.5x"
    mt="5x"
  >
    <WarningTriangleIcon />
    <Text>{children}</Text>
  </Box>
);

const WarningBlock: FC = ({ children }) => (
  <Box
    display="flex"
    flexDirection="column"
    flexWrap="wrap"
    px="5x"
    justifyContent="center"
    alignItems="center"
    textAlign="center"
    borderRadius="1.5x"
  >
    <WarningTriangleIcon />
    <Text>{children}</Text>
  </Box>
);

type Props = {
  available: boolean;
  unactiveReason: string;
  inputsEl: ReactNode;
  startTradeEnabled: boolean | '';
  isBuy: boolean;
  handleClickStart: () => void;
};

export const ActionBlock: FC<Props> = ({
  available,
  unactiveReason,
  inputsEl,
  startTradeEnabled,
  isBuy,
  handleClickStart,
}) => {
  const { isMobileDevice, user } = useAppContext();
  const { t, history } = useAdapterContext();

  const handleSignIn = () => history.push('/signin'.concat(`?back=${history.location.pathname}`));

  const isLogged = user !== undefined;

  let reason: string;
  switch (unactiveReason) {
    case 'blacklisted':
      reason = t('reasonBlacklisted');
      break;
    case 'partner_not_enough_funds':
      reason = t('reasonPartnerNotEnoughFunds');
      break;
    case 'not_enough_funds':
      reason = t('reasonNotEnoughFunds');
      break;
    case 'verified_only':
      reason = t('reasonVerifiedOnly');
      break;
    case 'trade_with_yourself':
      reason = t('reasonTradeWithYourself');
      break;
    case 'blacklisted_by_you':
      reason = t('reasonBlacklistedByYou');
      break;
    default:
      reason = t('notAvailable');
  }

  if (isMobileDevice) {
    if (!available) {
      return <WarningBlockMobile>{reason}</WarningBlockMobile>;
    }

    if (!isLogged) {
      return (
        <Box mt="5x" bg="paginationItemBgHover" display="flex" py="6x" borderRadius="1.5x">
          <Box m="auto" textAlign="center" display="flex" flexDirection="column" gap="6x">
            <Box px="15x">
              <Text>{t('LoginToMakeTrade')}</Text>
            </Box>
            <Box>
              <Button onClick={handleSignIn}>{t('Sign In')}</Button>
            </Box>
          </Box>
        </Box>
      );
    }

    return null;
  }

  if (!available) {
    return (
      <Box flex={1} m="auto">
        <WarningBlock>{reason}</WarningBlock>
      </Box>
    );
  }

  if (!isLogged) {
    return (
      <Box flex={1} display="flex">
        <Box m="auto" textAlign="center" display="flex" flexDirection="column" gap="6x">
          <Box px="25x">
            <Text>{t('LoginToMakeTrade')}</Text>
          </Box>
          <Box>
            <Button onClick={handleSignIn}>{t('Sign In')}</Button>
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box flex={1} display="flex" flexDirection="column" gap="4x" position="relative">
      {inputsEl}
      <Button
        data-gtm-click={isBuy ? 'start_deal_buy' : 'start_deal_sell'}
        disabled={!startTradeEnabled}
        onClick={handleClickStart}
      >
        {t('Start trade')}
      </Button>
    </Box>
  );
};
