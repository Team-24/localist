module.exports = {
	friendlyName : 'update-tour',

	description  : 'Update a tour',

	inputs       : {
		title               : {
			required    : true,
			type        : 'string',
			description : 'Title of tour'
		},

		tour_description    : {
			required    : true,
			type        : 'string',
			maxLength   : 200,
			example     : 'passwordlol',
			description :
				'The unencrypted password to use for the new account.'
		},

		price               : {
			required    : true,
			type        : 'json',
			description :
				'An array of the low and high range for the price'
		},

		duration            : {
			required    : true,
			type        : 'json',
			description :
				'{"short": "Short duration range", "long": "Long duration range"}'
		},

		main_image          : {
			required    : false,
			type        : 'string',
			description : 'Image of the tour.'
		},

		location            : {
			required    : true,
			type        : 'json',
			description : 'An object that contains the city and country.'
		},

		tags                : {
			required    : false,
			type        : 'ref',
			description : 'The array of tags related to the tour.'
		},

		category            : {
			required    : true,
			type        : 'string',
			description : 'the category of the tour'
		},

		coordinates         : {
			required    : true,
			type        : 'json',
			description :
				'A JSON object that contains the lat and long of the coordinates'
		},

		images              : {
			required    : false,
			type        : 'ref',
			description : 'An array of the images of the tour'
		},

		additional_comments : {
			required    : false,
			type        : 'string',
			description : 'Additional comments of the tour'
		},

		guests              : {
			required    : true,
			type        : 'json',
			description : 'the range of number of guests allowed on tour'
		}
	},

	exits        : {
		success : {
			description : 'Tour updated successfully.'
		},

		invalid : {
			responseType : 'badRequest',
			description  :
				'The provided fullName, password and/or email address are invalid.'
		}
	},

	fn           : async function (inputs){
		// Initialize Firebase
		var firebase = require('../../database/firebase.js')
		var database = firebase.database()
		var toursRefShort = database.ref('tours_short')
		var toursRefLong = database.ref('tours_long')
		var short_key = this.req.params.key

		try {
			await toursRefShort
				.child(short_key)
				.once('value')
				.then(function (snapshot){
					return snapshot.val().long_id
				})
				.then(function (long_key){
					console.log(long_key)
					toursRefLong.child(long_key).update({
						additional_comments :
							inputs.additional_comments ||
							'',
						coordinates         : {
							lat  :
								inputs.coordinates
									.lattitude,
							long :
								inputs.coordinates
									.longitude
						},
						images              :
							inputs.images || '',
						tour_description    :
							inputs.tour_description
					})
					console.log('update long')
				})
				.then(function (){
					toursRefShort.child(short_key).update({
						title      : inputs.title,
						duration   : {
							short :
								inputs.duration
									.short,
							long  : inputs.duration.long
						},
						location   : {
							city    :
								inputs.location.city,
							country :
								inputs.location
									.country
						},
						price      : {
							low  : inputs.price.low,
							high : inputs.price.high
						},
						main_image : inputs.main_image || '',
						tags       : inputs.tags || '',
						category   : inputs.category,
						guests     : {
							high : inputs.guests.high,
							low  : inputs.guests.low
						}
					})
				})
		} catch (error) {
			return this.res
				.status(404)
				.send('Could not find tour, updated aborted')
		}

		this.res.status(200).send('Tour updated succesfully')
	}
}
