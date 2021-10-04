import React, { FC } from 'react';
import { SortAsc, SortDefault, SortDesc } from 'src/assets/images/SortIcons';

type Props = {
  selected: boolean;
  reversed: boolean;
};

export const SortIcon: FC<Props> = ({ selected, reversed }: Props) => {
  if (selected) {
    return reversed ? <SortAsc /> : <SortDesc />;
  }

  return <SortDefault />;
};
