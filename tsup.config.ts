import { defineConfig } from 'tsup'

export default defineConfig(({ watch }) => ({
  entry: ['src/index.ts'],
  outDir: !watch ? 'dist' : '@vladyoslav/drawer',
  clean: true,
  minify: true,
  target: 'es2018',
  external: ['react'],
  sourcemap: true,
  dts: true,
  format: ['esm', 'cjs'],
  injectStyle: true,
  esbuildOptions(options) {
    options.banner = {
      js: '"use client"'
    }
  }
}))
