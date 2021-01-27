import http from "http";

const server = async (
  app: Express.Application,
  port: number,
  before?: () => Promise<void>,
  after?: () => Promise<void>
) => {
  const server = http.createServer(app);

  if (before) {
    await before();
  }

  await new Promise<void>((resolve, reject) => {
    server.on("error", reject);
    server.on("listening", resolve);
    server.listen(port || process.env.PORT);
  });

  if (after) {
    await after();
  }

  return server;
};

export = server;
