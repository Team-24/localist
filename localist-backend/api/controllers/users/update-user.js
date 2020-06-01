module.exports = {
	friendlyName        : 'update-user',

	description         : 'Update a user',

	extendedDescription : `This updates a user based on the id and the input fields`,

	inputs              : {
		name          : {
			required    : true,
			type        : 'json',
			example     : '{"first": "Jacob", "last": "Smith"}',
			description : 'Your name.'
		},

		date_of_birth : {
			required    : true,
			type        : 'string',
			description :
				'stored in yyyy-mm-dd for example March 15, 1998 becomes 1998-03-15'
		},

		gender        : {
			required    : true,
			type        : 'string',
			description :
				'The gender of the user, can be one of several thousand'
		},

		location      : {
			required    : true,
			type        : 'json',
			description :
				'the city and the country of the users location'
		},

		coordinates   : {
			required    : false,
			type        : 'json',
			description :
				'the lattitude and the longitude of the users location'
		}
	},

	exits               : {
		success : {
			description : 'Updated user successfully.'
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
		var usersRef = database.ref('users')

		try {
			await usersRef.child(this.req.params.key).update({
				name          : {
					first : inputs.name.first,
					last  : inputs.name.last
				},
				date_of_birth : inputs.date_of_birth,
				gender        : inputs.gender,
				location      : {
					city    : inputs.location.city,
					country : inputs.location.country
				}
			})
			if (coordinates) {
				await usersRef.child(this.req.params.key).update({
					coordinates : {
						lattitude :
							inputs.coordinates.lattitude,
						longitude :
							inputs.coordinates.longitude
					}
				})
			}
		} catch (error) {
			return error
		}

		this.res.status(200).send('User updated successfully')
	}
}
