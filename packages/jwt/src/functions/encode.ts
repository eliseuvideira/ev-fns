import jsonwebtoken from "jsonwebtoken";

export const encode = async (
  token: Record<string, any>,
  secret: string,
  options?: jsonwebtoken.SignOptions,
) =>
  new Promise<string>((resolve, reject) =>
    jsonwebtoken.sign(token, secret, options || {}, (err, token) =>
      err ? reject(err) : resolve(token || ""),
    ),
  );
