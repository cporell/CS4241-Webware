// Author: Connor Porell
// CS 4241 Project 7

var express = require('express');
var http = require('http');
var path = require('path');
var fs = require('fs');
var url = require('url');
var csv = require('csv');
var _ = require('underscore');
//var cookieParser = require('cookie-parser');
//app.use(cookieParser());

var posts = [];

var page = fs.readFileSync("./public/index.html").toString();

var app = express();
var port = process.env.PORT || 3000;

app.get('/', function (req, res) {
    page = fs.readFileSync("./public/index.html").toString();
    var str = "";
    posts.forEach(function (p, i) {
        str += postTemplate(p);
    })
    res.send(page);
});

app.get('/posts', function (req, res) {
    page = fs.readFileSync("./public/index.html").toString();
    res.send(JSON.stringify(posts));
});

app.post('/', function (req, res) {
    //var query = req.query;
    var body = "";

    req.on('data', function (data) {
        body += data;
        // Too much POST data, kill the connection!
        // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
        if (body.length > 1e6)
            req.connection.destroy();
    });

    req.on('end', function () {

        var bodyToParse = JSON.parse(body);
        posts.push(bodyToParse);
        drawPosts(req, res);
    });
    // generate a post
    //var post = { time: Date.now, posterID: "needACookie", body: req.query.postbody };
});

function drawPosts(req, res)
{
    var str = "";
    posts.forEach(function (p, i) {
        str += postTemplate(p);
    })

    res.send(str);
}

var postTemplate = _.template(
    "<div class='post'>" +
    "<div class='inner'>" +
    "<p>At <%= time %> <span class='postername'>User <%= posterID %></span> said...</p>" +
    "<p><%= body %></p>" +
    "</div></div><br>"
    );

app.listen(port, function () {
    console.log('App is listening on port ' + port);
});

app.use(express.static(path.join(__dirname, '/public')));