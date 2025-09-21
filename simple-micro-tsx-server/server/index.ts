/// <reference lib="deno.ns" />

import {App, Router, Context} from "jsr:@velotype/veloserver"

const router: Router = new Router()

router.get("/", function(_request: Request, _context: Context) {
    const response = new Response(`<!DOCTYPE html>
<html>
<body>
<div id="main-page"></div>
<script src="/build/main${Deno.env.get("RUN_MODE")=="local-optimized"?".min":""}.js"></script>
</body>
</html>`, {status: 200})
    response.headers.set("content-type", "text/html; charset=utf-8")
    return response
})

await router.mountFiles("/build/", `${Deno.cwd()}/build/`, true)

const app = new App(router)
app.serve("127.0.0.1", 3000)
