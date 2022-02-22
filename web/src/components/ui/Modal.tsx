import { FC } from 'react';
import cn from 'classnames';
import { useSelector } from 'react-redux';
import { useTransition } from 'transition-hook';
import { FocusOn } from 'react-focus-on';
import { selectCurrentColorTheme } from 'web/src/modules';
import { getThemeClassName } from 'web/src/theme/getThemeClassName';
import CrossIcon from 'web/src/assets/svg/CrossIcon.svg';
import { Box } from './Box';
import { Portal } from './Portal';
import { Text } from './Text';
import * as s from './Modal.css';

interface ModalProps {
  show: boolean;
  size?: keyof typeof s.modal;
  onClose: () => void;
}

export const Modal: FC<ModalProps> = ({ children, show = false, size = 'md', onClose }) => {
  const { stage, shouldMount } = useTransition(show, s.MODAL_TRANSITION_TIMEOUT);
  const theme = useSelector(selectCurrentColorTheme);

  if (!shouldMount) {
    return null;
  }

  const handleClose = () => {
    if (stage === 'enter') {
      onClose();
    }
  };

  return (
    <Portal>
      <FocusOn onEscapeKey={handleClose}>
        <Box
          className={cn(getThemeClassName(theme), s.overlay, stage === 'enter' && s.overlayEnter)}
        >
          <Box className={s.backdrop} onClick={handleClose} />
          <Box className={s.modal[size]}>
            <Box
              position="relative"
              bg="modal"
              color="text"
              boxShadow="modal"
              borderRadius="2x"
              overflow="hidden"
              width="full"
            >
              <Box
                as="button"
                type="button"
                position="absolute"
                top={0}
                right={0}
                color={{
                  default: 'text',
                  hover: 'textHighlighted',
                }}
                px="4x"
                pt="5x"
                pb="4x"
                onClick={handleClose}
              >
                <CrossIcon width="16px" height="16px" />
              </Box>
              {children}
            </Box>
          </Box>
        </Box>
      </FocusOn>
    </Portal>
  );
};

export const ModalHeader: FC = ({ children }) => (
  <Box px="6x" py="4x">
    <Text variant="title">{children}</Text>
  </Box>
);

export const ModalBody: FC = ({ children }) => (
  <Box fontSize="medium" px="6x">
    {children}
  </Box>
);

export const ModalFooter: FC = ({ children }) => (
  <Box display="flex" alignItems="center" justifyContent="flex-end" px="6x" py="4x">
    {children}
  </Box>
);
