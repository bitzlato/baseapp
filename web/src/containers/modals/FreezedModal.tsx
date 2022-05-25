import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'web/src/components/ui/Button';
import { useT } from 'web/src/hooks/useT';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'web/src/components/ui/Modal';
import { toggleFreezed } from 'web/src/modules/user/profile/actions';

export const FreezedModal: FC = () => {
  const t = useT();
  const dispatch = useDispatch();

  const close = () => {
    dispatch(toggleFreezed({ freezed: false }));
  };

  const handleSupportToggle = () => {
    close();
    // @ts-ignore
    global.toggleWidget();
  };

  return (
    <Modal show onClose={close}>
      <ModalHeader>{t('Your account is restricted!')}</ModalHeader>
      <ModalBody>
        <p>{t('freezed.info', { br: <br /> })}</p>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" fullWidth onClick={handleSupportToggle}>
          {t('Support team')}
        </Button>
      </ModalFooter>
    </Modal>
  );
};
