import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router/index"
import 'virtual:svg-icons-register';
import svgIcon from './components/svg-icon/index.vue';
const app = createApp(App);
app.component('SvgIcon', svgIcon);
app.use(router);
app.mount("#app");

