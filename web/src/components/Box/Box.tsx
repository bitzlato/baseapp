import React from 'react';
import cn from 'classnames';
import { capitalize } from 'src/helpers/capitalize';
import s from './Box.postcss';
import sLabel from '../Label/Label.postcss';

export type TextColor = 'primary' | 'secondary' | 'warning' | 'success' | 'failed' | 'bid' | 'ask';

type BoxOwnProps<E = React.ElementType> = {
  as?: E | undefined;
  className?: string | undefined;
  row?: boolean | undefined;
  col?: boolean | undefined;
  grow?: boolean | undefined;
  flex?: '1' | 'golden' | undefined;
  wrap?: boolean | undefined;
  position?: 'relative' | 'absolute' | undefined;
  justify?: 'end' | 'center' | 'between' | 'around' | undefined;
  align?: 'start' | 'end' | 'center' | 'stretch' | undefined;
  self?: 'start' | 'center' | 'end' | 'stretch' | undefined;
  spacing?: boolean | '2' | '3' | '4' | '5' | 'sm' | undefined;
  gap?: boolean | '2' | '3' | '4' | '5' | 'sm' | undefined;
  padding?: boolean | '2' | '3' | '4' | '5' | '2X3' | undefined;
  margin?: '0' | undefined;
  my?: '2' | '4' | '7' | undefined;
  textSize?: 'sm' | 'lg' | 'xl' | undefined;
  textColor?: TextColor | undefined;
  textTr?: 'capitalize' | 'uppercase' | undefined;
  textAlign?: 'start' | 'center' | 'end' | undefined;
  bgColor?: 'body' | undefined;
  ellipsis?: boolean | undefined;
  bold?: boolean | undefined;
};

type Props<E extends React.ElementType> = BoxOwnProps<E> &
  Omit<React.ComponentProps<E>, keyof BoxOwnProps>;

export type Element<P = {}> = <E extends React.ElementType = 'div'>(
  props: Props<E> & P,
) => React.ReactElement | null;

export const Box: Element = React.forwardRef(
  (
    {
      as = 'div',
      className,
      row,
      col,
      spacing,
      gap,
      padding,
      margin,
      my,
      grow,
      flex,
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
      grow && s.grow,
      flex && s[`flex${capitalize(flex)}`],
      wrap && s.wrap,
      align && s[`align${capitalize(align)}`],
      position && s[`position${capitalize(position)}`],
      justify && s[`justify${capitalize(justify)}`],
      self && s[`self${capitalize(self)}`],
      spacing && s[`${row ? 'row' : 'col'}Spacing${spacing === true ? '' : capitalize(spacing)}`],
      gap && s.gap,
      gap && s[`gap${gap === true ? '' : capitalize(gap)}`],
      padding && s[`padding${padding === true ? '' : capitalize(padding)}`],
      margin && s[`margin${margin}`],
      my && s[`my${my}`],
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
