import { FC, useState } from 'react';
import { SelectCustom } from 'web/src/components/SelectCustom/SelectCustom';
import { CryptoCurrencyIcon } from 'web/src/components/ui/CryptoCurrencyIcon';
import { CryptoCurrencyOption } from 'web/src/components/shared/Ads/CryptoCurrencyOption';
import {
  searchFunction,
  getOptionValue,
  getOptionLabel,
} from 'web/src/components/shared/Ads/InputAmountWithCurrency';
import { TextInputWithControl } from 'web/src/components/TextInputCustom/TextInputWithControl';
import { Box } from 'web/src/components/ui/Box';
import { Button } from 'web/src/components/ui/Button';
import { Stack } from 'web/src/components/ui/Stack';
import { Text } from 'web/src/components/ui/Text';
import { AmountFormat } from 'web/src/components/AmountFormat/AmountFormat';
import { useP2PFiatCurrencies } from 'web/src/hooks/useP2PFiatCurrencies';
import { useP2PCryptoCurrencies } from 'web/src/hooks/useP2PCryptoCurrencies';
import { P2PWalletOption, useP2PWalletOptions } from 'web/src/hooks/useP2PWalletOptions';
import { useFetchRate } from 'web/src/hooks/data/useFetchRate';
import { useT } from 'web/src/hooks/useT';
import { parseNumeric } from 'web/src/helpers/parseNumeric';
import { createMoney } from 'web/src/helpers/money';
import { TextAreaInput } from 'web/src/components/TextInputCustom/TextInputCustom';
import { User } from 'web/src/modules';
import { isEmpty } from 'web/src/helpers/isEmptyObject';
import { omit } from 'web/src/helpers/omit';
import { InputStepper } from './InputStepper';
import * as s from './CreateGiftForm.css';

const DEFAULT_CRYPTO = 'BTC';
export const MAX_COMMENT_LENGTH = 200;

const Step: FC<{ title: string }> = ({ title, children }) => (
  <Box>
    <Text variant="h6">{title}</Text>
    <Box pt={{ mobile: '1x', tablet: '3x' }}>{children}</Box>
  </Box>
);

export type FormValues = {
  method: 'crypto' | 'fiat';
  amount: string;
  cryptocurrency: string;
  currency: string;
  comment: string;
  cashTimes: number;
};

type FormFields = 'cryptoCurrency' | 'amountCrypto' | 'amountFiat' | 'count' | 'comment';
type FormErrors = Partial<{ [key in FormFields]: string | null }>;

interface Props {
  user: User;
  onSubmit: (values: FormValues) => void;
}

