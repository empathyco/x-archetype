/** @type {import('@empathyco/x-tailwindcss').PluginOptions} */
module.exports = {
  theme: {},
  components: ({ theme }) => ({
    '.message': {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'center',
      gap: theme('spacing.8'),
      backgroundColor: theme('colors.neutral.10'),
      padding: theme('spacing.24'),
      paddingTop: theme('spacing.8'),
      paddingBottom: theme('spacing.8'),
      textAlign: 'center',
      '@screen desktop': {
        paddingTop: theme('spacing.24'),
        paddingBottom: theme('spacing.24'),
      },
    },
    '.transform-style-3d': {
      transformStyle: 'preserve-3d',
    },
  }),
}
