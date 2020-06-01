module.exports = {
	friendlyName : 'Authorize user token.',

	description  :
		'Takes a user token and returns the user key associated with the token, or throws an error if token is invalid.',

	inputs       : {
		token : {
			type        : 'string',
			description : 'Login token of a user.',
			required    : true
		}
	},

	fn           : function (inputs, exits){
		var firebase = require('../database/firebase.js')
		var database = firebase.database()
		var usersRef = database.ref('users')
		var admin = require('../database/admin.js')

		admin
			.auth()
			.verifyIdToken(inputs.token)
			.then(function (decodedToken){
				var uid = decodedToken.uid
				return usersRef
					.orderByChild('uid')
					.equalTo(uid)
					.once('value')
			})
			.then(function (user){
				return exits.success(Object.keys(user.toJSON())[0])
			})
			.catch(function (){
				throw 'Could not verify user.'
			})
	}
}
