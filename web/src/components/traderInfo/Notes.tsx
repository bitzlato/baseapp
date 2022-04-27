import { FC } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { Text } from 'web/src/components/ui/Text';
import { TextInput } from 'web/src/components/Input/TextInput';
import MinusIcon from 'web/src/assets/svg/MinusIcon.svg';
import PlusIcon from 'web/src/assets/svg/PlusIcon.svg';
import { IconButton } from 'web/src/components/IconButton/IconButton';
import * as styles from './Notes.css';

export const Notes: FC = () => {
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
          <Box display="flex" my="2x">
            <Box mr="1x" color="text" px="6x" py="3x" borderRadius="1x" backgroundColor="notesBg">
              <Text>
                Равным образом постоянный количественный рост и сфера нашей активности представляет
                собой интересный эксперимент проверки модели развития.
              </Text>
            </Box>
            <IconButton className={styles.notesButton}>
              <MinusIcon />
            </IconButton>
          </Box>
          <Box display="flex" my="2x">
            <Box mr="1x" color="text" px="6x" py="3x" borderRadius="1x" backgroundColor="notesBg">
              <Text>
                Равным образом постоянный количественный рост и сфера нашей активности представляет
                собой интересный эксперимент проверки модели развития.
              </Text>
            </Box>
            <IconButton className={styles.notesButton}>
              <MinusIcon />
            </IconButton>
          </Box>
          <Box display="flex" my="2x">
            <Box mr="1x" color="text" px="6x" py="3x" borderRadius="1x" backgroundColor="notesBg">
              <Text>
                Равным образом постоянный количественный рост и сфера нашей активности представляет
                собой интересный эксперимент проверки модели развития.
              </Text>
            </Box>
            <IconButton className={styles.notesButton}>
              <MinusIcon />
            </IconButton>
          </Box>
          <Box display="flex" my="2x">
            <Box mr="1x" color="text" px="6x" py="3x" borderRadius="1x" backgroundColor="notesBg">
              <Text>
                Равным образом постоянный количественный рост и сфера нашей активности представляет
                собой интересный эксперимент проверки модели развития.
              </Text>
            </Box>
            <IconButton className={styles.notesButton}>
              <MinusIcon />
            </IconButton>
          </Box>
          <Box display="flex" my="2x">
            <Box mr="1x" color="text" px="6x" py="3x" borderRadius="1x" backgroundColor="notesBg">
              <Text>
                Равным образом постоянный количественный рост и сфера нашей активности представляет
                собой интересный эксперимент проверки модели развития.
              </Text>
            </Box>
            <IconButton className={styles.notesButton}>
              <MinusIcon />
            </IconButton>
          </Box>
          <Box display="flex" my="2x">
            <Box mr="1x" color="text" px="6x" py="3x" borderRadius="1x" backgroundColor="notesBg">
              <Text>
                Равным образом постоянный количественный рост и сфера нашей активности представляет
                собой интересный эксперимент проверки модели развития.
              </Text>
            </Box>
            <IconButton className={styles.notesButton}>
              <MinusIcon />
            </IconButton>
          </Box>
          <Box display="flex">
            <Box
              flexGrow={1}
              display="flex"
              borderRadius="1x"
              backgroundColor="notesBg"
              marginRight="1x"
            >
              <TextInput
                className={styles.notesInput}
                inputClassName={styles.notesInputComponent}
                onChange={() => {}}
              />
            </Box>
            <IconButton className={styles.notesButton}>
              <PlusIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
