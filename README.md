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
| `ACCOUNT_HOST`    | Хост сервера, на который будут проксироваться account API запросы   |
| `PROXY_HOST`      | Хост сервера, на который будут проксироваться остальные API запросы |
| `HOST`            | Указаный хост будет использовать dev server                         |
| `PORT`            | Указаный порт будет использовать dev server                         |
| `MARKET_DOCS_URL` | Указывает на то, где находится `docs.js`                            |

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

## Contributing

- Соблюдайте соглашения сообщения коммитов [www.conventionalcommits.org](https://www.conventionalcommits.org). И прочтите наш путиводитель [github.com/bitzlato/guides](https://github.com/bitzlato/guides#%D0%BA%D0%B0%D0%BA-%D0%BF%D1%80%D0%B0%D0%B2%D0%B8%D0%BB%D1%8C%D0%BD%D0%BE-%D0%B4%D0%B5%D0%BB%D0%B0%D1%82%D1%8C-commit-%D1%8B)
- [Тестируйте свой код](#Тестирование). Мы ожидаем, что вы проверите свой код перед отправкой

![bitzlato logo](https://bitzlato.com/wp-content/uploads/2020/12/logo.svg)
