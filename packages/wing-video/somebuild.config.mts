import { defineRootConfig } from 'somebuild'
import { defineConfig as defineLibConfig } from '@somebuild/build-lib'

// https://www.npmjs.com/package/esbuild-plugin-scss
// https://github.com/egoist/tsup/issues/545
import esbuildScss from "esbuild-plugin-scss"

export default defineRootConfig({
    lib: defineLibConfig({
        format: ['iife', 'esm', 'cjs'],
        globalName: "wingVideo",
        esbuildPlugins: [esbuildScss],
        minify: false,
        outExtension({ format }) {
            return {
                js: `.${format}.js`,
            }
        },
    }),
})
