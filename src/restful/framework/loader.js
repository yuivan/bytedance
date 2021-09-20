const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
/**
 * 读取一个文件夹下面的所有文件
 */
function loader(dir, cb) {
  const url = path.resolve(__dirname, dir);
  const fileNames = fs.readdirSync(url);
  fileNames.forEach((filename) => {
    //去除后缀，成为model的list
    filename = filename.replace(".js", "");
    const file = require(`${url}/${filename}`);
    cb(filename, file);
  });
}

const loadModel = (config) => async (app) => {
  try {
    await mongoose.connect(config.db.url, config.db.options);
  } catch (err) {
    console.error(err);
  }
  app.$model = {};
  loader("../models", (filename, { schema }) => {
    app.$model[filename] = mongoose.model(filename, schema);
  });
};

module.exports = {
  loadModel,
};
