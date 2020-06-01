module.exports = {
	friendlyName        : 'delete-tours',

	description         : 'Delete the tour based on the id',

	extendedDescription : ``,

	inputs              : {},

	exits               : {
		success : {
			description : 'Tour deleted successfully.'
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
		var toursRef = database.ref('tours')

		try {
			await toursRef.child(this.req.params.key).remove()
		} catch (error) {
			return this.res.status(404).send('Tour was not found')
		}

		this.res.status(200).send('Tour deleted successfully')
	}
}
