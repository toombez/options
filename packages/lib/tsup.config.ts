import { defineConfig } from 'tsup'

defineConfig((options) => ({
    minify: !options.watch,
    clean: !options.watch,
    dts: true,
}))

