# @ev-fns/auth

> Authorization middleware for expressjs

- createAuth `createAuth: ({ token, getToken }: { token: string, getToken?: (req: express.Request) => string }) => express.RequestHandler`

![version](https://img.shields.io/npm/v/@ev-fns/auth)
![node](https://img.shields.io/node/v/@ev-fns/auth)
![downloads](https://img.shields.io/npm/dw/@ev-fns/auth)
![dependencies](https://img.shields.io/david/eliseuvideira/ev-fns?path=packages%2Fauth)

## Install

```sh
yarn add express @ev-fns/auth
```

## Usage

```js
const express = require("express");
const { createAuth } = require("@ev-fns/auth");

const app = express();

const auth = createAuth({ token: process.env.API_TOKEN });

app.get("/", auth, (req, res) => {
  res.status(200).json({ message: "Hello World 👋!" });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message });
});

app.listen(3000, () => {
  console.log("listening at http://localhost:3000");
});
```

## Try it out

```shell
$ API_TOKEN=super_secret node index.js
```

1. ### Invalid request

   ```shell
   $ curl -i http://localhost:3000
   ```

   ```shell
   HTTP/1.1 401
   ...
   {"message":"Unauthorized"}
   ```

2. ### Valid request

   ```shell
   $ curl -i -H "Authorization: Bearer super_secret" http://localhost:3000
   ```

   ```shell
   HTTP/1.1 200
   ...
   {"message":"Hello World 👋!"}
   ```
