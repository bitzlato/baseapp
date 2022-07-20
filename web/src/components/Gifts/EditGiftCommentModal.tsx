import { FC, useState } from 'react';
import { useT } from 'web/src/hooks/useT';
import { Box } from 'web/src/components/ui/Box';
import { Text } from 'web/src/components/ui/Text';
import { Button } from 'web/src/components/ui/Button';
import { Modal, ModalBody, ModalHeader } from 'web/src/components/ui/Modal';
import { TextAreaInput } from 'web/src/components/TextInputCustom/TextInputCustom';
import { isEmpty } from 'web/src/helpers/isEmptyObject';
import { MAX_COMMENT_LENGTH } from './CreateGiftForm';
import * as s from './EditGiftCommentModal.css';

interface Props {
  show: boolean;
  initialComment: string;
  onClose: () => void;
  onSubmit: (comment: string) => void;
}

type FormFields = 'comment';
type FormErrors = Partial<{ [key in FormFields]: string | null }>;

export const EditGiftCommentModal: FC<Props> = ({ show, initialComment, onClose, onSubmit }) => {
  const t = useT();
  const [comment, setComment] = useState(initialComment);
  const [errors, setErrors] = useState<FormErrors | null>(null);

  const validate = () => {
    const result: FormErrors = {};

    if (comment.length > MAX_COMMENT_LENGTH) {
      result.comment = t('gifts.maxCommentLength', { count: MAX_COMMENT_LENGTH });
    }

    return isEmpty(result) ? null : result;
  };

  const handleSubmit = () => {
    const formErrors = validate();
    if (formErrors !== null) {
      setErrors(formErrors);
      return;
    }

    onSubmit(comment);
  };

  return (
    <Modal size="lg" show={show} onClose={onClose}>
      <ModalHeader center>{t('Enter comment')}</ModalHeader>
      <ModalBody>
        <Box pt="4x" pb="10x">
          <TextAreaInput
            placeholder={t('gifts.comment.placeholder')}
            maxLength={MAX_COMMENT_LENGTH}
            value={comment}
            isError={Boolean(errors?.comment)}
            onChange={setComment}
          />
          {errors?.comment ? (
            <Box mt="1x">
              <Text variant="caption" color="danger">
                {errors.comment}
              </Text>
            </Box>
          ) : null}

          <Box display="flex" justifyContent="center">
            <Box display="inline-block" mt="8x" className={s.button}>
              <Button fullWidth onClick={handleSubmit}>
                {t('Save')}
              </Button>
            </Box>
          </Box>
        </Box>
      </ModalBody>
    </Modal>
  );
};
