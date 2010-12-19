/**
 * simple acl
 * 貌似在yaml里可配置？
 */

var users = require("google/appengine/api/users");

//require("google/appengine/logging").debug(users.isCurrentUserAdmin());

// config
// [controller.action.GET]
//
// currently for the action that need admin privilege
//
var acls = {
	admin: [
		'admin.about.GET',
		'admin.about.POST',
		'comments.comment.DELETE',
		'articles.article.DELETE',
	],
	user: [
		'articles.article.POST',
		'articles.edit.GET',
		'articles..POST',
		'photos.album.POST',
		'photos.upload.POST',
		'photos.upload.GET',
		//'comments..POST'
	],
	guest: []
};

function opLog(controller, action, method, request)
{
	//
	// 命令？ request_logs ？
	//
	if (controller == 'photos' && action == 'photo'
		|| controller == 'etc' && action == 'cron'
	) {
		return;
	}  
    
	var Oplog = require("content/oplog").Oplog;
	var oplog = new Oplog({
		controller: controller,
		action: action,
		method: method,
		params: request.queryString,
		referer: request.headers.referer,
		ip: request.remoteAddress,
	}) ;
	var user = users.getCurrentUser();
	require("google/appengine/logging").debug(user);
	if (user) {
		oplog.uid = user.userId;
		oplog.uname = user.nickname;
		oplog.email = user.email;
	} else {
		oplog.uid = -1;
		oplog.uname = '';
		oplog.email = '';
	}
	
	oplog.put();
}

exports.Auth = function (app) {
    return function (request) {
    	var s = request.scriptName.substr(1);
    	var tmp = s.split('/', 2);
    	var controller = tmp[0];
    	var action = tmp.length>1 ? tmp[1] : '';
    	var method = request.method;
    	controller = controller.toLowerCase();
    	action = action.toLowerCase();
    	method = method.toUpperCase();
    	
    	try {
    		opLog(controller, action, method, request);
    	} catch (e) {
    		;//
    	}
    	
    	var param = controller + "." + action + "." + method;
    	var role = users.getCurrentUser() && users.isCurrentUserAdmin() ? 'admin' :
    					(users.getCurrentUser() ? 'user' :
    						'guest');
    	
    	// acl
    	if (role != 'admin') {
	    	for (acl_role in acls) {
	    		// 暂时没考虑继承关系
	    		if (role != acl_role) {
		    		for (i=0; i<acls[acl_role].length; i++) {
		    			if (acls[acl_role][i] == param) {
		    				throw new Error("Auth error: (" + param + ")");
		                }
		    		}
	    		}
	    	}
    	}
    	
		return app(request);
    }
}