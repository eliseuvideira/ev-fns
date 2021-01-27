import express from "express";
import server from "../src/index";

const random = ({ min, max }: { min: number; max: number }) =>
  Math.floor(Math.random() * (max - min) + min);

const getPort = () => random({ min: 45000, max: 50000 });

describe("server", () => {
  it("creates a server instance with correct port", async () => {
    expect.assertions(2);

    const PORT = getPort();

    const app = express();

    const instance = await server(app, PORT);
    try {
      expect(instance.listening).toBe(true);

      const addr = instance.address();

      if (typeof addr === "string") {
        fail('typeof addr === "string"');
      }

      expect(addr?.port).toBe(PORT);
    } finally {
      instance.close();
    }
  });

  it("runs callbacks", async () => {
    expect.assertions(3);

    const PORT = getPort();

    const app = express();

    const before = jest.fn();
    const after = jest.fn();

    const instance = await server(app, PORT, before, after);
    try {
      expect(instance.listening).toBe(true);
      expect(before).toHaveBeenCalled();
      expect(after).toHaveBeenCalled();
    } finally {
      instance.close();
    }
  });

  it("catches already in use port errors", async () => {
    expect.assertions(3);

    const PORT = getPort();

    const app1 = express();
    const app2 = express();

    const instance = await server(app1, PORT);

    try {
      expect(instance.listening).toBe(true);

      try {
        await server(app2, PORT);
        fail();
      } catch (err) {
        expect(err).toBeDefined();
        expect(err.message).toContain("EADDRINUSE");
      }
    } finally {
      instance.close();
    }
  });

  it("catches access denied port errors", async () => {
    expect.assertions(1);

    const PORT = 80;

    const app = express();

    try {
      await server(app, PORT);
      fail();
    } catch (err) {
      expect(err).toBeDefined();
    }
  });
});
