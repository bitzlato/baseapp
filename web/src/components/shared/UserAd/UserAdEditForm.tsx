import { FC, useState } from 'react';
import { KeyedMutator } from 'swr';
import { UserAdvertDetails, UserAdvertSource } from 'web/src/modules/p2p/types';
import { FetchError } from 'web/src/helpers/fetch';
import { Modal, ModalBody, ModalFooter } from 'web/src/components/ui/Modal';
import { Box } from 'web/src/components/ui/Box';
import { Text } from 'web/src/components/ui/Text';
import { Button } from 'web/src/components/ui/Button';
import { Spinner } from 'web/src/components/ui/Spinner';
import { UpdateUserAdInput, useUpdateUserAd } from 'web/src/hooks/mutations/useUpdateUserAd';
import { useAdapterContext } from 'web/src/components/shared/Adapter';
import { useAppContext } from 'web/src/components/app/AppContext';
import { UserAdLinks } from './UserAdLinks';
import { UserAdAdvertStep } from './UserAdAdvertStep';
import { UserAdAdditionalStep } from './UserAdAdditionalStep';
import { UserAdBlock } from './UserAdBlock';
import { useUserAdEditContext } from './UserAdEditContext';
import { UserAdRequisitesStep } from './UserAdRequisitesStep';
import { UserAdTermsStep } from './UserAdTermsStep';
import * as s from './UserAdEditForm.css';
import { UserAdStatusStep } from './UserAdStatusStep';

interface Props {
  ad: UserAdvertDetails;
  mutateAd: KeyedMutator<UserAdvertSource>;
}

export const UserAdEditForm: FC<Props> = ({ ad, mutateAd }) => {
  const { t } = useAdapterContext();
  const { isMobileDevice, lang } = useAppContext();
  const { formValues, isSomeInEdit, resetForm, setStepErrors, formErrors } = useUserAdEditContext();
  const isFormInEdit = isSomeInEdit();
  const isPurchase = ad.type === 'purchase';
  const [updateUserAd, { status }] = useUpdateUserAd(lang);
  const [submittingError, setSubmittingError] = useState<string | null>(null);

  const handleUpdateUserAd = async (values: UpdateUserAdInput['values']) => {
    try {
      if (formErrors !== null) {
        return;
      }

      setStepErrors(null);

      await updateUserAd({ id: ad.id, values });
      mutateAd();
      resetForm();
    } catch (error) {
      if (error instanceof FetchError) {
        switch (error.payload.code) {
          case 'TooHighAdvertRate':
            setStepErrors({ advert: t(error.payload.code) });
            break;

          case 'NotEnoughRatingForTermsWithDigits':
            setStepErrors({ terms: t(error.payload.code) });
            break;

          case 'WrongMaxLimitForNewTrader':
            setStepErrors({ additional: t(error.payload.code) });
            break;

          case 'AdsUpdatedToOften':
            setSubmittingError(t('userAd.adsUpdatedToOften'));
            break;

          default:
            break;
        }
      }
    }
  };

  const handleSubmit = () => {
    handleUpdateUserAd(formValues);
  };

  return (
    <>
      <Box display="flex" flexDirection={{ mobile: 'column', tablet: 'row' }}>
        <Box
          display="flex"
          flexDirection="column"
          gap={isMobileDevice ? '5x' : undefined}
          width="full"
          mr={{ mobile: '0', tablet: '5x', desktop: '7x' }}
        >
          <UserAdAdvertStep ad={ad} />
          <UserAdStatusStep ad={ad} mutateAd={mutateAd} />
          <UserAdAdditionalStep ad={ad} />
        </Box>

        <Box
          display="flex"
          flexDirection="column"
          gap={isMobileDevice ? '5x' : undefined}
          width="full"
          mt={{ mobile: '5x', tablet: '0' }}
          ml={{ mobile: '0', tablet: '5x', desktop: '7x' }}
        >
          {isPurchase ? null : <UserAdRequisitesStep ad={ad} />}
          <UserAdBlock title={t('Share')} right={<UserAdLinks links={ad.links} />} />
          <UserAdTermsStep ad={ad} />

          {isFormInEdit ? (
            <Box className={s.submitContainer} display="flex" justifyContent="flex-end" mt="15x">
              <Box className={s.submitButtonContainer} display="inline-block">
                <Button fullWidth onClick={handleSubmit}>
                  {status === 'running' ? <Spinner size="5x" /> : t('Save')}
                </Button>
              </Box>
            </Box>
          ) : null}
        </Box>
      </Box>

      <Modal show={submittingError !== null} onClose={() => setSubmittingError(null)}>
        <Box px="6x" py="5x">
          <Text variant="title" textAlign="center">
            {t('Error')}
          </Text>
        </Box>
        <ModalBody>
          <Box mb="6x">
            <Text textAlign="center">{submittingError}</Text>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            onClick={() => setSubmittingError(null)}
          >
            {t('OK')}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
