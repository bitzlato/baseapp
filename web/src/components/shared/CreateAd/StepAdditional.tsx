import { useState } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { Text } from 'web/src/components/ui/Text';
import { Modal, ModalBody, ModalHeader } from 'web/src/components/ui/Modal';
import { useAdapterContext } from 'web/src/components/shared/Adapter';
import { Checkbox } from 'web/src/components/form/Checkbox';
import { parseNumeric } from 'web/src/helpers/parseNumeric';
import { MoneyInput } from 'web/src/components/TextInputCustom/MoneyInputCustom';
import { useStateWithDeps } from 'web/src/hooks/useStateWithDeps';
import { pick } from 'web/src/helpers/pick';
import HelpIconSvg from 'web/src/assets/svg/HelpIcon.svg';
import { CreateAdFormValues, useCreateAdFormContext } from './CreateAdFormContext';
import { validateValues } from './validate';
import { StepSubmitRow } from './StepSubmitRow';

type FieldKeys =
  | 'verifiedOnly'
  | 'liquidityLimit'
  | 'maxLimitForNewTrader'
  | 'minPartnerTradesAmount';

interface Props {
  onSubmit: () => void;
}

export const StepAdditional = ({ onSubmit }: Props) => {
  const { t } = useAdapterContext();
  const { formValues, selectedCryptoCurrency, updateFormValues, creationError } =
    useCreateAdFormContext();
  const [errors, setErrors] = useStateWithDeps<null | Partial<{
    [key in keyof Pick<CreateAdFormValues, FieldKeys>]: string | null;
  }>>(
    () =>
      creationError
        ? pick(creationError, [
            'verifiedOnly',
            'liquidityLimit',
            'maxLimitForNewTrader',
            'minPartnerTradesAmount',
          ])
        : null,
    [creationError],
  );
  const [showLiquidityHintModal, setShowLiquidityHintModal] = useState(false);

  const handleMinPartnerTradesAmountChange = (value: string) => {
    const nvalue = parseNumeric(value);

    updateFormValues({ minPartnerTradesAmount: nvalue });
  };

  const handleMaxLimitForNewTraderChange = (value: string) => {
    const nvalue = parseNumeric(value);

    updateFormValues({ maxLimitForNewTrader: nvalue });
  };

  const handleSubmit = () => {
    setErrors(null);

    let fieldKeys: Array<keyof CreateAdFormValues> = ['verifiedOnly'];
    if (formValues.type === 'purchase') {
      fieldKeys = fieldKeys.concat('liquidityLimit');
    }

    if (formValues.type === 'selling' && selectedCryptoCurrency) {
      fieldKeys = fieldKeys.concat('minPartnerTradesAmount', 'maxLimitForNewTrader');
    }

    const nextErrors = validateValues(formValues, fieldKeys, { t });

    if (nextErrors === null) {
      onSubmit();
    } else {
      setErrors(nextErrors);
    }
  };

  const handleOpenLiquidityHintModal = () => {
    setShowLiquidityHintModal(true);
  };

  return (
    <>
      <Box display="flex" flexDirection="column" gap="6x" pb="6x">
        <Box display="flex" flexDirection="column" gap="5x">
          <Checkbox
            name="verifiedOnly"
            checked={formValues.verifiedOnly}
            onChange={() => updateFormValues({ verifiedOnly: !formValues.verifiedOnly })}
          >
            <Box color="text" fontSize="medium">
              {t('createAd.verifiedOnly.label')}
            </Box>
          </Checkbox>

          {formValues.type === 'purchase' && (
            <Box
              display="flex"
              flexDirection={{ mobile: 'row', tablet: 'column' }}
              alignItems={{ mobile: 'center', tablet: 'flex-start' }}
            >
              <Checkbox
                name="liquidityLimit"
                checked={formValues.liquidityLimit}
                onChange={() => updateFormValues({ liquidityLimit: !formValues.liquidityLimit })}
              >
                <Box color="text" fontSize="medium">
                  {t('createAd.liquidityLimit.label')}
                </Box>
              </Checkbox>

              <Box
                as="span"
                mt="2x"
                ml="6x"
                color="textMuted"
                display={{ mobile: 'none', tablet: 'block' }}
              >
                {t('createAd.liquidityLimit.hint')}
              </Box>

              <Box
                as="span"
                ml="2x"
                display={{ mobile: 'inline-block', tablet: 'none' }}
                color={{ default: 'headerIcon', hover: 'headerIconHover' }}
                cursor="pointer"
                onClick={handleOpenLiquidityHintModal}
              >
                <HelpIconSvg />
              </Box>
            </Box>
          )}

          {formValues.type === 'selling' && selectedCryptoCurrency && (
            <>
              <Box pt="4x" display="flex" flexDirection="column" gap="4x">
                <Text variant="label">{t('createAd.minPartnerTradesAmount.label')}</Text>
                <MoneyInput
                  label={t('createAd.minPartnerTradesAmount.placeholder')}
                  currency={selectedCryptoCurrency?.code}
                  isError={Boolean(errors?.minPartnerTradesAmount)}
                  value={formValues.minPartnerTradesAmount ?? ''}
                  onChange={handleMinPartnerTradesAmountChange}
                />
              </Box>

              <Box mt="6x" display="flex" flexDirection="column" gap="4x">
                <Text variant="label">{t('createAd.maxLimitForNewTrader.label')}</Text>
                <MoneyInput
                  label={t('createAd.maxLimitForNewTrader.placeholder')}
                  currency={selectedCryptoCurrency?.code}
                  isError={Boolean(errors?.maxLimitForNewTrader)}
                  value={formValues.maxLimitForNewTrader ?? ''}
                  onChange={handleMaxLimitForNewTraderChange}
                />
              </Box>
            </>
          )}
        </Box>

        <StepSubmitRow title={t('Create advert')} errors={errors} onSubmit={handleSubmit} />
      </Box>

      <Modal show={showLiquidityHintModal} onClose={() => setShowLiquidityHintModal(false)}>
        <ModalHeader>{t('createAd.liquidityLimit.label')}</ModalHeader>
        <ModalBody>
          <Box mb="6x">
            <Text variant="label">{t('createAd.liquidityLimit.hint')}</Text>
          </Box>
        </ModalBody>
      </Modal>
    </>
  );
};
