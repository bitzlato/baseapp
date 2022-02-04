import { FC } from 'react';
import { useContext } from 'react';
import { AccordionContext, useAccordionToggle } from 'react-bootstrap';
import { ChevronIcon } from 'src/assets/images/ChevronIcon';
import cn from 'classnames';

import s from './ToggleButton.postcss';

interface Props {
  title: string;
  eventKey: string;
}

export const ToggleButton: FC<Props> = ({title, eventKey}) => {
  const currentEventKey = useContext(AccordionContext);
  const decoratedOnClick = useAccordionToggle(eventKey);

  const isCurrentEventKey = currentEventKey === eventKey;

  return (
    <button
      type="button"
      onClick={decoratedOnClick}
      className={cn({
        [s.btnToggle]: true,
        [s.btnToggleOpen]: isCurrentEventKey,
      })}
    >
      {title} <ChevronIcon className={s.iconToggle} />
    </button>
  );
};
