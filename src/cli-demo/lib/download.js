const { promisify } = require("util");
const download = promisify(require("download-git-repo"));
module.exports.clone = async (repo, name) => {
  await download(repo, name);
};
