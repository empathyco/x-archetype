/** @type {import('@empathyco/x-tailwindcss').PluginOptions} */
module.exports = {
  components() {
    return {
      '.input-group': undefined,
      '.input': undefined
    };
  },
  theme: {
    screens: {
      desktop: '744px'
    }
  }
};
