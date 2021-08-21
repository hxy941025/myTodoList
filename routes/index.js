const router = require("koa-router")();
const controller = require("../controller");

router.get("/list", async (ctx, next) => {
  await controller.getList(ctx);
});

router.post("/add", async (ctx, next) => {
  await controller.addItem(ctx);
});

router.post("/delete", async (ctx, next) => {
  await controller.delItem(ctx);
});

router.post("/edit", async (ctx, next) => {
  await controller.editItem(ctx);
});

router.post("/save", async (ctx, next) => {
  await controller.saveItem(ctx);
});

module.exports = router;
