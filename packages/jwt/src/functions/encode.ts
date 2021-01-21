import jsonwebtoken from "jsonwebtoken";

export const encode = async (token: Record<string, any>, secret: string) =>
  new Promise<string>((resolve, reject) =>
    jsonwebtoken.sign(token, secret, (err, token) =>
      err ? reject(err) : resolve(token || "")
    )
  );
