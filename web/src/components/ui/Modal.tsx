import { FC, ReactNode } from 'react';
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
import { Spinner } from './Spinner';
import * as s from './Modal.css';

interface ModalProps {
  show: boolean;
  persistent?: boolean;
  size?: keyof typeof s.modal;
  onClose?: () => void;
}

export const Modal: FC<ModalProps> = ({
  children,
  show = false,
  size = 'md',
  persistent = false,
  onClose,
}) => {
  const { stage, shouldMount } = useTransition(show, s.MODAL_TRANSITION_TIMEOUT);
  const theme = useSelector(selectCurrentColorTheme);

  if (!shouldMount) {
    return null;
  }

  const handleClose = () => {
    if (persistent) {
      // noop, close persistent by code
      return;
    }
    if (stage === 'enter') {
      onClose?.();
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
              {!persistent && (
                <Box
                  as="button"
                  type="button"
                  className={s.cross}
                  color={{
                    default: 'text',
                    hover: 'textHighlighted',
                  }}
                  p="4x"
                  onClick={handleClose}
                >
                  <CrossIcon width="16px" height="16px" />
                </Box>
              )}
              {children}
            </Box>
          </Box>
        </Box>
      </FocusOn>
    </Portal>
  );
};

export const ModalHeader: FC = ({ children }) => (
  <Box px="6x" pt="5x" pb="4x">
    <Text variant="title">{children}</Text>
  </Box>
);

interface ModalBodyProps {
  loading?: boolean | undefined;
}

export const ModalBody: FC<ModalBodyProps> = ({ children, loading = false }) => {
  let spinner: ReactNode;
  if (loading) {
    if (children) {
      spinner = (
        <Box
          bg="modal"
          display="flex"
          alignItems="center"
          justifyContent="center"
          position="absolute"
          top={0}
          left={0}
          bottom={0}
          right={0}
          zIndex="modalInner"
        >
          <Spinner />
        </Box>
      );
    } else {
      spinner = (
        <Box display="flex" justifyContent="center" py="6x">
          <Spinner />
        </Box>
      );
    }
  }

  return (
    <Box fontSize="medium" px="6x" position={loading && children ? 'relative' : undefined}>
      {children}
      {spinner}
    </Box>
  );
};

export const ModalFooter: FC = ({ children }) => (
  <Box display="flex" alignItems="center" justifyContent="flex-end" px="6x" pt="4x" pb="6x">
    {children}
  </Box>
);
