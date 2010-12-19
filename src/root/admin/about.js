var Config = require("content/config").Config;

exports.GET = function (env) {
    return {data: {
        configs: Config.getAboutConfig(),
    }}
}

exports.POST = function (request) {
	var Response = require("nitro/response").Response;
	var params = request.params;

	var aboutConfig = Config.aboutConfig;
	
	 for (var i=0; i<aboutConfig.length; i++) {
		 var configName = aboutConfig[i];
		 var value = params[configName] ? params[configName] : '';
		 
	    var config = Config.getByKeyName(configName);
	    if (config) {
	        config.value = value;
	    } else {
	        config = new Config({keyName: configName, value: value});
	    }
	    try {
	    	config.put();
		} catch (errors) {
		    return Response.json({errors: errors});
		}
	 }
     
	return Response.json({uri: "/"});
}
