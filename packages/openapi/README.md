# @ev-fns/openapi

swagger-ui openapi parser middleware

## Install

yarn add @ev-fns/openapi

## Example

```js
const express = require("express");
const openapi = require("@ev-fns/openapi");

const app = express();

app.use(openapi());

app.listen(3000, () => {
  console.log("listening on http://localhost:3000");
});
```

## Usage

### 1. Define openapi schemas on a schemas.yml file at the root level

```yml
components:
  schemas:
    Error:
      type: object
      properties:
        message:
          type: string
          example: Internal server error
      required:
        - message
```

### 2. Comment the routes with the openapi-comment-parser syntax

> https://github.com/bee-travels/openapi-comment-parser

```js
const express = require("express");
const { getEmployees } = require("./employees");

const router = express.Router();

/**
 * GET /employees
 * @tag Employees
 * @response 200
 * @responseContent {Employee} 200.application/json
 * @response default
 * @responseContent {Error} default.application/json
 */
router.get("/employees", getEmployees);

module.exports = router;
```
