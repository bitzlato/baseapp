import { FC, useEffect, useState } from 'react';
import moment from 'moment';
import { Box } from 'web/src/components/ui/Box';

export const TradeTimer: FC<{ targetTime: string }> = ({ targetTime }) => {
  const duration = moment.duration(moment(targetTime).diff(moment()));

  // @ts-ignore
  const [timer, setTimer] = useState(0); // eslint-disable-line @typescript-eslint/no-unused-vars

  useEffect(() => {
    const inverval = setInterval(() => {
      setTimer((t) => t + 1);
    }, 1000);

    return () => {
      clearInterval(inverval);
    };
  }, []);

  let hours: number | string = duration.hours();
  let minutes: number | string = duration.minutes();
  let seconds: number | string = duration.seconds();
  if (hours < 10) hours = `0${hours}`;
  if (minutes < 10) minutes = `0${minutes}`;
  if (seconds < 10) seconds = `0${seconds}`;

  return <Box as="span">{`${hours}:${minutes}:${seconds}`}</Box>;
};
