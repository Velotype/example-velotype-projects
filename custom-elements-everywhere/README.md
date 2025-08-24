
# hooks-demo-comparison

An example project using [velotype/server-webserver](velotype/server-webserver) and [velotype/browser-tsx-core](velotype/browser-tsx-core) to demonstrate the functionality.

This demo is a reference implementation of the tests from https://custom-elements-everywhere.com/ to verify Velotype is fully compatible with Custom Elements / Web Components.

## Dev mode

To run in dev mode, bundle and then start the dev server.

```sh
./deno run bundle*

./deno run dev-server
```

Note that the `jsx` setting in the `./tsconfig.json` file must be set to `"jsx": "react-jsxdev"` for dev mode to work properly.

Then load `http://localhost:3000` to see the page

## Prod mode

To run in prod mode, bundle and then start the prod server.

```sh
./deno run bundle*

./deno run prod-server
```

Note that the `jsx` setting in the `./tsconfig.json` file must be set to `"jsx": "react-jsx"` for dev mode to work properly.

Then load `http://localhost:3000` to see the page

## Debugging

```
const x = await import('jsr:@velotype/velotype')
x.__vtAppMetadata
```
