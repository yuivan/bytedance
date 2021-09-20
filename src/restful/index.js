const Koa = require("koa");
var bodyParser = require("koa-bodyparser");
const config = require("./config");
const router = require("./framework/router");
const { loadModel } = require("./framework/loader");
(async () => {
  const app = new Koa();
  await loadModel(config)(app);
  app.use(bodyParser());
  app.use(router.routes()).use(router.allowedMethods());
  app.listen(3000);
})();
