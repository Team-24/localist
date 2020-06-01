import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

Vue.use(Vuex)

const vuexLocalStorage = new VuexPersist({
	storage : window.localStorage
})

const store = new Vuex.Store({
	state     : {
		currentUser : localStorage.getItem('currentUser') || null,
		userKey     : localStorage.getItem('userKey') || '',
		adminStatus : localStorage.getItem('adminStatus') || false,
		searchTitle : '',
		searchDate  : '',
		searchGuest : '',
		name        : localStorage.getItem('name') || '',
		thumbnail   :
			localStorage.getItem('thumbnail') ||
			require(`../assets/default_profile.png`)
	},
	actions   : {
		clearData ({ commit }) {
			commit('currentUser', null)
			commit('adminStatus', false)
			commit('searchTitle', '')
			commit('searchDate', '')
			commit('searchGuest', '')
			commit('userKey', '')
		},
		logout ({ commit }) {
			localStorage.removeItem('token')
			localStorage.removeItem('currentUser')
			localStorage.removeItem('userKey')
			localStorage.removeItem('adminStatus')
			localStorage.removeItem('name')
			localStorage.removeItem('thumbnail')
			localStorage.removeItem('searchGuest')
			localStorage.removeItem('searchTitle')
			localStorage.removeItem('searchDate')
			commit('logout')
		}
	},
	mutations : {
		setCurrentUser (state, val) {
			state.currentUser = val
		},
		setCurrentToken (state, val) {
			state.token = val
		},
		setUserKey (state, val) {
			state.userKey = val
		},
		setAdminStatus (state, val) {
			state.adminStatus = val
		},
		setUsername (state, val) {
			state.username = val
		},
		setSearchTitle (state, val) {
			state.searchTitle = val
		},
		setSearchDate (state, val) {
			state.searchDate = val
		},
		setSearchGuest (state, val) {
			state.searchGuest = val
		},
		setThumbnail (state, val) {
			state.thumbnail = val
		},
		setName (state, val) {
			state.name = val
		},
		logout (state) {
			state.currentUser = null
			state.token = ''
			state.userKey = ''
			state.name = ''
			state.thumbnail = require(`../assets/default_profile.png`)
			state.adminStatus = false
			state.searchGuest = ''
			state.searchDate = ''
			state.searchTitle = ''
		}
	},
	getters   : {
		getUserToken (state) {
			return state.currentUser.stsTokenManager.accessToken
		},
		getUserKey (state) {
			return state.userKey
		},
		getAdminStatus (state) {
			return state.adminStatus
		},
		getCurrentUser (state) {
			return state.currentUser
		},
		getUsername (state) {
			return state.username
		},
		getSearchTitle (state) {
			return state.searchTitle
		},
		getSearchDate (state) {
			return state.searchDate
		},
		getSearchGuest (state) {
			return state.searchGuest
		},
		getThumbnail (state) {
			return state.thumbnail
		},
		getName (state) {
			return state.name
		}
	},
	plugins   : [ vuexLocalStorage.plugin ]
})

export default store
