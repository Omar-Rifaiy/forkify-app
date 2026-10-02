import { defineConfig } from 'vite';
import legacy from '@vitejs/plugin-legacy';
export default defineConfig({
  server: {
    port: 3000,
    host: '127.0.0.1',
  },
  clearScreen: false,
  preview: {
    port: 3000,
    host: '127.0.0.1',
  },
  plugins: [
    legacy({
      targets: ['defaults'],
    }),
    {
      name: 'my-plugin',
      closeServer() {
        // console.log('Sever');
      },

      handleHotUpdate({ file }) {
        // console.log('🔥 Updated:', file);
      },
    },
  ],
});
