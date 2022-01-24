import { JSXElementConstructor, AllHTMLAttributes, forwardRef } from 'react';
import cn from 'classnames';
import { OptionalWithUndefined } from 'types';

import * as resetStyles from 'theme/reset.css';
import { sprinkles, Sprinkles } from 'theme/sprinkles.css';

type SprinklesKeys = keyof Sprinkles;
type JSXElement = keyof JSX.IntrinsicElements | JSXElementConstructor<any>;
export interface Props
  extends Omit<AllHTMLAttributes<HTMLElement>, 'as' | 'className' | SprinklesKeys>,
    OptionalWithUndefined<Sprinkles> {
  as?: JSXElement | undefined;
  className?: string | undefined;
}

export const Box = forwardRef<HTMLElement, Props>(
  ({ as: Component = 'div', className, ...props }, ref) => {
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
);
