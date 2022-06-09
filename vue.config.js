const Path = require('path')

const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    configureWebpack: {
        resolve: {
            alias: {
                "@models": Path.resolve(__dirname, 'src/modules/models'),
                "@trees": Path.resolve(__dirname, 'src/modules/trees')
            }
        }
    }
})
