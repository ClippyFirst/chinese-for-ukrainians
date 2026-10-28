import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  build: {
    target: 'es2022',
    sourcemap: true,
    rollupOptions: {
      input: {
        main: 'index.html',
        methodology: 'methodology.html',
        regionalLanguages: 'regional-languages.html',
      },
    },
  },
  server: {
    host: '127.0.0.1',
  },
});
