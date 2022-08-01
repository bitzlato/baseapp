import { FC } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { Checkbox } from 'web/src/components/form/Checkbox';
import * as s from './EditCheckbox.css';

interface Props {
  name: string;
  checked: boolean;
  onChange: () => void;
}

export const EditCheckbox: FC<Props> = ({ name, checked, children, onChange }) => {
  return (
    <Box
      className={s.container}
      display="inline-flex"
      alignItems="center"
      justifyContent="flex-end"
      px="1.5x"
      borderRadius="1x"
      backgroundColor="userAdEditInputBg"
    >
      <Checkbox name={name} checked={checked} onChange={onChange}>
        {children}
      </Checkbox>
    </Box>
  );
};
