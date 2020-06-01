module.exports = {
	friendlyName        : 'post-tour',

	description         : 'Post a tour',

	extendedDescription : `This creates a new tour and pushes it to the tours database`,

	inputs              : {},

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
		var firebase = require('../../database/firebase.js')
		var database = firebase.database()
		var ToursShortRef = database.ref(
			'tours_short/' + this.req.params.key
		)

		this.req.file('img').upload({
			// ...any other options here...
			adapter     : require('skipper-gclouds'),
			projectId   : '999412385085',
			keyFilename : './storage.json',
			bucket      : 'localist-assets',
			//Are files uploaded public?
			public      : true
		}, function (error, uploadedFiles){
			ToursShortRef.update({
				main_image : `https://storage.googleapis.com/localist-assets/${uploadedFiles[0]
					.fd}`
			})
		})
	}
}
