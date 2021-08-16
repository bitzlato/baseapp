import { languages } from '../../../api/config';
import { ChangeLanguageAction } from './actions';
import { CHANGE_LANGUAGE } from './constants';

export interface LanguageState {
    lang: string;
}

const defaultLanguage = {
    code: languages[0],
};

const detectLanguage = () => {
    const fromLocalStorage = localStorage.getItem('lang_code');
    if (fromLocalStorage) {
        return fromLocalStorage;
    }

    const fromNavigator = navigator.language.split('-')[0];
    if (languages.includes(fromNavigator)) {
        return fromNavigator;
    }

    return defaultLanguage.code;
};

const currentLang = detectLanguage();

export const initialChangeLanguageState: LanguageState = {
    lang: currentLang,
};

export const changeLanguageReducer = (state = initialChangeLanguageState, action: ChangeLanguageAction) => {
    switch (action.type) {
        case CHANGE_LANGUAGE:
            localStorage.setItem('lang_code', action.payload);

            return {
                lang: action.payload,
            };
        default:
            return state;
    }
};
