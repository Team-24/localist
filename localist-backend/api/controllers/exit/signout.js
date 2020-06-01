module.exports = {
	friendlyName        : 'Signout',

	description         : 'Sign out.',

	extendedDescription : `This creates a new user record in the database, signs in the requesting user agent
  by modifying its [session](https://sailsjs.com/documentation/concepts/sessions), and
  (if emailing with Mailgun is enabled) sends an account verification email.
  
  If a verification email is sent, the new user's account is put in an "unconfirmed" state
  until they confirm they are using a legitimate email address (by clicking the link in
  the account verification message.)`,

	inputs              : {},

	exits               : {
		success           : {
			description : 'User signed out.'
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
		var curr = this

		firebase
			.auth()
			.signOut()
			.then(function (response){
				curr.res.json(response)
			})
			.catch(function (error){
				curr.res.json(error)
			})
	}
}
