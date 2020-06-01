module.exports = {
	friendlyName        : 'delete-user',

	description         : 'Delete the user based on the id',

	extendedDescription : ``,

	inputs              : {},

	exits               : {
		success : {
			description : 'User deleted successfully.'
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

		try {
			guidesRef.child(this.req.params.key).remove()
		} catch (error) {
			return this.res.status(404).send('User not found')
		}

		this.res.status(204).send('User deleted successfully')
	}
}
