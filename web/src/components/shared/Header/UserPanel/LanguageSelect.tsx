import { FC, useCallback, useContext } from 'react';
import cn from 'classnames';
import { Box } from 'web/src/components/ui/Box';
import { Language } from 'web/src/types';
import { HeaderContext } from 'web/src/components/shared/Header/HeaderContext';
import {
  Dropdown,
  RenderButtonFn,
  RenderMenuFn,
} from 'web/src/components/shared/Header/Dropdown/Dropdown';
import { DropdownItem } from 'web/src/components/shared/Header/Dropdown/DropdownItem';
import * as s from './LanguageSelect.css';

export interface LanguageSelectContext {
  language: Language;
  languages: Partial<Record<Language, string>>;
  onLanguageChange: (language: Language) => void;
}

export const LanguageSelect: FC = () => {
  const { language, languages, onLanguageChange } = useContext(HeaderContext);
  const renderButton: RenderButtonFn = useCallback(
    ({ open }) => (
      <Box as="span" className={cn(s.language, open && s.languageOpened)}>
        {language}
      </Box>
    ),
    [language],
  );

  const renderMenu: RenderMenuFn = useCallback(
    ({ closeMenu }) =>
      (Object.keys(languages) as Language[]).map((item) => {
        const handleClick = () => onLanguageChange(item);

        return (
          <DropdownItem
            key={item}
            isActive={item === language}
            closeMenu={closeMenu}
            onClick={handleClick}
          >
            {languages[item] ?? ''}
          </DropdownItem>
        );
      }),
    [language, languages, onLanguageChange],
  );

  return (
    <Dropdown
      dropdownAlign="right"
      dropdownSize="small"
      renderButton={renderButton}
      renderMenu={renderMenu}
      display="flex"
      height="full"
    />
  );
};
