/**
 * the config dont work!
 * Howto ??
 * 
 * builtins:
 *	- datastore_admin: on
 */

var Request = require("nitro/request").Request,
    Response = require("nitro/response").Response;

exports.GET = exports.POST = function(env) {
	var Oplog = require("content/oplog").Oplog;
	var oplogs = Oplog.all().fetch();
	oplogs.map(function(o) {
		o.remove();
	});
	return Response.ok();
}