import { FC } from 'react';
import { filter } from './Filter.css';

interface Props {}

export const Filter: FC<Props> = () => {
  return <div className={filter} />;
};
