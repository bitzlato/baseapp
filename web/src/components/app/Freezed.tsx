import { FC } from 'react';
import { useSelector } from 'react-redux';
import { FreezedModal } from 'web/src/containers/modals/FreezedModal';
import { selectUserFreezed } from 'web/src/modules/user/profile/selectors';

export const Freezed: FC = () => {
  const freezed = useSelector(selectUserFreezed);

  if (!freezed) {
    return null;
  }

  return <FreezedModal />;
};
