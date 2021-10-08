import React, { FC, ReactNode } from 'react';
import cn from 'classnames';
import { DotsFlashing } from 'src/components/Box/DotsFlashing/DotsFlashing';

import s from './HeaderToolbarItem.postcss';

interface Props {
  children?: ReactNode;
  color?: 'negative' | 'positive';
  label: string;
  isLoading?: boolean;
}

export const HeaderToolbarItem: FC<Props> = ({
  children,
  color = 'positive',
  label,
  isLoading = false,
}) => {
  let content: ReactNode = '-';
  if (isLoading) {
    content = <DotsFlashing />;
  } else if (children) {
    content = children;
  }

  return (
    <div className={s.item}>
      <div
        className={cn({
          [s.value]: true,
          [s.valueNegative]: color === 'negative',
          [s.valuePositive]: color === 'positive',
        })}
      >
        {content}
      </div>
      <div className={s.label}>{label}</div>
    </div>
  );
};
