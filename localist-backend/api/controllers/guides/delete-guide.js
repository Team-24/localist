module.exports = {
	friendlyName        : 'delete-guide',

	description         : 'Delete the guide based on the id',

	extendedDescription : ``,

	inputs              : {},

	exits               : {
		success : {
			description : 'Guide deleted successfully.'
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
		var guidesRef = database.ref('guides')

		return guidesRef.child(this.req.params.id).remove()
	}
}
