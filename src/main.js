import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import VueCurrencyFilter from 'vue-currency-filter'
import VueCookies from 'vue-cookies'
import AsyncMethods from 'vue-async-methods'


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
Vue.use(AsyncMethods)

new Vue({
  el: '#app',
  render: h => h(App)
})
