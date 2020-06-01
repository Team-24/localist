import Vue from 'vue'
import store from './store'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import Vuetify from 'vuetify'
import Axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

// fortawesome
// import  library  from '@fortawesome/fontawesome-svg-core'
// import  faCoffee  from '@fortawesome/free-solid-svg-icons'
// import  FontAwesomeIcon  from '@fortawesome/vue-fontawesome'
// library.add(faCoffee)
// Vue.component('font-awesome-icon', FontAwesomeIcon)

const base = Axios.create({
	baseURL : 'http://localhost:1337/'
})

Vue.prototype.$http = base

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(Vuetify, {
	iconfont : 'md'
})

new Vue({
	router,
	store,
	render : (h) => h(App)
}).$mount('#app')
