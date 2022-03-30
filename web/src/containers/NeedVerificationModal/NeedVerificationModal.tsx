import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'web/src/components/ui/Button';
import { useT } from 'web/src/hooks/useT';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'web/src/components/ui/Modal';
import { toggleNeedVerification } from 'web/src/modules/user/profile/actions';
import { getBitzlatoLink } from 'web/src/helpers/links';
import { selectCurrentLanguage } from 'web/src/modules/public/i18n/selectors';

export const NeedVerificationModal: FC = () => {
  const t = useT();
  const dispatch = useDispatch();
  const language = useSelector(selectCurrentLanguage);
  const supportLink = getBitzlatoLink(language, 'knowledgebase/');

  const handleClick = () => {
    dispatch(toggleNeedVerification({ needVerification: false }));
  };

  return (
    <Modal show onClose={handleClick}>
      <ModalHeader>{t('verification.pass')}</ModalHeader>
      <ModalBody>
        <p>{t('verification.oops')}</p>
        <p>{t('verification.info', { br: <br /> })}</p>
        <p>
          {t('verification.support')}
          <br />
          <a href={supportLink} target="_blank" rel="noopener noreferrer">
            {supportLink}
          </a>
        </p>
      </ModalBody>
      <ModalFooter>
        <Button fullWidth onClick={handleClick}>
          {t('OK')}
        </Button>
      </ModalFooter>
    </Modal>
  );
};
