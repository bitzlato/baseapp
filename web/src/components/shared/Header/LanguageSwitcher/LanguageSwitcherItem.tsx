import { FC } from 'react';
import cn from 'classnames';
import { Box } from 'web/src/components/ui/Box';
import { Language } from 'web/src/types';
import * as s from './LanguageSwitcherItem.css';

interface Props {
  isActive: boolean;
  language: Language;
  onClick: () => void;
  onLanguageChange: (language: Language) => void;
}

export const LanguageSwitcherItem: FC<Props> = ({
  children,
  isActive,
  language,
  onClick,
  onLanguageChange,
}) => {
  const handleClick = () => {
    onClick();
    onLanguageChange(language);
  };

  return (
    <Box
      as="button"
      className={cn(s.item, isActive && s.itemActive)}
      type="button"
      tabIndex={-1}
      onClick={handleClick}
    >
      {children}
    </Box>
  );
};
