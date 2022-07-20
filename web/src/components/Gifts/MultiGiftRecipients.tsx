import { FC, Fragment, useMemo } from 'react';
import { v4 } from 'uuid';
import { useSelector } from 'react-redux';
import { selectUserInfo } from 'web/src/modules/user/profile/selectors';
import { selectCurrentLanguage } from 'web/src/modules/public/i18n/selectors';
import { P2PVoucher } from 'web/src/modules/account/voucher-types';
import { useT } from 'web/src/hooks/useT';
import { Box } from 'web/src/components/ui/Box';
import { Text } from 'web/src/components/ui/Text';
import { Table, TableBody, TableHeader, TableRow } from 'web/src/components/Gifts/Table';
import { TableColumn, TableHeaderColumn } from 'web/src/components/Gifts/TableColumn';
import { useFetchVoucher } from 'web/src/hooks/data/useFetchVouchers';
import { useP2PCryptoCurrencies } from 'web/src/hooks/useP2PCryptoCurrencies';
import { createMoney } from 'web/src/helpers/money';
import { localeDate } from 'web/src/helpers/localeDate';
import { useIsMobileDevice } from 'web/src/components/app/AppContext';
import * as s from './MultiGiftRecipients.css';

const MOBILE_MAX_ROWS = 3;
const DESKTOP_MAX_COLUMNS = 3;

const groupArrayByCount = <T,>(arr: Array<T>, count: number) => {
  return arr.reduce<T[][]>((acc, curr) => {
    let lastItem = acc[acc.length - 1];
    const rest = acc.slice(0, -1) ?? [];

    if (!lastItem) {
      lastItem = [];
    }

    if (lastItem.length === count) {
      rest.push(lastItem);
      lastItem = [];
    }

    if (lastItem.length < count) {
      lastItem.push(curr);
    }

    return [...rest, lastItem];
  }, []);
};

interface Props {
  deepLinkCode: P2PVoucher['deepLinkCode'];
  showBalances?: boolean | undefined;
}

