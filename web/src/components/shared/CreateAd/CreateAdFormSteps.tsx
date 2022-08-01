import { useState } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { useAdapterContext } from 'web/src/components/shared/Adapter';
import { useAppContext } from 'web/src/components/app/AppContext';
import { useCreateAd } from 'web/src/hooks/mutations/useCreateAd';
import { FetchError } from 'web/src/helpers/fetch';
import { Button } from 'web/src/components/ui/Button';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'web/src/components/ui/Modal';
import { MoneyFormat } from 'web/src/components/MoneyFormat/MoneyFormat';
import { AmountFormat } from 'web/src/components/AmountFormat/AmountFormat';
import { useP2PFiatCurrencies } from 'web/src/hooks/useP2PFiatCurrencies';
import { createMoney } from 'web/src/helpers/money';
import { CreateAdFormStep } from './CreateAdFormStep';
import { StepType } from './StepType';
import { StepCurrency } from './StepCurrency';
import { StepRate } from './StepRate';
import { useCreateAdFormContext } from './CreateAdFormContext';
import { StepLimits } from './StepLimits';
import { StepTerms } from './StepTerms';
import { StepAdditional } from './StepAdditional';

export const CreateAdFormSteps = () => {
  const { t, history } = useAdapterContext();
  const { lang } = useAppContext();
  const {
    formValues,
    types,
    selectedCryptoCurrency,
    selectedFiatCurrency,
    selectedPaymethod,
    setCreationError,
  } = useCreateAdFormContext();
  const { getFiatCurrency } = useP2PFiatCurrencies();
  const [errorCode, setErrorCode] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [lastAvailableStep, setLastAvailableStep] = useState(0);
  const [createAd] = useCreateAd(lang);

  const handleSubmitStep = () => {
    const nextIndex = activeIndex + 1;
    setActiveIndex(nextIndex);
    setLastAvailableStep(nextIndex);
  };

  const handleTryGoToStep = (index: number) => {
    if (index > lastAvailableStep) {
      return;
    }

    setActiveIndex(index);
  };

  const handleSubmitForm = async () => {
    try {
      setLastAvailableStep(activeIndex);
      const filteredFormValues = {
        ...formValues,
        details: formValues.individual || !formValues.details ? null : formValues.details,
      };

      const ad = await createAd(filteredFormValues);
      history.push(`/${lang}/p2p/adverts/`, { createdAdId: ad?.id });
    } catch (error) {
      if (error instanceof FetchError) {
        switch (error.payload.code) {
          case 'NotEnoughRatingForTermsWithDigits':
            setCreationError({ terms: t(error.payload.code) });
            handleTryGoToStep(4);
            break;

          case 'WrongMaxLimitForNewTrader':
            setCreationError({ maxLimitForNewTrader: t(error.payload.code) });
            handleTryGoToStep(5);
            break;

          default:
            break;
        }
      }
    }
  };

  const steps = [
    {
      id: 0,
      content: <StepType onSubmit={handleSubmitStep} />,
      title: t('createAd.step1.title'),
      activeValue: types.find((type) => type.value === formValues.type)?.title,
    },
    {
      id: 1,
      content: <StepCurrency onSubmit={handleSubmitStep} />,
      title: t('createAd.step2.title'),
      activeValue:
        selectedCryptoCurrency && selectedFiatCurrency && selectedPaymethod
          ? `${selectedCryptoCurrency?.code} за ${selectedFiatCurrency?.code} через ${selectedPaymethod?.description}`
          : undefined,
    },
    {
      id: 2,
      content: <StepRate onSubmit={handleSubmitStep} />,
      title: t('createAd.step3.title'),
      activeValue: (() => {
        if (!formValues.rateValue && !formValues.ratePercent) {
          return undefined;
        }

        return formValues.rateValue && formValues.currency ? (
          <>
            {t('Fixed')}{' '}
            <MoneyFormat
              money={createMoney(formValues.rateValue, getFiatCurrency(formValues.currency))}
            />
          </>
        ) : (
          `${t('Floating')} ${formValues.ratePercent}%`
        );
      })(),
    },
    {
      id: 3,
      content: <StepLimits onSubmit={handleSubmitStep} />,
      title: t('createAd.step4.title'),
      activeValue:
        formValues.currency && formValues.minAmount && formValues.maxAmount ? (
          <>
            <AmountFormat
              money={createMoney(formValues.minAmount, getFiatCurrency(formValues.currency))}
            />{' '}
            -{' '}
            <AmountFormat
              money={createMoney(formValues.maxAmount, getFiatCurrency(formValues.currency))}
            />
          </>
        ) : undefined,
    },
    {
      id: 4,
      content: <StepTerms onSubmit={handleSubmitStep} />,
      title: t('createAd.step5.title'),
      activeValue: (() => {
        const terms = formValues.terms ?? '';
        let details: string = '';

        if (formValues.type === 'selling') {
          if (formValues.individual) {
            details += formValues.individual ? t('Individual') : formValues.details ?? '';
          }
        }

        return `${terms}${details ? `. ${details}` : ''}`;
      })(),
    },
    {
      id: 5,
      content: <StepAdditional onSubmit={handleSubmitForm} />,
      title: t('createAd.step6.title'),
    },
  ];

  return (
    <>
      <Box
        position="relative"
        display="flex"
        flexDirection="column"
        gap="4x"
        pl={{ mobile: '8x', tablet: '10x' }}
        pr={{ mobile: '5x', tablet: '6x' }}
        py={{ mobile: '5x', tablet: '6x' }}
      >
        {steps.map(({ id, title, content, activeValue }, index) => {
          return (
            <CreateAdFormStep
              key={id}
              title={title}
              activeValue={activeValue}
              isActive={index === activeIndex}
              isCompleted={index < lastAvailableStep}
              isCompletedBeforeActive={index < lastAvailableStep && index < activeIndex}
              isNext={index === activeIndex + 1}
              onClick={() => handleTryGoToStep(index)}
            >
              {content}
            </CreateAdFormStep>
          );
        })}
      </Box>

      <Modal show={errorCode !== null} onClose={() => setErrorCode(null)}>
        <ModalHeader>{t('Error')}</ModalHeader>
        <ModalBody>{errorCode ? t(errorCode) : null}</ModalBody>
        <ModalFooter>
          <Button onClick={() => setErrorCode(null)} color="primary">
            {t('OK')}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
