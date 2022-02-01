import { FC, useCallback, useContext } from 'react';
import cn from 'classnames';
import { Box } from 'shared/src/components/Box';
import { Language } from 'shared/src/types';
import { HeaderContext } from 'shared/src/components/Header/HeaderContext';
import { Dropdown, RenderButtonFn, RenderMenuFn } from 'shared/src/components/Dropdown/Dropdown';
import { DropdownItem } from 'shared/src/components/Dropdown/DropdownItem';
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
