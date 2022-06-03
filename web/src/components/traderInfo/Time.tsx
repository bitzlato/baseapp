import { FC } from 'react';
import { Text } from 'web/src/components/ui/Text';
import { localeDate } from 'web/src/helpers';
import * as s from './Time.css';

interface TimeProps {
  date: number;
}

export const Time: FC<TimeProps> = ({ date }) => {
  const then = new Date(date);
  const now = new Date();
  const diff = Math.round((now.getTime() - then.getTime()) / (1000 * 86400));
  const dateFormated =
    (diff > 0 ? `${localeDate(date, 'veryShortDate')}, ` : '') + localeDate(date, 'time');

  return <Text className={s.timeText}>{dateFormated}</Text>;
};
