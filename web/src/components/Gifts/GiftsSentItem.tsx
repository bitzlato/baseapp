import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { localeDate } from 'web/src/helpers/localeDate';
import { selectUserInfo } from 'web/src/modules/user/profile/selectors';
import { selectCurrentLanguage } from 'web/src/modules/public/i18n/selectors';
import { createMoney } from 'web/src/helpers/money';
import { useT } from 'web/src/hooks/useT';
import { useP2PCryptoCurrencies } from 'web/src/hooks/useP2PCryptoCurrencies';
import { useP2PFiatCurrencies } from 'web/src/hooks/useP2PFiatCurrencies';
import { MoneyFormat } from 'web/src/components/MoneyFormat/MoneyFormat';
import { P2PVoucher } from 'web/src/modules/account/voucher-types';
import { Box } from 'web/src/components/ui/Box';
import { Text } from 'web/src/components/ui/Text';
import { TableRow } from 'web/src/components/Gifts/Table';
import { TableColumn } from 'web/src/components/Gifts/TableColumn';
import { useIsMobileDevice } from 'web/src/components/app/AppContext';
import { useP2PEditGift } from 'web/src/hooks/mutations/useP2PEditGift';
import { SelectCustomChevron } from 'web/src/components/SelectCustom/SelectCustomChevron';
import { IconButton } from 'web/src/components/IconButton/IconButton';
import EditIcon from 'web/src/assets/svg/EditIcon2.svg';
import { MobileTableRow } from './GiftItem';
import { MultiGiftRecipients } from './MultiGiftRecipients';
import { EditGiftCommentModal } from './EditGiftCommentModal';
import * as s from './GiftItem.css';

interface Props {
  gift: P2PVoucher;
  onEdit?: () => void;
}

export const GiftsSentItem: FC<Props> = ({ gift, onEdit }) => {
  const t = useT();
  const user = useSelector(selectUserInfo);
  const lang = useSelector(selectCurrentLanguage);
  const isMobileDevice = useIsMobileDevice();
  const { getCryptoCurrency } = useP2PCryptoCurrencies();
  const { getFiatCurrency } = useP2PFiatCurrencies();
  const [showMultiCashed, setShowMultiCashed] = useState(false);
  const [showEditComment, setShowEditComment] = useState(false);
  const [editGift] = useP2PEditGift();

  const date = localeDate(
    gift.createdAt,
    'date',
    lang,
    user?.bitzlato_user?.user_profile.timezone ?? undefined,
  );
  const isMulti = gift.timesToWithdrawal > 1;
  const type = isMulti ? t('Reusable') : t('Single use');
  const amountMoney = createMoney(
    gift.cryptocurrency.amount,
    getCryptoCurrency(gift.cryptocurrency.code),
  );
  const amountFiatMoney = gift.currency
    ? createMoney(gift.currency.amount, getFiatCurrency(gift.currency.code))
    : null;
  const recipient = gift.cashedBy && gift.cashedBy[0]?.cashedBy;
  const recipientDate = localeDate(
    gift.cashedBy && gift.cashedBy[0]?.cashedAt,
    'date',
    lang,
    user?.bitzlato_user?.user_profile.timezone ?? undefined,
  );

  const handleToggleShowMultiCashed = () => {
    setShowMultiCashed((current) => !current);
  };

  const handleEdit = async (comment: string) => {
    await editGift({ deepLinkCode: gift.deepLinkCode, comment });
    setShowEditComment(false);
    onEdit?.();
  };

  const recipientsMulti = (
    <Box
      as="span"
      className={s.toggleMultiButton}
      display="flex"
      alignItems="center"
      gap="3x"
      textDecoration="underline"
      cursor="pointer"
      onClick={handleToggleShowMultiCashed}
    >
      <span>{t('gifts.allRecipients')}...</span>
      <SelectCustomChevron open={showMultiCashed} />
    </Box>
  );

  const recipients = isMulti ? (
    recipientsMulti
  ) : (
    <Box as="span" display="flex" flexDirection="column">
      <Box as="span" textOverflow="ellipsis">
        {recipient}
      </Box>
      <Box as="span" color="textMuted" fontSize="caption">
        {recipientDate}
      </Box>
    </Box>
  );

  const subTable = isMulti ? (
    <MultiGiftRecipients deepLinkCode={gift.deepLinkCode} showBalances={false} />
  ) : null;

  const editButton = (
    <IconButton size="small" title={t('Edit comment')} onClick={() => setShowEditComment(true)}>
      <EditIcon
        viewBox="0 0 10 10"
        width={isMobileDevice ? 15 : 10}
        height={isMobileDevice ? 15 : 10}
      />
    </IconButton>
  );

  const commentBlock = (
    <Box as="span" display="flex" alignItems="center">
      <Box as="span" textOverflow="ellipsis">
        {gift.comment || '-'}
      </Box>

      {isMobileDevice ? null : editButton}
    </Box>
  );

  return (
    <>
      {isMobileDevice ? (
        <Box pt="4x" backgroundColor="block" borderRadius="1.5x" mt="4x">
          <MobileTableRow label={t('Gift')} labelColor="text" labelVariant="label" value={type} />
          <Box mt="5x">
            <MobileTableRow label={t('Date')} value={date} />
          </Box>
          <Box mt="5x">
            <MobileTableRow label={t('Amount')} value={<MoneyFormat money={amountMoney} />} />
          </Box>
          <Box mt="5x">
            <MobileTableRow label={t('Comment')} value={commentBlock} />
          </Box>
          <Box mt="5x">
            <MobileTableRow label={t('Recipient')} value={recipients} />
            <Box mt="5x">{showMultiCashed ? subTable : null}</Box>
          </Box>
          <Box px="4x" py="1x" borderTopWidth="1x" borderTopStyle="solid" borderColor="inputBorder">
            {editButton}
          </Box>
        </Box>
      ) : (
        <>
          <TableRow>
            <TableColumn size="medium">
              <Box pl={{ tablet: '2x', desktop: '6x' }}>
                <Text variant="caption">{date}</Text>
              </Box>
            </TableColumn>
            <TableColumn size="medium">
              <Text variant="caption">{type}</Text>
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
              <Box pr="4x">
                <Text variant="caption" textOverflow="ellipsis">
                  {commentBlock}
                </Text>
              </Box>
            </TableColumn>
            <TableColumn size="medium">
              <Box pr={{ tablet: '2x', desktop: '6x' }}>
                <Text variant="caption" textOverflow="ellipsis">
                  {recipients}
                </Text>
              </Box>
            </TableColumn>
          </TableRow>

          {showMultiCashed ? subTable : null}
        </>
      )}

      <EditGiftCommentModal
        show={showEditComment}
        initialComment={gift.comment ?? ''}
        onClose={() => setShowEditComment(false)}
        onSubmit={handleEdit}
      />
    </>
  );
};
