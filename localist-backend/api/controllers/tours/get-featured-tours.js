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
		var toursRefFeatured = database.ref('tours_featured')

		// Array of all the tours to return
		var returnArr = []
		var tours = []

		try {
			await toursRefFeatured
				.once('value')
				.then(function (snapshot){
					snapshot.forEach(function (childSnapshot){
						var item = childSnapshot.val()
						returnArr.push(item)
					})
				})

			for (featuredTour of returnArr) {
				var tour = {}
				var long_key = ''
				await database
					.ref('tours_short/' + featuredTour.tour_id)
					.once('value')
					.then(function (snapshot){
						tour = snapshot.val()
						tour.tour_key = snapshot.key
						long_key = snapshot.val().long_id
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
				delete tour.long_id
				tours.push(tour)
			}
		} catch (error) {
			return this.res.status(400).send('error')
		}
		this.res.status(200).json(tours)
	}
}
