
# hooks-demo-comparison

An example project using [velotype/server-webserver](velotype/server-webserver) and [velotype/browser-tsx-core](velotype/browser-tsx-core) to demonstrate the functionality.

This demo recreates the demo pages from the "React Today and Tomorrow and 90% Cleaner React With Hooks" talk from 2018 ( https://www.youtube.com/watch?v=dpw9EHDh2bM ) in Velotype as a direct comparison of Velotype and React.

## Dev mode

To run in dev mode, bundle and then start the dev server.

```sh
./deno run bundle*

./deno run dev-server
```

## Prod mode

To run in prod mode, bundle and then start the prod server.

```sh
./deno run bundle*

./deno run prod-server
```

Then load `http://localhost:3000` to see the working page

## Debugging

```
const x = await import('jsr:@velotype/velotype')
x.__vtAppMetadata
```
