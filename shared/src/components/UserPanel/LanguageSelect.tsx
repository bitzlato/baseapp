import { FC, useCallback, useContext } from 'react';
import cn from 'classnames';
import { Box } from 'components/Box';
import { Language } from 'types';
import { HeaderContext } from 'components/HeaderContext';
import * as s from './LanguageSelect.css';
import { Dropdown, RenderButtonFn, RenderMenuFn } from 'components/Dropdown/Dropdown';
import { DropdownItem } from 'components/Dropdown/DropdownItem';

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
    [language, languages],
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
