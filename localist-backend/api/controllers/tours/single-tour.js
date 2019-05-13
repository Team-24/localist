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
		var toursRefLong = database.ref('tours_short/' + this.req.params.key)

		var addLongTour = this.req.params.long
		var tour = {}

		try {
			var long_key = ''

			await toursRefLong.once('value').then(function (snapshot){
				long_key = snapshot.val().long_id
				tour = snapshot.val()
			})

			if (addLongTour == 'true') {
				await database
					.ref('tours_long/' + long_key)
					.once('value')
					.then(function (snapshot){
						tour = { ...tour, ...snapshot.val() }
					})
			}
		} catch (error) {
			return this.res.status(404).send('tour not found')
		}

		delete tour.long_id
		this.res.status(200).send(tour)
	}
}
