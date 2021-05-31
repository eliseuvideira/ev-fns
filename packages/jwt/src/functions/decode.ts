import jsonwebtoken from "jsonwebtoken";

export const decode = async (token: string, secret: string) =>
  new Promise<Record<string, any> | null>((resolve, reject) => {
    jsonwebtoken.verify(token, secret, (err, data) =>
      err ? reject(err) : resolve(data || null),
    );
  });
