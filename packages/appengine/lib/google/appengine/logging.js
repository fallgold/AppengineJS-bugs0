var JLogger = Packages.java.util.logging.Logger,
    jlog = JLogger.getLogger("app");

exports.info = function(msg) {
    jlog.info(msg);
}

exports.warning = function(msg) {
    jlog.warning(msg);
}

exports.debug = function(obj) {
	if (typeof(obj) == 'object') {
		var s = "\n";
	    for(var i in obj) {
	    	s += i+': \n'+ obj[i] + "\n";
	    }
	    s += "\n";
	    jlog.warning(s);
    } else {
    	jlog.warning(obj);
    }
}