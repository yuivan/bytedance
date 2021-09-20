const Router = require("koa-router");
const { init, get, create, update, del, list } = require("./api.js");
const router = new Router();
router.get("/api/:list/:id", init, get);
router.get("/api/:list", init, list);
router.post("/api/:list", init, create);
router.put("/api/:list/:id", init, update);
router.delete("/api/:list/:id", init, del);

module.exports = router;
