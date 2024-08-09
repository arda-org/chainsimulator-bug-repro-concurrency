FIXED ✅

When starting multiple chain simulators in parallel, the port returned can be the one of a node.

Note: The light simulnet (wrapper around the VM) doesn't have such issue.

# How to reproduce

```
npm install

npm run test
```

# The test

The test ([./test.test.ts](./test.test.ts)):

```
test("FSWorld", async () => {
  await Promise.all(
    Array.from({ length: 80 }, async () => {
      using world = await FSWorld.start();
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
});

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
```
