/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  export namespace Express {
    export interface Request {
      token: Record<string, any>;
      _token: {
        raw: string;
        value?: Record<string, any>;
      };
    }
  }
}

export { decode } from "./functions/decode";
export { encode } from "./functions/encode";
export { jwt } from "./functions/jwt";
