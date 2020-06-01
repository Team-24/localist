module.exports = {
	friendlyName : 'update-tour',

	description  : 'Update a tour',

	inputs       : {
		review : {
			required    : true,
			type        : 'json',
			description : ''
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
		var short_key = this.req.params.key

		try {
			await toursRefShort
				.child(short_key)
				.once('value')
				.then(function (snapshot){
					return snapshot.val().long_id
				})
				.then(function (long_key){
					database
						.ref('tours_long/' + long_key)
						.child('reviews')
						.push({
							user_key  :
								inputs.review
									.user_key,
							comment   :
								inputs.review
									.comment,
							rating    :
								inputs.review.rating,
							date      :
								inputs.review.date,
							title     :
								inputs.review.title,
							user_name :
								inputs.review
									.user_name
						})
					return database
						.ref('tours_long/' + long_key)
						.child('reviews')
						.once('value')
				})
				.then(function (snapshot){
					var obj = {
						count  : 0,
						rating : 0
					}
					snapshot.forEach(function (childSnapshot){
						obj.count += 1
						obj.rating += parseFloat(
							childSnapshot.val().rating
						)
					})
					return obj
				})
				.then(function (obj){
					var rating = Number(
						Math.round(
							obj.rating / obj.count + 'e2'
						) + 'e-2'
					)
					toursRefShort.child(short_key).update({
						rating : {
							count   : obj.count,
							average : rating
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
