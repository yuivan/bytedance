const fs = require("fs");
const handlebars = require("handlebars");
const { log } = require("../utils/utils");

const compile = (meta, filePath, templatePath) => {
  if (fs.existsSync(templatePath)) {
    //读取模版文件
    const content = fs.readFileSync(templatePath).toString();
    //通过模版建立文件

    const result = handlebars.compile(content)(meta);
    //更新目标路径文件
    fs.writeFileSync(filePath, result);
    log(`${filePath} 创建成功`);
  }
};

module.exports = async () => {
  const list = fs
    .readdirSync("./src/views")
    .filter((v) => v !== "Home.vue")
    .map((v) => ({
      name: v.replace(".vue", "").toLowerCase(),
      file: v,
    }));

  compile({ list }, "./src/router.js", "./template/router.js.hbs");

  compile({ list }, "./src/App.vue", "./template/App.vue.hbs");
};
