// Author: Connor Porell
// CS 4241 Project 5

var express = require('express');
var http = require('http');
var path = require('path');
var fs = require('fs');
var url = require('url');
var csv = require('csv');
var yacsv = require('ya-csv');
var qs = require('querystring');

var tablerows = "";

// Movies that are added this session - NOT PERMANENT.
// This will be erased when the server restarts.
var addedMovies = new Array;

function onInitializePage(res, query)
{
    var movies = fs.readFileSync("./public/movies.csv").toString();
    var movieList = [];
    csv.parse(movies, function (err, output) {

        tablerows = "";

        // search for movies
        for (i in output) {
            if ((output[i][0].toUpperCase().indexOf(query.toUpperCase()) > -1))
            {
                movieList[i] = output[i][0]; // grab just the movie titles from the CSV
                tablerows += "<tr><td>" + movieList[i] + "</td><td>" + "<img class='poster' alt='" + movieList[i] + "' src='" + output[i][1] + "'/></td></tr>\n";
            }
        }
        res.send(tablerows);

    });
}

var app = express();
var port = process.env.PORT || 3000;

app.get('/search', function (req, res) {
    var query = req.query;
    console.log(query);
    var searchQuery = query.search;
    console.log(searchQuery);

    if (!searchQuery) {
        searchQuery = "";
    }

    onInitializePage(res, searchQuery);
});

app.post('/', function (req, res) {
    var query = req.query;
    var searchQuery = query.search;
    if (!searchQuery) {
        searchQuery = "";
    }

    var body = "";

    req.on('data', function (data) {
        body += data;
        // Too much POST data, kill the connection!
        // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
        if (body.length > 1e6)
            req.connection.destroy();
    });

    req.on('end', function () {
        var post = qs.parse(body);
        
        var addMovieQuery = post.add;
        var addPosterQuery = post.addposter;

        if (post.delete)
        {
            removeMovieFromDatabase(res, post.delete);
        }
        else
        {
            addMovieToDatabase(res, addMovieQuery, addPosterQuery);
        }
    });
});

function removeMovieFromDatabase(res, deleteMovieQuery)
{
    // only actually delete if we get a movie query
    if(deleteMovieQuery)
    {
        var movies = fs.readFileSync("./public/movies.csv").toString();

        csv.parse(movies, function (err, output) {
            var moviesNew = "";

            // search for movies
            for (i in output) {
                console.log(output[i][0]);
                if (output[i][0].toUpperCase() === deleteMovieQuery.toUpperCase()) {}
                else
                {
                    moviesNew += (output[i].join(',') + '\r\n');
                }
            }

            var writer = fs.writeFileSync('./public/movies.csv', moviesNew);
            var searchQuery = "";
            onInitializePage(res, searchQuery);
        });
        
    }

}

function addMovieToDatabase(res, addMovieQuery, addPosterQuery)
{
    // only actually add a movie if we get a movie query
    if (addMovieQuery)
    {
        //var writer = yacsv.createCsvFileWriter('./public/movies.csv', { 'flags': 'a' });
        var movies = fs.readFileSync('./public/movies.csv').toString();
        var entry = [];
        entry.push(addMovieQuery);
        entry.push(addPosterQuery);
        movies += entry;
        movies += ",";
        movies += '\r\n';
        var writer = fs.writeFileSync('./public/movies.csv', movies);
    }
    var searchQuery = "";
    onInitializePage(res, searchQuery);
}

app.listen(port, function() {
  console.log('App is listening on port ' + port);
});

app.use(express.static(path.join(__dirname, '/public')));