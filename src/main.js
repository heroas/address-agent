import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import VueCurrencyFilter from 'vue-currency-filter'

Vue.use(Vuetify)
Vue.use(VueCurrencyFilter,
{
  symbol : '$',
  thousandsSeparator: '.',
  fractionCount: 2,
  fractionSeparator: ',',
  symbolPosition: 'front',
  symbolSpacing: true
})

new Vue({
  el: '#app',
  render: h => h(App)
})
