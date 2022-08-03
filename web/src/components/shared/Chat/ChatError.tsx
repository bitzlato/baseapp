import { FC } from 'react';
import { Box } from 'web/src/components/ui/Box';
import CrossIcon from 'web/src/assets/svg/CrossIcon.svg';
import * as s from './ChatError.css';

interface Props {
  onClose?: (() => void) | undefined;
}

export const ChatError: FC<Props> = ({ children, onClose }) => {
  return (
    <Box className={s.backdrop}>
      <Box className={s.modal}>
        <Box
          position="relative"
          px="8x"
          py="12x"
          bg="chatErrorModal"
          color="text"
          borderRadius="1.5x"
          textAlign="center"
          fontSize="medium"
        >
          {onClose && (
            <Box
              as="button"
              type="button"
              className={s.cross}
              color={{
                default: 'text',
                hover: 'textHighlighted',
              }}
              p="2x"
              onClick={onClose}
            >
              <CrossIcon width="16" height="16" />
            </Box>
          )}
          {children}
        </Box>
      </Box>
    </Box>
  );
};
