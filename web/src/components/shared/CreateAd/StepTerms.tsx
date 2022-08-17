import { FC } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { Text } from 'web/src/components/ui/Text';
import { TextAreaInput } from 'web/src/components/TextInputCustom/TextInputCustom';
import { Checkbox } from 'web/src/components/form/Checkbox';
import { useAdapterContext } from 'web/src/components/shared/Adapter';
import { useStateWithDeps } from 'web/src/hooks/useStateWithDeps';
import { pick } from 'web/src/helpers/pick';
import { CreateAdFormValues, useCreateAdFormContext } from './CreateAdFormContext';
import { StepSubmitRow } from './StepSubmitRow';

type FieldKeys = 'terms' | 'details';

export const MAX_AD_TERMS_LENGTH = 3000;
export const MAX_AD_DETAILS_LENGTH = 50;
const DEFAULT_ROWS = 6;

interface Props {
  onSubmit: () => void;
}

export const StepTerms: FC<Props> = ({ onSubmit }) => {
  const { t } = useAdapterContext();
  const { formValues, updateFormValues, creationError } = useCreateAdFormContext();
  const [errors, setErrors] = useStateWithDeps<null | Partial<{
    [key in keyof Pick<CreateAdFormValues, FieldKeys>]: string | null;
  }>>(() => (creationError ? pick(creationError, ['terms', 'details']) : null), [creationError]);

  const handleTermsChange = (value: string) => {
    setErrors(null);
    updateFormValues({ terms: value });
  };

  const handleDetailsChange = (value: string) => {
    setErrors(null);
    updateFormValues({ details: value });
  };

  const handleSubmit = () => {
    setErrors(null);
    onSubmit();
  };

  return (
    <Box display="flex" flexDirection="column" gap="6x" pb="6x">
      <Box display="flex" flexDirection="column" gap="4x">
        <Text variant="label">{t('createAd.terms.label')}</Text>
        <TextAreaInput
          resize="none"
          rows={DEFAULT_ROWS}
          maxLength={MAX_AD_TERMS_LENGTH}
          placeholder={t('createAd.terms.placeholder')}
          value={formValues.terms ?? ''}
          isError={Boolean(errors?.terms)}
          onChange={handleTermsChange}
        />
      </Box>

      {formValues.type === 'selling' && (
        <Box display="flex" flexDirection="column" gap="4x">
          {!formValues.individual && (
            <>
              <Text variant="label">{t('createAd.details.label')}</Text>
              <TextAreaInput
                resize="none"
                rows={DEFAULT_ROWS}
                maxLength={MAX_AD_DETAILS_LENGTH}
                placeholder={t('createAd.details.placeholder')}
                value={formValues.details ?? ''}
                isError={Boolean(errors?.details)}
                onChange={handleDetailsChange}
              />
            </>
          )}

          <Checkbox
            name="individual"
            checked={formValues.individual}
            onChange={() => updateFormValues({ individual: !formValues.individual })}
          >
            <Box fontSize="medium" color="text">
              {t('Individual')}
            </Box>
          </Checkbox>
        </Box>
      )}

      <StepSubmitRow errors={errors} onSubmit={handleSubmit} />
    </Box>
  );
};
