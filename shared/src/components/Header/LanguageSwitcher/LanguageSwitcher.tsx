import { Box } from 'shared/src/components/Box';
import cn from 'classnames';
import { HeaderContext } from 'shared/src/components/Header/HeaderContext';
import { FC, useContext, useState } from 'react';
import { Language } from 'shared/src/types';

import * as s from './LanguageSwitcher.css';
import { LanguageSwitcherItem } from './LanguageSwitcherItem';

export interface LanguageSwitcherContext {
  language: Language;
  languages: Partial<Record<Language, string>>;
  onLanguageChange: (language: Language) => void;
}

export const LanguageSwitcher: FC = () => {
  const { language, languages, onLanguageChange } = useContext(HeaderContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };
  const handleItemClick = () => {
    setIsOpen(false);
  };

  return (
    <Box>
      <Box
        as="button"
        className={cn(s.item, isOpen && s.itemOpened)}
        type="button"
        onClick={handleClick}
      >
        {languages[language]}
      </Box>
      <Box className={cn(s.list, isOpen && s.listOpened)}>
        {(Object.keys(languages) as Language[]).map((item) => (
          <LanguageSwitcherItem
            key={item}
            language={item}
            isActive={item === language}
            onClick={handleItemClick}
            onLanguageChange={onLanguageChange}
          >
            {languages[item]}
          </LanguageSwitcherItem>
        ))}
      </Box>
    </Box>
  );
};
