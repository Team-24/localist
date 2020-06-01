module.exports = {
	friendlyName        : 'get-all-guides',

	description         : 'Return all guides in the database',

	extendedDescription : `This returns all the guides that are in the database`,

	inputs              : {},

	exits               : {
		success : {
			description : 'Guides returned successfully.'
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

		var returnArr = []

		await guidesRef.once('value').then(function (snapshot){
			snapshot.forEach(function (childSnapshot){
				var item = childSnapshot.val()
				item.key = childSnapshot.key

				returnArr.push(item)
			})
		})

		this.res.json(returnArr)
	}
}
