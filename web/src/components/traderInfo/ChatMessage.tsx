import { FC } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { ChatMessageType } from 'web/src/hooks/data/useUserChat';
import { Text } from 'web/src/components/ui/Text';
import * as styles from './ChatMessage.css';
import { Time } from './Time';

export const ChatMassege: FC<ChatMessageType> = ({ id, created, type, message }) => {
  return (
    <Box
      display="flex"
      mt="4x"
      mb="2x"
      flexDirection="column"
      alignItems={type === 'In' ? 'flex-end' : 'flex-start'}
      key={id}
    >
      <Time date={created} />
      <Box
        mt="1x"
        px="6x"
        py="3x"
        backgroundColor={type === 'In' ? 'chatFromMsgBg' : 'chatToMsgBg'}
        className={type === 'In' ? styles.chatFromMsgBlock : styles.chatToMsgBlock}
      >
        <Text color={type === 'In' ? 'chatFromMsgText' : 'chatToMsgText'} wordBreak="break-word">
          {message}
        </Text>
      </Box>
    </Box>
  );
};
