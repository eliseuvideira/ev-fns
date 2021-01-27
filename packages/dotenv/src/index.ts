import { config, DotenvSafeOptions } from "dotenv-safe";

const dotenv = (options?: DotenvSafeOptions) => {
  config(options);

  console.info(`NODE_ENV=${process.env.NODE_ENV}`);
  console.info(`version=${process.env.npm_package_version}`);
};

export = dotenv;
