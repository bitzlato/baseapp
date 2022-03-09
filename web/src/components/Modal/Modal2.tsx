/* eslint-disable react/destructuring-assignment */
import { FC, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { CloseIcon } from 'web/src/assets/images/CloseIcon';
import { Box } from 'web/src/components/Box/Box';
import { Card } from 'web/src/components/Card/Card';
import { Container } from 'web/src/components/Container/Container';
import { IconButton } from 'web/src/components/IconButton/IconButton';
import { selectMobileDeviceState } from 'web/src/modules/public/globalSettings/selectors';
import { MobileModal } from 'web/src/mobile/components/Modal';

interface Props {
  header: ReactNode;
  onClose?: () => void;
  show: boolean | undefined;
}

export const Modal2: FC<Props> = (props) => {
  const isMobileDevice = useSelector(selectMobileDeviceState);

  if (!props.show) {
    return null;
  }

  if (isMobileDevice) {
    return (
      <MobileModal isOpen title={props.header} onClose={props.onClose}>
        <Box padding="4" grow col spacing="3" justify="between">
          {props.children}
        </Box>
      </MobileModal>
    );
  }

  return (
    <div className="cr-modal">
      <Container maxWidth="sm">
        <Card
          header={
            <Box row spacing="2" justify="between">
              <h4>{props.header}</h4>
              {props.onClose ? (
                <IconButton onClick={props.onClose}>
                  <CloseIcon />
                </IconButton>
              ) : null}
            </Box>
          }
        >
          <Box grow col spacing="3" justify="between">
            {props.children}
          </Box>
        </Card>
      </Container>
    </div>
  );
};
