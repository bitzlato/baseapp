import cn from 'classnames';
import { Box, Element } from 'web/src/components/Box/Box';

import s from './Container.postcss';

type Props = {
  className?: string | undefined;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | undefined;
};

export const Container: Element<Props> = ({ className, maxWidth = 'md', ...props }) => {
  return <Box {...props} className={cn(s.container, s[maxWidth], className)} />;
};
