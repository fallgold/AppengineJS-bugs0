var Request = require("nitro/request").Request,
    Response = require("nitro/response").Response;

var Photo = require("content/photo").Photo,
	Album = require("content/album").Album;

exports.GET = function (request) {
	var albums = Album.all().fetch();
	return {data:{
		albums: albums.map(function(a) {
			var photo = Photo.all().filter("album =", a.key().id()).order("-created").fetch(1);
			if (photo.length > 0) {
				var src = photo[0].src('s');
			} else {
				src = '';
			}
			return {
				uri: a.uri(),
				title: a.title,
				src: src,
			}
		})
	}}
}