import http from "http";

interface ServerProps {
  app: Express.Application;
  port: number;
  before?: (server: http.Server) => Promise<void>;
  after?: (server: http.Server) => Promise<void>;
}

const server = async ({ app, port, before, after }: ServerProps) => {
  const server = http.createServer(app);

  if (before) {
    await before(server);
  }

  await new Promise<void>((resolve, reject) => {
    server.on("error", reject);
    server.on("listening", resolve);
    server.listen(port || process.env.PORT);
  });

  if (after) {
    await after(server);
  }

  return server;
};

export = server;
