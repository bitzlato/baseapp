import { FC, useState } from 'react';
import NextIcon from 'web/src/assets/svg/NextIcon.svg';
import PrevIcon from 'web/src/assets/svg/PrevIcon.svg';
import { IconButton } from 'web/src/components/IconButton/IconButton';
import { Box } from 'web/src/components/Box/Box';
import { useT } from 'web/src/hooks/useT';

interface Props {
  limit: number;
  total: number;
  onChange: (value: number) => void;
}

export const Pagination: FC<Props> = ({ limit, total, onChange }) => {
  const [page, setPage] = useState(0);

  const t = useT();

  const from = page * limit;
  const to = Math.min(from + limit - 1, total - 1);
  const disablePrev = page <= 0;
  const disableNext = to >= total - 1;

  const handleClickPrev = () => {
    const value = page - 1;
    setPage(value);
    onChange(value);
  };

  const handleClickNext = () => {
    const value = page + 1;
    setPage(value);
    onChange(value);
  };

  return (
    <Box row spacing justify="end">
      {total !== 0 ? (
        <Box as="p" margin="0">
          <span>{from + 1}</span>
          <span>{' - '}</span>
          <span>{to + 1}</span>
          <span>{` ${t('of')} `}</span>
          <span>{total}</span>
        </Box>
      ) : null}
      <IconButton onClick={handleClickPrev} disabled={disablePrev}>
        <PrevIcon />
      </IconButton>
      <IconButton onClick={handleClickNext} disabled={disableNext}>
        <NextIcon />
      </IconButton>
    </Box>
  );
};
