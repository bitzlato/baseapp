import React from 'react';
import cn from 'classnames';
import s from './Box.postcss';

export const boxStyle = s;

type BoxOwnProps<E = React.ElementType> = {
  as?: E;
  className?: string;
  row?: boolean;
  col?: boolean;
  alignStart?: boolean;
  grow?: boolean;
  justifyEnd?: boolean;
  alignCenter?: boolean;
  selfStart?: boolean;
  spacing?: boolean | '2x' | '3x';
  padding?: '2x' | '3x';
};

type Props<E extends React.ElementType> = BoxOwnProps<E> &
  Omit<React.ComponentProps<E>, keyof BoxOwnProps>;

type Element = <E extends React.ElementType = 'div'>(props: Props<E>) => React.ReactElement | null;

export const Box: Element = React.forwardRef(
  (
    {
      as = 'div',
      className,
      row,
      col,
      spacing,
      alignStart,
      padding,
      grow,
      alignCenter,
      justifyEnd,
      selfStart,
      ...props
    }: BoxOwnProps,
    ref,
  ) => {
    const boxClassName = cn(
      className,
      row && s.row,
      col && s.col,
      alignStart && s.alignStart,
      grow && s.grow,
      alignCenter && s.alignCenter,
      justifyEnd && s.justifyEnd,
      selfStart && s.selfStart,
      row && spacing === true && s.rowSpacing,
      row && spacing === '2x' && s.rowSpacing2X,
      row && spacing === '3x' && s.rowSpacing3X,
      col && spacing === true && s.colSpacing,
      col && spacing === '2x' && s.colSpacing2X,
      col && spacing === '3x' && s.colSpacing3X,
      padding === '2x' && s.padding2X,
      padding === '3x' && s.padding3X
    );
    return React.createElement(as, { ...props, ref, className: boxClassName });
  },
);
