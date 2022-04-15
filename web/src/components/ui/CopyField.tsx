import { FC, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Box } from 'web/src/components/ui/Box';
import { IconButton } from 'web/src/components/IconButton/IconButton';
import { CopyIcon } from 'src/assets/icons/CopyIcon';
import { useT } from 'web/src/hooks/useT';
import { copy } from 'web/src/helpers/copy';
import { alertPush } from 'web/src/modules/public/alert/actions';
import * as s from './CopyField.css';

interface Props {
  label?: string | undefined;
  value: string;
  multiline?: boolean;
}

export const CopyField: FC<Props> = ({ label, value, multiline = false }) => {
  const t = useT();
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const handleClickCopy = () => {
    if (inputRef.current) {
      copy(inputRef.current);

      dispatch(alertPush({ message: ['Successfully copied'], type: 'success' }));
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      borderRadius="1x"
      borderWidth="1x"
      borderStyle="solid"
      borderColor="modalHeaderBorderBottom"
      pl="4x"
      pr="2x"
      py="2x"
    >
      <Box flexGrow={1}>
        {label && (
          <Box fontSize="small" color="textMuted" mb="1x">
            {label}
          </Box>
        )}
        <Box
          ref={inputRef}
          as={multiline ? 'textarea' : 'input'}
          className={s.input}
          color="text"
          fontSize="small"
          value={value}
          readOnly
        />
      </Box>
      <IconButton onClick={handleClickCopy} title={t('page.body.profile.apiKeys.modal.btn.copy')}>
        <CopyIcon />
      </IconButton>
    </Box>
  );
};
