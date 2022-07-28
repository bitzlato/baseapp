import { FC } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { localeDate } from 'web/src/helpers';
import { Spinner } from 'web/src/components/ui/Spinner';
import { TradeStatus } from 'web/src/components/shared/Trade/types';
import { Divider } from 'web/src/components/shared/Divider';
import { useTradeContext } from 'web/src/components/shared/Trade/TradeContext';
import { useAppContext, useLanguage, useUser } from 'web/src/components/app/AppContext';
import { Stepper } from 'web/src/components/Stepper/Stepper';
import { Text } from 'src/components/ui/Text';

export const TradeHistory: FC = () => {
  const { t } = useTradeContext();
  const { trade } = useTradeContext();
  const { isMobileDevice } = useAppContext();
  const user = useUser();
  const lang = useLanguage();

  const date = (timestamp: string) => {
    const userTimezone = user?.bitzlato_user?.user_profile.timezone;
    if (userTimezone) {
      return localeDate(timestamp, 'literalFullDate', lang, userTimezone);
    }
    return localeDate(timestamp, 'literalFullDate');
  };

  const historySteps = trade.history.map((history) => {
    const isCompleted =
      history.status !== trade.status ||
      trade.status === TradeStatus.CONFIRM_PAYMENT ||
      trade.status === TradeStatus.CANCEL;

    const backgroundColor = isCompleted ? 'tradeHistoryItemFilled' : 'tradeHistoryItemUnFilled';

    const timeBlock = () => {
      if (history.status === trade.status) {
        if (trade.status === TradeStatus.CONFIRM_PAYMENT || trade.status === TradeStatus.CANCEL) {
          return (
            <Text color="secondary" fontSize="caption">
              {date(history.date)}
            </Text>
          );
        }

        return (
          <Box display="flex" gap="2x">
            <Spinner size="5x" />

            <Text color="secondary" fontSize="medium">
              {t('trade.history.inprogress')}
            </Text>
          </Box>
        );
      }

      return (
        <Text color="secondary" fontSize="caption">
          {date(history.date)}
        </Text>
      );
    };

    if (isMobileDevice) {
      const backgroundColorMobile = isCompleted
        ? 'tradeMobileHistoryItemFilled'
        : 'tradeMobileHistoryItemUnFilled';

      const borderColorMobile = isCompleted
        ? 'transparent'
        : 'tradeMobileHistoryItemUnFilledBorder';

      return {
        isCompleted,
        key: history.date,
        content: (
          <Box
            backgroundColor={backgroundColorMobile}
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            py="3x"
            px="6x"
            borderRadius="1.5x"
            mb="3x"
            borderColor={borderColorMobile}
            borderWidth="1x"
            borderStyle="solid"
          >
            <Box mb="3x">{timeBlock()}</Box>
            <Text color="tradeMobileHistoryContentColor">
              {t(`trade.history.${history.status}`)}
            </Text>
          </Box>
        ),
      };
    }

    return {
      isCompleted,
      key: history.date,
      content: (
        <Box
          backgroundColor={backgroundColor}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          py="3x"
          px="6x"
          borderRadius="1.5x"
          mb="3x"
          borderColor="tradeHistoryItemFilled"
          borderWidth="1x"
          borderStyle="solid"
          height="full"
        >
          <Text color="secondary" fontSize="medium">
            {t(`trade.history.${history.status}`)}
          </Text>
          <Box>{timeBlock()}</Box>
        </Box>
      ),
    };
  });

  return (
    <Box
      borderRadius="1.5x"
      backgroundColor={isMobileDevice ? 'transparent' : 'tradeHistoryBackground'}
    >
      <Box py="5x" px="4x">
        <Text fontSize="large" color="secondary">
          {t('trade.history.title')}
        </Text>
      </Box>
      <Divider />
      <Box p="6x">
        <Stepper direction="vertical" steps={historySteps} />
      </Box>
    </Box>
  );
};
