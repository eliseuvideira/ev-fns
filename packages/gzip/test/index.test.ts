import fs from "fs";
import path from "path";
import { gzip } from "../src";

describe("gzip", () => {
  it("gzips a file", async () => {
    expect.assertions(3);

    const content = "file content".repeat(5);

    const filename = path.join(__dirname, Date.now().toString());
    const gzipFilename = filename + ".gz";

    await fs.promises.writeFile(filename, content);
    const fileStats = await fs.promises.stat(filename);

    await gzip(filename, gzipFilename);

    try {
      const gzipStats = await fs.promises.stat(gzipFilename);

      const statError = jest.fn();
      let error: any = null;

      try {
        await fs.promises.stat(filename);
      } catch (err) {
        error = err;
        statError(err);
      }

      expect(statError).toHaveBeenCalled();
      expect(statError).toHaveBeenLastCalledWith(error);
      expect(gzipStats.size).toBeLessThan(fileStats.size);
    } finally {
      await fs.promises.unlink(gzipFilename);
    }
  });
});
