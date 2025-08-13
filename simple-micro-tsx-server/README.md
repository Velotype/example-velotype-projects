
# simple-tsx-server

An example project using [velotype/server-webserver](velotype/server-webserver) and [velotype/browser-tsx-core](velotype/browser-tsx-core) to demonstrate the functionality.

This is a strictly minimal TSX Server using Velotype's browser-side and server-side frameworks to demonstrate basic functionality.

## Dev mode

To run in dev mode, first bundle the browser-side javascript and then start the dev server.

```sh
./deno run bundle

./deno run dev-server
```

## Prod mode

To run in prod mode, bundle with optimizations turned on and then start the prod server.

```sh
./deno run bundle-min

./deno run prod-server
```

Then load `http://localhost:3000` to see the working page
