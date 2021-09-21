import { terser } from "rollup-plugin-terser";
//加载 node_modules
import nodeResolve from "@rollup/plugin-node-resolve";
//cjs转esm，rollup只支持esm
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
export default {
  input: "./index.js",
  output: [
    {
      file: "dist/bundle.cjs.js",
      format: "cjs",
    },
    {
      file: "dist/bundle.esm.js",
      format: "esm",
      plugin: [terser()],
    },
  ],
  plugins: [json(), nodeResolve(), commonjs()],
  external: ["vue"],
};
