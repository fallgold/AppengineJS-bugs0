var Request = require("nitro/request").Request,
    Response = require("nitro/response").Response;

var Photo = require("content/photo").Photo,
	Album = require("content/album").Album,
	AlbumForm = require("google/appengine/ext/db/forms").ModelForm(Album);

exports.GET = function (request) {
	var photos = Photo.all().filter("album =", parseInt(request.params.id)).fetch();
	return {data:{
		photos: photos.map(function(p) {
			return {
				src: p.src('s'),
				uri: p.uri(),
			}
		})
	}}
}

exports.POST = function (request) {
	var ret = 0;
	var error = '';
	
	var params = request.params;
	if (!params.title) {
		var date = new Date();
		params.title = date.getFullYear() + '-' + (date.getMonth()+1) + "-" + date.getDate();
	}
	
	var album = new Album();
	var form = new AlbumForm(params, {instance: album});
	try {
        var photos = Photo.all().filter("album =", 0).fetch();
        if (!photos || photos.length == 0) {
        	ret = -1;
        	error = '所有保存失败！';
         } else {
         
	        form.put();
	        var albumId = album.key().id();
	        photos.map(function (p) {
	        	p.album = albumId;
	        	p.put();
	         });
	        error = album.uri();
         }
    } catch (e) {
       ret = -1;
       error = e.message;
    }
	
	return Response.json({
		ret: ret,
		error: error,
	});
}