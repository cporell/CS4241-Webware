// JavaScript source code
// CS 4241 Project 3
// Connor Porell

var http = require('http');
var path = require('path');
var fs = require('fs');
var url = require('url');

/*var movies = [{ title: "Jaws", poster: "pics/jaws.png" },
              { title: "Jaws 2", poster: "pics/jaws2.png" },
              { title: "Jaws 3", poster: "pics/jaws3.png" },
              { title: "Space Jame", poster: "pics/spacejame.png" },
              { title: "Big Fish", poster: "pics/bigfish.png" },
              { title: "The Illusionist", poster: "pics/theillusionist.png" }];*/

var movies = [];
var posters = [];

var server = http.createServer(function (req, res)
{
    var body = "";
    req.on('data', function(chunk)
    {
        body += chunk;
    });

    req.on('end', function()
    {
        console.log(body);
    });

    var uri = url.parse(req.url).pathname;
    var filename = path.join(process.cwd(), uri);

    fs.exists(filename, function (exists)
    {
        if(!exists)
        {
            res.writeHead(404, { "Content-Type": "text/html" });
            res.end("404 Page not found!");
            return;
        }

        readDataLists("movies.txt", true);
        readDataLists("posters.txt", false);

        res.writeHead(200, { "Content-Type": "text/html" });

        var fileStream = fs.createReamStream(filename);

        fileStream.on('data', function (data)
        {
            res.write(data);
        });

        fileStream.on('end', function ()
        {
            res.end;
        });

    });

});

server.listen(8080);

function searchMovies(query)
{
    var splitQuery = query.split(" ");

    var moviesToDisplay = [];
    var postersToDisplay = [];

    var k = 0;

    for(i = 0; i < splitQuery.length; i++)
    {
        for(j = 0; j < movies.length; j++)
        {
            if(movies[j].indexOf(splitQuery[i] != -1))
            {
                moviesToDisplay[k] = movies[j];
                postersToDisplay[k] = posters[j];
                k++;
            }
        }
    }

    if(k == 0)
    {
        // No matches found
    }
    else
    {
        // Found at least one match!
    }
}

function readDataLists(file, isMovies)
{

    if(isMovies)
    {
        movies[0] = "Jaws";
    }
    else
    {
        posters[0] = "pics/jaws.png";
    }
}


function addToMovies()
{

}