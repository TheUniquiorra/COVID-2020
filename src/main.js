import Vue from 'vue'
import App from './App.vue'
import echarts from 'echarts'
import axios from 'axios'
import VueAxios from 'vue-axios'



Vue.config.productionTip = false
// 引入echarts
Vue.prototype.$echarts = echarts
Vue.use(VueAxios,axios);
new Vue({
  render: h => h(App),
}).$mount('#app')
