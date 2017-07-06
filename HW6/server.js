// Author: Connor Porell
// CS 4241 Project 4

var express = require('express');
var http = require('http');
var path = require('path');
var fs = require('fs');
var url = require('url');
var csv = require('csv');
var yacsv = require('ya-csv');
var qs = require('querystring');

var page = fs.readFileSync("./public/index.html").toString();
var tablerows = "";


function getPCGames()
{
    var games = fs.readFileSync("./public/text/pc.csv").toString();
    csv.parse(games, function (err, output)
    {
        tablerows = "";

        for(i in output)
        {
            tablerows += "<tr><td>" + output[i][0] + "</td><td>" + output[i][1] + "</td><td>" + output[i][2] + "</td></tr>\n";
        }
        page = page.replace("pcgames", tablerows);
    });
}

function getGBAGames() {
    var games = fs.readFileSync("./public/text/gba.csv").toString();
    csv.parse(games, function (err, output) {
        tablerows = "";
        for (i in output) {
            tablerows += "<tr><td>" + output[i][0] + "</td><td>" + output[i][1] + "</td><td>" + output[i][2] + "</td></tr>\n";
        }
        page = page.replace("gbagames", tablerows);
    });

}

function getDSGames() {
    var games = fs.readFileSync("./public/text/ds.csv").toString();
    csv.parse(games, function (err, output) {
        tablerows = "";
        for (i in output) {
            tablerows += "<tr><td>" + output[i][0] + "</td><td>" + output[i][1] + "</td><td>" + output[i][2] + "</td></tr>\n";
        }
        page = page.replace("dsgames", tablerows);
    });
}

function get3DSGames() {
    var games = fs.readFileSync("./public/text/3ds.csv").toString();
    csv.parse(games, function (err, output) {
        tablerows = "";
        for (i in output) {
            tablerows += "<tr><td>" + output[i][0] + "</td><td>" + output[i][1] + "</td><td>" + output[i][2] + "</td></tr>\n";
        }
        page = page.replace("3dsgames", tablerows);
    });
}

function getPS2Games() {
    var games = fs.readFileSync("./public/text/ps2.csv").toString();
    csv.parse(games, function (err, output) {
        tablerows = "";
        for (i in output) {
            tablerows += "<tr><td>" + output[i][0] + "</td><td>" + output[i][1] + "</td><td>" + output[i][2] + "</td></tr>\n";
        }
        page = page.replace("3dsgames", tablerows);
    });
}

function getPS3Games() {
    var games = fs.readFileSync("./public/text/ps3.csv").toString();
    csv.parse(games, function (err, output) {
        tablerows = "";
        for (i in output) {
            tablerows += "<tr><td>" + output[i][0] + "</td><td>" + output[i][1] + "</td><td>" + output[i][2] + "</td></tr>\n";
        }
        page = page.replace("ps3", tablerows);
    });
}

function getX360Games() {
    var games = fs.readFileSync("./public/text/360.csv").toString();
    csv.parse(games, function (err, output) {
        tablerows = "";
        for (i in output) {
            tablerows += "<tr><td>" + output[i][0] + "</td><td>" + output[i][1] + "</td><td>" + output[i][2] + "</td></tr>\n";
        }
        page = page.replace("ps3", tablerows);
    });
}

function getOtherGames() {
    var games = fs.readFileSync("./public/text/other.csv").toString();
    csv.parse(games, function (err, output) {
        tablerows = "";
        for (i in output) {
            tablerows += "<tr><td>" + output[i][0] + "</td><td>" + output[i][1] + "</td><td>" + output[i][2] + "</td></tr>\n";
        }
        page = page.replace("othergames", tablerows);
    });
}

function initPage()
{
    
    var games = "";
    games = fs.readFileSync("./public/text/pc.csv").toString();
    csv.parse(games, function (err, output) {
        tablerows = "";

        for (i in output) {
            tablerows += "<tr><td>" + output[i][0] + "</td><td>" + output[i][1] + "</td><td>" + output[i][2] + "</td></tr>\n";
        }
        page = page.replace("pcgames", tablerows);
    });

    games = fs.readFileSync("./public/text/gba.csv").toString();
    csv.parse(games, function (err, output) {
        tablerows = "";
        for (i in output) {
            tablerows += "<tr><td>" + output[i][0] + "</td><td>" + output[i][1] + "</td><td>" + output[i][2] + "</td></tr>\n";
        }
        page = page.replace("gbagames", tablerows);
    });

    games = fs.readFileSync("./public/text/ds.csv").toString();
    csv.parse(games, function (err, output) {
        tablerows = "";
        for (i in output) {
            tablerows += "<tr><td>" + output[i][0] + "</td><td>" + output[i][1] + "</td><td>" + output[i][2] + "</td></tr>\n";
        }
        page = page.replace("dsgames", tablerows);
    });

    games = fs.readFileSync("./public/text/3ds.csv").toString();
    csv.parse(games, function (err, output) {
        tablerows = "";
        for (i in output) {
            tablerows += "<tr><td>" + output[i][0] + "</td><td>" + output[i][1] + "</td><td>" + output[i][2] + "</td></tr>\n";
        }
        page = page.replace("3dsgames", tablerows);
    });

    games = fs.readFileSync("./public/text/ps2.csv").toString();
    csv.parse(games, function (err, output) {
        tablerows = "";
        for (i in output) {
            tablerows += "<tr><td>" + output[i][0] + "</td><td>" + output[i][1] + "</td><td>" + output[i][2] + "</td></tr>\n";
        }
        page = page.replace("ps2games", tablerows);
    });

    games = fs.readFileSync("./public/text/ps3.csv").toString();
    csv.parse(games, function (err, output) {
        tablerows = "";
        for (i in output) {
            tablerows += "<tr><td>" + output[i][0] + "</td><td>" + output[i][1] + "</td><td>" + output[i][2] + "</td></tr>\n";
        }
        page = page.replace("ps3games", tablerows);
    });

    games = fs.readFileSync("./public/text/360.csv").toString();
    csv.parse(games, function (err, output) {
        tablerows = "";
        for (i in output) {
            tablerows += "<tr><td>" + output[i][0] + "</td><td>" + output[i][1] + "</td><td>" + output[i][2] + "</td></tr>\n";
        }
        page = page.replace("360games", tablerows);
    });

    games = fs.readFileSync("./public/text/other.csv").toString();
    csv.parse(games, function (err, output) {
        tablerows = "";
        for (i in output) {
            tablerows += "<tr><td>" + output[i][0] + "</td><td>" + output[i][1] + "</td><td>" + output[i][2] + "</td><td>" + output[i][3] + "</td></tr>\n";
        }
        page = page.replace("othergames", tablerows);
    });
    
    //res.send(page);
}

var app = express();
var port = process.env.PORT || 3000;

initPage();

app.get('/', function (req, res) {
    initPage();
    res.send(page);
});


app.listen(port, function() {
  console.log('App is listening on port ' + port);
});

app.use(express.static(path.join(__dirname, '/public')));