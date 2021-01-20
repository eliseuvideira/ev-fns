import zlib from "zlib";
import fs from "fs";
import { pipe } from "@ev-fns/pipe";

export const gzip = async (input: string, output = input + ".gz") => {
  const gzipper = zlib.createGzip();
  const source = fs.createReadStream(input);
  const destination = fs.createWriteStream(output);
  await pipe(source, gzipper, destination);
  await fs.promises.unlink(input);
};
