/// <reference lib="deno.ns" />

import {App, Router, Context, Mode} from "jsr:@velotype/velotype/webserver"

const router: Router = new Router()

router.get("/", function(_request: Request, _context: Context) {
    const response = new Response(`<!DOCTYPE html>
<html>
<body>
<div id="main-page"></div>
<script src="/build/main${Mode.useOptimizations?".min":""}.js"></script>
</body>
</html>`, {status: 200})
    response.headers.set("content-type", "text/html; charset=utf-8")
    return response
})

await router.mountMemoizedFiles("/build/", `${Deno.cwd()}/build/`)

const app = new App(router)
app.serve("127.0.0.1", 3000)
