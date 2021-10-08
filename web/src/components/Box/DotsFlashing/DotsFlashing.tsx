import React, { FC } from 'react';

import s from './DotsFlashing.postcss';

export const DotsFlashing: FC = () => (
  <span className={s.wrapper}>
    <span className={s.dots} />
  </span>
);
