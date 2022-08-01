import { FC } from 'react';
import cn from 'classnames';
import { useAppContext } from 'web/src/components/app/AppContext';
import { Box } from 'web/src/components/ui/Box';
import EditIcon from 'web/src/assets/svg/EditIcon2.svg';
import * as s from './EditButton.css';

interface Props {
  isEdit: boolean;
  onClick: () => void;
}

export const EditButton: FC<Props> = ({ isEdit, onClick }) => {
  const { isMobileDevice } = useAppContext();

  return (
    <Box
      className={cn(s.button, isEdit && s.buttonActive)}
      as="button"
      type="button"
      p="2x"
      onClick={onClick}
    >
      <EditIcon
        viewBox="0 0 10 10"
        width={isMobileDevice ? 16 : 13}
        height={isMobileDevice ? 16 : 13}
      />
    </Box>
  );
};
