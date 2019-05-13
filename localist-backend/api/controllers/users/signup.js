module.exports = {
	friendlyName        : 'Signup',

	description         : 'Sign up for a new user account.',

	extendedDescription : `This creates a new user record in the database, signs in the requesting user agent
by modifying its [session](https://sailsjs.com/documentation/concepts/sessions), and
(if emailing with Mailgun is enabled) sends an account verification email.

If a verification email is sent, the new user's account is put in an "unconfirmed" state
until they confirm they are using a legitimate email address (by clicking the link in
the account verification message.)`,

	inputs              : {
		email    : {
			required            : true,
			type                : 'string',
			isEmail             : true,
			description         :
				'The email address for the new account, e.g. m@example.com.',
			extendedDescription : 'Must be a valid email address.'
		},

		password : {
			required    : true,
			type        : 'string',
			maxLength   : 200,
			example     : 'passwordlol',
			description :
				'The unencrypted password to use for the new account.'
		}
	},

	exits               : {
		success           : {
			description : 'New user account was created successfully.'
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
		// var admin = require('../../database/admin.js')
		var userData = {
			key  : '',
			user : ''
		}

		// try {
			await firebase
				.auth()
				.createUserWithEmailAndPassword(
					inputs.email,
					inputs.password
				)
				.then((authData) => {
					userData.user = authData.user
					return database.ref('users').push({
						uid : authData.user.uid
					})
				})
				.then(function (newUser){
					userData.key = newUser.key
				})
		// } catch (error) {
		// 	return this.res.status(409).send('Email already in use')
		// }

		var actionCodeSettings = {
			// URL you want to redirect back to. The domain (www.example.com) for this
			// URL must be whitelisted in the Firebase Console.
			url             : 'http://localhost:8080',
			// This must be true.
			handleCodeInApp : true
		}

		await firebase
			.auth()
			.sendSignInLinkToEmail(inputs.email, actionCodeSettings)
			.then(function (){
				// The link was successfully sent. Inform the user.
				// Save the email locally so you don't need to ask the user for it again
				// if they open the link on the same device.
				console.log('sent')
			})
			.catch(function (error){
				// Some error occurred, you can inspect the code: error.code
			})

		this.res.status(201).json(userData)
	}
}
