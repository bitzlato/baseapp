import { FC, memo } from 'react';
import IconFirst from 'web/src/assets/svg/IconFirst.svg';
import IconPrev from 'web/src/assets/svg/IconPrev.svg';
import IconNext from 'web/src/assets/svg/IconNext.svg';
import IconLast from 'web/src/assets/svg/IconLast.svg';
import { Box } from 'web/src/components/ui/Box';
import { Text } from 'web/src/components/ui/Text';
import { SelectString } from 'web/src/components/Select/Select';
import { useAppContext } from 'web/src/components/app/AppContext';
import { createT } from 'web/src/components/shared/sharedI18n';
import * as s from './Pagination.css';

export const PER_PAGE_DEFAULT = 15;
const PER_PAGE_OPTIONS_DEFAULT = [15, 30, 50];
const SIBLING_COUNT = 1;

interface PaginationItemProps {
  title?: string | undefined;
  active?: boolean | undefined;
  disabled?: boolean | undefined;
  onClick?: (() => void) | undefined;
}

const PaginationItem: FC<PaginationItemProps> = ({
  children,
  title,
  active = false,
  disabled = false,
  onClick,
}) => {
  if (onClick) {
    let className = s.item.button;
    if (active) {
      className = s.item.active;
    } else if (disabled) {
      className = s.item.disabled;
    }

    return (
      <Box as="button" type="button" className={className} title={title} onClick={onClick}>
        {children}
      </Box>
    );
  }

  return (
    <Box className={s.item.base} title={title}>
      {children}
    </Box>
  );
};

const range = (start: number, end: number) =>
  Array.from({ length: end - start + 1 }, (_, i) => start + i);

interface Props {
  page: number;
  total: number;
  perPage?: number | undefined;
  perPageOptions?: number[] | undefined;
  onChange: (page: number) => void;
  onChangePerPage?: ((perPage: number) => void) | undefined;
}

export const Pagination: FC<Props> = memo(
  ({
    page,
    total,
    perPage = PER_PAGE_DEFAULT,
    perPageOptions = PER_PAGE_OPTIONS_DEFAULT,
    onChange,
    onChangePerPage,
  }) => {
    const { lang } = useAppContext();
    const t = createT(lang);

    const count = Math.ceil(total / perPage);

    if (count <= 0) {
      return null;
    }

    let siblingsStart = Math.max(Math.min(page - 1, count - SIBLING_COUNT * 2 - 2), 3);
    if (siblingsStart - 1 === 2) {
      siblingsStart = 2;
    }
    let siblingsEnd = Math.min(Math.max(page + 1, SIBLING_COUNT * 2 + 3), count - 2);
    if (count - siblingsEnd === 2) {
      siblingsEnd = count - 1;
    }

    const handleChangePerPage = (value: number | null) => {
      if (value !== null && onChangePerPage) {
        onChangePerPage(value);
      }
    };
    const handleClickToFirst = () => onChange(1);
    const handleClickToPrev = () => onChange(page - 1);
    const handleClickToNext = () => onChange(page + 1);
    const handleClickToLast = () => onChange(count);

    return (
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <SelectString
          value={perPage as any}
          options={perPageOptions as any}
          onChange={handleChangePerPage as any}
          maxMenuHeight={200}
        />
        <Box display="flex" alignItems="center">
          <PaginationItem
            disabled={page === 1}
            title={t('Go to first')}
            onClick={handleClickToFirst}
          >
            <IconFirst />
          </PaginationItem>
          <PaginationItem
            title={t('Go to previous')}
            disabled={page === 1}
            onClick={handleClickToPrev}
          >
            <IconPrev />
          </PaginationItem>
          <PaginationItem active={page === 1} onClick={handleClickToFirst}>
            1
          </PaginationItem>
          {siblingsStart > 3 && <PaginationItem>...</PaginationItem>}
          {range(siblingsStart, siblingsEnd).map((item) => (
            <PaginationItem key={item} active={page === item} onClick={() => onChange(item)}>
              {item}
            </PaginationItem>
          ))}
          {siblingsEnd < count - 2 && <PaginationItem>...</PaginationItem>}
          {count > 1 && (
            <PaginationItem active={page === count} onClick={handleClickToLast}>
              {count}
            </PaginationItem>
          )}
          <PaginationItem
            title={t('Go to next')}
            disabled={page === count}
            onClick={handleClickToNext}
          >
            <IconNext />
          </PaginationItem>
          <PaginationItem
            title={t('Go to last')}
            disabled={page === count}
            onClick={handleClickToLast}
          >
            <IconLast />
          </PaginationItem>
        </Box>
        <Box
          minHeight="11x"
          borderRadius="1.5x"
          paddingLeft="4x"
          paddingRight="4x"
          display="inline-flex"
          alignItems="center"
          backgroundColor="reportBgHover"
        >
          <Text color="secondary">
            <span>{page}</span> {t('of')} <span>{count}</span>
          </Text>
        </Box>
      </Box>
    );
  },
);

Pagination.displayName = 'Pagination';
