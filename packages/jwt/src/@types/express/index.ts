declare namespace Express {
  export interface Request {
    token: Record<string, any> | undefined;
    _token?: {
      raw?: string;
      value?: Record<string, any> | undefined;
    };
  }
}
