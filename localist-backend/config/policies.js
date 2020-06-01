/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {
	// Bypass the `is-logged-in` policy for:
	'admin/*'                      : true,
	'images/*'                     : true,
	'tours/*'                      : true,
	'users/*'                      : true,
}
