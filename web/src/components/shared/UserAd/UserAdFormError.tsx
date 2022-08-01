import { FC } from 'react';
import { Text } from 'web/src/components/ui/Text';
import * as s from './UserAdFormError.css';

export const UserAdFormError: FC = ({ children }) => {
  return (
    <Text className={s.error} variant="caption" color="danger">
      {children}
    </Text>
  );
};
