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
	'POST       /user/signup'              : { action: 'users/signup' },
	'POST       /user/signin'              : { action: 'users/signin' },
	'POST       /tour/add'                 : { action: 'tours/post-tour' },
	'POST       /guide/add'                : { action: 'guides/post-guide' },
	'GET        /user/all'                 : { action: 'users/list-users' },
	'GET        /tour/all'                 : { action: 'tours/get-all-tours' },
	'GET        /user/find/:key'           : { action: 'users/get-user' },
	'GET        /user/find/image/:key'     : { action: 'images/get-user-image' },
	'GET        /tour/find/:key/:long'     : { action: 'tours/single-tour' },
	'DELETE     /tour/delete/:key'         : { action: 'tours/delete-tour' },
	'DELETE     /user/delete/:key'         : { action: 'users/delete-user' },
	'PATCH      /tour/update/:key'         : { action: 'tours/update-tour' },
	'PATCH      /user/update/:key'         : { action: 'users/update-user' },
	'PATCH      /user/make_admin/:key'     : { action: 'admin/make-admin' },
	'POST       /image/user/:key'          : {
		action : 'images/upload-image-user'
	},
	'POST       /image/tour/single/:key'   : {
		action : 'images/upload-image-tour-single'
	},
	'POST       /image/tour/multiple/:key' : {
		action : 'images/upload-image-tour-multiple'
	}

	//  ╔═╗╔═╗╦  ╔═╗╔╗╔╔╦╗╔═╗╔═╗╦╔╗╔╔╦╗╔═╗
	//  ╠═╣╠═╝║  ║╣ ║║║ ║║╠═╝║ ║║║║║ ║ ╚═╗
	//  ╩ ╩╩  ╩  ╚═╝╝╚╝═╩╝╩  ╚═╝╩╝╚╝ ╩ ╚═╝
	// Note that, in this app, these API endpoints may be accessed using the `Cloud.*()` methods
	// from the Parasails library, or by using those method names as the `action` in <ajax-form>.
}
