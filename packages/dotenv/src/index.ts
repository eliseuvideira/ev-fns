import { config, DotenvSafeOptions } from "dotenv-safe";

const dotenv = (
  options?: DotenvSafeOptions,
  done?: (env: Record<string, any>) => void,
) => {
  config(options);
  if (done) {
    done(process.env);
  }
};

dotenv.startup = (env: Record<string, any>) => {
  console.info(`NODE_ENV=${process.env.NODE_ENV}`);
  console.info(`version=${process.env.npm_package_version}`);
};

export = dotenv;
