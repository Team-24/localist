module.exports = {
	friendlyName        : 'single-tours',

	description         : 'Return the tour based on the id',

	extendedDescription : ``,

	inputs              : {},

	exits               : {
		success : {
			description : 'Tour returned successfully.'
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
		var categoriesRef = database.ref('categories')
		var categories = []

		try {
			await categoriesRef.once('value').then(function (snapshot){
				snapshot.forEach(function (childSnapshot){
					categories.push(childSnapshot.val())
				})
			})
		} catch (error) {
			return this.res.status(404).send('Categories not found')
		}

		this.res.status(200).send(categories)
	}
}
