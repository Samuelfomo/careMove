import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig(({ mode }) => {
  const isProd = mode === 'production';

  return {
    plugins: [vue()],

    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@public': fileURLToPath(new URL('./public', import.meta.url)),
      },
    },

    server: {
      open: true,
      host: true,
      port: 5174,
    },

    build: {
      minify: isProd ? 'esbuild' : false,

      sourcemap: !isProd,

      esbuild: {
        drop: isProd ? ['console', 'debugger'] : [],
      },

      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
        },
      },
    },
  };
});

// import { fileURLToPath, URL } from 'node:url'
// import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'
// import { resolve } from 'path'
//
// export default defineConfig({
//   plugins: [vue()],
//   resolve: {
//     alias: {
//       '@': fileURLToPath(new URL('./src', import.meta.url)),
//       '@public': fileURLToPath(new URL('./public', import.meta.url))
//     }
//   },
//   server: {
//     fs: {
//       allow: [
//         resolve(__dirname, 'src'),
//         resolve(__dirname, 'public')
//       ]
//     },
//     open: true,
//     host: true,
//     port: 5174
//   },
//   // Ajoutez cette section pour la production
//   build: {
//     rollupOptions: {
//       output: {
//         manualChunks(id) {
//           if (id.includes('node_modules')) {
//             return 'vendor';
//           }
//         }
//       }
//     }
//   }
// })
