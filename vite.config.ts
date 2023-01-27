import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import { resolve, join } from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    createSvgIconsPlugin({
      // 配置你存放 svg 图标的目录
      iconDirs: [resolve(process.cwd(), 'src/icons/svg')],
      // 定义 symbolId 格式
      symbolId: 'icon-[dir]-[name]',
    }),
  ],
  resolve: {
    alias: {
      "@": join(__dirname, "src"),
    },
  },
})

