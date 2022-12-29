import { FC } from 'react';
import { SharedTranslateFn } from 'web/src/components/shared/sharedI18n';
import { Modal, ModalBody, ModalHeader } from 'web/src/components/ui/Modal';
import { User } from 'web/src/modules/user/profile/types';
import { SignInForm } from './SignInForm';

interface Props {
  t: SharedTranslateFn;
  show?: boolean | undefined;
  onClose: () => void;
  onLoggedIn?: ((user: User | undefined) => void) | undefined;
}

export const SignInFormModal: FC<Props> = ({ t, show = false, onClose, onLoggedIn }) => (
  <Modal show={show} onClose={onClose}>
    <ModalHeader>{t('page.header.navbar.signIn')}</ModalHeader>
    <ModalBody>
      <SignInForm t={t} onLoggedIn={onLoggedIn} />
    </ModalBody>
  </Modal>
);
