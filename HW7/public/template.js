// CS 4241 Project 7
// Templates source

var reviewFull = _.template(
    "<div class='review'>" +
    "<div class='inner'>" +
    "<table class='rev'>" +
    "<tr>" +
    "<td class='l'>" +
    "<h2><%= title %> (<%= year %>) <%= rating %></h2>" +
    "<p><span>Starring: </span><%= actors %></p>" +
    "<p><span>Directed by: </span><%= director %></p>" +
    "<p><%= review %></p></div>" +
    "</td>" +
    "<td class='r'>" +
    "<img class='poster' src=<%= poster %> />" +
    "</td>" +
    "</tr></table>" +
    "</div></div></div>"
    );

var reviewCollapsed = _.template(
    "<div class='review'>" +
    "<div class='inner'>" +
    "<h2><%= title %> (<%= year %>) <%= rating %></h2>" +
    "<p class='header-note'>Click to expand...</p>" +
    "</div></div></div>"
    );

var reviewTableRow = _.template(
    "<tr><td><a href='#<%= id %>' ><%= title %> (<%= year %>)</a></td>" +
    "<td><%= rating %></td></tr>"
    );