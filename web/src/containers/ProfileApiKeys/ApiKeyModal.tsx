/* eslint-disable react/destructuring-assignment */
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'web/src/components/ui/Button';
import { CopyableTextField } from 'web/src/components/CopyableTextField';
import { Modal2 } from 'web/src/components/Modal/Modal2';
import { useT } from 'web/src/hooks/useT';
import { alertPush } from 'web/src/modules/public/alert/actions';
import { Box } from 'web/src/components/Box/Box';
import { WarningIcon } from 'web/src/mobile/assets/images/WarningIcon';

interface Props {
  onClose: () => void;
  kid: string;
  secret: string;
}

export const ApiKeyModal: FC<Props> = (props) => {
  const t = useT();
  const dispatch = useDispatch();

  const handleCopy = (type: string) => {
    dispatch(alertPush({ message: [`success.api_keys.copied.${type}`], type: 'success' }));
  };

  return (
    <Modal2
      show
      header={t('page.body.profile.apiKeys.modal.created_header')}
      onClose={props.onClose}
    >
      <CopyableTextField
        fieldId="access-key-id"
        value={props.kid}
        label={t('page.body.profile.apiKeys.modal.access_key')}
        onCopy={() => handleCopy('access')}
      />
      <Box textColor="warning">
        <Box row>
          <WarningIcon />
          <span>{t('page.body.profile.apiKeys.modal.secret_key')}</span>
        </Box>
        <p>
          {t('page.body.profile.apiKeys.modal.secret_key_info')}
          <span> {t('page.body.profile.apiKeys.modal.secret_key_store')}</span>
        </p>
      </Box>
      <CopyableTextField
        fieldId="secret_key-id"
        value={props.secret}
        label={t('page.body.profile.apiKeys.modal.secret_key')}
        onCopy={() => handleCopy('secret')}
      />
      <Box as="p" textColor="secondary">
        <Box as="span" bold>
          {t('page.body.profile.apiKeys.modal.note')}
        </Box>
        <br />
        {t('page.body.profile.apiKeys.modal.note_content')}
      </Box>
      <Button onClick={props.onClose} color="primary">
        {t('OK')}
      </Button>
    </Modal2>
  );
};
