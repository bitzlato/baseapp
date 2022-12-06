import { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useT } from 'web/src/hooks/useT';
import { TextInput } from 'web/src/components/TextInputCustom/TextInputCustom';
import { Box } from 'web/src/components/ui/Box';
import { Button } from 'web/src/components/ui/Button';
import { Spinner } from 'web/src/components/ui/Spinner';
import { useSaveCashContractProfile } from 'web/src/hooks/mutations/useSaveCashContractProfile';
import { alertPush, UserProfile } from 'web/src/modules';
import { InputDate } from 'web/src/components/shared/InputDate/InputDate';
import { localeDate } from 'web/src/helpers/localeDate';

const TODAY = new Date();

const INITIAL_VALUES = {
  first_name: '',
  middle_name: '',
  last_name: '',
  dob: '',
  address: '',
  phone_number: '',
  city: '',
  passport_division_code: '',
  passport_issue_by: '',
  passport_issue_date: '',
  passport_number: '',
  passport_serial: '',
};

interface Props {
  profiles?: Array<Partial<UserProfile>> | undefined;
}

export const CashContractForm = ({ profiles }: Props) => {
  const t = useT();
  const dispatch = useDispatch();
  const draftedProfile = useMemo(
    () => profiles?.find((profile) => profile.state === 'drafted'),
    [profiles],
  );
  const [values, setValues] = useState(() => ({ ...INITIAL_VALUES, ...(draftedProfile ?? {}) }));
  const [isLoading, setIsLoading] = useState(false);
  const [saveCashContractProfile] = useSaveCashContractProfile(
    draftedProfile ? 'update' : 'create',
  );

  const isPhoneNumber = (value: string) => {
    const convertedText = value.trim();
    // eslint-disable-next-line prefer-regex-literals
    const condition = new RegExp('^(\\(?\\+?[0-9]*\\)?)?[0-9_\\- \\(\\)]*$');

    return condition.test(convertedText);
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      await saveCashContractProfile(values);
      dispatch(alertPush({ message: ['Successfully saved'], type: 'success' }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box display="flex" flexDirection="column" gap="4x">
      <TextInput
        label={t('cashContract.lastName')}
        value={values.last_name ?? ''}
        onChange={(value) => setValues((current) => ({ ...current, last_name: value }))}
      />
      <TextInput
        label={t('cashContract.firstName')}
        value={values.first_name ?? ''}
        onChange={(value) => setValues((current) => ({ ...current, first_name: value }))}
      />
      <TextInput
        label={t('cashContract.middleName')}
        value={values.middle_name ?? ''}
        onChange={(value) => setValues((current) => ({ ...current, middle_name: value }))}
      />
      <InputDate
        label={t('cashContract.dob')}
        maxDate={TODAY}
        value={values.dob ? new Date(values.dob) : null}
        onChange={(value: Date) => {
          setValues((current) => ({ ...current, dob: localeDate(value, 'dateInput') }));
        }}
      />
      <TextInput
        label={t('cashContract.city')}
        value={values.city ?? ''}
        onChange={(value) => setValues((current) => ({ ...current, city: value }))}
      />
      <TextInput
        label={t('cashContract.address')}
        value={values.address ?? ''}
        onChange={(value) => setValues((current) => ({ ...current, address: value }))}
      />
      <TextInput
        type="tel"
        name="phone"
        autoComplete="tel"
        label={t('cashContract.phoneNumber')}
        value={values.phone_number ?? ''}
        onChange={(value) =>
          setValues((current) => ({
            ...current,
            phone_number: isPhoneNumber(value) ? value : current.phone_number ?? '',
          }))
        }
      />
      <TextInput
        label={t('cashContract.passportSerial')}
        value={values.passport_serial ?? ''}
        onChange={(value) => setValues((current) => ({ ...current, passport_serial: value }))}
      />
      <TextInput
        label={t('cashContract.passportNumber')}
        value={values.passport_number ?? ''}
        onChange={(value) => setValues((current) => ({ ...current, passport_number: value }))}
      />
      <TextInput
        label={t('cashContract.passportIssueBy')}
        value={values.passport_issue_by ?? ''}
        onChange={(value) => setValues((current) => ({ ...current, passport_issue_by: value }))}
      />
      <InputDate
        label={t('cashContract.passportIssueDate')}
        maxDate={TODAY}
        value={values.passport_issue_date ? new Date(values.passport_issue_date) : null}
        onChange={(value: Date) => {
          setValues((current) => ({
            ...current,
            passport_issue_date: localeDate(value, 'dateInput'),
          }));
        }}
      />
      <TextInput
        label={t('cashContract.passportDivisionCode')}
        value={values.passport_division_code ?? ''}
        onChange={(value) =>
          setValues((current) => ({ ...current, passport_division_code: value }))
        }
      />
      <Box display="flex" justifyContent="flex-end">
        <Button disabled={isLoading} onClick={handleSubmit}>
          {isLoading ? <Spinner size="5x" /> : t('Save')}
        </Button>
      </Box>
    </Box>
  );
};
