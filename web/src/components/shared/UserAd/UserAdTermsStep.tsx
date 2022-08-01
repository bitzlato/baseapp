import { FC } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { UserAdvertDetails } from 'web/src/modules/p2p/types';
import { useAdapterContext } from 'web/src/components/shared/Adapter';
import { omit } from 'web/src/helpers/omit';
import { CollapsibleText } from 'web/src/components/shared/CollapsibleText/CollapsibleText';
import { EditButton } from './EditButton';
import { UserAdBlock } from './UserAdBlock';
import { useUserAdEditContext } from './UserAdEditContext';
import { UserAdField } from './UserAdField';

const STEP_KEY = 'terms';

interface Props {
  ad: UserAdvertDetails;
}

export const UserAdTermsStep: FC<Props> = ({ ad }) => {
  const { t } = useAdapterContext();
  const {
    isStepInEdit,
    setStepInEdit,
    removeStepInEdit,
    formValues,
    updateFormValues,
    resetFormValues,
    stepErrors,
    setStepErrors,
    formErrors,
  } = useUserAdEditContext();
  const isEdit = isStepInEdit(STEP_KEY);

  const handleToggleEdit = () => {
    if (isEdit) {
      resetFormValues(['terms']);
      setStepErrors((current) => (current ? omit(current, 'terms') : current));
      removeStepInEdit(STEP_KEY);
    } else {
      setStepInEdit(STEP_KEY);
    }
  };

  return (
    <UserAdBlock
      title={t('Terms')}
      right={<EditButton isEdit={isEdit} onClick={handleToggleEdit} />}
      error={stepErrors?.terms}
    >
      <Box my="2x">
        <UserAdField
          variant="textarea"
          isEdit={isEdit}
          error={formErrors?.terms}
          rows={4}
          placeholder={t('createAd.terms.placeholder')}
          readOnlyValue={
            <CollapsibleText text={ad.terms ?? '-'} textColor="textMuted" fontSize="small" />
          }
          value={formValues.terms ?? ''}
          onChange={(value) => updateFormValues({ terms: value })}
        />
      </Box>
    </UserAdBlock>
  );
};
