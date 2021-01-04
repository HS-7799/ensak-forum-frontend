import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import VueProgressBar from 'vue-progressbar'

Vue.config.productionTip = false

Vue.use(VueProgressBar, {
  color: '#FFC806',
  failedColor: 'red',
  height: '20px'
})


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
