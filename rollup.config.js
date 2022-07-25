import { createConfig } from './build/instrumentation.build';

export default createConfig({
  /*
    input: Check input options at http://rollupjs.org/guide/en/#input
    output: Check all output options at http://rollupjs.org/guide/en/#outputdir
  */
  output: {
    chunkFileNames: chunkInfo => {
      switch (chunkInfo.name) {
        case 'custom-main-modal':
          return 'x-empty-search-[hash].js';
        case 'index':
          return 'x-search-[hash].js';
        default:
          return '[name].[hash].js';
      }
    }
  },
  plugins: {
    // Modify plugins options here.
  }
});
