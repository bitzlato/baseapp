import { FC } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { Text } from 'web/src/components/ui/Text';
import { ChatMessageTime } from 'web/src/components/shared/Chat/ChatMessageTime';
import { ChatMessage } from 'web/src/types/chat.types';
import * as s from './ChatMessageBox.css';

interface Props {
  message: ChatMessage;
  messageRef?: React.RefObject<HTMLDivElement> | undefined;
  hiddenTime?: boolean | undefined;
}

export const ChatMessageBox: FC<Props> = ({
  message: { created, type, message, file },
  messageRef,
  hiddenTime = false,
}) => {
  return (
    <Box
      ref={messageRef}
      className={!hiddenTime ? s.topSpace : undefined}
      display="flex"
      flexDirection="column"
      alignItems={type === 'Out' ? 'flex-end' : 'flex-start'}
    >
      {!hiddenTime && <ChatMessageTime time={created} />}
      <Box
        mt="1x"
        px="4x"
        py="3x"
        borderRadius="1.5x"
        backgroundColor={type === 'Out' ? 'chatFromMsgBg' : 'chatToMsgBg'}
        className={s.message[type === 'Out' ? 'from' : 'to']}
      >
        {file ? (
          <Box
            as="a"
            color={{ default: 'interactive', hover: 'interactiveHighlighted' }}
            href={file.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Box as="img" w="15x" h="15x" src={file.url} alt={file.title} borderRadius="1.5x" />
          </Box>
        ) : (
          <Text
            as="div"
            color={type === 'Out' ? 'chatFromMsgText' : 'chatToMsgText'}
            wordBreak="break-word"
          >
            {message.split('\n').map((line) => (
              <>
                {line}
                <br />
              </>
            ))}
          </Text>
        )}
      </Box>
    </Box>
  );
};
