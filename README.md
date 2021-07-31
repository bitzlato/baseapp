# Go-Gin web application

This application was generated with [sonic](https://github.com/openware/sonic)

## Prerequisites

To bring up all the dependencies, run `docker-compose up -Vd`

Afterwards, enable the Transit engine for Vault with `vault secrets enable transit`

Also, you may want to run `source .env` to load Peatio, Barong and Sonic public keys for development use

## License

Please note, that BaseApp license only allows Non-Commercial use of this component. To purchase the Commercial license, please contact us at hello@openware.com.

## Install dependencies

```bash
$ yarn install
```

## Run in developement mode

```bash
$ yarn start-mock
```
This command will also start a fake api backend for helping development.
Once you happy with the result, save, build an image and run it with OpenDAX docker compose system.

## Local development with staging server

```bash
$ cp public/config/env.localdev.js public/config/env.js
$ PORT=8080 REACT_APP_STAGING=ex-stage.bitzlato.bz yarn start
```
This command will run development server with proxying of API requests to the staging server `ex-stage.bitzlato.bz`.
Uses `public/config/env.localdev.js` as a configuration file.
It is recommended to place the env variables in the `.envrc ' file.

## Execute tests

In `<rootDir>`

```bash
$ yarn test
```

Check test coverage:
```bash
$ yarn test -- --coverage --watchAll
```

For more options for `jest` run `yarn test --help`.

## Configuration documentation

Configuration file is located in  `public/config/env.js`. 

Create it from `public/config/env.js` and change to your custom settings:

```bash
$ cp public/config/env.example.js public/config/env.js
$ edit public/config/env.js
```

Configuration options:

| Argument                 | Description                                                  |
| --------------------- | ------------------------------------------------------------ |
| `api`    | URLs of `barong`, `peatio`, `applogic` and `ranger` API endpoints. You can use mockserver (<https://github.com/openware/mockserver>) with default `env.js` values |
| `minutesUntilAutoLogout`                |  Autologout time in minutes  |
| `withCredentials`               |  `false` or `true` if you want to include cookies as part of the request(https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Credentials)   |
| `gaTrackerKey` |  Google Analytics tracker key  |
| `rangerReconnectPeriod` |  Reconnection time for the Ranger WS service in minutes    |
| `msAlertDisplayTime` |  Alert message display duration in milliseconds    |
| `kycSteps` |  List of label names for KYC process    |

## Available Docker build args

While building a Docker image you can pass build-dependant arguments using `--build-arg`: 
`docker build -t baseapp:latest
  --build-arg BUILD_DOMAIN="example.com" .`

| Argument       | Description                                            |
| -------------- | ------------------------------------------------------ |
| `BUILD_EXPIRE` | Unix Timestamp of the build expiration date in seconds |
| `BUILD_DOMAIN` | Domain which you'd like to use during the deployment   |

## Build mobile app
Install dependencies using npm. Important for mobile app development.
```bash
npm install
```
Build frontend
```bash
yarn build
```
Generate a native project (ios, android)
```bash
ionic capacitor add <platform>
```
To build a native app you should have Xcode or Android studio on your local machine.

## Build IOS app
**1. Install Xcode**

Xcode is the IDE for creating native iOS apps. It includes the iOS SDK and Xcode command-line tools. Xcode can be downloaded for free with an Apple account or it can be installed through the App Store.
Once Xcode is installed, make sure the command-line tools are selected for use:
```bash
xcode-select --install
```
**2. Set up a development team**

All iOS apps must be code signed, even for development. Luckily, Xcode makes this easy with automatic code signing. The only prerequisite is an Apple ID.

Open Xcode and navigate to **Xcode » Preferences » Accounts**. Add an Apple ID if none are listed. Once logged in, a Personal Team will appear in the team list of the Apple ID.

**3. Create an iOS Simulator**

You can test your mobile application with a connected Iphone device to the Mac or using IOS Simulator.
Open Xcode and navigate to **Window » Devices and Simulators**. Create an **iPhone 11** simulator if one does not already exist.

**4. Set configs**

Open the `capacitor.config.json` file and modify the `appId` property.

Put the name of BE server:
```json
  "server": {
    "hostname": "example.openware.work"
  }
```

##### Peatio Management Scopes
```
  read_engines:
    mandatory_signers:
      - sonic
    permitted_signers:
      - sonic
  write_engines:
    mandatory_signers:
      - sonic
    permitted_signers:
      - sonic
  read_markets:
    mandatory_signers:
      - sonic
    permitted_signers:
      - sonic
  write_markets:
    mandatory_signers:
      - sonic
    permitted_signers:
      - sonic
```

3. Use the resulting Vault token when running the application

## How to run Sonic with a frontend

1. Copy your frontend application source files to the `client/` folder

2. Use the Makefile:
```
make asset
```
This will run the build command in `client/` and move the build output to `public/assets/`.

**Warning**: Make sure to build your client (frontend) into the `build/` folder, if it's a different folder, you **must** update your client (frontend) or Makefile

3. Start the go server
```
go run app.go serve
```

## Troubleshooting
**If it doesn't work and you see the white screen, check the order of import files in index.html**
