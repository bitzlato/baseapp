import { FC, useRef, useState } from 'react';
import ArrowDropDown from 'web/src/assets/svg/ArrowDropDown.svg';
import { Box } from 'web/src/components/ui/Box';
import cn from 'classnames';
import { IconButton } from 'web/src/components/IconButton/IconButton';
import { useSharedT } from 'web/src/components/shared/Adapter';
import { useOnClickOutside } from 'web/src/hooks/useOnClickOutside';
import { MAX_AD_DETAILS_LENGTH } from 'web/src/components/shared/CreateAd/StepTerms';
import { TextAreaInput } from './TextInputCustom';
import * as s from './DetailsInput.css';

type Props = {
  inputClassName?: string | undefined;
  lastDetails: string[];
  rows?: number;
  isError?: boolean | undefined;
  details: string;
  onChangeDetails: (details: string) => void;
};

export const DetailsInput: FC<Props> = ({
  inputClassName,
  rows = 4,
  lastDetails,
  isError = false,
  details,
  onChangeDetails,
}) => {
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
    <Box position="relative">
      <TextAreaInput
        className={inputClassName}
        rows={rows}
        spellCheck={false}
        maxLength={MAX_AD_DETAILS_LENGTH}
        icon={
          lastDetails.length > 0 && (
            <IconButton onClick={toggleOptions}>
              <ArrowDropDown />
            </IconButton>
          )
        }
        placeholder={t('Details')}
        isError={isError}
        value={details}
        onChange={onChangeDetails}
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
    </Box>
  );
};
