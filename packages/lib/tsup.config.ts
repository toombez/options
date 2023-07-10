import { defineConfig } from 'tsup'

export default defineConfig((options) => ({
    dts: true,
    format: ['esm'],
    minify: !options.watch,
    clean: !options.watch,
    treeshake: !options.watch,
}))
