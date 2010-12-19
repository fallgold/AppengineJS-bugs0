var DB = require("google/appengine/ext/db");

var Album = exports.Album = DB.Model("Album", {
	title: new DB.StringProperty({multiline: false}),
    desc: new DB.TextProperty(),
	created: new DB.DateTimeProperty({autoNowAdd: true}),
	updated: new DB.DateTimeProperty({autoNow: true}),
});

//二级页地址
Album.prototype.uri = function() {
	return '/photos/album/?id=' + this.key().id();
}