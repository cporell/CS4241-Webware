// Author: Connor Porell
// CS 4241 Project 3

var express = require('express');
var http = require('http');
var path = require('path');
var fs = require('fs');
var url = require('url');
var csv = require('csv');
var yacsv = require('ya-csv');

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
            if (output[i][0].toUpperCase().indexOf(query.toUpperCase()) > -1)
            {
                movieList[i] = output[i][0]; // grab just the movie titles from the CSV
                tablerows += "<tr><td>" + movieList[i] + "</td><td>" + "<img class='poster' alt='" + movieList[i] + "' src='" + output[i][1] + "'/></td></tr>\n";
            }
        }
        for (j in addedMovies) {
            if (addedMovies[j][0].toUpperCase().indexOf(query.toUpperCase()) > -1) {
                tablerows += "<tr><td>" + addedMovies[j][0] + "</td><td>" + "<img class='poster' alt='" + addedMovies[j][0] + "' src='" + addedMovies[j][1] + "'/></td></tr>\n";
            }
        }
        var page = fs.readFileSync("./public/index.html").toString();
        page = page.replace("hello", tablerows);
        res.send(page);
    });
}

var app = express();
var port = process.env.PORT || 3000;

app.get('/', function(req, res) {
    //res.sendFile(path.join(__dirname, '/public/index.html'));
    var query = req.query;
    var searchQuery = query.search;

    var addMovieQuery = query.add;
    var addPosterQuery = query.addposter;

    if (!searchQuery) {
        searchQuery = "";
    }

    if (addMovieQuery)
    {
        // add the movie to the CSV
        addMovieToDatabase(res, addMovieQuery, addPosterQuery);
        return;
    }

    onInitializePage(res, searchQuery);
});

function addMovieToDatabase(res, addMovieQuery, addPosterQuery)
{
    //var writer = yacsv.createCsvFileWriter('./public/movies.csv', { 'flags': 'a' });
    var entry = [];
    entry.push(addMovieQuery);
    entry.push(addPosterQuery);
    entry.push('\n');
    //writer.writeRecord(entry);
    addedMovies.push(entry);

    searchQuery = "";
    onInitializePage(res, searchQuery);
}

app.listen(port, function() {
  console.log('App is listening on port ' + port);
});

app.use(express.static(path.join(__dirname, '/public')));