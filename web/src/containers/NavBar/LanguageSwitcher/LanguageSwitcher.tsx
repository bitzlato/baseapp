import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown } from 'react-bootstrap';
import { getLanguageName } from 'src/helpers';
import {
    changeLanguage,
    changeUserDataFetch,
    RootState,
    selectCurrentLanguage,
    selectUserInfo,
    selectUserLoggedIn,
} from 'src/modules';
import enIcon from 'src/assets/images/sidebar/en.svg';
import ruIcon from 'src/assets/images/sidebar/ru.svg';
import { languages } from 'src/api/config';

import s from './LanguageSwitcher.postcss';

const iconByCode = {
    en: enIcon,
    ru: ruIcon,
};

export const LanguageSwitcher: FC = () => {
    const dispatch = useDispatch();
    const { currentCode, isLoggedIn, user } = useSelector((state: RootState) => ({
        currentCode: selectCurrentLanguage(state),
        isLoggedIn: selectUserLoggedIn(state),
        user: selectUserInfo(state),
    }));
    const currentLanguage = getLanguageName(currentCode);

    const handleLanguageChange = (code: string) => {
        if (isLoggedIn) {
            const data = user.data && JSON.parse(user.data);

            if (data && data.language && data.language !== code) {
                dispatch(
                    changeUserDataFetch({
                        user: {
                            ...user,
                            data: JSON.stringify({
                                ...data,
                                language: code,
                            }),
                        },
                    })
                );
            }
        }

        dispatch(changeLanguage(code));
    };

    return (
        <Dropdown>
            <Dropdown.Toggle as="span" className={s.language}>
                {currentLanguage}
            </Dropdown.Toggle>
            <Dropdown.Menu className={s.menu} align="right">
                {languages.map((code: string) => {
                    const language = getLanguageName(code);

                    return (
                        <Dropdown.Item
                            className={s.item}
                            key={code}
                            active={language === currentLanguage}
                            onClick={() => handleLanguageChange(code)}
                        >
                            <img className={s.flag} src={iconByCode[code]} alt={language} />
                            <span>{language}</span>
                        </Dropdown.Item>
                    );
                })}
            </Dropdown.Menu>
        </Dropdown>
    );
};
