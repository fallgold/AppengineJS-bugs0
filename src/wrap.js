var users = require("google/appengine/api/users");

var header = function () {
	var Config = require("content/config").Config;
	var configObj = Config.getAboutConfig();
    return {
    	site_description: configObj.description,
    	site_title: configObj.name,
    	site_name: configObj.name,
    	about: configObj.about,
    	cates: [
    	    {uri:'/', name:'首页'},
    	    {uri:'/photos/albums/', name:'相册'},
    	],
    	
    	admin: users.getCurrentUser() && users.isCurrentUserAdmin(),
    };
};

exports.Wrap = function (app) {
    return function (request) {
        // This middleware wraps all actions, add code here, 
        // to be executed on every request.
        var response = app(request);
        
        if (response.data) {
            var currentUser = users.getCurrentUser();
            response.data.userMenu = currentUser ? 'Hello ' + currentUser.nickname + ' | <a href="' + users.createLogoutURL("/")+'">退出</a>' : '<a href="/signin">登录</a>';
            
            if (currentUser) {
            	response.data.user = {
            		name: currentUser.nickname,
            		id: currentUser.userId,
            	}
            }
            var data = header();
            for (var i in data) {
            	response.data[i] = data[i];
            }
        }
        

        return response;
    }
}

var Tag = require("content/tag").Tag;

exports.Aside = function (app) {
    return function (request) {
        var response = app(request);
         if (!response.data) {
        	 response.data = {};
         }
        response.data.asideTags = Tag.all().order("-count").fetch(15).map(function (t) {
            return {
                label: t.label,
                count: t.count
            }
        });
        return response;
    }        
}
