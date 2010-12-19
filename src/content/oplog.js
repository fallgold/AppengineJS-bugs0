var DB = require("google/appengine/ext/db");

exports.Oplog = DB.Model("Oplog", {
    controller: new DB.StringProperty(),
    action: new DB.StringProperty(),
    method: new DB.StringProperty(),
    params: new DB.StringProperty(),
    referer: new DB.StringProperty(),
    ip: new DB.StringProperty(),
    uid: new DB.StringProperty(),
    uname: new DB.StringProperty(),
    email: new DB.StringProperty(),
    created: new DB.DateTimeProperty({autoNowAdd: true}),
});