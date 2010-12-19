var Request = require("nitro/request").Request,
    Response = require("nitro/response").Response;

var Photo = require("content/photo").Photo;


exports.GET = function (request) {
	try {
		var photo = Photo.getByType(request.params.key);
	} catch (e) {
		// NotFound
	}

	if (!photo) return Response.notFound();
	
	return {
    	status: 200,
       headers: {
            "Content-Type": photo.contentType,
            "Content-Length": String(photo.value.length)
        },
       body: [photo.value]
    };	
}