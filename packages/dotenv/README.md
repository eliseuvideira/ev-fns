# @ev-fns/dotenv

> Safely loads environment variables

- dotenv `dotenv: (props: DotenvProps) => void`

![version](https://img.shields.io/npm/v/@ev-fns/dotenv)
![node](https://img.shields.io/node/v/@ev-fns/dotenv)
![downloads](https://img.shields.io/npm/dw/@ev-fns/dotenv)
![dependencies](https://img.shields.io/librariesio/release/npm/@ev-fns/dotenv)

## Install

```sh
yarn add @ev-fns/dotenv
```

## Usage

```js
const { dotenv } = require("@ev-fns/dotenv");

dotenv();

console.log(process.env.NODE_ENV);
```

## Try it out

```shell
$ echo "NODE_ENV=" >.env.example
```

1. Invalid env variables

   ```shell
   $ node index.js 2>/dev/null && echo "no error" || echo "error"
   ```

   ```shell
   error
   ```

2. Valid env variables

   ```shell
   $ NODE_ENV=development node index.js
   ```

   ```shell
   development
   ```
