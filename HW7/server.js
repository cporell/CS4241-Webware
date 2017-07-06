// Author: Connor Porell
// CS 4241 Project 7

var express = require('express');
var http = require('http');
var path = require('path');
var fs = require('fs');
var url = require('url');
var csv = require('csv');
var underscore = require('underscore');

var TwoStar = "&#9733&#9733";
var ThreeStar = "&#9733&#9733&#9733";
var FourStar = "&#9733&#9733&#9733&#9733";
var FiveStar = "&#9733&#9733&#9733&#9733&#9733";

var reviews = [
    {
        id: "jurassicworld",
        title: "Jurassic World",
        year: 2015,
        actors: "Chris Pratt, Bryce Dallas Howard, Irrfan Khan, Vincent D'Onofrio, Ty Simpkins, Nick Robinson",
        director: "Colin Trevorrow",
        rating: FourStar,
        review: "The long-awaited continuation of the Jurassic Park franchise provides non-stop action and does not disappoint, provided you don't mind turning your brain off a little bit. Centering around a genetically-modified dinosaur that breaks free, Jurassic World boasts awesome dinosaur action and stunning visual effects. The new dinosaur, Indominus Rex, is genuinely terrifying to see for the first time. Despite a few hiccups in the writing quality, Jurassic World is a high-energy adventure of nonstop prehistoric action.",
        poster: "pics/jurassicworld.jpg",
        expanded: 0
    },
    {
        id: "scottpilgrim",
        title: "Scott Pilgrim vs. the World",
        year: 2010,
        actors: "Michael Cera, Mary Elizabeth Winstead, Jason Schwartzman, Brie Larson, Alison Pill, Ellen Wong, Chris Evans",
        director: "Edgar Wright",
        rating: FiveStar,
        review: "Possibly one of the greatest examples of adapting the style of graphic novels into film, Scott Pilgrim is surely not a movie to be missed for fans of video games and graphic novels. The tale of a young Canadian man's quest to win the heart of his (quite literally) dream girl is perfectly cast, expertly directed, and wonderfully recreates the style of a graphic novel-video game hybrid on-screen. Despite its niche appeal, this is definitely worth checking out.",
        poster: "pics/scottpilgrim.jpg",
        expanded: 0
    },
    {
        id: "spiritedaway",
        title: "Spirited Away",
        year: 2002,
        actors: "Daveigh Chase, Suzanne Pleshette, Jason Marsden, Susan Egan, John Ratzenberger, Tara Strong",
        director: "Hayao Miyazaki",
        rating: FiveStar,
        review: "Miyazaki has created yet another masterpiece with this timeless coming-of-age tale. Spirited Away draws its viewers into a world made up of the creators' imagination combined with influences from Japanese mythology to create a visually stunning work of art. The story tells the tale of a young girl who is separated from her parents and must survive in this world in order to se them again. Her trials make up a classic coming-of-age story that still is regarded as one of Miyazaki's greatest films.",
        poster: "pics/spiritedaway.jpg",
        expanded: 0
    },
    {
        id: "suckerpunch",
        title: "Sucker Punch",
        year: 2011,
        actors: "Emily Browning, Abbie Cornish, Jena Malone, Vanessa Hudgens, Jamie Chung, Carla Gugino, Jon Hamm, Oscar Isaac",
        director: "Zak Snyder",
        rating: "&#9733",
        review: "Sucker Punch tries to be something smarter than it is, and falls flat on its face. Though marketed as an action film, the action sequences are disjointed segments that take place purely in the imagination of the main character... while she's in a world that is also of her imagination, yet is seemingly indistinguishable from the real world. Sucker Punch tries to be both smart and supportive of strong female characters, but ends up doing little more than confusing and disturbing the audience while fetishizing the main cast. While a movie made up solely of the action sequences could be promising, that is unfortunately not what Sucker Punch will deliver.",
        poster: "pics/suckerpunch.jpg",
        expanded: 0
    },
    {
        id: "avengers2",
        title: "Avengers: Age of Ultron",
        year: 2015,
        actors: "Robert Downey Jr., Chris Evans, Chris Hemsworth, Mark Ruffalo, Scarlett Johansson, Jeremy Renner, Don Cheadle, Samuel L. Jackson, Stan Lee",
        director: "Joss Whedon",
        rating: FourStar,
        review: "While the first Avengers wasn't the smartest movie ever made, it did something that no other movie had done before: successfully created an ensemble film of superheroes that all played off each other perfectly. Avengers 2 does just that, but doesn't add much new into the formula. We do get some characterization out of those Avengers who got less screen time, which is always a plus. Some minor plot points require seeing previous movies in the Marvel Cinematic Universe, which can lead to some confusion for those who aren't fully caught up. All in all, if you're looking for more of the first Avengers, that's exactly what you'll get out of Age of Ultron.",
        poster: "pics/avengers2.jpg",
        expanded: 0
    },
    {
        id: "legomovie",
        title: "The LEGO Movie",
        year: 2014,
        actors: "Chris Pratt, Elizabeth Banks, Will Arnett, Alison Brie, Will Ferrell, Liam Neeson, Morgan Freeman",
        director: "Phil Lord & Christopher Miller",
        rating: FiveStar,
        review: "The LEGO Movie is a charming rendition of a hero's journey - though this time the story is told with plastic bricks. Chris Pratt plays Emmet, a nobody who is prophesized to be 'The Special', the one person who can stop Lord Business from freezing the whole LEGO world with superglue. The star feature of the movie, however, is the animation - everything is done in stop-motion, and virtually everything on-screen is made out of LEGO bricks. The LEGO Movie has plenty of wit and charm for both children and adults alike.",
        poster: "pics/legomovie.jpg",
        expanded: 0
    },
    {
        id: "empire",
        title: "Star Wars Episode V: The Empire Strikes Back",
        year: 1980,
        actors: "Mark Hamill, Harrison Ford, Carrie Fisher, Billy Dee Willians, Anthony Daniels, David Prowse, Peter Mayhew, Kenny Baker, Frank Oz",
        director: "Irvin Kershner",
        rating: FiveStar,
        review: "Many hail this film as the greatest of the Star Wars franchise, and it's easy to see why. The darkest part of the original trilogy features the Rebellion facing their toughest hour, as Luke, Han, and Leia all go through major character arcs in a story that climaxes with the greatest cinematic reveal of all time. There isn't anyting I can say about Empire Strikes Back that hasn't been said already, so see it for yourself.",
        poster: "pics/empire.jpg",
        expanded: 0
    },
    {
        id: "furyroad",
        title: "Mad Max: Fury Road",
        year: 2015,
        actors: "Tom Hardy, Charlize Theron, Nicholas Hoult, Hugh Keays-Byrne",
        director: "George Miller",
        rating: ThreeStar,
        review: "Though most people I've talked to claim this is one of the best films of the year, I just don't see it. It's not a bad film by any means, but it just didn't grip me as much as others. The movie is essentially a 2-hour-long car chase, which, while entertaining, leaves a bit to be desired in terms of the world and the story. We do get bits of the world through dialogues with Immortan Joe's wives, but I feel like some details require prior knowledge of the Mad Max 'verse to fully understand. I recommend it really only to those who are fans of the series or who just want a movie with lots of action.",
        poster: "pics/furyroad.jpg",
        expanded: 0
    },
    {
        id: "fiddler",
        title: "Fiddler on the Roof",
        year: 1971,
        actors: "Topol, Norma Crane, Leonard Frey, Molly Picon, Rosalind Harris, Michele Marsh, Neva Small, Paul Michael Glaser",
        director: "Norman Jewison",
        rating: FiveStar,
        review: "One of the most successful Broadway shows of all time arrives on the big screen, and it is truly a wonderful story about tradition, religion, and politics. Fiddler on the Roof recounts the tale of Tevye (Topol), a poor Russian milkman who lives in a small village around the time of the fall of the Russian Czardom. He must face the fact that the traditions he has kept throughout his life may not hold in the changing world around him. A wonderful cast and beautifully choreographed music numbers make this tale one you will remember.",
        poster: "pics/fiddler.jpg",
        expanded: 0
    },
    {
        id: "room",
        title: "The Room",
        year: 2003,
        actors: "Tommy Wiseau, Juliette Danielle, Greg Sestero, Philip Haldiman, Carolyn Minnott, Robyn Paris, Dan Janjigian",
        director: "Tommy Wiseau",
        rating: "&#9733",
        review: "Let me start this review with a preface: The 1-star rating is solely on this film's quality as a well-put-together movie. The Room is one of the most entertaining movie's you'll ever see, and that's because everything it tries to do is just wrong. Though it was intended as a serious character study drama, because everything about the movie is wrong, you can't help but laugh at it. The acting is weak, the direction is poor, and the movie is essentially made up of less than half a dozen repeated scenes- Johnny loves Lisa, Lisa cheats on Johnny with Mark, Lisa tells her mother how she doesn't love Johnny, Denny acts like a creep, rinse, repeat. However, because everything about this movie is so wrong, it's oddly fascinating to watch. Tommy Wiseau essentially plays himself as Johnny, a Gary Stu self-insert who is successful and popular. You can't help but laugh at the stilted performances, the oddly-written dialogue, the crazy editing choices. I highly recommend The Room; it's a comedy that was never meant to be a comedy.",
        poster: "pics/room.jpg",
        expanded: 0
    }
];

var page = fs.readFileSync("./public/index.html").toString();

var app = express();
var port = process.env.PORT || 3000;

app.get('/', function (req, res) {
    res.send(page);
});

app.get('/reviews', function (req, res) {
    res.send(JSON.stringify(reviews));
});


app.listen(port, function () {
    console.log('App is listening on port ' + port);
});

app.use(express.static(path.join(__dirname, '/public')));