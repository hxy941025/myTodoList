const Koa = require("koa");
const app = new Koa();
const bodyparser = require("koa-bodyparser");
const { handleErr } = require("./middleware/handleErr");
const router = require("./routes/index");

app.use(bodyparser());

app.use(handleErr);

app.use(router.routes());

app.listen(8888, () => {
  console.log("开启服务");
});

module.exports = app;
