import ejs from "ejs";
import fs from "fs";
import prettier from "prettier";
import path from "path";
import { fileURLToPath } from "url";
// 问题驱动
// 1. 手动创建
// 模板
// 开发思想  - 小步骤的开发思想
// 动态生成代码模板

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export function createPackageJsonTemplate(config) {
  const template = fs.readFileSync(
    path.resolve(__dirname, "./template/package.ejs"),
    "utf-8"
  );

  const code = ejs.render(template, {
    packageName: config.packageName,
    router: config.middleware.router,
    static: config.middleware.static,
  });
  return prettier.format(code, {
    parser: "json",
  });
}
