module.exports = {
	friendlyName        : 'get-all-tours',

	description         : 'Return all tours in the database',

	extendedDescription : `This returns all the tours that are in the database`,

	inputs              : {},

	exits               : {
		success : {
			description : 'Tours returned successfully.'
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
		var toursRefShort = database.ref('tours_short')

		// Array of all the tours to return
		var returnArr = []

		try {
			await toursRefShort.once('value').then(function (snapshot){
				snapshot.forEach(function (childSnapshot){
					var item = childSnapshot.val()
					item.key = childSnapshot.key

					returnArr.push(item)
				})
			})
		} catch (error) {
			return this.res.status(400).send('error')
		}

		this.res.status(200).json(returnArr)
	}
}
