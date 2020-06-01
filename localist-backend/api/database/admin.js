var serviceAccount = require('../../config/admin.json')
const admin = require('firebase-admin')

if (!admin.apps.length) {
	admin.initializeApp({
		credential  : admin.credential.cert(serviceAccount),
		databaseURL : 'https://localist-f915c.firebaseio.com'
	})
}

module.exports = admin
