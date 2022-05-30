import { FC, useEffect, useRef, useState } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { Text } from 'web/src/components/ui/Text';
import { TextInput } from 'web/src/components/Input/TextInput';
import SendIcon from 'web/src/assets/svg/SendIcon.svg';
import AttachIcon from 'web/src/assets/svg/AttachIcon.svg';
import { IconButton } from 'web/src/components/IconButton/IconButton';
import { Spinner } from 'web/src/components/ui/Spinner';
import { useT } from 'web/src/hooks/useT';
import * as styles from './Chat.css';

export interface ChatProps {
  messages?: React.ReactElement[] | null;
  isCanSendFile?: boolean;
  onSendFile?: (file: File) => Promise<void>;
  onSendMessage?: (message: string) => Promise<void>;
  isSending?: Boolean;
}

export const Chat: FC<ChatProps> = ({ messages, onSendMessage, onSendFile, isSending }) => {
  const t = useT();
  const [message, setMessage] = useState<string>('');
  const messageBoxRef = useRef<HTMLDivElement>(null);

  const onSend = async () => {
    if (message && message.length > 0) {
      await onSendMessage?.(message);
      setMessage('');
    }
  };

  const onChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    const target = e.target as HTMLInputElement;
    if (target && target.files && target.files[0]) {
      const file = target?.files[0];
      await onSendFile?.(file);
      setMessage('');
    }
  };

  useEffect(() => {
    if (messageBoxRef.current) {
      messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
    }
  }, [messageBoxRef, messages]);

  return (
    <Box
      mt="4x"
      display="flex"
      flexGrow={1}
      borderWidth="1x"
      borderColor="traderBorder"
      borderStyle="solid"
      flexDirection="column"
    >
      {messages && messages.length > 0 && (
        <Box
          ref={messageBoxRef}
          display="flex"
          position="relative"
          overflowY="auto"
          flexDirection="column"
          flexGrow={1}
          m="2x"
        >
          <Box display="flex" flexDirection="column" position="absolute" width="full">
            {messages}
          </Box>
        </Box>
      )}

      {messages && messages.length === 0 && (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          flexGrow={1}
          m="2x"
        >
          <Text textAlign="center">{t('chat.nomessage')}</Text>
        </Box>
      )}

      {!messages && (
        <Box display="flex" justifyContent="center" flexGrow={1} alignItems="center">
          <Spinner />
        </Box>
      )}

      <Box
        display="flex"
        alignItems="center"
        borderTopStyle="solid"
        borderTopWidth="1x"
        borderColor="traderBorder"
      >
        {onSendFile && (
          <>
            <input
              type="file"
              name="files[]"
              id="file"
              style={{ display: 'none' }}
              onChange={onChangeFile}
            />
            <Box as="label" htmlFor="file" cursor="pointer" p="2x" pl="3x">
              <AttachIcon />
            </Box>
          </>
        )}
        <Box flexGrow={1} display="flex">
          <TextInput
            placeholder={t('chat.input.placeholder')}
            disabled={isSending}
            className={styles.chatInput}
            value={message}
            inputClassName={styles.chatInputComponent}
            onChange={setMessage}
            onPressEnter={onSend}
          />
        </Box>
        {isSending ? (
          <Box display="flex" alignItems="center" p="2x">
            <Spinner />
          </Box>
        ) : (
          <IconButton disabled={isSending} onClick={onSend}>
            <SendIcon />
          </IconButton>
        )}
      </Box>
    </Box>
  );
};
