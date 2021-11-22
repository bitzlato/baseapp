import React from 'react';
import cn from 'classnames';
import s from './Box.postcss';
import sLabel from '../Label/Label.postcss';

type BoxOwnProps<E = React.ElementType> = {
  as?: E;
  className?: string;
  row?: boolean;
  col?: boolean;
  alignStart?: boolean;
  grow?: boolean;
  justifyEnd?: boolean;
  justifyBetween?: boolean;
  justifyCenter?: boolean;
  alignCenter?: boolean;
  alignEnd?: boolean;
  selfStart?: boolean;
  selfStretch?: boolean;
  selfCenter?: boolean;
  wrap?: boolean;
  spacing?: boolean | '2x' | '3x' | '4x' | 'sm';
  padding?: boolean | '2x' | '3x';
  textSize?: 'lg' | 'sm';
  textColor?: 'primary' | 'secondary' | 'warning' | 'success' | 'failed';
  bgColor?: 'body';
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
      alignEnd,
      justifyEnd,
      justifyBetween,
      justifyCenter,
      selfStart,
      selfStretch,
      selfCenter,
      wrap,
      textSize,
      textColor,
      bgColor,
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
      alignEnd && s.alignEnd,
      justifyEnd && s.justifyEnd,
      justifyBetween && s.justifyBetween,
      justifyCenter && s.justifyCenter,
      selfStart && s.selfStart,
      selfStretch && s.selfStretch,
      selfCenter && s.selfCenter,
      wrap && s.wrap,
      row && spacing === true && s.rowSpacing,
      row && spacing === '2x' && s.rowSpacing2X,
      row && spacing === '3x' && s.rowSpacing3X,
      row && spacing === '4x' && s.rowSpacing4X,
      row && spacing === 'sm' && s.rowSpacingSm,
      col && spacing === true && s.colSpacing,
      col && spacing === '2x' && s.colSpacing2X,
      col && spacing === '3x' && s.colSpacing3X,
      col && spacing === '4x' && s.colSpacing4X,
      col && spacing === 'sm' && s.colSpacingSm,
      padding === true && s.padding,
      padding === '2x' && s.padding2X,
      padding === '3x' && s.padding3X,
      textSize === 'lg' && sLabel.textLg,
      textSize === 'sm' && sLabel.textSm,
      textColor && sLabel[`${textColor}Color`],
      bgColor && s[`${bgColor}BgColor`],
    );
    return React.createElement(as, { ...props, ref, className: boxClassName });
  },
);
