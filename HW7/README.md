CS 4241 Project 7
https://cgporell-cs4241-project7.herokuapp.com

USE OF TEMPLATES:
I make use of 3 different types of templates on this site.
1) The table rows in the Quick Links section are filled in using a brief template that generates a <tr> using a movie title, rating, and year from the movie list. It also generates a link on this element that can be clicked to go to that specific review.

2) A collapsed version of a review, using a movie's title, year and rating. In this part, an eventListener is added to the div surrounding the review so that clicking on the div will expand the review, which brings us to...

3) An expanded version of the review, featuring all the details of a review, grabbed from the server. This inherits the aforementioned eventListener, so that clicking this div will collapse the review.

DESIGN CHOICES:
I still keep the standard layout of my web pages, using the tan-and-green aesthetic with the content clustered towards the center horizontally. This keeps the content grouped together and easy to see.