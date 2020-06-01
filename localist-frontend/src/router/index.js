import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Users from '@/components/Users.vue'
import Signin from '@/components/Signin.vue'
import Home from '@/components/Home.vue'
import Tours from '@/components/Tours.vue'
import Guides from '@/components/Guides.vue'
import SingleGuide from '../components/SingleGuide'
import SingleTour from '../components/SingleTour'
import CreateTour from '../components/CreateTour'
import Admin from '../components/Admin'
import EditTour from '../components/EditTour'
import Profile from '../components/Profile'
import Booking from '../components/Booking'
import Payment from '../components/Payment'
import test from '../components/test'
import EditTours from '../components/EditTours'

Vue.use(VueRouter)
const router = new VueRouter({
	scrollBehavior() {
    	return { x: 0, y: 0 };
  	},
	mode   : 'history',
	routes : [
		{
			path      : '/',
			name      : 'home',
			component : Home
		},
		{
			path      : '/signin',
			name      : 'signin',
			component : Signin
		},
		{
			path      : '/users',
			name      : 'Users',
			component : Users,
			meta      : {
				requiresAdmin : true
			}
		},
		{
			path      : '/tours',
			name      : 'Tours',
			component : Tours
		},
		{
			path      : '/guides',
			name      : 'Guides',
			component : Guides
		},
		{
			path      : '/tours/createtour',
			name      : 'createTour',
			component : CreateTour,
			meta      : {
				requiresAuth : true
			}
		},
		{
			path      : '/tours/single/:id/booking',
			name      : 'booking',
			component : Booking,
			meta      : {
				requiresAuth : true
			}
		},
		{
			path      : '/tours/single/:id/booking/payment',
			name      : 'payment',
			component : Payment,
			meta      : {
				requiresAuth : true
			}
		},
		{
			path      : '/tours/edit/:id',
			name      : 'editTour',
			component : EditTour,
			meta      : {
				requiresAuth : true
			}
		},
		{
			path      : '/guides/single/:id',
			name      : 'guideID',
			component : SingleGuide,
			meta      : {
				requiresAuth : true
			}
		},
		{
			path      : '/tours/single/:id',
			name      : 'tourID',
			component : SingleTour
		},
		{
			path      : 'admin',
			name      : 'Admin',
			component : Admin,
			meta      : {
				requiresAdmin : true
			}
		},
		{
			path      : '/test',
			name      : 'test',
			component : test
		},
		{
			path      : '/profile',
			name      : 'profile',
			component : Profile,
			meta      : {
				requiresAuth : true
			}
		},
		{
			path      : '/edit',
			name      : 'edit',
			component : EditTours
		},
		{
			path     : '*',
			redirect : '/'
		}
	]
})

router.beforeEach((to, from, next) => {
	const requiresAuth = to.matched.some((x) => x.meta.requiresAuth)
	const requiresAdmin = to.matched.some((x) => x.meta.requiresAdmin)
	const currentAdmin = store.getters.getAdminStatus
	const currentUser = store.getters.getCurrentUser

	if (requiresAdmin && !currentAdmin) {
		next('/signin')
	}
	else if (requiresAuth && !currentUser) {
		next('/signin')
	}
	else if (requiresAuth && currentUser) {
		next()
	}
	else {
		next()
	}
})

export default router
