import { FC } from 'react';
import { filter } from './Filter.css';

export interface FilterValues {}

interface Props {
  initialValues: FilterValues;
  onChange: (values: FilterValues) => void;
}

export const Filter: FC<Props> = () => {
  return <div className={filter}>Filter</div>;
};
