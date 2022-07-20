import { FC, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Box } from 'web/src/components/ui/Box';
import { useT } from 'web/src/hooks/useT';
import { copy } from 'web/src/helpers/copy';
import { alertPush } from 'web/src/modules/public/alert/actions';
import CopyIcon from 'src/assets/svg/CopyIcon.svg';
import * as s from './CopyField.css';

interface Props {
  value: string;
}

export const CopyField: FC<Props> = ({ value }) => {
  const t = useT();
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
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
      bg="giftsInstructionsBg"
      pl="6x"
      pr="2x"
      py="2x"
    >
      <Box flexGrow={1}>
        <Box
          ref={inputRef}
          as="input"
          className={s.input}
          color="text"
          fontSize="small"
          value={value}
          readOnly
        />
      </Box>

      <Box
        as="button"
        type="button"
        ml="2x"
        title={t('page.body.profile.apiKeys.modal.btn.copy')}
        color="textMuted"
        onClick={handleClickCopy}
      >
        <CopyIcon />
      </Box>
    </Box>
  );
};
