import { createApp } from "vue";
import App from "./App.vue";

/*
TIP: To get started with clean router change path to @/router/clean.ts.
 */
import router from "@/router/clean.ts";
import store from "./store";
import ElementPlus from "element-plus";
import i18n from "@/core/plugins/i18n";

//imports for app initialization
import ApiService from "@/core/services/ApiService";
import { initInlineSvg } from "@/core/plugins/inline-svg";
import { initVeeValidate } from "@/core/plugins/vee-validate";

import "@/core/plugins/keenthemes";
import "bootstrap";
import "element-plus/dist/index.css";

const app = createApp(App);

app.use(store);
app.use(router);
app.use(ElementPlus);

ApiService.init(app);
initInlineSvg(app);
initVeeValidate();

app.use(i18n);

app.mount("#app");
