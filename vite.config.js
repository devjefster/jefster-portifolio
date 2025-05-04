import { defineConfig } from 'vite';

export default defineConfig({
    root: '.',
    base: './',
    publicDir: 'public',
    build: {
        outDir: 'dist',
        emptyOutDir: true,
        assetsInlineLimit: 0,
        rollupOptions: {
            output: {
                assetFileNames: 'assets/[name].[ext]',
                chunkFileNames: 'assets/js/[name]-[hash].js',
                entryFileNames: 'assets/js/[name]-[hash].js',
            }
        }
    }
});