import { createApp } from "vue";
import { createPinia } from "pinia"
import "./style.css";
import App from "./App.vue";
import router from "./router/index"
import 'virtual:svg-icons-register';
import svgIcon from './components/svg-icon/index.vue';
const app = createApp(App);
const pinia = createPinia()
app.component('SvgIcon', svgIcon);
app.use(pinia);
app.use(router);
app.mount("#app");
