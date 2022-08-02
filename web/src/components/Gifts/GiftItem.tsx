import { FC, ReactNode, useState } from 'react';
import { useSelector } from 'react-redux';
import { IconButton } from 'web/src/components/IconButton/IconButton';
import { localeDate } from 'web/src/helpers/localeDate';
import { selectUserInfo } from 'web/src/modules/user/profile/selectors';
import { selectCurrentLanguage } from 'web/src/modules/public/i18n/selectors';
import { createMoney } from 'web/src/helpers/money';
import { useT } from 'web/src/hooks/useT';
import { useP2PCryptoCurrencies } from 'web/src/hooks/useP2PCryptoCurrencies';
import { useP2PFiatCurrencies } from 'web/src/hooks/useP2PFiatCurrencies';
import { MoneyFormat } from 'web/src/components/MoneyFormat/MoneyFormat';
import { P2PVoucher } from 'web/src/modules/account/voucher-types';
import { Box, BoxProps } from 'web/src/components/ui/Box';
import { Text } from 'web/src/components/ui/Text';
import { TableRow } from 'web/src/components/Gifts/Table';
import { TableColumn } from 'web/src/components/Gifts/TableColumn';
import { useIsMobileDevice } from 'web/src/components/app/AppContext';
import { SelectCustomChevron } from 'web/src/components/SelectCustom/SelectCustomChevron';
import { Spinner } from 'web/src/components/ui/Spinner';
import { useP2PDeleteGift } from 'web/src/hooks/mutations/useP2PDeleteGift';
import { useP2PEditGift } from 'web/src/hooks/mutations/useP2PEditGift';
import TrashIcon from 'web/src/assets/svg/TrashIcon2.svg';
import CopyIcon from 'web/src/assets/svg/CopyIcon2.svg';
import EditIcon from 'web/src/assets/svg/EditIcon2.svg';
import { MultiGiftRecipients } from './MultiGiftRecipients';
import { EditGiftCommentModal } from './EditGiftCommentModal';
import { GiftLinksModal } from './GiftLinksModal';
import * as s from './GiftItem.css';

interface MobileTableRowProps {
  label: string;
  value?: ReactNode | undefined;
  labelColor?: BoxProps['color'] | undefined;
  labelVariant?: 'body' | 'label' | undefined;
  valueVariant?: 'body' | 'label' | undefined;
}

export const MobileTableRow: FC<MobileTableRowProps> = ({
  label,
  labelColor = 'textMuted',
  labelVariant = 'body',
  valueVariant = 'body',
  value,
}) => {
  return (
    <Box display="flex" justifyContent="space-between" px="4x">
      <Box
        as={Text}
        variant={labelVariant}
        color={labelColor}
        fontWeight="strong"
        flexShrink={0}
        mr="5x"
      >
        {label}
      </Box>
      <Text variant={valueVariant} textAlign="right" textOverflow="ellipsis">
        {value}
      </Text>
    </Box>
  );
};

interface Props {
  gift: P2PVoucher;
  onDelete?: (gift: P2PVoucher) => void;
  onEdit?: () => void;
}

export const GiftItem: FC<Props> = ({ gift, onEdit, onDelete }) => {
  const t = useT();
  const isMobileDevice = useIsMobileDevice();
  const user = useSelector(selectUserInfo);
  const lang = useSelector(selectCurrentLanguage);
  const [showCopyLinks, setShowCopyLinks] = useState(false);
  const [showMultiCashed, setShowMultiCashed] = useState(false);
  const [showEditComment, setShowEditComment] = useState(false);
  const [deleteGift, { status: deleteGiftStatus }] = useP2PDeleteGift();
  const [editGift] = useP2PEditGift();
  const { getCryptoCurrency } = useP2PCryptoCurrencies();
  const { getFiatCurrency } = useP2PFiatCurrencies();

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

  const handleCopy = () => {
    setShowCopyLinks(true);
  };

  const handleDelete = async () => {
    await deleteGift(gift.deepLinkCode);
    onDelete?.(gift);
  };

  const handleEdit = async (comment: string) => {
    await editGift({ deepLinkCode: gift.deepLinkCode, comment });
    setShowEditComment(false);
    onEdit?.();
  };

  const handleToggleShowMultiCashed = () => {
    setShowMultiCashed((current) => !current);
  };

  const statusMulti = (
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
      <span>{t('gifts.cashed')}...</span>
      <SelectCustomChevron open={showMultiCashed} />
    </Box>
  );

  const statusSingle = gift.cashedTimes === 0 ? t('gifts.notCashed') : t('gifts.cashed');
  const status = isMulti ? statusMulti : statusSingle;

  const controls = (
    <>
      <IconButton size="small" title={t('Delete')} onClick={handleDelete}>
        {deleteGiftStatus === 'running' ? (
          <Spinner size="3x" />
        ) : (
          <TrashIcon
            viewBox="0 0 12 13"
            width={isMobileDevice ? 16 : 12}
            height={isMobileDevice ? 17 : 13}
          />
        )}
      </IconButton>
      <IconButton size="small" title={t('Copy')} onClick={handleCopy}>
        <CopyIcon
          viewBox="0 0 12 11"
          width={isMobileDevice ? 16 : 12}
          height={isMobileDevice ? 15 : 11}
        />
      </IconButton>
    </>
  );

  const subTable = isMulti ? <MultiGiftRecipients deepLinkCode={gift.deepLinkCode} /> : null;

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
            <MobileTableRow label={t('Status')} value={status} />
            <Box mt="5x">{showMultiCashed ? subTable : null}</Box>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            gap="4x"
            px="4x"
            py="1x"
            borderTopWidth="1x"
            borderTopStyle="solid"
            borderColor="inputBorder"
          >
            {editButton}
            <Box display="flex" alignItems="center">
              {controls}
            </Box>
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
              <Text variant="caption">{status}</Text>
            </TableColumn>
            <TableColumn size="small" display="flex" justifyContent="flex-end">
              <Box display="flex" alignItems="center" pr={{ tablet: '2x', desktop: '6x' }}>
                {controls}
              </Box>
            </TableColumn>
          </TableRow>

          {showMultiCashed ? subTable : null}
        </>
      )}

      <GiftLinksModal
        show={showCopyLinks}
        amountMoney={amountMoney}
        links={gift.links}
        onClose={() => setShowCopyLinks(false)}
      />
      <EditGiftCommentModal
        show={showEditComment}
        initialComment={gift.comment ?? ''}
        onClose={() => setShowEditComment(false)}
        onSubmit={handleEdit}
      />
    </>
  );
};
