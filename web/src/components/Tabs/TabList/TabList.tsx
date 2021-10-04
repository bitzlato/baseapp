import React, { FC, ReactNode } from 'react';
import cn from 'classnames';

import s from './TabList.postcss';

interface Props {
  className?: string;
  children: ReactNode;
}

export const TabList: FC<Props> = ({ className, children }: Props) => (
  <div className={cn(s.tabList, className)}>{children}</div>
);
