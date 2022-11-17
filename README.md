# @bitzlato/baseapp

[![Tests](https://github.com/bitzlato/baseapp/actions/workflows/tests.yml/badge.svg)](https://github.com/bitzlato/baseapp/actions/workflows/tests.yml)

This is a react application of the trading platform

## Подготовка окружения

Обязательно ознакомтесь с путеводителем нашей команды: [github.com/bitzlato/guides](https://github.com/bitzlato/guides)

**Для разработки** необходимы:

1. **nvm** [github.com/nvm-sh/nvm](https://github.com/nvm-sh/nvm)
1. **direnv** [direnv.net](https://direnv.net/)

_(опционально)_ **Для развёртывания** потребуется:

1. **rbenv** [github.com/rbenv/rbenv](https://github.com/rbenv/rbenv) и **ruby-build** [github.com/rbenv/ruby-build](https://github.com/rbenv/ruby-build)
1. **bundler** [bundler.io](https://bundler.io/)

Далее вам нужно выполнить:

```sh
nvm use
corepack enable
yarn rebuild
cp .envrc.development .envrc
direnv allow
ln -s env.localdev.js web/public/config/env.js
```

Теперь у вас всё готово для работы!

## Запуск в режиме разработки

Быстрый запуск с проксированием на стейдж

```sh
yarn start
```

Запуск вместе с shared компонентами

```sh
yarn start:all
```

Для ручной настройки доступны следующие переменные окружения:

| Variable          | Description                                                         |
| ----------------- | ------------------------------------------------------------------- |
| `PROXY_HOST`      | Хост сервера, на который будут проксироваться остальные API запросы |
| `HOST`            | Указаный хост будет использовать dev server                         |
| `PORT`            | Указаный порт будет использовать dev server                         |
| `MARKET_DOCS_URL` | Указывает на то, где находится `docs.js`                            |
| `AUTH0_DOMAIN`    | Домен сервера auth0                                                 |
| `AUTH0_CLIENT_ID` | Идентификатор клиента auth0                                         |

### Дополнительные опции для режима разработки

`VANILLA_EXTRACT_DEBUG=1` – Включит удобночитаемые индификаторы классов для `vanilla-extract` **(Значительно увеличивает время запуска для процессоров M1)**

```sh
VANILLA_EXTRACT_DEBUG=1 yarn start
```

## Вебсокет соединение требуется для:

1. Обновления чатов и статусов сделок
1. Получение уведомлений

## Сборка проекта

```sh
yarn build
```

Возможно получить детальный отчет по сборке

```sh
ANALYZE=enable yarn workspace web run build
```

## Тестирование

Юнит тесты:

```sh
yarn test
```

Проверка кода:

```sh
yarn lint
```

## Заглушка "Обслуживание"

Установить

> cap production maintenance:enable REASON="maintenance" UNTIL="12:00pm GTM"

Снять

> cap production maintenance:disable

## Переводы

Доступна команда для импорта json-файлов из Tolgee. Необходимо предворительно настроить переменные окружения `TOLGEE_URL`, `TOLGEE_MAIN_API_KEY` и `TOLGEE_SHARED_API_KEY`

```env
# .envrc
export TOLGEE_URL=<URL_TO_TOLGEE>
export TOLGEE_MAIN_API_KEY=<YOUR_PROJECT_API_KEY>
export TOLGEE_SHARED_API_KEY=<YOUR_PROJECT_API_KEY>
```

```sh
yarn workspace web run tolgee:import
```

## Contributing

- Соблюдайте соглашения сообщения коммитов [www.conventionalcommits.org](https://www.conventionalcommits.org). И прочтите наш путиводитель [github.com/bitzlato/guides](https://github.com/bitzlato/guides#%D0%BA%D0%B0%D0%BA-%D0%BF%D1%80%D0%B0%D0%B2%D0%B8%D0%BB%D1%8C%D0%BD%D0%BE-%D0%B4%D0%B5%D0%BB%D0%B0%D1%82%D1%8C-commit-%D1%8B)
- [Тестируйте свой код](#Тестирование). Мы ожидаем, что вы проверите свой код перед отправкой

![bitzlato logo](https://bitzlato.com/wp-content/uploads/2020/12/logo.svg)
