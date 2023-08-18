import { defineConfig } from 'tsup'

export default defineConfig([
  {
    entry: ['src/index.ts'],
    format: ['esm', 'cjs'],
    dts: true,
    treeshake: true,
    clean: true
  },
  {
    entry: ['src/index.ts'],
    format: ['iife'],
    globalName: 'VueElementDialog',
    treeshake: true,
    clean: true,
    minify: true
  }
])
