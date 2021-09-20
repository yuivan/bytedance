const { promisify } = require("util");
const clear = require("clear");
const figlet = promisify(require("figlet"));
const { clone } = require("./download");
const { log } = require("../utils/utils");
const open = require("open");
const spawn = async (...arg) => {
  return new Promise((resolve) => {
    const { spawn } = require("child_process");
    const data = spawn(...arg);
    //传递日志给process
    data.stdout.pipe(process.stdout);
    data.stderr.pipe(process.stderr);
    data.on("close", () => {
      resolve();
    });
  });
};
module.exports = async (name) => {
  clear();
  const data = await figlet(`hello  ${name}`);
  log(data);
  log("开始下载");
  //新项目要用main分支
  await clone("github:su37josephxia/vue-template", name);
  log("完成");
  //子进程自动安装依赖
  await spawn("npm", ["install"], { cwd: `./${name}` });
  log("install完成");
  open("http://localhost:8080");
  //子进程自动启动项目
  await spawn("npm", ["run", "serve"], { cwd: `./${name}` });
};
