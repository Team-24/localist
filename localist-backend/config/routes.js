/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
	//  ╦ ╦╔═╗╔╗ ╔═╗╔═╗╔═╗╔═╗╔═╗
	//  ║║║║╣ ╠╩╗╠═╝╠═╣║ ╦║╣ ╚═╗
	//  ╚╩╝╚═╝╚═╝╩  ╩ ╩╚═╝╚═╝╚═╝

	//  ╔╦╗╦╔═╗╔═╗  ╦═╗╔═╗╔╦╗╦╦═╗╔═╗╔═╗╔╦╗╔═╗   ┬   ╔╦╗╔═╗╦ ╦╔╗╔╦  ╔═╗╔═╗╔╦╗╔═╗
	//  ║║║║╚═╗║    ╠╦╝║╣  ║║║╠╦╝║╣ ║   ║ ╚═╗  ┌┼─   ║║║ ║║║║║║║║  ║ ║╠═╣ ║║╚═╗
	//  ╩ ╩╩╚═╝╚═╝  ╩╚═╚═╝═╩╝╩╩╚═╚═╝╚═╝ ╩ ╚═╝  └┘   ═╩╝╚═╝╚╩╝╝╚╝╩═╝╚═╝╩ ╩═╩╝╚═╝

	//  ╦ ╦╔═╗╔╗ ╦ ╦╔═╗╔═╗╦╔═╔═╗
	//  ║║║║╣ ╠╩╗╠═╣║ ║║ ║╠╩╗╚═╗
	//  ╚╩╝╚═╝╚═╝╩ ╩╚═╝╚═╝╩ ╩╚═╝
	// …

	//  ╔═╗╔═╗╦  ╔═╗╔╗╔╔╦╗╔═╗╔═╗╦╔╗╔╔╦╗╔═╗
	//  ╠═╣╠═╝║  ║╣ ║║║ ║║╠═╝║ ║║║║║ ║ ╚═╗
	//  ╩ ╩╩  ╩  ╚═╝╝╚╝═╩╝╩  ╚═╝╩╝╚╝ ╩ ╚═╝
	// Note that, in this app, these API endpoints may be accessed using the `Cloud.*()` methods
	// from the Parasails library, or by using those method names as the `action` in <ajax-form>.
	'POST       /user/signup'                : { action: 'users/signup' },
	'POST       /user/signin'                : { action: 'users/signin' },
	'POST       /tour/add'                   : { action: 'tours/post-tour' },
	'POST       /tour/make_featured/:key'    : { action: 'tours/make-featured' },
	'POST       /tour/add/review/:key'       : { action: 'tours/review-tour' },
	'GET        /user/all'                   : { action: 'users/list-users' },
	'GET        /tour/user/:key'             : { action: 'users/get-tours' },
	'GET        /tour/all'                   : { action: 'tours/get-all-tours' },
	'GET        /user/find/:key'             : { action: 'users/get-user' },
	'GET        /tour/find/:key/:long'       : { action: 'tours/single-tour' },
	'DELETE     /tour/delete/:key'           : { action: 'tours/delete-tour' },
	'DELETE     /user/delete/:key'           : { action: 'users/delete-user' },
	'PATCH      /tour/update/:key'           : { action: 'tours/update-tour' },
	'PATCH      /user/update/:key'           : { action: 'users/update-user' },
	'PATCH      /user/make_admin/:key'       : { action: 'admin/make-admin' },
	'POST       /user/image/:key'            : {
		action : 'images/upload-image-user'
	},
	'POST       /tour/image/main/:key'       : {
		action : 'images/upload-image-tour-single'
	},
	'POST       /tour/image/additional/:key' : {
		action : 'images/upload-image-tour-multiple'
	},
	'GET        /tour/featured'              : {
		action : 'tours/get-featured-tours'
	},
	'GET        /category'                   : {
		action : 'tours/get-categories'
	},
	'POST       /category'                   : {
		action : 'tours/post-categories'
	}

	//  ╔═╗╔═╗╦  ╔═╗╔╗╔╔╦╗╔═╗╔═╗╦╔╗╔╔╦╗╔═╗
	//  ╠═╣╠═╝║  ║╣ ║║║ ║║╠═╝║ ║║║║║ ║ ╚═╗
	//  ╩ ╩╩  ╩  ╚═╝╝╚╝═╩╝╩  ╚═╝╩╝╚╝ ╩ ╚═╝
	// Note that, in this app, these API endpoints may be accessed using the `Cloud.*()` methods
	// from the Parasails library, or by using those method names as the `action` in <ajax-form>.
}
