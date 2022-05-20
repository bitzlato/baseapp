import { forwardRef, ElementType, FC, ComponentProps, PropsWithChildren } from 'react';
import cn from 'classnames';
import { OptionalWithUndefined } from 'web/src/types';
import * as resetStyles from 'web/src/theme/reset.css';
import { sprinkles, Sprinkles } from 'web/src/theme/sprinkles.css';
import * as s from './Box.css';

type SprinklesKeys = keyof Sprinkles;
export type BoxProps<C extends ElementType = 'div'> = OptionalWithUndefined<Sprinkles> & {
  as?: C | undefined;
  className?: string | undefined;
  gap?: '1x' | '2x' | '3x' | '4x' | '6x' | '8x' | undefined;
};

type Props<C extends ElementType = 'div'> = BoxProps<C> & Omit<ComponentProps<C>, keyof BoxProps>;

type BoxComponent = <C extends ElementType = 'div'>(
  props: PropsWithChildren<Props<C>>,
) => ReturnType<FC<Props<C>>>;

export const Box = forwardRef<any, Props>(
  ({ as: Component = 'div' as const, className, gap, ...props }, ref) => {
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

    const col = props.flexDirection === 'column';

    return (
      <Component
        className={cn(
          resetStyles.base,
          resetStyles.element[Component as keyof typeof resetStyles.element],
          sprinkles(sprinklesProps),
          gap && s[`${col ? 'col' : 'row'}Gap${gap}`],
          className,
        )}
        {...componentProps}
        ref={ref}
      />
    );
  },
) as BoxComponent;
