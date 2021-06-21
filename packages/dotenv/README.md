# @ev-fns/dotenv

> Safely loads environment variables

- dotenv `dotenv: (props: DotenvProps) => void`

![version](https://img.shields.io/npm/v/@ev-fns/dotenv)
![node](https://img.shields.io/node/v/@ev-fns/dotenv)
![downloads](https://img.shields.io/npm/dw/@ev-fns/dotenv)
![dependencies](https://img.shields.io/david/eliseuvideira/ev-fns?path=packages%2Fdotenv)
[![github](https://img.shields.io/github/stars/eliseuvideira/ev-fns?style=social)](https://github.com/eliseuvideira/ev-fns)

## Install

```sh
yarn add @ev-fns/dotenv
```

## Usage

```js
const { dotenv } = require("@ev-fns/dotenv");

dotenv();
```

## Try it out

```shell
$ echo "NODE_ENV=" >.env.example
```

1. Invalid env variables

   ```shell
   $ node index.js; echo $?
   ```

   ```shell
   MissingEnvVarsError...
   ...
   missing: [ 'NODE_ENV' ],
   ...
   1
   ```

2. Valid env variables

   ```shell
   $ NODE_ENV=development VERSION=0.1.0 node index.js; echo $?
   ```

   ```shell
   🌟 development
   🔖 0.1.0
   0
   ```
