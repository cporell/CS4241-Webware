// CS 4241 Project 6
// Connor Porell cgporell@wpi.edu

//displayTables();

function displayTables()
{
    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", requestListen);
    oReq.open("GET", "/");
    oReq.send();
    return false;
}

function requestListen()
{
    document.getElementById("movielist").innerHTML = this.responseText;
    addPuzzleClueListeners();
}

// This stuff handles the puzzle part of the page

var numOfClues = 8;
var piecesLeft = 8;
var cluesFound = [0,0,0,0,0,0,0,0];

function addPuzzleClueListeners() {
    for (var i = 1; i <= numOfClues; i++) {
        var clueB = document.getElementById("clue" + i);
        clueB.addEventListener("mousedown", addClue);
    }
}

addPuzzleClueListeners();
addBodyListeners();
addEasterEggListeners();

var piece = new Audio("audio/piece.mp3");

function addClue(evt) {
    var clueId = evt.target.id;
    clueId = clueId.substring(4, clueId.length + 1);

    switch(clueId)
    {
        case "1":
            if (cluesFound[0] != 1)
            {
                document.getElementById('piece1').src = "/pics/piece1.png";
                cluesFound[0] = 1;
                piecesLeft--;
                break;
            }
            else { return; }

        case "2":
            if (cluesFound[1] != 1) {
                document.getElementById('piece2').src = "/pics/piece2.png";
                cluesFound[1] = 1;
                piecesLeft--;
                break;
            }
            else { return; }
        case "3":
            if (cluesFound[2] != 1) {
                document.getElementById('piece3').src = "/pics/piece3.png";
                cluesFound[2] = 1;
                piecesLeft--;
                break;
            }
            else { return; }
        case "4":
            if (cluesFound[3] != 1)
            {
                document.getElementById('piece4').src = "/pics/piece4.png";
                cluesFound[3] = 1;
                piecesLeft--;
                break;
            }
            else { return; }
        case "5":
            if (cluesFound[4] != 1)
            {
                document.getElementById('piece5').src = "/pics/piece5.png";
                cluesFound[4] = 1;
                piecesLeft--;
                break;
            }
            else { return; }
        case "6":
            if (cluesFound[5] != 1)
            {
                document.getElementById('piece6').src = "/pics/piece6.png";
                cluesFound[5] = 1;
                piecesLeft--;
                break;
            }
            else { return; }
        case "7":
            if (cluesFound[6] != 1)
            {
                document.getElementById('piece7').src = "/pics/piece7.png";
                cluesFound[6] = 1;
                piecesLeft--;
                break;
            }
            else { return; }
        case "8":
            if (cluesFound[7] != 1)
            {
                document.getElementById('piece8').src = "/pics/piece8.png";
                cluesFound[7] = 1;
                piecesLeft--;
                break;
            }
            else { return; }
    }
    piece.play();
    alert("You found clue " + clueId + "!\nOnly " + piecesLeft + " more to go!");
    checkClues();
}

var secret = new Audio('audio/secret.mp3');

function checkClues()
{
    for(i in cluesFound)
    {
        if(cluesFound[i] === 0)
        {
            return;
        }
    }
    document.getElementById('piece1').src = "";
    document.getElementById('piece2').src = "";
    document.getElementById('piece3').src = "";
    document.getElementById('piece4').src = "";
    document.getElementById('piece5').src = "";
    document.getElementById('piece6').src = "";
    document.getElementById('piece7').src = "";
    document.getElementById('piece8').src = "";

    document.getElementById('banner').src= "pics/banner.jpg";
    secret.play();
    alert("All clues found! Check out the new banner!");
}

