import { FC, useCallback, useRef, useState } from 'react';
import cn from 'classnames';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'web/src/components/ui/Modal';
import { Button } from 'web/src/components/ui/Button';
import { TextAreaInput } from 'web/src/components/TextInputCustom/TextInputCustom';
import { Box } from 'web/src/components/ui/Box';
import ArrowDropDown from 'web/src/assets/svg/ArrowDropDown.svg';
import { IconButton } from 'web/src/components/IconButton/IconButton';
import { useOnClickOutside } from 'web/src/hooks/useOnClickOutside';
import { useFetchLastRequisites } from 'web/src/hooks/data/useFetchTrade';
import { useSharedT } from 'web/src/components/shared/Adapter';
import * as s from 'web/src/components/shared/Modal/TradeDetailsModal.css';
import { useAppContext } from 'web/src/components/app/AppContext';

interface ITradeDetailsModal {
  confirm: (value: string) => void;
  onClose: () => void;
  paymethodId: number;
}

export const TradeDetailsModal: FC<ITradeDetailsModal> = ({ confirm, onClose, paymethodId }) => {
  const t = useSharedT();
  const { isMobileDevice } = useAppContext();
  const [details, setDetails] = useState('');
  const [showDetailsOptions, setShowDetailsOptions] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback(() => {
    if (showDetailsOptions) {
      setShowDetailsOptions(false);
    }
  }, [showDetailsOptions]);

  useOnClickOutside(elementRef, handleClickOutside);

  const { data } = useFetchLastRequisites(paymethodId);

  const lastDetails = data?.data || [];

  const toggleOptions = useCallback(() => setShowDetailsOptions((c) => !c), []);

  const handleSelectDetails = useCallback(
    (selectedDetails: string) => {
      setDetails(selectedDetails);
      toggleOptions();
    },
    [toggleOptions],
  );

  const handleClose = () => {
    onClose();
  };

  const handleConfirm = () => {
    confirm(details);
  };

  return (
    <Modal show onClose={handleClose}>
      <ModalHeader />
      <ModalBody>
        <Box display="flex" flexDirection="column" textAlign="center" gap="4x">
          <Box as="span" fontSize="lead">
            {t('trade.modal.details.title')}
          </Box>
          <Box as="span" fontSize="medium">
            {t('trade.modal.details.action')}
          </Box>

          <TextAreaInput
            rows={4}
            onChange={(value) => setDetails(value)}
            spellCheck={false}
            maxLength={400}
            icon={
              <IconButton onClick={toggleOptions}>
                <ArrowDropDown />
              </IconButton>
            }
            placeholder={t('Details')}
            value={details}
          />

          {showDetailsOptions && lastDetails.length > 0 && (
            <Box
              ref={elementRef}
              position="absolute"
              top="50%"
              bottom={0}
              left={0}
              w="full"
              px="6x"
            >
              {lastDetails.map((detail) => (
                <Box
                  key={detail}
                  className={cn(s.tradeDetailItemStyle)}
                  p="3x"
                  onClick={() => handleSelectDetails(detail)}
                >
                  {detail}
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </ModalBody>
      <ModalFooter>
        <Box w={isMobileDevice ? 'full' : 'auto'} mx={isMobileDevice ? '0' : 'auto'}>
          <Button fullWidth onClick={handleConfirm} color="secondary" disabled={!details}>
            {t('Confirm')}
          </Button>
        </Box>
      </ModalFooter>
    </Modal>
  );
};