export const CreateGiftForm: FC<Props> = ({ user, onSubmit }) => {
  const t = useT();
  const [method, setMethod] = useState<'crypto' | 'fiat'>('crypto');
  const [cryptoCurrency, setCryptoCurrency] = useState<string>(DEFAULT_CRYPTO);
  const [amountCrypto, setAmountCrypto] = useState<string>('');
  const [amountFiat, setAmountFiat] = useState<string>('');
  const [count, setCount] = useState<number>(1);
  const [comment, setComment] = useState('');
  const [errors, setErrors] = useState<FormErrors | null>(null);
  const { getCryptoCurrency } = useP2PCryptoCurrencies();
  const { getFiatCurrency } = useP2PFiatCurrencies();
  const { selectedWalletOption, walletOptions } = useP2PWalletOptions(
    getFiatCurrency,
    cryptoCurrency,
  );
  const userCurrency = user.bitzlato_user?.user_profile.currency ?? 'USD';
  const rateResponse = useFetchRate(
    selectedWalletOption?.code,
    user.bitzlato_user?.user_profile.currency,
  );
  const rate = rateResponse.data?.rate ?? 0;
  const fiatCcy = getFiatCurrency(userCurrency);
  const ccy = cryptoCurrency ? getCryptoCurrency(cryptoCurrency) : null;
  const amountCryptoMoney = ccy && amountCrypto ? createMoney(amountCrypto, ccy) : null;
  const willBlockedCrypto = amountCryptoMoney ? amountCryptoMoney.multiply(count).toString() : null;
  const available = selectedWalletOption?.balance;
  const maxCount =
    amountCryptoMoney && !amountCryptoMoney.isZero() && available
      ? Math.floor(Number(available.divide(amountCryptoMoney.toString())))
      : 0;

  const handleCryptoCurrencyChange = (value: P2PWalletOption) => {
    setCryptoCurrency(value.code);

    setAmountCrypto('');
    setAmountFiat('');
    setErrors((current) => omit(current, ['amountFiat', 'amountCrypto', 'cryptoCurrency']));
  };

  const handleAmountCryptoChange = (value: string) => {
    const nvalue = parseNumeric(value, { maxFractionDigits: 8 });

    if (ccy) {
      const moneyValue = createMoney(nvalue, ccy);
      const fiatValue = moneyValue.convert(rate, fiatCcy);
      setAmountFiat(nvalue ? fiatValue.toString() : '');
    }

    setAmountCrypto(nvalue);
    setMethod('crypto');
    setErrors((current) => omit(current, ['amountCrypto', 'amountFiat', 'count']));
  };

  const handleAmountFiatChange = (value: string) => {
    const nvalue = parseNumeric(value, { maxFractionDigits: 8 });

    if (ccy) {
      const moneyValue = createMoney(nvalue, fiatCcy);
      const cryptoValue = moneyValue.convert(1 / rate, ccy);
      setAmountCrypto(nvalue ? cryptoValue.toString() : '');
    }

    setAmountFiat(nvalue);
    setMethod('fiat');
    setErrors((current) => omit(current, ['amountCrypto', 'amountFiat', 'count']));
  };

  const validate = () => {
    const result: FormErrors = {};
    const lessThan1 = createMoney(amountFiat, fiatCcy).lessThan(createMoney(1, fiatCcy));
    const greaterThanAvailable =
      amountCryptoMoney && available ? amountCryptoMoney.greaterThan(available) : true;

    if (!cryptoCurrency) {
      result.cryptoCurrency = t('gifts.mustChooseCryptocurrency');
    }

    if (!amountCrypto) {
      result.amountCrypto = t('gifts.fillField');
    }

    if (greaterThanAvailable) {
      result.amountCrypto = t('gifts.greaterThanAvailable');
    }

    if (method === 'fiat' && lessThan1) {
      result.amountFiat = t('gifts.lessThan1');
    }

    if (count > maxCount) {
      result.count = t('gifts.maxCount');
    }

    if (comment.length > MAX_COMMENT_LENGTH) {
      result.comment = t('gifts.maxCommentLength', { count: MAX_COMMENT_LENGTH });
    }

    return isEmpty(result) ? null : result;
  };

  const handleSubmit = async () => {
    const formErrors = validate();
    if (formErrors !== null) {
      setErrors(formErrors);
      return;
    }

    onSubmit({
      method,
      amount: method === 'crypto' ? amountCrypto : amountFiat,
      cryptocurrency: cryptoCurrency!,
      currency: userCurrency,
      comment,
      cashTimes: count,
    });
  };

  return (
    <>
      <Stack direction="column" marginBottom="8x">
        <Step title={t('gifts.stepCurrency.title')}>
          <Box
            as={Text}
            display={{ mobile: 'block', desktop: 'none' }}
            variant="caption"
            mb="6x"
            color="textMuted"
          >
            {t('gifts.stepCurrency.notice')}
          </Box>

          <SelectCustom
            placeholder={t('gifts.selectCryptocurrency')}
            options={walletOptions}
            withSearch
            searchFunction={searchFunction}
            searchPlaceholder={t('Search')}
            noOptionsMessage={t('Nothing found')}
            getOptionValue={getOptionValue}
            getOptionLabel={getOptionLabel}
            renderLabel={(option) => {
              return (
                <Box display="flex" alignItems="center" gap="3x">
                  <CryptoCurrencyIcon size="6x" currency={option.code} />
                  <Text variant="label">{option.code}</Text>
                </Box>
              );
            }}
            renderOption={CryptoCurrencyOption}
            value={selectedWalletOption}
            isError={Boolean(errors?.cryptoCurrency)}
            onChange={handleCryptoCurrencyChange}
          />
          {errors?.cryptoCurrency ? (
            <Box mt="1x">
              <Text variant="caption" color="danger">
                {errors.cryptoCurrency}
              </Text>
            </Box>
          ) : null}

          <Box
            display="flex"
            flexDirection={{ mobile: 'column', tablet: 'row' }}
            mt={{ mobile: '5x', tablet: '3x' }}
          >
            <Box
              as={Text}
              display={{ mobile: 'block', tablet: 'none' }}
              variant="caption"
              mb="2x"
              color="textMuted"
            >
              {t('gifts.amount.notice')}
            </Box>

            <Box
              width="full"
              marginRight={{ mobile: '0', tablet: '3x' }}
              marginBottom={{ mobile: '3x', tablet: '0' }}
            >
              <TextInputWithControl
                label={t('Amount')}
                value={amountCrypto}
                isError={Boolean(errors?.amountCrypto)}
                onChange={handleAmountCryptoChange}
                control={
                  <Box>
                    <Text variant="caption" color="textMuted">
                      {t('Available')}
                    </Text>
                    <Text variant="caption" fontWeight="medium">
                      {available ? <AmountFormat money={available} /> : '0.0000'}
                    </Text>
                  </Box>
                }
                onControlClick={() => {
                  if (available) {
                    handleAmountCryptoChange(available.toString());
                  }
                }}
              />
              {errors?.amountCrypto ? (
                <Box mt="1x">
                  <Text variant="caption" color="danger">
                    {errors.amountCrypto}
                  </Text>
                </Box>
              ) : null}
            </Box>
            <Box width="full">
              <TextInputWithControl
                label={t('Amount')}
                isError={Boolean(errors?.amountFiat)}
                value={amountFiat}
                onChange={handleAmountFiatChange}
                control={
                  <Text variant="caption" fontWeight="medium">
                    {fiatCcy.code}
                  </Text>
                }
              />
              {errors?.amountFiat ? (
                <Box mt="1x">
                  <Text variant="caption" color="danger">
                    {errors.amountFiat}
                  </Text>
                </Box>
              ) : null}
            </Box>
          </Box>
        </Step>

        <Step title={t('gifts.stepCount.title')}>
          <Box as={Text} variant="caption" color="textMuted">
            {t('gifts.stepCount.notice')}
          </Box>

          <Box mt="3x" display="flex" alignItems="center">
            <Box className={s.inputStepper}>
              <InputStepper
                value={count}
                isError={Boolean(errors?.count)}
                onChange={(v) => setCount(v)}
                onPlusClick={() => setCount((current) => current + 1)}
                onMinusClick={() => setCount((current) => (current <= 1 ? 1 : current - 1))}
              />
            </Box>

            <Box as={Text} variant="caption" color="textMuted" ml="4x" className={s.maxCount}>
              {t('gifts.stepCount.max')}{' '}
              <Box
                as="span"
                display="inline-flex"
                alignItems="center"
                height="5x"
                px="3x"
                bg="textInputControl"
                borderRadius="1x"
                fontWeight="medium"
              >
                {maxCount}
              </Box>
            </Box>
          </Box>
          {errors?.count ? (
            <Box mt="1x">
              <Text variant="caption" color="danger">
                {errors.count}
              </Text>
            </Box>
          ) : null}

          <Box
            className={s.willBlocked}
            as={Text}
            variant="caption"
            color="textMuted"
            py={{ mobile: '2x', tablet: '0' }}
            mt={{ mobile: '3x', tablet: '2x' }}
          >
            {t('gifts.willBlockedOnBalance')}:{' '}
            <Box
              as="span"
              display={{ mobile: 'flex', tablet: 'inline-flex' }}
              justifyContent={{ mobile: 'center', tablet: 'flex-start' }}
              alignItems="center"
              height="5x"
              px="3x"
              bg="textInputControl"
              borderRadius="1x"
              fontWeight="medium"
            >
              {willBlockedCrypto ?? '0.0000'}
            </Box>
          </Box>
        </Step>

        <Step title={t('gifts.stepComment.title')}>
          <Box as={Text} variant="caption" color="textMuted">
            {t('gifts.stepComment.notice')}
          </Box>

          <Box mt="3x">
            <TextAreaInput
              className={s.inputComment}
              placeholder={t('gifts.comment.placeholder')}
              maxLength={MAX_COMMENT_LENGTH}
              value={comment}
              isError={Boolean(errors?.comment)}
              onChange={setComment}
            />
            {errors?.comment ? (
              <Box mt="1x">
                <Text variant="caption" color="danger">
                  {errors.comment}
                </Text>
              </Box>
            ) : null}
          </Box>
        </Step>
      </Stack>

      <Box mt="6x" className={s.buttonSubmitContainer}>
        <Button data-gtm-click="create_gift" fullWidth onClick={handleSubmit}>
          {t('gifts.createGift')}
        </Button>
      </Box>
    </>
  );
};
