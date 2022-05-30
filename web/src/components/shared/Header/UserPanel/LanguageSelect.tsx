import { FC, useCallback, useContext } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { Language } from 'web/src/types';
import { HeaderContext } from 'web/src/components/shared/Header/HeaderContext';
import {
  Dropdown,
  RenderButtonFn,
  RenderMenuFn,
} from 'web/src/components/shared/Header/Dropdown/Dropdown';
import { DropdownItem } from 'web/src/components/shared/Header/Dropdown/DropdownItem';
import RuIcon from 'web/src/assets/svg/ru.svg';
import EnIcon from 'web/src/assets/svg/en.svg';
import * as s from './LanguageSelect.css';

export interface LanguageSelectContext {
  language: Language;
  languages: Partial<Record<Language, string>>;
  onLanguageChange: (language: Language) => void;
}

const icons = {
  ru: <RuIcon />,
  en: <EnIcon />,
};

export const LanguageSelect: FC = () => {
  const { language, languages, onLanguageChange } = useContext(HeaderContext);
  const renderButton: RenderButtonFn = useCallback(
    ({ onClick }) => (
      <Box
        as="button"
        type="button"
        display="flex"
        height="full"
        alignItems="center"
        color={{ default: 'interactive', hover: 'interactiveHighlighted' }}
        onClick={onClick}
      >
        <Box as="span" className={s.language}>
          {language}
        </Box>
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
            type="button"
            key={item}
            isActive={item === language}
            closeMenu={closeMenu}
            onClick={handleClick}
          >
            <Box as="span" mr="4x">
              {icons[item] ? icons[item] : null}
            </Box>
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
