import { defineConfig } from 'tsup'

defineConfig((options) => ({
    dts: true,
    bundle: true,
    format: ['esm', 'cjs'],
    minify: !options.watch,
    clean: !options.watch,
    treeshake: !options.watch,
}))

