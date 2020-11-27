import '@/scss/main.scss'

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Buefy from "buefy";
import * as methods from './helpers/mixins';

Vue.config.productionTip = false;

Vue.use(Buefy);
Vue.mixin({
  methods,
  
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
