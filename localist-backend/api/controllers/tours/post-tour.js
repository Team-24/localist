module.exports = {
	friendlyName        : 'post-tour',

	description         : 'Post a tour',

	extendedDescription : `This creates a new tour and pushes it to the tours database`,

	inputs              : {
		title               : {
			required    : true,
			type        : 'string',
			description : 'Title of the tour'
		},

		user_key            : {
			required    : true,
			type        : 'string',
			description :
				'The guide_id for the guide that created the tour.'
		},

		price               : {
			required    : true,
			type        : 'json',
			description :
				'{"low" : "the low price for the price range","high": "the high price for the price range"}'
		},

		duration            : {
			required    : true,
			type        : 'json',
			description :
				'{"short" : "the short duration for the duration range","long": "the long duration for the duration range"}'
		},

		main_image          : {
			required    : false,
			type        : 'string',
			description : 'The main display image of the tour.'
		},

		images              : {
			required    : false,
			type        : 'ref',
			description : 'An array of image urls.'
		},

		location            : {
			required    : true,
			type        : 'json',
			description :
				'{"city" : "the city of tour","country": "the country of tour", "lattitude", "lat of tour", "longitude", "long of tour"}'
		},

		coordinates         : {
			required : false,
			type     : 'json'
		},

		category            : {
			required    : true,
			type        : 'string',
			description : 'The category of the tour'
		},

		tags                : {
			required    : false,
			type        : 'ref',
			description : 'related tags for the tour'
		},

		tour_description    : {
			required    : true,
			type        : 'string',
			description : 'A description of the tour'
		},

		additional_comments : {
			required    : false,
			type        : 'string',
			description :
				'Any additional comments the guide wants to add to be more informative to the tourist'
		},

		guests              : {
			required    : true,
			type        : 'json',
			description : 'the range of number of guests allowed on tour'
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
		var toursRefLong = database.ref('tours_long')
		var toursRefShort = database.ref('tours_short')
		var coord = inputs.coordinates || ''

		try {
			var long_tour = await toursRefLong.push({
				tour_description    : inputs.tour_description,
				additional_comments :
					inputs.additional_comments || '',
				images              : inputs.images || ''
			})

			var short_tour = await toursRefShort.push({
				title       : inputs.title,
				user_key    : inputs.user_key,
				price       : {
					low  : inputs.price.low,
					high : inputs.price.high
				},
				duration    : {
					short : inputs.duration.short,
					long  : inputs.duration.long
				},
				main_image  : inputs.main_image || '',
				location    : {
					city    : inputs.location.city,
					country : inputs.location.country
				},
				coordinates : {
					lattitude : coord.lattitude || '',
					longitude : coord.longitude || ''
				},
				tags        : inputs.tags || '',
				category    : inputs.category,
				long_id     : long_tour.key,
				is_public   : false,
				guests      : {
					high : inputs.guests.high,
					low  : inputs.guests.low
				}
			})
		} catch (error) {
			console.log(error)
			return this.res.status(400).send('Error')
		}

		this.res.status(200).json({ id: short_tour.key })
	}
}
