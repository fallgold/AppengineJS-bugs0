var Request = require("nitro/request").Request;

exports.paginate = function (env, query, limit) { 
    var params = new Request(env).params,
    	 curPage = parseInt(params.p);
    curPage = isNaN(curPage) ? 0 : curPage;

    var offset = curPage * limit,
    	 count = query.count(), // Gsql中count算法有效率问题！！，必要时单独存储维护count信息
    	 items = query.fetch(limit, {offset:offset});
    	
    //require("google/appengine/logging").debug(params instanceof Array);
    
    var pNamePage = 'p';
    var baseUrl = '?';
    for (pName in params) {
    	if (pName != pNamePage) {
    		baseUrl += (pName + '=' + params[pName] + '&');
    	}
    }
    
    if (count > (offset+limit)) {
        items.next = baseUrl + pNamePage + "=" + (curPage+1);
     }
    
     if (curPage >= 1) {
    	 items.prev = baseUrl + pNamePage + "=" + (curPage-1);
     }
    
    return items;
}

var Query = require("google/appengine/ext/db/query").Query;

Query.prototype.paginate = function (env, limit) {
    return exports.paginate(env, this, limit);
}
