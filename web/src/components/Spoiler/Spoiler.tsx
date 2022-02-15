import { FC } from 'react';
import { Accordion } from 'react-bootstrap';
import { Box } from '../Box';
import { ToggleButton } from './ToggleButtom';

import s from './Spoiler.postcss';

interface Props {
  title: string;
}

export const Spoiler: FC<Props> = ({ title, children }) => {
  return (
    <Accordion className={s.spoiler}>
      <Box row justify="end">
        <ToggleButton eventKey="0" title={title} />
      </Box>
      <Accordion.Collapse eventKey="0">
        <div className={s.contentSpoiler}>{children}</div>
      </Accordion.Collapse>
    </Accordion>
  );
};
