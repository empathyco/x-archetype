/** @type {import('@empathyco/x-tailwindcss').PluginOptions} */
module.exports = {
  components() {
    return {
      '.suggestion': undefined,
      '.suggestion-group': undefined
    };
  },
  theme: {
    screens: {
      tablet: '641px',
      desktop: '641px'
    }
  }
};
