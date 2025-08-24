/// <reference lib="deno.ns" />

import {App, Router, Context, Mode} from "jsr:@velotype/velotype/webserver"

const router: Router = new Router()

router.get("/", function(_request: Request, _context: Context) {
    const response = new Response(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Velotype</title>
  <link href="/css/bootstrap.min.css" rel="stylesheet"/>
  <link href="/css/main.css" rel="stylesheet"/>
</head>
<body>
  <span class="preloadicon glyphicon glyphicon-remove" aria-hidden="true"></span>
  <div id='main'></div>
<script type="importmap">
{
  "imports": {
    "jsr:@velotype/velotype": "/build/velotype-jsx-${Mode.useOptimizations?"":"dev-"}runtime.mjs",
    "jsr:@velotype/velotype/jsx-${Mode.useOptimizations?"":"dev-"}runtime": "/build/velotype-jsx-${Mode.useOptimizations?"":"dev-"}runtime.mjs"
  }
}
</script>
<script src="/build/velotype-jsx-${Mode.useOptimizations?"":"dev-"}runtime.mjs" type="module" ></script>
<script src="/build/main${Mode.useOptimizations?".min":""}.mjs" type="module" ></script>
</body>
</html>`, {status: 200})
    response.headers.set("content-type", "text/html; charset=utf-8")
    return response
})

await router.mountMemoizedFiles("/css/", `${Deno.cwd()}/css/`)
await router.mountMemoizedFiles("/fonts/", `${Deno.cwd()}/fonts/`)
await router.mountMemoizedFiles("/build/", `${Deno.cwd()}/build/`)

const app = new App(router)
app.serve("127.0.0.1", 3000)
