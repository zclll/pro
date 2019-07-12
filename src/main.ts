import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'
import "vue-material/dist/theme/black-green-light.css"
Vue.config.productionTip = false
Vue.use(vueMaterial)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
