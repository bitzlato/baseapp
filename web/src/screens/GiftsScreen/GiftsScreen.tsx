import { FC, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Adapter } from 'web/src/components/shared/Adapter';
import { Breadcrumbs, BreadcrumbsItem } from 'web/src/components/ui/Breadcrumbs';
import { Container } from 'web/src/components/ui/Container';
import { Box } from 'web/src/components/ui/Box';
import { Card } from 'web/src/components/ui/Card';
import { Button } from 'web/src/components/ui/Button';
import { Text } from 'web/src/components/ui/Text';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'web/src/components/ui/Modal';
import { useDocumentTitle } from 'src/hooks/useDocumentTitle';
import { useT } from 'web/src/hooks/useT';
import { selectUserInfo } from 'web/src/modules/user/profile/selectors';
import { GiftsNavigation } from 'web/src/components/Gifts/GiftsNavigation';
import { CreateGiftForm, FormValues } from 'web/src/components/Gifts/CreateGiftForm';
import { GiftsInstructions } from 'web/src/components/Gifts/GiftsInstructions';
import { useP2PCreateGift } from 'web/src/hooks/mutations/useP2PCreateGift';
import { P2PVoucher, P2VoucherPostParams } from 'web/src/modules/account/voucher-types';
import { TwoFactorModal } from 'web/src/containers/ProfileAuthDetails/TwoFactorModal';
import { SafeModeWizardModal } from 'web/src/components/profile/settings/SafeModeWizardModal';
import { ProposalToEnableOTP } from 'web/src/components/profile/ProposalToEnableOTP';
import { FetchError } from 'web/src/helpers/fetch';
import { useHandleFetchError, useIsMobileDevice } from 'web/src/components/app/AppContext';
import { CreatedGiftModal } from 'web/src/components/Gifts/CreatedGiftModal';
import HelpIconSvg from 'web/src/assets/svg/HelpIcon.svg';
import * as s from './GiftsScreen.css';

