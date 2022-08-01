import { FC } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { Text } from 'web/src/components/ui/Text';
import { UserAdvertDetails } from 'web/src/modules/p2p/types';
import { useAdapterContext } from 'web/src/components/shared/Adapter';
import { useFetchLastRequisites } from 'web/src/hooks/data/useFetchTrade';
import { DetailsInput } from 'web/src/components/TextInputCustom/DetailsInput';
import { CollapsibleText } from 'web/src/components/shared/CollapsibleText/CollapsibleText';
import { UserAdBlock } from './UserAdBlock';
import { UserAdField } from './UserAdField';
import { EditCheckbox } from './EditCheckbox';
import { useUserAdEditContext } from './UserAdEditContext';
import { EditButton } from './EditButton';
import * as s from './UserAdRequisitesStep.css';

const STEP_KEY = 'requisites';

interface Props {
  ad: UserAdvertDetails;
}

export const UserAdRequisitesStep: FC<Props> = ({ ad }) => {
  const { t } = useAdapterContext();
  const { data } = useFetchLastRequisites(ad.paymethod.id);
  const lastDetails = data?.data || [];
  const {
    isStepInEdit,
    setStepInEdit,
    removeStepInEdit,
    formValues,
    updateFormValues,
    resetFormValues,
    formErrors,
  } = useUserAdEditContext();
  const isEdit = isStepInEdit(STEP_KEY);

  const handleToggleEdit = () => {
    if (isEdit) {
      resetFormValues(['individual', 'details']);
      removeStepInEdit(STEP_KEY);
    } else {
      setStepInEdit(STEP_KEY);
    }
  };

  return (
    <UserAdBlock
      title={t('Requisites')}
      right={<EditButton isEdit={isEdit} onClick={handleToggleEdit} />}
    >
      <Box py="5x">
        {!formValues.individual ? (
          <Box mb="3x">
            <UserAdField
              variant="custom"
              isEdit={isEdit}
              error={formErrors?.details}
              value={
                <DetailsInput
                  inputClassName={s.textareaInput}
                  lastDetails={lastDetails}
                  isError={Boolean(formErrors?.details)}
                  details={formValues.details ?? ''}
                  onChangeDetails={(value) => updateFormValues({ details: value })}
                />
              }
              readOnlyValue={
                <CollapsibleText text={ad.details ?? ''} textColor="textMuted" fontSize="small" />
              }
            />
          </Box>
        ) : null}

        {isEdit ? (
          <EditCheckbox
            name="individual"
            checked={formValues.individual}
            onChange={() => updateFormValues({ individual: !formValues.individual })}
          >
            {t('Individual')}
          </EditCheckbox>
        ) : (
          <Text color="textMuted">{ad.details === null ? t('Individual') : null}</Text>
        )}
      </Box>
    </UserAdBlock>
  );
};
