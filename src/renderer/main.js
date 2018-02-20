import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import VueCurrencyFilter from 'vue-currency-filter'
import VueCookies from 'vue-cookies'


Vue.use(Vuetify)
Vue.use(VueCurrencyFilter,
{
  symbol : '$',
  thousandsSeparator: ',',
  fractionCount: 2,
  fractionSeparator: '.',
  symbolPosition: 'front',
  symbolSpacing: true
})
Vue.use(VueCookies)
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
new Vue({
  components: { App },
  template: '<App/>'
}).$mount('#app')
