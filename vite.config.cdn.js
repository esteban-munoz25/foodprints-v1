import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// CDN-specific configuration
export default defineConfig({
  plugins: [react(), tailwindcss()],

  // Build configuration for CDN deployment
  build: {
    outDir: "dist",
    sourcemap: false,

    // Optimize chunk size for CDN
    rollupOptions: {
      output: {
        // Split vendor chunks for better caching
        manualChunks: {
          vendor: ["react", "react-dom"],
          gsap: ["gsap", "@gsap/react"],
          router: ["react-router-dom"],
          wfp: [
            "@wfp/react",
            "@wfp/ui",
            "@wfp/icons",
            "@wfp/icons-react",
            "@wfp/styles",
          ],
        },

        // Optimize asset file names for CDN
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split(".");
          const ext = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico|webp/i.test(ext)) {
            return `assets/images/[name]-[hash][extname]`;
          }
          if (/css/i.test(ext)) {
            return `assets/css/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },

        // Optimize chunk file names
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
      },
    },

    // Production minification
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ["console.log", "console.info", "console.debug"],
      },
      mangle: {
        safari10: true,
      },
    },

    // Asset optimization
    assetsInlineLimit: 4096,
    chunkSizeWarningLimit: 1000,
  },

  // Base path for CDN - UPDATE THIS TO YOUR CDN URL
  // Examples:
  // base: 'https://your-cdn.com/foodprints/',
  // base: 'https://cdn.example.com/assets/foodprints/',
  // base: 'https://static.yourdomain.com/',
  base: "https://your-cdn-url.com/foodprints/",

  // Environment variables for CDN
  define: {
    "process.env.NODE_ENV": '"production"',
  },
});
