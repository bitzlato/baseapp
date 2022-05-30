import { FC, useEffect, useRef, useState } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { Text } from 'web/src/components/ui/Text';
import { TextInput } from 'web/src/components/Input/TextInput';
import PlusIcon from 'web/src/assets/svg/PlusIcon.svg';
import { IconButton } from 'web/src/components/IconButton/IconButton';
import { Note, useFetchNotes, useSendNote } from 'web/src/hooks/data/useUserNotes';
import { Spinner } from 'web/src/components/ui/Spinner';
import * as styles from './Notes.css';

interface NotesProps {
  publicName: string;
}

export const Notes: FC<NotesProps> = ({ publicName }) => {
  const notes = useFetchNotes(publicName);
  const sendNote = useSendNote(publicName);
  const notesBoxRef = useRef<HTMLDivElement>(null);
  const [text, setText] = useState<string>();

  const handleSendNote = () => {
    if (text !== undefined && text.length > 0) {
      sendNote({ text }).then(() => setText(''));
    }
  };

  useEffect(() => {
    if (notesBoxRef.current) {
      notesBoxRef.current.scrollTop = notesBoxRef.current.scrollHeight;
    }
  }, [notesBoxRef, notes]);

  return (
    <Box
      mt="4x"
      display="flex"
      flexGrow={1}
      height="full"
      width="full"
      borderWidth="1x"
      borderColor="traderBorder"
      borderStyle="solid"
    >
      {notes ? (
        <Box
          ref={notesBoxRef}
          display="flex"
          position="relative"
          overflowY="auto"
          flexGrow={1}
          m="2x"
        >
          <Box display="flex" flexDirection="column" position="absolute" width="full">
            {notes.map((note: Note) => (
              <Box display="flex" mb="2x" key={note.date}>
                <Box
                  flexGrow={1}
                  color="text"
                  px="4x"
                  py="3x"
                  borderRadius="1x"
                  backgroundColor="notesBg"
                >
                  <Text>{note.text}</Text>
                </Box>
              </Box>
            ))}

            <Box display="flex">
              <Box flexGrow={1} display="flex" borderRadius="1x" backgroundColor="notesBg" mr="1x">
                <TextInput
                  className={styles.notesInput}
                  value={text}
                  inputClassName={styles.notesInputComponent}
                  onChange={setText}
                />
              </Box>
              <IconButton className={styles.notesButton} onClick={handleSendNote}>
                <PlusIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box display="flex" flexGrow={1} justifyContent="center" alignItems="center">
          <Spinner />
        </Box>
      )}
    </Box>
  );
};
