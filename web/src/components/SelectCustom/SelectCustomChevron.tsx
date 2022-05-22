import cn from 'classnames';
import ChevronDownIcon from 'web/src/assets/svg/ChevronDownIcon.svg';
import * as s from './SelectCustomChevron.css';

interface Props {
  open?: boolean;
}

export const SelectCustomChevron = ({ open = false }: Props) => {
  return <ChevronDownIcon className={cn(s.chevron, open && s.chevronOpened)} />;
};
