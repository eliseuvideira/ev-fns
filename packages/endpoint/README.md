# @ev-fns/endpoint

> Async request handler for expressjs

- endpoint `endpoint: (handler: express.RequestHandler) => express.RequestHandler`

![version](https://img.shields.io/npm/v/@ev-fns/endpoint)
![node](https://img.shields.io/node/v/@ev-fns/endpoint)
![downloads](https://img.shields.io/npm/dw/@ev-fns/endpoint)
![dependencies](https://img.shields.io/david/eliseuvideira/ev-fns?path=packages%2Fendpoint)
[![github](https://img.shields.io/github/stars/eliseuvideira/ev-fns?style=social)](https://github.com/eliseuvideira/ev-fns)

## Install

```sh
yarn add express @ev-fns/endpoint
```

## Usage

```js
const express = require("express");
const { endpoint } = require("@ev-fns/endpoint");

const app = express();

app.use(express.json());

const booksPostOneHandler = endpoint(async (req, res) => {
  const { title } = req.body;

  if (!title) {
    // you can safely throw errors
    const err = new Error("title is required");
    err.status = 400;
    throw err;
  }

  res.status(201).json({ title });
});

app.post("/books", booksPostOneHandler);

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message });
});

app.listen(3000, () => {
  console.log("listening at http://localhost:3000");
});
```

## Try it out

```shell
$ node index.js
```

```shell
$ curl -i -X POST http://localhost:3000/books
```

```shell
HTTP/1.1 400
...
{"message":"title is required"}
```

```shell
$ curl -i -X POST -H "Content-Type: application/json" -d '{"title":"The C Programming Language"}' http://localhost:3000/books
```

```shell
HTTP/1.1 201
...
{"title":"The C Programming Language"}
```
