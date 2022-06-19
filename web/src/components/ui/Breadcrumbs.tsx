import { Children, FC, Fragment } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { useAdapterContext } from 'web/src/components/shared/Adapter';
import BreadcrumbsSeporatorSvg from 'web/src/assets/svg/BreadcrumbsSeporator.svg';

const BreadcrumbsSeporator: FC = () => (
  <Box color="breadcrumbsColor" display="flex" alignItems="center" mx="2x">
    <BreadcrumbsSeporatorSvg />
  </Box>
);

export const Breadcrumbs: FC = ({ children }) => {
  const items = Children.toArray(children);

  return (
    <Box display="flex" alignItems="center" my="4x">
      {items.map((item, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Fragment key={index}>
          {item}
          {index !== items.length - 1 && <BreadcrumbsSeporator />}
        </Fragment>
      ))}
    </Box>
  );
};

type BreadcrumbsItemProps = {
  to?: string | string;
};

const breadcrumbsItemLinkProps = {
  color: { default: 'breadcrumbsColor' as const, hover: 'breadcrumbsColor' as const },
  fontSize: 'caption' as const,
};

export const BreadcrumbsItem: FC<BreadcrumbsItemProps> = ({ to, children }) => {
  const { Link } = useAdapterContext();

  return to ? (
    <Box as={Link} to={to} {...breadcrumbsItemLinkProps}>
      {children}
    </Box>
  ) : (
    <Box {...breadcrumbsItemLinkProps}>{children}</Box>
  );
};
