const firebase = require('firebase')
const config = {
	apiKey            : 'AIzaSyA00pKPXIiaxCbT4j0CMF2mwx2iOoltShQ',
	authDomain        : 'localist-f915c.firebaseapp.com',
	databaseURL       : 'https://localist-f915c.firebaseio.com',
	projectId         : 'localist-f915c',
	storageBucket     : 'localist-f915c.appspot.com',
	messagingSenderId : '500590303174'
}
if (!firebase.apps.length) {
	firebase.initializeApp(config)
}

module.exports = firebase