export const MultiGiftRecipients: FC<Props> = ({ deepLinkCode, showBalances = true }) => {
  const t = useT();
  const lang = useSelector(selectCurrentLanguage);
  const user = useSelector(selectUserInfo);
  const isMobileDevice = useIsMobileDevice();
  const { data } = useFetchVoucher({ code: deepLinkCode });
  const { getCryptoCurrency } = useP2PCryptoCurrencies();
  const holdAmountMoney = data?.holdAmount
    ? createMoney(data?.holdAmount.amount, getCryptoCurrency(data?.holdAmount.code)).toString()
    : null;
  const cashedUsers = useMemo(() => {
    if (isMobileDevice || !data?.cashedBy) {
      return [];
    }

    const remainder = data.cashedBy.length % DESKTOP_MAX_COLUMNS;
    const emptyItems = Array.from<string>({
      length: remainder === 0 ? 0 : DESKTOP_MAX_COLUMNS - remainder,
    }).map(() => v4());

    return groupArrayByCount([...data.cashedBy, ...emptyItems], DESKTOP_MAX_COLUMNS);
  }, [isMobileDevice, data?.cashedBy]);

  const cashedUsersMobile = useMemo(() => {
    if (!isMobileDevice || !data?.cashedBy) {
      return [];
    }

    return groupArrayByCount(data.cashedBy, MOBILE_MAX_ROWS);
  }, [isMobileDevice, data?.cashedBy]);

  const header = isMobileDevice ? null : (
    <TableHeader size="small">
      {Array.from({ length: DESKTOP_MAX_COLUMNS })
        .map((_v, i) => i)
        .map((key, i) => {
          return (
            <Fragment key={key}>
              <TableHeaderColumn size="small">
                <Box pl="6x">
                  <Text variant="caption" fontWeight="strong">
                    {t('Date')}
                  </Text>
                </Box>
              </TableHeaderColumn>
              <TableHeaderColumn size="small">
                <Box
                  pr="6x"
                  borderRightWidth={i === DESKTOP_MAX_COLUMNS - 1 ? '0' : '1x'}
                  borderRightStyle="solid"
                  borderColor="giftsTableHeaderBorder"
                >
                  <Text variant="caption" fontWeight="strong">
                    {t('Recipient')}
                  </Text>
                </Box>
              </TableHeaderColumn>
            </Fragment>
          );
        })}
    </TableHeader>
  );

  const emptyContent = (
    <Box display="flex" justifyContent="center" width="full" py="5x">
      <Text color="textMuted" textAlign="center" className={s.emptyContent}>
        {t('gifts.emptyMultiGifts')}
      </Text>
    </Box>
  );

  return (
    <Box bg="giftsSubtableBg">
      {showBalances ? (
        <Box
          display="flex"
          alignItems={{ mobile: 'flex-start', tablet: 'center' }}
          flexDirection={{ mobile: 'column', tablet: 'row' }}
          py="3x"
        >
          <Box
            className={s.blockedAmount}
            as={Text}
            variant="caption"
            py="2x"
            px={{ mobile: '4x', tablet: '6x' }}
          >
            {t('gifts.blockedAmount')}:
            <Box
              as="span"
              display="inline-flex"
              alignItems="center"
              height="5x"
              ml={{ mobile: '1x', tablet: '3x' }}
              px={{ mobile: '0', tablet: '3x' }}
              bg={isMobileDevice ? undefined : 'giftsMultiTableBadgeBg'}
              borderRadius="1x"
              fontWeight="medium"
            >
              {holdAmountMoney ?? '0.0000'}
            </Box>
          </Box>

          <Box
            className={s.blockedAmount}
            as={Text}
            variant="caption"
            py="2x"
            px={{ mobile: '4x', tablet: '6x' }}
          >
            {t('gifts.timesToWithdrawal')}:
            <Box
              as="span"
              display="inline-flex"
              alignItems="center"
              height="5x"
              ml={{ mobile: '1x', tablet: '3x' }}
              px={{ mobile: '0', tablet: '3x' }}
              bg={isMobileDevice ? undefined : 'giftsMultiTableBadgeBg'}
              borderRadius="1x"
              fontWeight="medium"
            >
              {data?.cashedTimes ?? 0}/{data?.timesToWithdrawal ?? 0}
            </Box>
          </Box>
        </Box>
      ) : null}

      {isMobileDevice ? (
        <Box display="flex" flexWrap="nowrap" className={s.mobileTableContainer}>
          {cashedUsersMobile.map((colItems) => {
            return (
              <Box key={`colItem-${colItems[0]?.cashedAt}`} flexShrink={0} flexGrow={1}>
                <Box
                  display="flex"
                  alignItems="center"
                  px="4x"
                  py="3x"
                  borderTopStyle="solid"
                  borderTopWidth="1x"
                  borderBottomStyle="solid"
                  borderBottomWidth="1x"
                  borderColor="giftsTableHeaderBorder"
                  fontSize="caption"
                  fontWeight="strong"
                >
                  <Box className={s.mobileCol}>{t('Date')}</Box>
                  <Box className={s.mobileCol}>{t('Recipient')}</Box>
                </Box>
                {colItems.map((item) => {
                  const date = localeDate(
                    item.cashedAt,
                    'date',
                    lang,
                    user?.bitzlato_user?.user_profile.timezone ?? undefined,
                  );

                  return (
                    <Box
                      key={`mobile-${item.cashedAt}`}
                      display="flex"
                      alignItems="center"
                      px="4x"
                      py="3x"
                      fontSize="caption"
                    >
                      <Box className={s.mobileCol}>{date}</Box>
                      <Box className={s.mobileCol}>{item.cashedBy}</Box>
                    </Box>
                  );
                })}
              </Box>
            );
          })}
        </Box>
      ) : (
        <Table header={header} emptyContent={emptyContent} isLoading={!data}>
          {cashedUsers && cashedUsers.length > 0 ? (
            <TableBody>
              {cashedUsers.map((rowItems) => {
                const key = typeof rowItems[0] === 'string' ? rowItems[0] : rowItems[0]?.cashedAt;
                return (
                  <TableRow key={`row-${key}`}>
                    {rowItems.map((item) => {
                      if (typeof item === 'string') {
                        return (
                          <Fragment key={item}>
                            <TableColumn size="small" />
                            <TableColumn size="small" />
                          </Fragment>
                        );
                      }

                      const date = localeDate(
                        item.cashedAt,
                        'date',
                        lang,
                        user?.bitzlato_user?.user_profile.timezone ?? undefined,
                      );

                      return (
                        <Fragment key={item.cashedAt}>
                          <TableColumn size="small">
                            <Box pl="6x">
                              <Text variant="caption">{date}</Text>
                            </Box>
                          </TableColumn>
                          <TableColumn size="small">
                            <Box pr="6x">
                              <Text variant="caption">{item.cashedBy}</Text>
                            </Box>
                          </TableColumn>
                        </Fragment>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          ) : null}
        </Table>
      )}
    </Box>
  );
};
