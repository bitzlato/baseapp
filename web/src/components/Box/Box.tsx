import React from 'react';
import cn from 'classnames';
import { capitalize } from 'src/helpers/capitalize';
import s from './Box.postcss';
import sLabel from '../Label/Label.postcss';

export type TextColor = 'primary' | 'secondary' | 'warning' | 'success' | 'failed' | 'bid' | 'ask';

type BoxOwnProps<E = React.ElementType> = {
  as?: E;
  className?: string;
  row?: boolean;
  col?: boolean;
  alignStart?: boolean;
  grow?: boolean;
  flex1?: boolean;
  wrap?: boolean;
  position?: 'relative' | 'absolute';
  justify?: 'end' | 'center' | 'between';
  align?: 'end' | 'center';
  self?: 'start' | 'center' | 'end' | 'stretch';
  spacing?: boolean | '2' | '3' | '4' | '5' | 'sm';
  padding?: boolean | '2' | '3' | '5';
  textSize?: 'lg' | 'sm';
  textColor?: TextColor;
  textTr?: 'capitalize' | 'uppercase';
  textAlign?: 'start';
  bgColor?: 'body';
  ellipsis?: boolean;
  bold?: boolean;
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
      flex1,
      align,
      position,
      justify,
      self,
      wrap,
      textSize,
      textColor,
      textTr,
      textAlign,
      bgColor,
      ellipsis,
      bold,
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
      flex1 && s.flex1,
      wrap && s.wrap,
      align && s[`align${capitalize(align)}`],
      position && s[`position${capitalize(position)}`],
      justify && s[`justify${capitalize(justify)}`],
      self && s[`self${capitalize(self)}`],
      spacing && s[`${row ? 'row' : 'col'}Spacing${spacing === true ? '' : capitalize(spacing)}`],
      padding && s[`padding${padding === true ? '' : capitalize(padding)}`],
      textSize && sLabel[`${textSize}Size`],
      textColor && sLabel[`${textColor}Color`],
      textTr && sLabel[`${textTr}Transform`],
      textAlign && s[`textAlign${capitalize(textAlign)}`],
      bgColor && s[`${bgColor}BgColor`],
      ellipsis && sLabel.ellipsis,
      bold && sLabel.bold,
    );
    return React.createElement(as, { ...props, ref, className: boxClassName });
  },
);
