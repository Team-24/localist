module.exports = {
	friendlyName        : 'single-guides',

	description         : 'Return guide based on the id',

	extendedDescription : ``,

	inputs              : {},

	exits               : {
		success : {
			description : 'Guide returned successfully.'
		},

		invalid : {
			responseType        : 'badRequest',
			description         :
				'The provided fullName, password and/or email address are invalid.',
			extendedDescription :
				'If this request was sent from a graphical user interface, the request ' +
				'parameters should have been validated/coerced _before_ they were sent.'
		}
	},

	fn                  : async function (inputs){
		// Initialize Firebase
		var firebase = require('../../database/firebase.js')
		var database = firebase.database()
		var guidesRef = database.ref('users')
		var user = {}

		try {
			await guidesRef
				.child(this.req.params.key)
				.once('value')
				.then(function (snapshot){
					user = snapshot.val()
				})
		} catch (error) {
			return this.res.status(404).send('User not found')
		}

		this.res.status(200).send(user)
	}
}
