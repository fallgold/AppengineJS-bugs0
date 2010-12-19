// Add some custom filters to the default collection of normal template. To be
// used like this in the template files:
//
// {date mydate}, {head mystring} etc...

var filters = exports.filters = require("normal-template").filters;

filters.bctitle = function(str) {
    var title = "Blog";
    if (str) {
        var match = str.match(/\<b\>(.*?)\<\/b\>/);
        if (match) title = match[1];
    }
    return title;
}

filters.head = function(str) {
    return (str.length > 30) ? (str.slice(0, 30) + "..") : str;
}

filters.date = function(date) {
	var h = date.getHours();
	h = h<=9 ? '0'+h : h;
	var m = date.getMinutes();
	m = m<=9 ? '0'+m : m;
	var s = date.getSeconds();
	s = s<=9 ? '0'+s : s;
    return date.getFullYear() + '-' + (date.getMonth()+1) + "-" + date.getDate() + ' ' + h + ':' + m + ':' + s;
}
