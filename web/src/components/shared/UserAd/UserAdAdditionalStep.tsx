import { FC } from 'react';
import { UserAdvertDetails } from 'web/src/modules/p2p/types';
import { useAdapterContext } from 'web/src/components/shared/Adapter';
import { Box } from 'web/src/components/ui/Box';
import { parseNumeric } from 'web/src/helpers/parseNumeric';
import { omit } from 'web/src/helpers/omit';
import { UserAdField } from './UserAdField';
import { useUserAdEditContext } from './UserAdEditContext';
import { UserAdBlock } from './UserAdBlock';
import { EditButton } from './EditButton';

const STEP_KEY = 'additional';

interface Props {
  ad: UserAdvertDetails;
}

export const UserAdAdditionalStep: FC<Props> = ({ ad }) => {
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
  const isPurchase = ad.type === 'purchase';

  const handleToggleEdit = () => {
    if (isEdit) {
      resetFormValues(
        isPurchase
          ? ['verifiedOnly', 'liquidityLimit']
          : ['verifiedOnly', 'minPartnerTradesAmount', 'maxLimitForNewTrader'],
      );
      setStepErrors((current) => (current ? omit(current, 'additional') : current));
      removeStepInEdit(STEP_KEY);
    } else {
      setStepInEdit(STEP_KEY);
    }
  };

  return (
    <UserAdBlock
      title={t('Additional')}
      right={<EditButton isEdit={isEdit} onClick={handleToggleEdit} />}
      error={stepErrors?.additional}
    >
      <Box pt="3x">
        <UserAdField
          variant="checkbox"
          isEdit={isEdit}
          error={formErrors?.verifiedOnly}
          label={t('createAd.verifiedOnly.label')}
          inputLabel={t('Yes')}
          name="verifiedOnly"
          value={formValues.verifiedOnly}
          readOnlyValue={ad.verifiedOnly ? t('Yes') : t('No')}
          onChange={(value) => updateFormValues({ verifiedOnly: value })}
        />

        {isPurchase ? (
          <UserAdField
            variant="checkbox"
            isEdit={isEdit}
            error={formErrors?.liquidityLimit}
            label={t('createAd.liquidityLimit.label')}
            inputLabel={t('Yes')}
            name="liquidityLimit"
            value={formValues.liquidityLimit}
            readOnlyValue={ad.liquidityLimit ? t('Yes') : t('No')}
            onChange={(value) => updateFormValues({ liquidityLimit: value })}
          />
        ) : (
          <>
            <UserAdField
              variant="input"
              isEdit={isEdit}
              error={formErrors?.minPartnerTradesAmount}
              label={t('createAd.minPartnerTradesAmount.label')}
              value={formValues.minPartnerTradesAmount ?? ''}
              readOnlyValue={ad.minPartnerTradesAmount || '-'}
              onChange={(value) =>
                updateFormValues({ minPartnerTradesAmount: parseNumeric(value) })
              }
            />
            <UserAdField
              variant="input"
              isEdit={isEdit}
              error={formErrors?.maxLimitForNewTrader}
              label={t('createAd.maxLimitForNewTrader.label')}
              value={formValues.maxLimitForNewTrader ?? ''}
              readOnlyValue={ad.maxLimitForNewTrader || '-'}
              onChange={(value) => updateFormValues({ maxLimitForNewTrader: parseNumeric(value) })}
            />
          </>
        )}
      </Box>
    </UserAdBlock>
  );
};
