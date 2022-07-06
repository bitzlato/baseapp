import cn from 'classnames';
import { FC } from 'react';
import { Box, BoxProps } from 'web/src/components/ui/Box';
import * as s from './Container.css';

interface Props extends Omit<BoxProps, 'className' | 'maxWidth'> {
  className?: string | undefined;
  maxWidth?: s.Sizes | undefined;
}

export const Container: FC<Props> = ({ className, maxWidth, ...rest }) => (
  <Box className={cn(maxWidth && s.container[maxWidth], className)} {...rest} />
);
