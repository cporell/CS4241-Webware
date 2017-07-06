// CS 4241 Project 7
// Connor Porell cgporell@wpi.edu

// =============================================================

var movies = [];

displayTables();

function displayTables()
{
    var oReq = new XMLHttpRequest();
    oReq.open("GET", "/reviews");
    oReq.addEventListener("load", drawReviewTable);
    oReq.send();
    return false;
}

function drawReviewTable()
{
    var resTxt = this.responseText;
    var revs = JSON.parse(resTxt);
    var table = document.getElementById("reviewTable");
    var str = "";
    revs.forEach(function (p, i) {
        str += reviewTableRow(p);
    });
    table.innerHTML = str;
    drawReviews(this);
}

function drawReviews(oReq)
{
    var resTxt = oReq.responseText;
    var revs = JSON.parse(resTxt);
    movies = revs;
    var revsColumn = document.getElementById("revs");
    var str = "";
    revs.forEach(function (p, i) {
        str += "<div class= 'moviesdiv' id='" + movies[i].id + "'>" + reviewCollapsed(p);
    });
    revsColumn.innerHTML = str;
    addDivListeners();
}

function addDivListeners()
{
    for(var i = 0; i < movies.length; i++)
    {
        var review = document.getElementById(movies[i].id);
        review.addEventListener("mousedown", showHideReview, true);
    }
}

function showHideReview(evt)
{
    var revId = this.id;

    movies.forEach(function (p, i) {
        console.log(p.id);
        if (p.id === revId)
        {
            var theMovie = document.getElementById(p.id);
            // if collapsed, expand to show full review
            if(p.expanded === 0)
            {
                
                theMovie.innerHTML = reviewFull(p);
                movies[i].expanded = 1;
            }
            // else hide the review
            else
            {
                theMovie.innerHTML = reviewCollapsed(p);
                movies[i].expanded = 0;
            }
        }
    });
}

function requestListen()
{
    document.getElementById("thebody").innerHTML = this.responseText;
}

// ===================================================================================

/*
var req = new XMLHttpRequest();

req.open('GET', '/posts');

req.onreadystatechange = function () {
    handleRes(req);
}

req.send();

function handleRes(req) {
    if (req.readyState !== XMLHttpRequest.DONE)
        return;

    if (req.status === 200)
        document.querySelector("body").innerHTML += req.responseText;
}
*/