function addBodyListeners()
{
    var boddy = document.getElementById("thebody");
    boddy.addEventListener("mousemove", changeBodyColor);

    var table = document.getElementById("pc");
    table.addEventListener("mousemove", function (evt) {
        evt.stopPropagation();
    });
    table = document.getElementById("gba");
    table.addEventListener("mousemove", function (evt) {
        evt.stopPropagation();
    });
    table = document.getElementById("ds");
    table.addEventListener("mousemove", function (evt) {
        evt.stopPropagation();
    });
    table = document.getElementById("3ds");
    table.addEventListener("mousemove", function (evt) {
        evt.stopPropagation();
    });
    table = document.getElementById("ps2");
    table.addEventListener("mousemove", function (evt) {
        evt.stopPropagation();
    });
    table = document.getElementById("ps3");
    table.addEventListener("mousemove", function (evt) {
        evt.stopPropagation();
    });
    table = document.getElementById("360");
    table.addEventListener("mousemove", function (evt) {
        evt.stopPropagation();
    });
    table = document.getElementById("other");
    table.addEventListener("mousemove", function (evt) {
        evt.stopPropagation();
    });
}

var horribleNight = "WHAT A HORRIBLE NIGHT TO HAVE A CURSE";
var curse = new Audio('audio/The Pact.mp3');

function addEasterEggListeners()
{
    document.getElementById('eve').addEventListener("mousedown", function (evt) {
        curse.play();
        alert(horribleNight);
    });

    document.body.addEventListener("mousedown", function (evt) {
        alert("Hey there!");
    })
}


var bgColors = [{ r: 236, g: 230, b: 214 },
                { r: 232, g: 223, b: 204 },
                { r: 230, g: 220, b: 198 },
                { r: 226, g: 216, b: 190 },
                { r: 224, g: 213, b: 186 },
                { r: 222, g: 210, b: 182 },
                { r: 220, g: 207, b: 177 },
                { r: 218, g: 204, b: 173 },                
                { r: 216, g: 202, b: 168 }, // Start
                { r: 215, g: 200, b: 166 },
                { r: 213, g: 198, b: 162 },
                { r: 209, g: 192, b: 154 },
                { r: 208, g: 191, b: 151 },
                { r: 206, g: 188, b: 147 },
                { r: 202, g: 183, b: 138 },
                { r: 200, g: 180, b: 132 },
                { r: 197, g: 175, b: 124 },
                { r: 200, g: 180, b: 132 },
                { r: 202, g: 183, b: 138 },
                { r: 206, g: 188, b: 147 },
                { r: 208, g: 191, b: 151 },
                { r: 209, g: 192, b: 154 },
                { r: 213, g: 198, b: 162 }, 
                { r: 215, g: 200, b: 166 },
                { r: 216, g: 202, b: 168 }, // Start
                { r: 218, g: 204, b: 173 },
                { r: 220, g: 207, b: 177 },
                { r: 222, g: 210, b: 182 },
                { r: 224, g: 213, b: 186 },
                { r: 226, g: 216, b: 190 },
                { r: 230, g: 220, b: 198 },
                { r: 232, g: 223, b: 204 },
                { r: 236, g: 230, b: 214 }];

var bgCounter = 0;
var mouseMoveCtr = 1;

function changeBodyColor(evt)
{
    var w = window.innerWidth;
    var h = window.innerHeight;
    //document.getElementById('thebody').style['background-color'] = 'rgb(' + Math.floor(evt.pageX * 256/w) + ',' + Math.floor(evt.pageY * 256/h) + ',50)';

    mouseMoveCtr++;
    if (mouseMoveCtr % 8 === 0)
    {
        document.getElementById('thebody').style['background-color'] = 'rgb(' + bgColors[bgCounter].r + ',' + bgColors[bgCounter].g + ',' + bgColors[bgCounter].b + ')';
        bgCounter++;
        if (bgCounter >= bgColors.length) { bgCounter = 0; }
        mouseMoveCtr = 1;
    }
    
    document.getElementById('pc').style['background-color'] = 'rgb(216,202,168)';
    document.getElementById('gba').style['background-color'] = 'rgb(216,202,168)';
    document.getElementById('ds').style['background-color'] = 'rgb(216,202,168)';
    document.getElementById('3ds').style['background-color'] = 'rgb(216,202,168)';
    document.getElementById('ps2').style['background-color'] = 'rgb(216,202,168)';
    document.getElementById('ps3').style['background-color'] = 'rgb(216,202,168)';
    document.getElementById('360').style['background-color'] = 'rgb(216,202,168)';
    document.getElementById('other').style['background-color'] = 'rgb(216,202,168)';
}