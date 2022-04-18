/* eslint-disable no-nested-ternary */
import { FC, useMemo, useState } from 'react';
import cn from 'classnames';
import IconFirst from 'web/src/assets/svg/IconFirst.svg';
import IconPrev from 'web/src/assets/svg/IconPrev.svg';
import IconNext from 'web/src/assets/svg/IconNext.svg';
import IconLast from 'web/src/assets/svg/IconLast.svg';
import { Box } from 'web/src/components/ui/Box';
import { Text } from 'web/src/components/ui/Text';
import { SelectString } from 'web/src/components/Select/Select';
import { IconButton } from 'web/src/components/IconButton/IconButton';
import { useAppContext } from 'web/src/components/app/AppContext';
import { createT } from 'web/src/components/shared/sharedI18n';
import { item } from './Pagination.css';

function formatPage(d: number) {
  return <Text>{`${d + 1}`}</Text>;
}

interface PaginationItemProps {
  page: number;
  currentPage: number;
  onClick: (page: number) => void;
}

const PaginationItem: FC<PaginationItemProps> = ({ page, currentPage, onClick }) => {
  const isCurrent = page === currentPage;
  return (
    <IconButton
      className={cn(isCurrent && item)}
      disabled={isCurrent}
      onClick={() => onClick(page)}
    >
      {formatPage(page)}
    </IconButton>
  );
};

const SERIE = 5;

function fill<T>(start: number, end: number, fn: (i: number) => T): T[] {
  const res: T[] = [];
  // eslint-disable-next-line no-plusplus
  for (let i = start; i <= end; i++) {
    res.push(fn(i));
  }
  return res;
}

interface Props {
  defaultPage?: number | undefined;
  total: number;
  limit: number;
  onChange: (page: number) => void;
}

export const Pagination: FC<Props> = ({ defaultPage, total, limit, onChange }) => {
  const [page, setPage] = useState(defaultPage ?? 0);

  const { lang } = useAppContext();
  const t = createT(lang);

  const pages = Math.ceil(total / limit);
  const dots = pages >= SERIE + 2;
  const ldots = dots && page >= SERIE - 1;
  const rdots = dots && pages - page >= SERIE - 1;
  const bdots = ldots && rdots;

  const options = useMemo(() => Array.from(Array(pages).keys()), [pages]);

  const handleChange = (value: number | null) => {
    setPage(value!);
    onChange(value!);
  };

  if (pages <= 0) {
    return null;
  }

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <SelectString
        value={page}
        options={options}
        onChange={handleChange}
        maxMenuHeight={200}
        formatOptionLabel={formatPage}
      />
      <Box display="flex" alignItems="center">
        <IconButton onClick={() => handleChange(0)} disabled={page === 0} title={t('Go to first')}>
          <IconFirst />
        </IconButton>
        <IconButton
          onClick={() => handleChange(page - 1)}
          disabled={page === 0}
          title={t('Go to previous')}
        >
          <IconPrev />
        </IconButton>
        <PaginationItem page={0} currentPage={page} onClick={handleChange} />
        {ldots && <IconButton disabled>...</IconButton>}
        {fill(
          bdots ? page - 1 : rdots ? 1 : pages - SERIE,
          bdots ? page + 1 : ldots ? pages - 2 : SERIE - 1,
          (d) => (
            <PaginationItem key={d} page={d} currentPage={page} onClick={handleChange} />
          ),
        )}
        {rdots && <IconButton disabled>...</IconButton>}
        <PaginationItem page={pages - 1} currentPage={page} onClick={handleChange} />
        <IconButton
          onClick={() => handleChange(page + 1)}
          disabled={page === pages - 1}
          title={t('Go to next')}
        >
          <IconNext />
        </IconButton>
        <IconButton
          onClick={() => handleChange(pages - 1)}
          disabled={page === pages - 1}
          title={t('Go to last')}
        >
          <IconLast />
        </IconButton>
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
          <span>{page + 1}</span> {t('of')} <span>{pages}</span>
        </Text>
      </Box>
    </Box>
  );
};
