import { pipeline } from "stream";
import { promisify } from "util";

export const pipe = promisify(pipeline);
