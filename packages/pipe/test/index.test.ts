import { Readable, Writable } from "stream";
import { pipe } from "../src";

describe("pipe", () => {
  it("awaits piping to finish", async () => {
    expect.assertions(6);

    const content = "0ROM3SunulR8kjiFvQ3z9Fn+KNnGVWNP";

    const writeData = jest.fn();
    const readData = jest.fn();
    const writeEnd = jest.fn();
    const readEnd = jest.fn();

    const writeStream = new Writable();
    writeStream._write = (chunk, _, done) => {
      writeData(chunk.toString("utf8"));
      done();
    };
    writeStream.on("finish", () => {
      writeEnd();
    });

    const readStream = Readable.from([content]);
    readStream.on("data", (data) => {
      readData(data);
    });
    readStream.on("end", () => {
      readEnd();
    });

    await pipe(readStream, writeStream);

    expect(writeData).toHaveBeenCalled();
    expect(writeData).toHaveBeenCalledWith(content);
    expect(readData).toHaveBeenCalled();
    expect(readData).toHaveBeenCalledWith(content);
    expect(writeEnd).toHaveBeenCalled();
    expect(readEnd).toHaveBeenCalled();
  });
});
