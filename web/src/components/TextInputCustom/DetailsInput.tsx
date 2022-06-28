import { FC, useRef, useState } from 'react';
import ArrowDropDown from 'web/src/assets/svg/ArrowDropDown.svg';
import { Box } from 'web/src/components/ui/Box';
import cn from 'classnames';
import { IconButton } from 'web/src/components/IconButton/IconButton';
import { useSharedT } from 'web/src/components/shared/Adapter';
import { useOnClickOutside } from 'web/src/hooks/useOnClickOutside';
import { TextAreaInput } from './TextInputCustom';
import * as s from './DetailsInput.css';

type Props = {
  details: string;
  onChangeDetails: (details: string) => void;
  lastDetails: string[];
  rows?: number;
};

export const DetailsInput: FC<Props> = ({ details, onChangeDetails, lastDetails, rows = 4 }) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  const t = useSharedT();

  const toggleOptions = () => setShow((c) => !c);

  const handleClickOutside = () => {
    if (show) {
      setShow(false);
    }
  };

  useOnClickOutside(elementRef, handleClickOutside);

  const handleSelectDetails = (selectedDetails: string) => {
    onChangeDetails(selectedDetails);
    toggleOptions();
  };

  return (
    <>
      <TextAreaInput
        rows={rows}
        onChange={onChangeDetails}
        spellCheck={false}
        maxLength={400}
        icon={
          lastDetails.length > 0 && (
            <IconButton onClick={toggleOptions}>
              <ArrowDropDown />
            </IconButton>
          )
        }
        placeholder={t('Details')}
        value={details}
      />
      {show && lastDetails.length > 0 && (
        <Box className={s.detailsBox} ref={elementRef} position="absolute" w="full">
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
    </>
  );
};
