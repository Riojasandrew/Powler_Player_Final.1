Powler Player — Project Development Timeline
January 26 – January 31, 2026

During this week I looked at other music platforms like YouTube Music and Spotify to understand how their players work and what features they have. After researching, I started building the basic HTML structure for Powler Player. This included creating the main layout of the website, adding navigation links, and organizing the project folders. I also created an audio folder where the music files for the player would be stored.
--------------------------------------------------------------------------------------------------------------
February 1 – February 7, 2026
During this stage I focused on getting the audio player working with JavaScript. I added the basic music controls such as:
Play and pause buttons
Next and previous song navigation
Shuffle functionality so songs can play randomly
These features allowed the player to actually play songs and gave the website its first interactive functionality.
--------------------------------------------------------------------------------------------------------------
February 8 – February 12, 2026
Next I expanded the music controls and added more features to the player. This included:
A loop function so songs can repeat
A volume slider so users can adjust sound levels
A mute button to quickly turn the audio on or off
I also improved the code that keeps track of things like the current song, loop state, and mute state so the player behaves more consistently.

--------------------------------------------------------------------------------------------------------------
February 13 – February 15, 2026
During this phase I expanded the music library from 3 songs to 11 songs. I also continued refining the layout of the player and started planning how the AI mood recommendation system would work. This involved thinking about how songs would be tagged with moods and how the program could choose songs based on what the user types.
--------------------------------------------------------------------------------------------------------------
February 17 – February 20, 2026
I added a dynamic recommendation system to the player. Three recommendation buttons were created that display suggested songs. These buttons update depending on which songs are selected by the program. This setup was designed so it could later work with the AI mood system.
--------------------------------------------------------------------------------------------------------------
Powler Player — Development Update Log
February 22, 2026
Continued improving the overall project structure. I organized the HTML layout better and made adjustments to the main JavaScript file so the code would be easier to manage and expand later.

February 25, 2026
Worked on improving the website layout and navigation. Additional pages were connected to the navigation bar including Home, About, Features, and Contact to make the website feel more complete.

February 26 – February 27, 2026
•	Expanded the JavaScript music player system. More controls were added including:
•	Play and pause
•	Shuffle
•	Loop
•	Next and previous track
•	Volume adjustment
•	Mute toggle
At this stage the audio files were fully connected to the HTML audio element so songs could play directly from the website.

February 28, 2026
Spent time improving the documentation and planning of the project. I worked on describing the target audience and writing some project notes for the README. I also added helper functions and debugging checks to make sure the JavaScript code runs more smoothly.

March 1, 2026
This was a big update for the project. Additional major features were added including:
Displaying the current time and total duration of the song
Implementing an AI-style mood detection system
Creating a recommendation algorithm that picks songs based on mood keywords and song energy levels
Converting the song list into a structured song database with mood tags
Adding three new songs to the music library
Adding comments throughout the JavaScript file so the code is easier to understand
March 6th, 2026
Today several small improvements were made to the Powler Player project.
Improved the song search system so the search bar can better match songs from the music list.
Updated how song titles are displayed so the .mp3 file extension no longer appears to the user.
3/11/26 – 3/15/2026
Looked into AI recommendation system for Powler Player and felt the system technically worked but felt too random. Even though the AI was matching moods using certain keys and energy levels... It didn’t feel very personal. Because of that I am improving the AI response system making it more natural instead of only showing mood was detected. In addition, I am implementing visual feature for  Powler Player art designs.
•	Created a new musicImages folder to store display art for songs.
•	Connected images to correct songs (one image looking into)
•	Expanded the songs database in JavaScript to include an image property for each track.
•	Updated the loadThenPlay() function so the displayed image changes whenever a new song plays.
Overall these updates focuses on improving user experience between UI and AI
.
