declare global {
  export namespace Express {
    export interface Request {
      token: Record<string, any> | undefined;
      _token?: {
        raw?: string;
        value?: Record<string, any> | undefined;
      };
    }
  }
}

export { decode } from "./functions/decode";
export { encode } from "./functions/encode";
export { jwt } from "./functions/jwt";
