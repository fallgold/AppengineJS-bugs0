var DB = require("google/appengine/ext/db");

var Config = exports.Config = DB.Model("Config", {
    value: new DB.TextProperty({required: true}),
});

Object.defineProperty(Config.prototype, "configName", {
    get: function () {
        return this.key().name();
    }
});

var aboutConfig = Config.aboutConfig = ['name', 'description', 'about'];

Config.getAboutConfig = function () {
    var configs = Config.getByKeyName(aboutConfig);

    var configObj = {};
    for (var i=0; i<configs.length; i++) {
    	configObj[configs[i]['configName']] = configs[i]['value']; 
    }
    
    for (var i=0; i<aboutConfig.length; i++) {
    	if (!configObj[aboutConfig[i]]) {
    		if (aboutConfig[i] == 'name') {
    			configObj[aboutConfig[i]] = 'default';
    		} else {
    			configObj[aboutConfig[i]] = '';
    		}
    	}
    }
    
    return configObj;
}
