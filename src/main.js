import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
// import parseJson from './services/jsonParser.js'
//import './services/jsonParser.js'
// var loadJsonFile = require('load-json-file');

Vue.use(Vuetify)
// Vue.use(loadJsonFile)

new Vue({
  el: '#app',
  render: h => h(App)
})
