const { defineConfig } = require('@vue/cli-service');
const { webpackConfig } = require('@empathyco/x-archetype-utils');
const fs = require("fs");

module.exports = defineConfig({
  ...webpackConfig,
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].template = 'public/index.html';
      args[0].__injectedHome__ = fs.readFileSync('node_modules/@empathyco/x-archetype-utils/dist/home/home-template.html');

      return args;
    })
  }
});
