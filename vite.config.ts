import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        gridsTables: resolve(import.meta.dirname, 'grids-tables.html'),
        anatomia: resolve(import.meta.dirname, 'anatomia.html'),
        regras: resolve(import.meta.dirname, 'regras.html'),
        sites: resolve(import.meta.dirname, 'sites.html'),
        solid: resolve(import.meta.dirname, 'solid.html'),
        sombras: resolve(import.meta.dirname, 'sombras.html'),
        bibliotecas: resolve(import.meta.dirname, 'bibliotecas.html')
      }
    }
  }
});
