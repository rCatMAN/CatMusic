import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import { resolve, join } from 'path';
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
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
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      "@": join(__dirname, "src"),
    },
  },
  server: {
    // proxy: {
    //   "/music": {
    //     target: "https://service-miegmo5o-1314215170.gz.apigw.tencentcs.com/release/",
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/music/, ""),
    //   }
    // }
  }
})

