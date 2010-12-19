var Request = require("nitro/request").Request,
    Response = require("nitro/response").Response;

var Photo = require("content/photo").Photo;


exports.GET = function (request) {
	try {
		var photo = Photo.get(request.params.key);
	} catch (e) {
		// NotFound
	}

	if (!photo) return Response.notFound();
	
	return {data:{
		//key: request.params.key,
		src: photo.src('m'),
	}};
}