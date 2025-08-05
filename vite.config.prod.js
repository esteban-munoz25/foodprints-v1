import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Production-specific configuration
export default defineConfig({
  plugins: [react(), tailwindcss()],

  // Production build settings
  build: {
    outDir: "dist",
    sourcemap: false,

    // Aggressive optimization for production
    rollupOptions: {
      output: {
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

        // Optimized asset organization
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

    // Chunk size warnings
    chunkSizeWarningLimit: 1000,
  },

  // Base path for deployment
  base: "./",

  // Environment variables
  define: {
    "process.env.NODE_ENV": '"production"',
  },
});
