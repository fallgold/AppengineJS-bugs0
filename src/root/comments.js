var Request = require("nitro/request").Request,
    Response = require("nitro/response").Response;

var Article = require("content/article").Article,
    Comment = require("content/comment").Comment,
    CommentForm = require("google/appengine/ext/db/forms").ModelForm(Comment);

var brify = require("content/utils").brify;

exports.POST = function(env) {
	var params = new Request(env).params,
    	article = Article.get(params.article);

    if (!article) return Response.notFound("Article not found");
    
    var c = params.key ? Comment.get(params.key) : new Comment({parent: article});
    c.content = brify(params.content);

    var form = new CommentForm(params, {instance: c});

    try {
        form.put();
    } catch (errors) {
        return Response.json({errors: errors});
    }

    var html = env.render("/comments/comment.inc.html", {
        key: c.key(),
        author: c.author,
        author_id: c.author_id,
        uri: c.uri,
        content: c.content,
        created: new Date()
    });
    
    return Response.json({html: html});
}

