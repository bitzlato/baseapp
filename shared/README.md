# shared

Includes common components: Header, etc.

## Prepare

```sh
corepack enable
yarn rebuild
```

## Dev mode

```sh
yarn start --port=3001
```

To run with `baseapp`, you need to specify `SHARED_URL`

```sh
baseapp ❱ SHARED_URL=http://localhost:3001 PROXY_HOST=... yarn start
```

## Deploy

Deployment takes place using `baseapp`
