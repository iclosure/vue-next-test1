import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "bootstrap/dist/css/bootstrap.min.css";
import "element-plus/lib/theme-chalk/index.css";
import "./element-variables.scss";
import tools from "./plugins/tools";
import router from "./router/index";
import state from "./store/index";
import "./registerServiceWorker";

const app = createApp(App);

app.use(ElementPlus);
app.use(tools);
app.use(router);
app.use(state);

app.mount("#app");
