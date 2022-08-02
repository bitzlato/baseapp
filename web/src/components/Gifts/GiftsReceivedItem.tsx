import { FC } from 'react';
import { useSelector } from 'react-redux';
import { useT } from 'web/src/hooks/useT';
import { localeDate } from 'web/src/helpers/localeDate';
import { selectUserInfo } from 'web/src/modules/user/profile/selectors';
import { selectCurrentLanguage } from 'web/src/modules/public/i18n/selectors';
import { createMoney } from 'web/src/helpers/money';
import { useP2PCryptoCurrencies } from 'web/src/hooks/useP2PCryptoCurrencies';
import { useP2PFiatCurrencies } from 'web/src/hooks/useP2PFiatCurrencies';
import { MoneyFormat } from 'web/src/components/MoneyFormat/MoneyFormat';
import { P2PVoucher } from 'web/src/modules/account/voucher-types';
import { Box } from 'web/src/components/ui/Box';
import { Text } from 'web/src/components/ui/Text';
import { TableRow } from 'web/src/components/Gifts/Table';
import { TableColumn } from 'web/src/components/Gifts/TableColumn';
import { useIsMobileDevice } from 'web/src/components/app/AppContext';
import { MobileTableRow } from './GiftItem';

interface Props {
  gift: P2PVoucher;
}

export const GiftsReceivedItem: FC<Props> = ({ gift }) => {
  const t = useT();
  const isMobileDevice = useIsMobileDevice();
  const user = useSelector(selectUserInfo);
  const lang = useSelector(selectCurrentLanguage);
  const { getCryptoCurrency } = useP2PCryptoCurrencies();
  const { getFiatCurrency } = useP2PFiatCurrencies();

  const userCashedBy = gift.cashedBy?.find(
    (item) => item.cashedBy === user.bitzlato_user?.user_profile.public_name,
  );
  const date = localeDate(
    userCashedBy?.cashedAt,
    'date',
    lang,
    user?.bitzlato_user?.user_profile.timezone ?? undefined,
  );
  const amountMoney = createMoney(
    gift.cryptocurrency.amount,
    getCryptoCurrency(gift.cryptocurrency.code),
  );
  const amountFiatMoney = gift.currency
    ? createMoney(gift.currency.amount, getFiatCurrency(gift.currency.code))
    : null;
  const sender =
    gift.createdBy === null ? user.bitzlato_user?.user_profile.public_name : gift.createdBy;

  return isMobileDevice ? (
    <Box py="4x" backgroundColor="block" borderRadius="1.5x" mt="4x">
      <MobileTableRow label={t('Gift')} labelColor="text" labelVariant="label" />
      <Box mt="5x">
        <MobileTableRow label={t('Date')} value={date} />
      </Box>
      <Box mt="5x">
        <MobileTableRow label={t('Amount')} value={<MoneyFormat money={amountMoney} />} />
      </Box>
      <Box mt="5x">
        <MobileTableRow label={t('Sender')} value={sender} />
      </Box>
    </Box>
  ) : (
    <TableRow>
      <TableColumn size="medium">
        <Box pl={{ tablet: '2x', desktop: '6x' }}>
          <Text variant="caption">{date}</Text>
        </Box>
      </TableColumn>
      <TableColumn size="medium">
        <Text variant="caption">
          <MoneyFormat money={amountMoney} />
          {amountFiatMoney ? (
            <Box as="span" display="block" color="textMuted">
              {'≈ '}
              <MoneyFormat money={amountFiatMoney} />
            </Box>
          ) : null}
        </Text>
      </TableColumn>
      <TableColumn size="medium">
        <Box pr={{ tablet: '2x', desktop: '6x' }}>
          <Text variant="caption">{sender}</Text>
        </Box>
      </TableColumn>
    </TableRow>
  );
};
