const session = require("koa-session");
const Koa = require("koa");
const { koaBody } = require("koa-body");
const CONFIG = require("./session");
const router = require("./router");
const server = require("koa-static")

const app = new Koa();
app.use(server("./static"))
app.use(koaBody());
app.use(session(CONFIG, app));
app.use(router.routes());

app.keys = ["i love hust"];

app.listen(3001);