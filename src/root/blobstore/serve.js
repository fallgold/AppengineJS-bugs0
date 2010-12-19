var blobstore = require("google/appengine/api/blobstore");
 
exports.GET = function (request) {
    return blobstore.serve(request.params.key, request);
}
