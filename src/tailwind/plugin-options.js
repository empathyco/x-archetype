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
      tablet: '641px',
      desktop: '641px'
    }
  }
};
