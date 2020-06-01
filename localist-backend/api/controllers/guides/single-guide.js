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
		var guidesRef = database.ref('guides/' + this.req.params.id)

		var curr = this

		return guidesRef.once('value').then(function (snapshot){
			curr.res.json(snapshot)
		})
	}
}
