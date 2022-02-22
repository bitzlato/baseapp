import { ElementType, FC, Fragment } from 'react';
import cn from 'classnames';
import { Box } from 'web/src/components/ui/Box';
import { OptionalWithUndefined } from 'web/src/types';
import { Sprinkles } from 'web/src/theme/sprinkles.css';
import * as s from './Skeleton.css';

interface Props extends OptionalWithUndefined<Sprinkles> {
  className?: string | undefined;
  count?: number | undefined;
  wrapper?: ElementType | undefined;
}

export const Skeleton: FC<Props> = ({
  className,
  count = 1,
  wrapper: Wrapper,
  ...props
}: Props) => {
  const elements = Array.from({ length: count }, (_, i) => {
    const element = (
      <Fragment key={i}>
        <Box as="span" className={cn(s.skeleton, className)} borderRadius="1x" w="full" {...props}>
          &zwnj;
        </Box>
        <br />
      </Fragment>
    );

    return Wrapper ? <Wrapper key={i}>{element}</Wrapper> : element;
  });

  return (
    <span aria-live="polite" aria-busy>
      {elements}
    </span>
  );
};
