var DB = require("google/appengine/ext/db");

var Photo = exports.Photo = DB.Model("Photo", {
	album: new DB.IntegerProperty(),
	title: new DB.StringProperty({multiline: false}),
	desc: new DB.TextProperty(),
	filename: new DB.StringProperty({multiline: false}),
	contentType: new DB.StringProperty({multiline: false}),
	value: new DB.BlobProperty(),
	value_m: new DB.BlobProperty(),
	value_s: new DB.BlobProperty(),
	created: new DB.DateTimeProperty({autoNowAdd: true}),
	updated: new DB.DateTimeProperty({autoNow: true}),
});

Photo.getByType = function(key) {
	var type = 'm';
	if (key.substr(-2, 1) == '_') {
		type = key.substr(-1, 1);
		if ("kms".indexOf(type) == -1) {
			type = 'm';
		}
		key = key.substring(0, (key.length-2));
	}
	
	var photo = Photo.get(key);
	if (type == 'm') {
		photo.value = photo.value_m; 
	} else if (type == 's') {
		photo.value = photo.value_s;
	} 
	
	return photo;
}

// 图片内容
Photo.prototype.src = function(type) {
	if ("kms".indexOf(type) == -1) {
		type = 'm';
	}
	return '/photos/photo/?key='+ this.key() + '_' + type;
}

// 三级页地址
Photo.prototype.uri = function() {
	return '/photos/show/?key=' + this.key();
}
