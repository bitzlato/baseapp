import { FC, ReactNode } from 'react';
import cn from 'classnames';

import s from './LandingContainer.postcss';

type Props = {
  className?: string;
  children: ReactNode;
};

export const LandingContainer: FC<Props> = ({ className, children }: Props) => {
  return <div className={cn(s.container, className)}>{children}</div>;
};
