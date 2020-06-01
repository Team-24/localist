module.exports = {
	friendlyName        : 'post-tour',

	description         : 'Post a tour',

	extendedDescription : `This creates a new tour and pushes it to the tours database`,

	inputs              : {
		category : {
			required : true,
			type     : 'string'
		}
	},

	exits               : {
		success           : {
			description : 'Tour added successfully.'
		},

		invalid           : {
			responseType        : 'badRequest',
			description         :
				'The provided fullName, password and/or email address are invalid.',
			extendedDescription :
				'If this request was sent from a graphical user interface, the request ' +
				'parameters should have been validated/coerced _before_ they were sent.'
		},

		emailAlreadyInUse : {
			statusCode  : 409,
			description : 'The provided email address is already in use.'
		}
	},

	fn                  : async function (inputs){
		// Initialize Firebase
		var firebase = require('../../database/firebase.js')
		var database = firebase.database()
		var categoriesRef = database.ref('categories')

		try {
			await categoriesRef.push({
				category : inputs.category
			})
		} catch (error) {
			return this.res.status(400).send('Error')
		}

		this.res.status(200).send('added category')
	}
}
