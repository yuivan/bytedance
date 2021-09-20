const chalk = require("chalk");

module.exports = {
  log(content) {
    console.log(chalk.blue(content));
  },
};
