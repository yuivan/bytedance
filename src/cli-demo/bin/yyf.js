#!/usr/bin/env node
const program = require("commander");
program.version(require("../package").version);
program
  .command("init <name>")
  .description("init project")
  .action(require("../lib/lib"));

program
  .command("refresh")
  .description("refresh router")
  .action(require("../lib/refresh"));
program.parse(process.argv);
