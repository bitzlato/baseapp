import { FC } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { Text } from 'web/src/components/ui/Text';
import { TextInput } from 'web/src/components/Input/TextInput';
import SendIcon from 'web/src/assets/svg/SendIcon.svg';
import { IconButton } from 'web/src/components/IconButton/IconButton';
import * as styles from './Chat.css';

export const Chat: FC = () => {
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
      <Box
        display="flex"
        position="relative"
        overflowY="auto"
        flexDirection="column"
        flexGrow={1}
        m="2x"
      >
        <Box position="absolute">
          <Box display="flex" mb="2x" flexDirection="column" alignItems="flex-end">
            <Text>15:37</Text>
            <Box
              mt="2x"
              px="6x"
              py="3x"
              backgroundColor="chatFromMsgBg"
              className={styles.chatFromMsgBlock}
            >
              <Text color="chatFromMsgText">Привет</Text>
            </Box>
          </Box>
          <Box display="flex" mb="2x" flexDirection="column" alignItems="flex-start">
            <Text>15:37</Text>
            <Box
              mt="2x"
              px="6x"
              py="3x"
              backgroundColor="chatToMsgBg"
              className={styles.chatToMsgBlock}
            >
              <Text color="chatToMsgText">Привет</Text>
            </Box>
            <Box
              mt="2x"
              px="6x"
              py="3x"
              backgroundColor="chatToMsgBg"
              className={styles.chatToMsgBlock}
            >
              <Text color="chatToMsgText">
                Равным образом постоянный количественный рост и сфера нашей активности представляет
                собой интересный эксперимент проверки модели развития.
              </Text>
            </Box>
          </Box>
          <Box display="flex" mb="2x" flexDirection="column" alignItems="flex-start">
            <Text>15:37</Text>
            <Box
              mt="2x"
              px="6x"
              py="3x"
              backgroundColor="chatToMsgBg"
              className={styles.chatToMsgBlock}
            >
              <Text color="chatToMsgText">
                Равным образом постоянный количественный рост и сфера нашей активности представляет
                собой интересный эксперимент проверки модели развития.
              </Text>
            </Box>
          </Box>
          <Box display="flex" mb="2x" flexDirection="column" alignItems="flex-end">
            <Text>15:37</Text>
            <Box
              mt="2x"
              px="6x"
              py="3x"
              backgroundColor="chatFromMsgBg"
              className={styles.chatFromMsgBlock}
            >
              <Text color="chatFromMsgText">Привет</Text>
            </Box>
            <Box
              mt="2x"
              px="6x"
              py="3x"
              backgroundColor="chatFromMsgBg"
              className={styles.chatFromMsgBlock}
            >
              <Text color="chatFromMsgText">
                Равным образом постоянный количественный рост и сфера нашей активности представляет
                собой интересный эксперимент проверки модели развития.
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box display="flex" borderTopStyle="solid" borderTopWidth="1x" borderColor="traderBorder">
        <Box flexGrow={1} display="flex">
          <TextInput
            className={styles.chatInput}
            inputClassName={styles.chatInputComponent}
            onChange={() => {}}
          />
        </Box>
        <IconButton>
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
};
