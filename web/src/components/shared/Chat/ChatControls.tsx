import { ChangeEventHandler, FC, FormEventHandler, KeyboardEventHandler, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { useSharedT } from 'web/src/components/shared/Adapter';
import { Box } from 'web/src/components/ui/Box';
import SendIcon from 'web/src/assets/svg/SendIcon.svg';
import AttachIcon from 'web/src/assets/svg/AttachIcon.svg';
import * as s from './ChatControls.css';

interface Props {
  canSendFiles?: boolean | undefined;
  disabled?: boolean | undefined;
  onTextSend?: ((message: string) => void) | undefined;
  onFileSend?: ((file: File) => void) | undefined;
}

export const ChatControls: FC<Props> = ({
  canSendFiles = false,
  disabled = false,
  onTextSend,
  onFileSend,
}) => {
  const t = useSharedT();

  const [text, setText] = useState<string>('');

  const submit = () => {
    if (text.length > 0) {
      onTextSend?.(text);
      setText('');
    }
  };

  const handleTextChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    setText(event.target.value);
  };

  const handleTextKeyPress: KeyboardEventHandler<HTMLTextAreaElement> = (event) => {
    if (event.key === 'Enter') {
      if (!event.shiftKey && !event.ctrlKey) {
        event.preventDefault();

        submit();
        return;
      }

      if (event.ctrlKey) {
        setText(`${text}\n`);
      }
    }
  };

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    if (target && target.files && target.files[0]) {
      const file = target.files[0];
      onFileSend?.(file);
    }
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    submit();
  };

  return (
    <Box
      as="form"
      display="flex"
      alignItems="flex-end"
      gap="1x"
      borderTopStyle="solid"
      borderTopWidth="1x"
      borderColor="traderBorder"
      pl="2x"
      onSubmit={handleSubmit}
    >
      <Box flexGrow={1} display="flex">
        <TextareaAutosize
          className={s.textarea}
          minRows={1}
          maxRows={6}
          placeholder={t('Write message...')}
          value={text}
          disabled={disabled}
          onChange={handleTextChange}
          onKeyPress={handleTextKeyPress}
        />
      </Box>

      {canSendFiles && (
        <Box className={s.sendFile}>
          <input
            className={s.sendFileInput}
            type="file"
            accept=".jpg, .jpeg, .png"
            multiple={false}
            disabled={disabled}
            onChange={handleFileChange}
          />

          <AttachIcon width="auto" height="20" />
        </Box>
      )}

      <Box as="button" className={s.sendText} type="submit" disabled={disabled}>
        <SendIcon width="auto" height="20" />
      </Box>
    </Box>
  );
};
