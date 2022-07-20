import { FC, ReactNode } from 'react';
import { Box, BoxProps } from 'web/src/components/ui/Box';
import { Spinner } from 'web/src/components/ui/Spinner';
import { HeaderSizes } from './Table.css';
import * as s from './Table.css';

interface TableHeaderProps {
  size?: HeaderSizes | undefined;
}

export const TableHeader: FC<TableHeaderProps> = ({ size = 'medium', children }) => (
  <Box
    className={s.header[size]}
    display="flex"
    alignItems="center"
    borderTopStyle="solid"
    borderTopWidth="1x"
    borderBottomStyle="solid"
    borderBottomWidth="1x"
    borderColor="giftsTableHeaderBorder"
  >
    {children}
  </Box>
);

export const TableBody: FC = ({ children }) => <Box>{children}</Box>;

interface TableRowProps extends BoxProps<'div'> {}

export const TableRow: FC<TableRowProps> = ({ children, onClick, ...restProps }) => (
  <Box
    display="flex"
    alignItems="center"
    py="3x"
    position="relative"
    overflow="hidden"
    borderBottomStyle="solid"
    borderBottomWidth="1x"
    borderBottomColor="giftsTableRowBorder"
    onClick={onClick}
    {...restProps}
  >
    {children}
  </Box>
);

interface Props {
  header: ReactNode;
  emptyContent?: ReactNode | undefined;
  isLoading: boolean;
}

export const Table: FC<Props> = ({ children, header, emptyContent, isLoading }) => {
  let body;
  if (isLoading) {
    body = (
      <Box display="flex" justifyContent="center" py="20x">
        <Spinner />
      </Box>
    );
  } else if (children) {
    body = children;
  } else {
    body = emptyContent;
  }

  return (
    <Box fontSize="medium" color="text" mb="5x">
      {header}
      {body}
    </Box>
  );
};
