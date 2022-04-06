import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";

const app = createApp(App);
const token = localStorage.getItem("token");

// Setting up default vue http modules for api calls
app.config.globalProperties.axios = axios;
// Is there any token then we will simply append default axios authorization headers
if (token) {
  app.config.globalProperties.axios.defaults.headers.common["Authorization"] =
    token;
}

app.use(store);
app.use(router);
app.mount("#app");