export const GiftsScreen: FC = () => {
  useDocumentTitle('Gifts');
  const t = useT();
  const history = useHistory();
  const isMobileDevice = useIsMobileDevice();
  const handleFetchError = useHandleFetchError();
  const user = useSelector(selectUserInfo);
  const [createGift] = useP2PCreateGift();
  const [code2fa, setCode2fa] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [values, setValues] = useState<P2VoucherPostParams>();
  const [show2fa, setShow2fa] = useState(false);
  const [showSafeModeWizard, setShowSafeModeWizard] = useState(false);
  const [show2faProposal, setShow2faProposal] = useState(false);
  const [createdGift, setCreatedGift] = useState<P2PVoucher | undefined>();
  const [showNotice, setShowNotice] = useState(false);

  const handleCreateGift = async (
    formValues: P2VoucherPostParams,
    twoFACode?: string | null | undefined,
  ) => {
    try {
      const response = await createGift({ params: formValues, twoFACode });

      setShow2fa(false);
      if (response && 'email' in response) {
        setEmail(response.email);
      }

      if (response && 'links' in response) {
        setCreatedGift((current) => (current === undefined ? response : current));
      }
    } catch (error) {
      if (error instanceof FetchError) {
        // code is not used because wrong 2FA comes with same value - MfaRequired
        if (error.code === 478 && error.payload.message === '2FA Token Required') {
          setShow2fa(true);
        } else if (error.code === 471 && error.payload.code === 'SafetyWizardRequired') {
          setShowSafeModeWizard(true);
        } else if (error.code === 409 && error.payload.code === 'NoTwoFaUserApprove') {
          setShow2faProposal(true);
        } else {
          handleFetchError(error);
        }
      }
    }
  };

  const handleSubmit = async (formValues: FormValues) => {
    setValues(formValues);
    handleCreateGift(formValues);
  };

  const handleSend2fa = (code: string) => {
    setCode2fa(code);
    if (values) {
      handleCreateGift(values, code);
    }
  };

  const handleSendWithout2fa = async () => {
    setShow2faProposal(false);

    if (values) {
      handleCreateGift(values, null);
    }
  };

  const header = isMobileDevice ? (
    <Box px="5x">
      <Box as={Text} variant="h4">
        {t('gifts.createGift')}
      </Box>
      <Box as={Text} variant="body" mt="1x">
        {t('gifts.createNoticeQuestion')}{' '}
        <Box
          as="span"
          color={showNotice ? 'giftsQuestionActive' : 'giftsQuestion'}
          onClick={() => setShowNotice((current) => !current)}
        >
          <HelpIconSvg />
        </Box>
      </Box>
      {showNotice ? (
        <Box className={s.notice} as={Text} variant="caption" color="giftsNotice" pt="3x">
          {t('gifts.createNotice', {
            br: (
              <>
                <br />
                <br />
              </>
            ),
          })}
        </Box>
      ) : null}
    </Box>
  ) : (
    <Box
      py="6x"
      borderBottomStyle="solid"
      borderBottomWidth="1x"
      borderBottomColor="textInputControl"
    >
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" flexDirection="row" flexWrap="wrap">
          <Box as={Text} variant="h4" marginRight="10x">
            {t('Gifts')}
          </Box>
          <Box
            className={s.notice}
            as={Text}
            variant="body"
            color="giftsNotice"
            display={{ tablet: 'none', desktop: 'block' }}
          >
            {t('gifts.notice')}
          </Box>
        </Box>
        <Box flexShrink={0} ml="4x">
          <GiftsNavigation />
        </Box>
      </Box>

      <Box
        className={s.notice}
        as={Text}
        variant="body"
        color="giftsNotice"
        display={{ tablet: 'block', desktop: 'none' }}
        mt="3x"
      >
        {t('gifts.notice')}
      </Box>
    </Box>
  );

  return (
    <Adapter Link={Link} history={history}>
      <Container maxWidth="xl" my="6x">
        {isMobileDevice ? null : (
          <Box px="4x">
            <Breadcrumbs>
              <BreadcrumbsItem>{t('Gifts')}</BreadcrumbsItem>
              <BreadcrumbsItem>{t('gifts.createGift')}</BreadcrumbsItem>
            </Breadcrumbs>
          </Box>
        )}

        <Box px={{ mobile: '0', tablet: '4x' }}>
          <Card display="flex" flexDirection="column" pb="9x" px={{ tablet: '6x', desktop: '15x' }}>
            {header}

            <Box display="flex" pt={{ mobile: '6x', tablet: '5x' }} pb="7x">
              <Box width="full">
                {isMobileDevice ? null : (
                  <>
                    <Box as={Text} variant="title" fontWeight="strong">
                      {t('gifts.createGift')}
                    </Box>
                    <Box
                      className={s.createNotice}
                      as={Text}
                      variant="caption"
                      color="textMuted"
                      mt="2x"
                    >
                      {t('gifts.createNotice', { br: ' ' })}
                    </Box>
                  </>
                )}

                <Box
                  className={s.form}
                  flexGrow={1}
                  mt={{ mobile: '0', tablet: '8x' }}
                  mr={{ mobile: '0', desktop: '15x' }}
                  px={{ mobile: '5x', tablet: '0' }}
                  pt={{ mobile: '4x', tablet: '0' }}
                  pb={{ mobile: '10x', tablet: '0' }}
                >
                  <CreateGiftForm user={user} onSubmit={handleSubmit} />
                </Box>
              </Box>

              <Box mt="3x" display={{ mobile: 'none', desktop: 'block' }} flexShrink={0}>
                <GiftsInstructions />
              </Box>
            </Box>
          </Card>
        </Box>
      </Container>

      <TwoFactorModal
        show={show2fa}
        buttonText={t('Create gift')}
        text={
          <span>
            {user.bitzlato_user
              ? t('Enter 2FA code from the app for', {
                  name: (
                    <strong>{`${
                      user.bitzlato_user.user_profile.public_name ??
                      user.bitzlato_user.user_profile.generated_name
                    }@Bitzlato.com`}</strong>
                  ),
                })
              : undefined}
          </span>
        }
        onClose={() => setShow2fa(false)}
        onSend={handleSend2fa}
      />

      {email ? (
        <Modal show size="lg" onClose={() => setEmail(null)}>
          <ModalHeader>{t('Confirmation')}</ModalHeader>

          <ModalBody>
            <Box display="flex" flexDirection="column" gap="3x">
              <Text>{t('gift.confirmation_email', { email })}</Text>
              <Text>{t('gift.check_spam')}</Text>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={() => (values ? handleCreateGift(values, code2fa) : null)}
              color="primary"
            >
              {t('Send an email again')}
            </Button>
          </ModalFooter>
        </Modal>
      ) : null}

      <SafeModeWizardModal show={showSafeModeWizard} onClose={() => setShowSafeModeWizard(false)} />

      <ProposalToEnableOTP
        show={show2faProposal}
        onClose={() => setShow2faProposal(false)}
        onSend={handleSendWithout2fa}
      />

      {createdGift ? (
        <CreatedGiftModal gift={createdGift} onClose={() => setCreatedGift(undefined)} />
      ) : null}
    </Adapter>
  );
};
