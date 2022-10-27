const typescript = require("rollup-plugin-typescript2")
const commonjs = require("rollup-plugin-commonjs")
const external = require("rollup-plugin-peer-deps-external")
const resolve = require("rollup-plugin-node-resolve")
const pkg = require("./package.json")


module.exports = {
    input: "src/index.ts",
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
            file: pkg.module,
            format: "es",
            exports: "named",
            sourcemap: true
        }
    ],
        plugins: [
        external(),
        resolve(),
        typescript({

        }),
        commonjs({
            include: ["node_modules/**"],
        })
    ]
};


