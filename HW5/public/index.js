// CS 4241 Project 5
// Connor Porell cgporell@wpi.edu

searchForMovie("");

function addMovie(form)
{
    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", requestListen);
    oReq.open("POST", "/");
    var moviename = document.getElementById("movieadd").value;
    var movieposter = document.getElementById("posteradd").value;
    var queryString = "add=" + moviename + "&addposter=" + movieposter;
    document.getElementById("movieadd").value = "";
    document.getElementById("posteradd").value = "";
    oReq.send(queryString);
    alert(moviename + " was added!");
    return false;
}

function deleteMovie(form)
{
    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", requestListen);
    oReq.open("POST", "/");
    var moviename = document.getElementById("moviedelete").value;
    var queryString = "delete=" + moviename;
    document.getElementById("moviedelete").value = "";
    oReq.send(queryString);
    alert(moviename + " was deleted!");
    return false;
}

function getMovieQueryAndSearch()
{
    var query = document.getElementById("moviesearch").value;
    searchForMovie(query);
    return false;
}

function searchForMovie(query)
{
    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", requestListen);
    document.getElementById("moviesearch").value = query;
    oReq.open("GET", "/search?search=" + query);
    oReq.send();
    return false;
}

function requestListen()
{
    document.getElementById("movielist").innerHTML = this.responseText;
}