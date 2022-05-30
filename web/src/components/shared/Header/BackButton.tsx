import { FC } from 'react';
import { Box } from 'web/src/components/ui/Box';
import ChevronLeftIcon from 'web/src/assets/svg/ChevronLeftIcon.svg';
import * as s from './BackButton.css';

interface Props {
  title: string;
  onClick: () => void;
}

export const BackButton: FC<Props> = ({ title, onClick }) => {
  return (
    <Box
      as="button"
      type="button"
      display="flex"
      alignItems="center"
      color={{ default: 'headerLinkText', hover: 'headerLinkTextHover' }}
      className={s.button}
      onClick={onClick}
    >
      <ChevronLeftIcon />
      <Box as="span" fontWeight="strong">
        {title}
      </Box>
    </Box>
  );
};
