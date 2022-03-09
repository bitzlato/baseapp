/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react/destructuring-assignment */
import { FC, useEffect, useState, KeyboardEvent, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Currency, Money } from '@bitzlato/money-js';
import { parseNumeric } from 'src/helpers/parseNumeric';
import { useT } from 'src/hooks/useT';
import { Box } from 'web/src/components/Box/Box';
import { SelectString } from 'web/src/components/Select/Select';
import { CryptoCurrencyIcon } from 'web/src/components/CryptoCurrencyIcon/CryptoCurrencyIcon';
import { NumberInput } from 'web/src/components/Input/NumberInput';
import { Button } from 'web/src/components/ui/Button';
import { createMoney, USD_CCY } from 'web/src/helpers/money';
import { getCurrencySymbol } from 'web/src/helpers/getCurrencySymbol';
import { accountUrl, p2pUrl } from 'web/src/api/config';
import {
  AccountVoucher,
  P2PConfirmation,
  P2VoucherPostParams,
} from 'web/src/modules/account/voucher-types';
import { selectWallets } from 'web/src/modules/user/wallets/selectors';
import { buildQueryString } from 'web/src/helpers/buildQueryString';
import { localeDate } from 'web/src/helpers/localeDate';
import { MoneyFormat } from 'web/src/components/MoneyFormat/MoneyFormat';
import { IconButton } from 'web/src/components/IconButton/IconButton';
import { DEFAULT_CURRENCY } from 'web/src/modules/public/currencies/defaults';
import { Tab, TabList, Tabs } from 'web/src/components/Tabs';
import { Table } from 'web/src/components/Table';
import { Modal2 } from 'web/src/components/Modal/Modal2';
import { CloseIcon } from 'web/src/assets/images/CloseIcon';
import { alertPush } from 'web/src/modules/public/alert/actions';
import { TextInput } from 'web/src/components/Input/TextInput';
import { sliceString } from 'web/src/helpers/sliceString';
import { useFetch } from 'web/src/hooks/data/useFetch';
import { FetchError, fetchWithCreds } from 'web/src/helpers/fetch';
import { alertFetchError } from 'web/src/helpers/alertFetchError';
import { selectUserInfo } from 'web/src/modules/user/profile/selectors';
import { TwoFactorModal } from 'web/src/containers/ProfileAuthDetails/TwoFactorModal';
import sq from 'src/containers/QuickExchange/QuickExchange.postcss';
import s from './Gift.postcss';

interface Props {
  currency: Currency;
  balanceP2P: Money;
}

