var Request = require("nitro/request").Request,
    Response = require("nitro/response").Response;

var Photo = require("content/photo").Photo,
	PhotoForm = require("google/appengine/ext/db/forms").ModelForm(Photo);

var Images = require("google/appengine/api/images");

exports.GET = function (request) {
	//require("google/appengine/logging").debug(Photo.all().filter("album =", 0).fetch());
}

exports.POST = function (request) {
//	require("google/appengine/logging").debug(request.params.file);

	var ret = 0;
	var error = '';
	
	var params = request.params.file,
		file = params,
		photo = new Photo();
	//params.album = 0;
	photo.album = 0;
    
	const MAX_M = 620;
	const MAX_S = 150;
	var ByteArray = require("binary").ByteArray;
	try {
		var value_m = Images.resize(bytestring=file.value, width=MAX_M, height=MAX_M, outputEncoding=Images.JPEG);
		var value_s = Images.resize(bytestring=file.value, width=MAX_S, height=MAX_S, outputEncoding=Images.JPEG);
		params.value_m = ByteArray(value_m).toByteString();
		params.value_s = ByteArray(value_s).toByteString();
		
		var form = new PhotoForm(params, {instance: photo});
	    try {
	        form.put();
	        // var key = photo.key();
	    } catch (e) {
	        ret = -1;
	        error = e.message;
	    }
	} catch (e) {
		ret = -1;
		error = e.message;
	}
	
    return {
    	status: 200,
       body: ['<script>parent.uploadCallBack('+ ret +', "'+ error +'");</script>']
    };
}