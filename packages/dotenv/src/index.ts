import { config, DotenvSafeOptions } from "dotenv-safe";

type DotenvProps = DotenvSafeOptions & {
  output?: (() => void) | null;
};

export const dotenv = ({
  output = () => {
    if (process.env.NODE_ENV === "test") {
      return;
    }
    if (process.env.NODE_ENV) {
      console.info(`🌟 ${process.env.NODE_ENV}`);
    }
    if (process.env.VERSION || process.env.npm_package_version) {
      console.info(
        `🔖 ${process.env.VERSION || process.env.npm_package_version}`,
      );
    }
  },
  ...props
}: DotenvProps = {}) => {
  config(props);
  if (output) {
    output();
  }
};
