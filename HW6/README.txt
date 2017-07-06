CS 4241
Assignment 6
Connor Porell
-------------------------------

Technical Achievements:

The main feature of the site is a scavenger hunt-style game. In order to display the new banner for my site, you need to find the 8 clues scattered throughout the page. Each clue is a word highlighted in boldface - not too hard to find :). Each clue is tied to a "mousedown" event that interally sets that clue as found, and displays its puzzle piece at the top of the page. When all 8 pieces are found, the individual pieces are removed and the assembled banner is displayed at the top.

The other feature is the changing color in the background. By moving the mouse, the color slowly cycles through lighter and darker variants of the base background color. In order to keep the color from changing too quickly, there is a delay between color shifting. For every mouse movement detected, a counter is incremented, and only when that counter has reached a certain value will the color change. Mouse movement also keeps the color inside of tables consistent. This ties into bubbling, as I use stopPropogation to prevent the background from changing color at all while the mouse moves within tables.

I have a small third event that is a bit of an easter egg - click the scary little guy in the bottom right corner to see. It's a simple mousedown event that calls an audio file to play and sends an alert. This also gives an example of bubbling, as clicking anywhere in the body will display an alert. This alert will play after other alerts, such as the one from clicking on a puzzle piece.
========================================================================================
Design Choices:

I chose to keep the layout of my site similar to that of my previous assignments because of its simplicity. Although I am representing more complex data here (full titles, developers, and years instead of a title and a poster), the centered table I felt was very effective at displaying the data in an easy-to-read manner. The tables are broken up by both a line break and a distinctive caption, so mixing two tables up or confusing their contents should not be an issue.