export const Gift: FC<Props> = (props) => {
  const ccCode = getCurrencySymbol(props.currency);

  const [amount, setAmount] = useState('');
  const [giftCurrency, setGiftCurrency] = useState<string | null>(null);
  const [tab, setTab] = useState('Created');
  const [email, setEmail] = useState<string | undefined>();
  const [code2fa, setCode2fa] = useState<string | undefined>();
  const [gift, setGift] = useState<AccountVoucher | undefined>();
  const [comment, setComment] = useState('');
  const [show2fa, setShow2fa] = useState(false);

  const t = useT();
  const dispatch = useDispatch();
  const wallets = useSelector(selectWallets);
  const user = useSelector(selectUserInfo);

  const cashed = tab === 'Cashed';

  const vouchersResponse = useFetch<AccountVoucher[]>(
    `${accountUrl()}/vouchers?${buildQueryString({
      currency: ccCode,
      cashed,
      page: 0,
      items: 10,
    })}`,
    fetchWithCreds,
  );

  useEffect(() => {
    setGiftCurrency(ccCode);
  }, [ccCode]);

  const data = vouchersResponse.data ?? [];
  const money = createMoney(amount, props.balanceP2P.currency);
  const disableCreate = money.isZero() || money.greaterThan(props.balanceP2P);

  const getCcy = (code: string) => {
    return wallets.find((w) => code === w.currency.code) ?? DEFAULT_CURRENCY;
  };

  const handleDelete = async (value: AccountVoucher) => {
    try {
      await fetchWithCreds(`${p2pUrl()}/vouchers/${value.deep_link_code}`, { method: 'DELETE' });
    } catch (error) {
      alertFetchError(dispatch, error);
    }
    vouchersResponse.mutate();
  };

  const handleChangeAmount = (value: string) => {
    setAmount(parseNumeric(value));
  };

  const handleCreateGift = async (code: string | undefined) => {
    if (!disableCreate) {
      const params: P2VoucherPostParams = {
        amount,
        cryptocurrency: ccCode,
        currency: 'USD',
        method: 'crypto',
      };
      try {
        const r: P2PConfirmation = await fetchWithCreds(`${p2pUrl()}/vouchers/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(code && { 'x-code-2fa': code }),
          },
          body: JSON.stringify(params),
        });
        setEmail(r.email);
      } catch (error) {
        if (error instanceof FetchError) {
          if (error.code === 478 && error.payload.message === '2FA Token Required') {
            setShow2fa(true);
          } else {
            alertFetchError(dispatch, error);
          }
        }
      }
      vouchersResponse.mutate();
    }
  };

  const handleSend2fa = (code: string) => {
    setCode2fa(code);
    handleCreateGift(code);
  };

  const handleClickOptions = (value: AccountVoucher) => {
    setGift(value);
    setComment(value.comment ?? '');
  };

  const handleClickApply = async () => {
    if (gift && comment !== gift.comment) {
      try {
        await fetchWithCreds(`${p2pUrl()}/vouchers/${gift.deep_link_code}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ comment }),
        });
        dispatch(alertPush({ message: ['Successfully changed'], type: 'success' }));
      } catch (error) {
        alertFetchError(dispatch, error);
      }
      vouchersResponse.mutate();
    }
    setGift(undefined);
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleCreateGift(undefined);
    }
  };

  const copyToClip = async (link: string) => {
    try {
      await navigator.clipboard.writeText(link);
      dispatch(alertPush({ message: ['Successfully copied'], type: 'success' }));
      // eslint-disable-next-line no-empty
    } catch (error) {}
  };

  const renderItem = (d: string) => {
    return (
      <Box row spacing>
        <CryptoCurrencyIcon size="small" currency={d} />
        <Box textTr="uppercase" as="span">
          {d}
        </Box>
      </Box>
    );
  };

  const header = useMemo(
    () => [
      '',
      t('Created'),
      t('Amount'),
      cashed ? t('Cashed by') : undefined,
      t('Comment'),
      cashed ? undefined : '', // Cancel button
    ],
    [cashed, t],
  );

  const tableData = data.map((d) => {
    return [
      <Button
        size="small"
        variant="outlined"
        title={`${t('More')}...`}
        onClick={() => handleClickOptions(d)}
      >
        ...
      </Button>,
      <Box textSize="sm" textColor="secondary">
        {localeDate(d.created_at, 'fullDate')}
      </Box>,
      <Box col>
        <MoneyFormat money={createMoney(d.amount, getCcy(d.cc_code))} />
        <Box textSize="sm" textColor="secondary">
          ≈ <MoneyFormat money={createMoney(d.amount, USD_CCY)} />
        </Box>
      </Box>,
      cashed ? d.cashed_by?.nickname ?? <None /> : undefined,
      d.comment ? sliceString(d.comment, 40) : <None />,
      cashed ? undefined : (
        <IconButton title={t('Close')} onClick={() => handleDelete(d)}>
          <CloseIcon />
        </IconButton>
      ),
    ];
  });

  return (
    <>
      <Box col spacing="3">
        <span>
          {t('gift.transfer', {
            transfer: (
              <Link to={`/wallets/${ccCode.toLowerCase()}/transfer`} className={sq.link}>
                {t('Transfer.noun')}
              </Link>
            ),
          })}
        </span>
        <Box row spacing="3">
          <Box
            flex="golden"
            as={NumberInput}
            label={t('Amount')}
            value={amount}
            onChange={handleChangeAmount}
            onKeyPress={handleKeyPress}
          />
          <Box
            flex="1"
            as={SelectString}
            options={[ccCode]}
            value={giftCurrency ?? ccCode}
            onChange={setGiftCurrency}
            placeholder={t('page.body.quick.exchange.label.currency')}
            formatOptionLabel={renderItem}
          />
        </Box>
        <Box row justify="end">
          <Button
            color="primary"
            onClick={() => handleCreateGift(undefined)}
            disabled={disableCreate}
          >
            {t('Create gift')}
          </Button>
        </Box>
        <Box col spacing="2">
          <Tabs value={tab} onSelectionChange={setTab}>
            <TabList>
              <Tab value="Created">{t('Created')}</Tab>
              <Tab value="Cashed">{t('Cashed')}</Tab>
            </TabList>
          </Tabs>
          <Table tableClassName={s.giftHistory} header={header} data={tableData} />
        </Box>
      </Box>
      {show2fa ? (
        <TwoFactorModal
          onClose={() => setShow2fa(false)}
          onSend={handleSend2fa}
          buttonText={t('Create gift')}
          text={
            <span>
              {user.bitzlato_user
                ? t('Enter 2FA code from the app for', {
                    name: <b>{`${user.bitzlato_user.user_profile.generated_name}@Bitzlato.com`}</b>,
                  })
                : undefined}
            </span>
          }
        />
      ) : null}
      {email ? (
        <Modal2 show header={t('Confirmation')} onClose={() => setEmail(undefined)}>
          <Box col spacing="3">
            <span>{t('gift.confirmation_email', { email })}</span>
            <span>{t('gift.check_spam')}</span>
            <Button onClick={() => handleCreateGift(code2fa)} color="primary">
              {t('Send an email again')}
            </Button>
          </Box>
        </Modal2>
      ) : null}
      {gift ? (
        <Modal2
          show
          header={
            <span>
              {t('Check for', {
                money: <MoneyFormat money={createMoney(gift.amount, getCcy(gift.cc_code))} />,
              })}
            </span>
          }
          onClose={() => setGift(undefined)}
        >
          <Box col spacing="5">
            <TextInput
              as="textarea"
              rows="3"
              label={t('Comment')}
              labelVisible
              value={comment}
              onChange={setComment}
            />
            <Box col spacing="2">
              <span>{t('gift.copy_link')}</span>
              {gift.links?.map((l) => (
                <Button
                  key={l.type}
                  color="secondary"
                  variant="outlined"
                  onClick={() => copyToClip(l.url)}
                >
                  {l.type}
                </Button>
              ))}
            </Box>
            <Button onClick={handleClickApply} color="primary">
              {t('OK')}
            </Button>
          </Box>
        </Modal2>
      ) : null}
    </>
  );
};

const None: FC = () => {
  return (
    <Box as="span" textColor="secondary">
      -
    </Box>
  );
};
