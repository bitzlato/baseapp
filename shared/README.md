# shared

Includes common components: Header, etc.

## Dev mode

```sh
yarn start --port=3003
```

To run with `baseapp`, you need to specify `SHARED_URL`

```sh
baseapp ❱ SHARED_URL=http://localhost:3003 PROXY_HOST=... yarn start
```

## Deploy

Deployment takes place using `baseapp`
