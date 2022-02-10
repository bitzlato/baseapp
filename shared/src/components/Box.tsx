import { forwardRef, ElementType, FC, ComponentProps, PropsWithChildren } from 'react';
import cn from 'classnames';
import { OptionalWithUndefined } from 'shared/src/types';

import * as resetStyles from 'shared/src/theme/reset.css';
import { sprinkles, Sprinkles } from 'shared/src/theme/sprinkles.css';

type SprinklesKeys = keyof Sprinkles;
type BoxProps<C extends ElementType = 'div'> = OptionalWithUndefined<Sprinkles> & {
  as?: C | undefined;
  className?: string | undefined;
};

type Props<C extends ElementType = 'div'> = BoxProps<C> & Omit<ComponentProps<C>, keyof BoxProps>;

type BoxComponent = <C extends ElementType = 'div'>(
  props: PropsWithChildren<Props<C>>,
) => ReturnType<FC<Props<C>>>;

export const Box = forwardRef<any, Props>(
  ({ as: Component = 'div' as const, className, ...props }, ref) => {
    const [sprinklesProps, componentProps] = Object.keys(props).reduce<
      [Record<string, any>, Record<string, any>]
    >(
      (acc, propName) => {
        if (sprinkles.properties.has(propName as SprinklesKeys)) {
          acc[0][propName] = props[propName as SprinklesKeys];
        } else {
          acc[1][propName] = props[propName as keyof typeof props];
        }

        return acc;
      },
      [{}, {}],
    );

    return (
      <Component
        className={cn(
          className,
          resetStyles.base,
          resetStyles.element[Component as keyof typeof resetStyles.element],
          sprinkles(sprinklesProps),
        )}
        {...componentProps}
        ref={ref}
      />
    );
  },
) as BoxComponent;
