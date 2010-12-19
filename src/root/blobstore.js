var blobstore = require("google/appengine/api/blobstore");

var Response = require("nitro/response").Response;
 
exports.GET = function (request) {
    return {data: {
        uploadURL: blobstore.createUploadUrl("/blobstore")
    }}
}

exports.POST = function (request) {
    var blobs = blobstore.getUploadedBlobs(request);
    // Use a custom redirect to work around AppengineJS constraints
    return {
        status : 303,
        headers : {
            "Location": "/blobstore/serve?key=" + blobs.file.toString()
        }
    }
}
