# @ev-fns/auth

authorization middleware for expressjs

- createAuth `createAuth: ({ token, getToken }: { token: string, getToken?: (req: express.Request) => string }) => express.RequestHandler`

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

app.listen(3000, () => {
  console.log("listening at http://localhost:3000");
});
```

### Try it out

```shell
$ API_TOKEN=super_secret node index.js
```

- Invalid request

```shell
$ curl -i http://localhost:3000
```

```shell
HTTP/1.1 401
...
{"message":"Unauthorized"}
```

- Valid request

```shell
$ curl -i -H "Authorization: Bearer super_secret" http://localhost:3000
```

```shell
HTTP/1.1 200
...
{"message":"Hello World 👋!"}
```

---
