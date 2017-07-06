// CS 4241 Project 7
// Connor Porell cgporell@wpi.edu

// =============================================================

var movies = [];
var cookieKEY = "chatID";

displayTables();

function displayTables()
{
    // set the cookie
    if (!hasCookie() || hasCookie().length == 0)
    {
        // generate + set cookie using 16-character alphanumeric string
        document.cookie = cookieKEY + "=" + generateID() + "; expires=Thu, 30 Aug 2552 12:00:00 UTC; path=/";
    }
    
    // now AJAX
    var oReq = new XMLHttpRequest();
    oReq.open("GET", "/posts");
    oReq.addEventListener("load", drawTable);
    oReq.send();
    return false;
}

function hasCookie() {
    var name = cookieKEY + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

function generateID()
{
    var randomID = Math.random().toString(36);
    randomID = randomID.substring(2, randomID.length);
    return randomID;
}

function addPost()
{
    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", requestListen);
    oReq.open("POST", "/");
    var postBody = document.getElementById("postbody").value;
    //var queryString = "postbody=" + postBody;

    var days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    var d = new Date();
    var day = days[d.getDay()];
    var hour = d.getHours();
    var min = d.getMinutes();
    if (min < 10) { min = "0" + min; }
    var ampm = hour < 12 ? "am" : "pm";
    var date = d.getDate();
    var month = months[d.getMonth()];
    var year = d.getFullYear();
    var dateStr = day + " " + hour + ":" + min + ampm + " on " + date + " " + month + " " + year;

    var postObject = { time: dateStr, posterID: hasCookie(), body: postBody };
    console.log(postObject);
    document.getElementById("postbody").value = "";

    oReq.send(JSON.stringify(postObject));
    return false;
}

function drawTable()
{
    //drawPosts(this);
}

function drawPosts(oReq)
{
    var resTxt = oReq.responseText;
    var revs = JSON.parse(resTxt);
    posts = revs;
    var postsCol = document.getElementById("posts");
    var str = "";
    revs.forEach(function (p, i) {
        str += post(p);
    });
    postsCol.innerHTML = str;
}

function requestListen()
{
    document.getElementById("posts").innerHTML = this.responseText;
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