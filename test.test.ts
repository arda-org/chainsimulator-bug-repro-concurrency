import { expect, test } from "vitest";
import { FSWorld, LSWorld } from "xsuite";

test("FSWorld", async () => {
  await Promise.all(
    Array.from({ length: 80 }, async () => {
      using world = await FSWorld.start({
        // binaryPath: "path/to/binary",
      });
      const r1 = await fetch(
        `${world.proxy.proxyUrl}/node/status`,
      );
      expect(await r1.text()).toEqual("404 page not found");
      const r2 = await fetch(
        `${world.proxy.proxyUrl}/simulator/set-state-overwrite`,
        { method: "POST", body: "[]" }
      );
      expect(await r2.text()).toEqual('{"data":{},"error":"","code":"successful"}');
    }),
  );
}, 100_000);

test("LSWorld", async () => {
  await Promise.all(
    Array.from({ length: 80 }, async () => {
      using world = await LSWorld.start();
      const r = await fetch(
        `${world.proxy.proxyUrl}/admin/set-accounts`,
        { method: "POST", body: "[]" }
      );
      expect(await r.text()).toEqual('{"code":"successful"}\n');
    }),
  );
});
