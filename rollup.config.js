const typescript = require('rollup-plugin-typescript2');
const commonjs = require('rollup-plugin-commonjs');
const external = require('rollup-plugin-peer-deps-external');
const resolve = require('rollup-plugin-node-resolve');
const json = require('@rollup/plugin-json');

//const tsconfig = require("./tsconfig.esm.json")

module.exports = {
  input: 'src/index.ts',
  output: [
    /*
        {
            file: pkg.main,
            format: "cjs",
            exports: "named",
            sourcemap: true
        },
        */
    {
      file: './dist/esm/index.js',
      format: 'es',
      exports: 'named',
      sourcemap: true
    },
  ],
  plugins: [
    external(),
    resolve(),
    typescript({}),
    commonjs({
      include: ['node_modules/**'],
    }),
    json()
  ],
};
