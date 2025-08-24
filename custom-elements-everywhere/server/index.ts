/// <reference lib="deno.ns" />

import {App, Router, Context, Mode} from "jsr:@velotype/velotype/webserver"

const router: Router = new Router()

function componentPage(module: string) {
    return `<!DOCTYPE html>
<html><body>
<div><a href="/">Demo home</a></div>
<div id="main-page"></div>
<script type="importmap">
{
  "imports": {
    "jsr:@velotype/velotype": "/build/velotype-jsx-${Mode.useOptimizations?"":"dev-"}runtime.mjs",
    "jsr:@velotype/velotype/jsx-${Mode.useOptimizations?"":"dev-"}runtime": "/build/velotype-jsx-${Mode.useOptimizations?"":"dev-"}runtime.mjs"
  }
}
</script>
<script src="/build/velotype-jsx-${Mode.useOptimizations?"":"dev-"}runtime.mjs" type="module" ></script>
<script src="/build/${module}${Mode.useOptimizations?".min":""}.mjs" type="module" ></script>
</body></html>`
}

router.get("/", function(_request: Request, _context: Context) {
    const response = new Response(`
<html><body>
<div>
List of test pages:
<div><a href="/basic">basic tests</a></div>
<div><a href="/advanced">advanced tests</a></div>
</div>
</body></html>
`, {status: 200})
    response.headers.set("content-type", "text/html; charset=utf-8")
    return response
})
router.get("/basic", function(_request: Request, _context: Context) {
    const response = new Response(componentPage("basic-tests"), {status: 200})
    response.headers.set("content-type", "text/html; charset=utf-8")
    return response
})
router.get("/advanced", function(_request: Request, _context: Context) {
    const response = new Response(componentPage("advanced-tests"), {status: 200})
    response.headers.set("content-type", "text/html; charset=utf-8")
    return response
})

await router.mountMemoizedFiles("/build/", `${Deno.cwd()}/build/`)

const app = new App(router)
app.serve("127.0.0.1", 3000)
