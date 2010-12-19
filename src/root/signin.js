/**
 * @fileoverview Handle Federated Id logins.
 * We keep the /_ah/login_required for compatibility.
 * (We have to use the AH middleware to rewrite _ah to ah though, Appengine does
 * not allow _ah directories)
 */

var users = require("google/appengine/api/users");
var guri;

var openIdProviders = function () { 
    return [
        {title: "Google", uri: "google.com/accounts/o8/id"}, // shorter alternative: "Gmail.com"
        {title: "Yahoo", uri: "yahoo.com"},
        {title: "MySpace", uri: "myspace.com"},
        {title: "AOL", uri: "aol.com"},
        {title: "MyOpenId", uri: "myopenid.com"}
    ].map(function (pr) {
        return {title: pr.title, uri: users.createLoginURL({destURL: guri, federatedIdentity: pr.uri})};
    });
};

exports.GET = function (request) {
	guri = 'http://' + request.headers.host + '/';
	//require("google/appengine/logging").debug(uri);
    /*return {data: {
        openIdProviders: openIdProviders()
    }}*/
    return {
        status : 303,
        headers : {
            "Location": users.createLoginURL(guri)
        }
    }
}
