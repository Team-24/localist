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
		var guidesRef = database.ref('users/' + this.req.params.key)
		var userTours = []
		var tours = []

		// try {
		await guidesRef
			.child('tours')
			.once('value')
			.then(function (snapshot){
				snapshot.forEach(function (childSnapshot){
					userTours.push(childSnapshot.val())
				})
			})

		for (userTour of userTours) {
			var tour = {}
			var long_key = ''
			await database
				.ref('tours_short/' + userTour.tour_id)
				.once('value')
				.then(function (snapshot){
					tour = snapshot.val()
					if (snapshot.val()) {
						tour.key = snapshot.key
						long_key = snapshot.val().long_id
						tours.push(tour)
					}
				})

			// await database
			// 	.ref('tours_long/' + long_key)
			// 	.once('value')
			// 	.then(function (snapshot){
			// 		tour = {
			// 			...tour,
			// 			...snapshot.val()
			// 		}
			// 	})
		}
		// } catch (error) {
		// 	return this.res.status(404).send('User not found')
		// }

		this.res.status(200).send(tours)
	}
}
