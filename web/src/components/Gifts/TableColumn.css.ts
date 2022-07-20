import { style, styleVariants } from '@vanilla-extract/css';

const columnSizes = {
  small: '11',
  medium: '14',
  large: '16',
};

const columnBase = style({ flexShrink: 1, flexBasis: '0%' });

export const columns = styleVariants(columnSizes, (size) => [columnBase, { flexGrow: size }]);

export type ColumnsSizes = keyof typeof columns;
