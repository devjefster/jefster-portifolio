import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    // Base path - use '/' for production with custom domain
    base: '/',

    // Development server settings
    server: {
        port: 3000,
        open: true,
        strictPort: true,
        host: true
    },

    // Resolve file paths
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
        }
    },

    // Build configuration
    build: {
        outDir: 'dist',
        emptyOutDir: true,
        minify: 'terser',
        sourcemap: false,
        // Configure how assets are processed and output
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html')
            },
            output: {
                manualChunks: {
                    vendor: ['@fortawesome/fontawesome-free']
                },
                // Configure the output file names
                entryFileNames: 'assets/js/[name]-[hash].js',
                chunkFileNames: 'assets/js/[name]-[hash].js',
                assetFileNames: (assetInfo) => {
                    let extType = assetInfo.name.split('.').at(1);
                    if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
                        extType = 'images';
                    } else if (/woff|woff2|eot|ttf|otf/i.test(extType)) {
                        extType = 'fonts';
                    } else if (/css/i.test(extType)) {
                        extType = 'css';
                    } else if (/pdf/i.test(extType)) {
                        extType = 'files';
                    }
                    return `assets/${extType}/[name]-[hash][extname]`;
                }
            }
        },
        // Terser options for minification
        terserOptions: {
            compress: {
                drop_console: true, // Remove console.log statements in production
                drop_debugger: true // Remove debugger statements in production
            }
        }
    },

    // CSS configuration
    css: {
        // Process CSS with PostCSS
        postcss: {
            plugins: [
                // Add any PostCSS plugins you want to use here
            ]
        },
        // Configure CSS modules
        modules: {
            // Enable CSS modules for .module.css files
            localsConvention: 'camelCase',
            scopeBehaviour: 'local'
        }
    },

    // Optimization options
    optimizeDeps: {
        include: ['@fortawesome/fontawesome-free']
    },

    // Plugin configurations can be added here
    plugins: []
});