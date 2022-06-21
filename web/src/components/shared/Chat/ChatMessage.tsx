import { FC } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { ChatMessageType } from 'web/src/hooks/data/useUserChat';
import { Text } from 'web/src/components/ui/Text';
import { Time } from 'web/src/components/shared/Time/Time';
import * as styles from './ChatMessage.css';

export const ChatMessage: FC<ChatMessageType> = ({ id, created, type, message }) => {
  return (
    <Box
      display="flex"
      mt="4x"
      mb="2x"
      flexDirection="column"
      alignItems={type === 'Out' ? 'flex-end' : 'flex-start'}
      key={id}
    >
      <Time date={created} />
      <Box
        mt="1x"
        px="6x"
        py="3x"
        backgroundColor={type === 'Out' ? 'chatFromMsgBg' : 'chatToMsgBg'}
        className={type === 'Out' ? styles.chatFromMsgBlock : styles.chatToMsgBlock}
      >
        <Text color={type === 'Out' ? 'chatFromMsgText' : 'chatToMsgText'} wordBreak="break-word">
          {message}
        </Text>
      </Box>
    </Box>
  );
};
