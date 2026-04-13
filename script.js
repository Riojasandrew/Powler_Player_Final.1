// Here we will write the buttons and functions for the index website.
// We will also write the code for the music player and the AI
// not seen to the player but, running in hte background
// https://www.w3schools.com/js/default.asp
console.log("Powler Player is running..");

// grab key elements for index.html
// Ones below are for the music player
const audioPlayer = document.getElementById("audio_player");
const songDisplay = document.getElementById("song_display");
const nowPlaying = document.getElementById("now_playing");
const moodStatus = document.getElementById("mood_status");

// Controls for music player 
const playBtn = document.getElementById("play_btn");
const pauseBtn = document.getElementById("pause_btn");
const loopBtn = document.getElementById("loop_btn");
const shuffleBtn = document.getElementById("shuffle_btn");
// Next and previous buttons for song navigation
const nextBtn = document.getElementById("next_btn");
const prevBtn = document.getElementById("prev_btn");
// mute and volume controls for music player
const muteBtn = document.getElementById("mute_btn");
const volumeAdjustment = document.getElementById("volume_adjustment");
// current time & duration time ID elements
const seekBar = document.getElementById("seek_bar");
const currentTimeEl = document.getElementById("current_time");
const durationTimeEl = document.getElementById("duration_time");

/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// Songs Lists ///////////////////////////////////////////////////

// Recommended song buttons
const recButtons = [
    document.getElementById("rec-1"),
    document.getElementById("rec-2"),
    document.getElementById("rec-3")
];

// Here will be the song list for players
// replaced old versoin with new still pulling from file
// placing mood type for AI uses
// Update added images to music being displayed 
// replaced old version with new still pulling from file
const songs = [
  { file: "Error_ You.mp3", image: "robotic_women.png", moods: ["sad", "calm", "tired"], energy: 2 },
  { file: "Funk and Gone.mp3", image: "forget_peace.png", moods: ["happy", "chill", "fun"], energy: 3 },
  { file: "Final Fight.mp3", image: "FinalBattle.png", moods: ["hype", "focus", "angry"], energy: 5 },
  { file: "Beneath the Falling Sky.mp3", image: "falling_sky.png", moods: ["calm", "focus"], energy: 3 },
  { file: "Falling Out of Frame.mp3", image: "frame_pic.png", moods: ["sad", "focus"], energy: 2 },
  { file: "Fire.mp3", image: "heart_burn.png", moods: ["hype", "angry"], energy: 5 },
  { file: "Keep It Down.mp3", image: "keep_down.png", moods: ["focus", "calm"], energy: 3 },
  { file: "Let me forget.mp3", image: "bright_star.png", moods: ["sad", "tired"], energy: 2 },
  { file: "Light Me Up.mp3", image: "lighten_up.png", moods: ["happy", "hype"], energy: 4 },
  { file: "My Hidden Plan.mp3", image: "planned.png", moods: ["focus", "mystery", "calm"], energy: 3 },
  { file: "Star in the Dark.mp3", image: "bright_star.png", moods: ["calm", "sad", "chill"], energy: 2 },

  // 3 new songs added for user
  { file: "We might die, lock-in.mp3", image: "get_it.png", moods: ["focus", "hype"], energy: 4 },
  { file: "Devil In Sheep Clothing.mp3", image: "sheep_clothing.png", moods: ["angry", "hype", "focus"], energy: 5 },
  { file: "So easy.mp3", image: "too_easy.png", moods: ["happy", "chill", "calm"], energy: 3 }
];
///////////////////////////////////////////////////////////////////////////////

// This will help keep track for current song
let currentSongIndex = 0;
// recommended song 0, 1, 2
let recommendedSongIndex = [];

// Loads a song into the audio, resets UI, and then automatcally does playback
// Updated now display image with song once loaded
function loadThenPlay(filename){

    const song = songs.find(s => s.file === filename);

    audioPlayer.src = "audio/" + filename;
    audioPlayer.load();
    audioPlayer.play();

    // display tothe user what is playing
    // replaced code
    nowPlaying.textContent = "Now Playing: " + filename.replace(".mp3", "");

    // Change song image when new song plays
    if(songDisplay && song){
        songDisplay.src = "musicImages/" + song.image;

        // Update code to add pop animation
        songDisplay.classList.remove("pop-in");
        void songDisplay.offsetWidth;
        songDisplay.classList.add("pop-in");
    }

    // Reset UI while loading
    seekBar.value = 0;
    currentTimeEl.textContent = "0:00";
    durationTimeEl.textContent = "0:00";
}

// Here adding a function to pick 3 random songs for the recommendation 
function pick3RecommendedSongsIndex(){
    const picked = new Set();
    while (picked.size < 3 && picked.size < songs.length){
        picked.add(Math.floor(Math.random() * songs.length));
    }
    return Array.from(picked);
}

// Songs onto recommendation buttons & add click behavior
// updated change on how the recommended songs are picked
recommendedSongIndex = pick3RecommendedSongsIndex();

recButtons.forEach((btn, slotIndex) => {
    if (!btn) return;
    // Get the song index for this recommendation slot
    const songIndex = recommendedSongIndex[slotIndex];
    const filename = songs[songIndex];
    btn.textContent = filename.file.replace(".mp3", "");

    // When user clicks the recommendation button, it will load and play the song
    btn.addEventListener("click", () => {
        currentSongIndex = songIndex;
        loadThenPlay(songs[currentSongIndex].file);
    });
});

////////////////////////////// Button controls for music player //////////////////////////

// Play and pause button controls to let users control the music
playBtn.addEventListener("click", () => {
    audioPlayer.play();
});
pauseBtn.addEventListener("click", () => {
    audioPlayer.pause();
});

// Next and previous button controls for song navigation
nextBtn.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadThenPlay(songs[currentSongIndex].file);
});
// clicks the previous button going back to the previous song self explanatory
prevBtn.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadThenPlay(songs[currentSongIndex].file);
});

// Add the shuffle buttion so it can shuffle random songs for user
shuffleBtn.addEventListener("click", () => {
    // makes sure it doesn't shuffle to the same song it's currently on
    if (!songs.length) return;
    // Pick random song
    // math.random will give user a random number 
    // math.floor will make sure it rounds to the nearest whole number
    let newSongIndex = Math.floor(Math.random() * songs.length);
    // unsure that there it doesn't shuffle to the same song currently playing
    if (songs.length > 1) {
        while (newSongIndex === currentSongIndex){
            newSongIndex = Math.floor(Math.random() * songs.length);
        }
    }

    // now update current song and play it
    currentSongIndex = newSongIndex;
    loadThenPlay(songs[currentSongIndex].file);
});

// Create a loop button that will toggle on and off for user
// isLooping will boolean to be be sure if it's on or off
let isLooping = false;
// ONce the user clicks the loop button it will display if it's looping or not
loopBtn.addEventListener("click", () => {
    isLooping = !isLooping;
    audioPlayer.loop = isLooping;

    loopBtn.textContent = isLooping ? "Loop: ∞" : "Loop: off";
});

////////////////////////////////////////////////////////////////////////////////

//////////////////////////// Time/Progress //////////////////////////////////////////
// function converts a number of seconds
// it also checks if the value passed in a non valid number
function formTime(seconds){
    if (!Number.isFinite(seconds)) return "0:00";
    // m = mintues
    const m = Math.floor(seconds / 60);
    // s = seconds
    const s = Math.floor(seconds % 60);
    // returns time string
    return `${m}:${String(s).padStart(2, "0")}`;
}
// tracks if the user is actually dragging the seek bar
let isSeeking = false;

// The data will load for the user, duration because avaiable (seen)
audioPlayer.addEventListener("loadedmetadata",() =>{
    updateProgressUI();
});

// Ensure that the UI keeps updating
audioPlayer.addEventListener("timeupdate", () =>{
    updateProgressUI();
});

// Updated UI msuc progress
function updateProgressUI(){
    // Gets playback time of the song
    const current = audioPlayer.currentTime || 0;
    // get total duartion of the song 
    const duration = audioPlayer.duration || 0;

    // update text
    currentTimeEl.textContent = formTime(current);
    durationTimeEl.textContent = formTime(duration);

    // update seek bar only if not dragging it
    if (!isSeeking && duration > 0){
        seekBar.value = (current / duration) * 100;
    }
}

// works when user drags the bar
seekBar.addEventListener("mousedown", () =>{
    isSeeking = true;
});
// pause progress so it doesn't cause issue for the user
seekBar.addEventListener("touchstart", () => {
    isSeeking = true;
});

// user drags the bar (live)
// Won't change teh song position only updates the UI
seekBar.addEventListener("input", () => {
    // Get total song uration
    const duration = audioPlayer.duration || 0;
    // Only calculates preview IF duratoin time is appearing
    if (duration > 0){
        // Convert slider value
        // Convert precentage into actual seconds
        // Display preview time (mm:ss)
        const percent = Number (seekBar.value) / 100;
        const previewTime = percent * duration;
        currentTimeEl.textContent = formTime(previewTime);
    }
});

// Function is to moves the song to the correct time users wants it.
function finishSeek() {
    // Total duration of song
    const duration = audioPlayer.duration || 0;
    if (duration > 0) {
        // Convert slider value into decimal
        const percent = Number(seekBar.value) / 100;
        // Will set audio position to selected time
        audioPlayer.currentTime = percent * duration;
    }
    // progress updates to resume automatically 
    isSeeking = false;
}

seekBar.addEventListener("mouseup", finishSeek);
seekBar.addEventListener("touchend", finishSeek);
// Auto next once the song ends (only works when loop is off)
audioPlayer.addEventListener("ended", () => {
    // If loop is on,browser will loop it again
    if (audioPlayer.loop) return;

    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadThenPlay(songs[currentSongIndex].file);
});

/////////////////////////////////////////////////////////////////



/////////////////////// Audio controls for music player /////////////////////////////

// Mute button to toggle off or on
let Muted = false;

// Volume adjustment for music player

// default volume for user at 75%
audioPlayer.volume = 0.75

// Volume controls for user
volumeAdjustment.addEventListener("input", () => {
    // This sets the value from 0 to 100
    const volumeValue = Number(volumeAdjustment.value) / 100;
    audioPlayer.volume = volumeValue;

    // if volume is dragged pass 0 than it will unmute
    if (volumeValue > 0 && Muted)
        {
            Muted = false;
            audioPlayer.muted = false;
            muteBtn.textContent = "Mute";
        }
    // else if volume is dragged to 0 than it will mute
    else if (volumeValue === 0)
        {
            Muted = true;
            audioPlayer.muted = true;
            muteBtn.textContent = "Unmute";
        }
});

muteBtn.addEventListener("click", () => {
    // ! lets the button toggle between true and false for muting
    Muted = !Muted;
    audioPlayer.muted = Muted;

    // Update button text to reflect current state
    // ? is just a easier way to write the if statement
    muteBtn.textContent = Muted ? "Unmute" : "Mute";
});


///////////////// Search bar connect to music //////////////////////////
const searchInput = document.getElementById("search");
const searchResults = document.getElementById("search_results");

// helps find all matching songs
// Also, function included to delete recent history
searchInput.addEventListener("input", () => {
    const userText = searchInput.value.toLowerCase().trim();

   
    searchResults.innerHTML = "";

    // If search box is empty, stop here
    if (userText === "") {
        return;
    }

    // Find all matching songs 
    const matchedSongs = songs.filter(song =>
        song.file.toLowerCase().includes(userText)
    );

    // If no songs match print result of "No song found" for user
    if (matchedSongs.length === 0) {
        searchResults.textContent = "No song found.";
        return;
    }

    // Show each match as a button
    matchedSongs.forEach(song => {
        const resultButton = document.createElement("button");
        resultButton.textContent = song.file.replace(".mp3", "");

        resultButton.addEventListener("click", () => {
            loadThenPlay(song.file);
        });

        searchResults.appendChild(resultButton);
    });
});


//////////////////////////////////////////////////////////////

//////////////////////////// Theme picker controls for music player /////////////////////////////

const themeButtons = document.querySelectorAll("button[data-theme]");

function setTheme(themeName){
    document.body.classList.forEach((cls) => {
        if (cls.endsWith("_theme")) document.body.classList.remove(cls);
    });

    document.body.classList.add(themeName);

    moodStatus.textContent = "CURRENT THEME: " + (themeName);
}

themeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        setTheme(btn.dataset.theme);
    });
});

console.log("Theme buttons:", themeButtons.length);

////////////////////////////////////////////////////////////////////////////////////

//////////////////////// AI MOOD Inference & Recommendations ///////////////////////////
// AI behavior
const moodInput = document.getElementById("mood_input");
const moodBtn = document.getElementById("mood_btn");
const aoiMessage = document.getElementById("aoi_message");
// Pop up css box for AOI //
const chatBox = document.getElementById("aoi_chat_box")
const chatBubble = document.getElementById("chat_bubble_AOI");

// Turns user text into a mood matching keyword
function typeMood(text) {
  const t = (text || "").toLowerCase();

  const rules = [
    { mood: "hype",  keywords: ["hype", "energetic", "excited", "pump", "lit", "turn up"] },
    { mood: "focus", keywords: ["focus", "study", "homework", "lock in", "work", "grind"] },
    { mood: "calm",  keywords: ["calm", "relax", "peace", "chill", "slow", "quiet"] },
    { mood: "sad",   keywords: ["sad", "down", "lonely", "heartbroken", "miss", "cry"] },
    { mood: "angry", keywords: ["angry", "mad", "rage", "furious", "annoyed"] },
    { mood: "tired", keywords: ["tired", "sleepy", "exhausted", "drained", "burnt"] },
    { mood: "happy", keywords: ["happy", "good", "great", "smile", "joy", "fun"] }
  ];

  for (const rule of rules) {
    if (rule.keywords.some(k => t.includes(k))) return rule.mood;
  }
  // IF their isn't a keyword match -> defaults to calm
  return "calm";
}

// Generates 3 song recommendatoins 
// Mood tag for AI recommandatoin
function recommendSongs(targetMood) {
  const moodEnergy = {
    hype: 5, angry: 5, happy: 4, focus: 3, calm: 2, sad: 2, tired: 1
  };
  const preferredEnergy = moodEnergy[targetMood] ?? 3;

  const scored = songs.map((song, idx) => {
    let score = 0;
    if (song.moods.includes(targetMood)) score += 5;
    score += Math.max(0, 3 - Math.abs(song.energy - preferredEnergy));
    score += Math.random();
    return { idx, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, 3).map(s => s.idx);
}

// Update your 3 recommendation buttons with AI picks
function updateRecButtonsWithAI(indexes) {
  recButtons.forEach((btn, slot) => {
    if (!btn) return;

    const songIdx = indexes[slot];
    const song = songs[songIdx];
    // Code implied instead of seeing recommended song you(user) will now see song names
    btn.textContent = song ? song.file.replace(".mp3", "") : "Recommended Song";

    // Overwrite click action (no cloning needed)
    btn.onclick = () => {
      if (!song) return;
      currentSongIndex = songIdx;
      loadThenPlay(songs[currentSongIndex].file);
    };
  });
}

// Update messages are less random and more personal
// Given user a explanation why it picked the song for user
// Old response system placed with a more humaniod reply for user
const moodMessages = {
    hype: [
      "AOI: Ahhh! I guess it's time for us to get serious don't you think!",
      "AOI: Let's get it!!!",
      "AOI: Guess we're gonna take this seriously now!"
    ],
    focus: [
      "AOI: I think I can help you find a way to stay focused.",
      "AOI: Trying to keep your mind occupied I got you!",
      "AOI: HMMM let's get that wonderful mind focused!"
    ],
    calm: [
      "AOI: A cool headed mind is a great mind. Here you go!",
      "AOI: Let's find you a song that will guide your journey.",
      "AOI: Calm I think I got the songs for you.."
    ],
    sad: [
      "AOI: Aww sorry you a feeling down. Here's some songs.. Hope you feel better.",
      "AOI: Feeling down today I'm sorry. Here's some songs for you. Hope it gets better.",
      "AOI: Here's a some songs for you. Get better soon I'll be here for you!"
    ],
    angry: [
      "AOI: Please don't be angry at me. So, here's some songs for you.",
      "AOI: Alright let's get this party start!",
      "AOI: Yeah I understand your feeling so, let's show them!"
    ],
    tired: [
      "AOI: Hey.. um sounds like you've had  a long day. Let me slow things down for you. I've got something calm ready.",
      "AOI: Sounds like you are pretty drained. Let me recommend a song for you.",
      "AOI: Let's take it easy right now. I've got something calm for you."
    ],
    happy: [
      "AOI: Glad you are feeling joy! I'm giving you these songs to listen to!",
      "AOI: YAY! Let's keep filling up that joy!",
      "AOI: Let's keep this joy train moving!!"
    ]
};

// Hook up AI button
if (moodBtn) {
  moodBtn.addEventListener("click", () => {
    const mood = typeMood(moodInput?.value);
    moodStatus.textContent = "Mood: " + mood;

    const picks = recommendSongs(mood);
    updateRecButtonsWithAI(picks);

    // Update coded for better UI responses
    // Get the list of messages for the detected mood
    // In case it's can't find reponses than this will default to message for user
    const messages = moodMessages[mood] || ["AOI: I found some songs I think you might enjoy!"];

    // Pick one random message so AOI feels less repetitive
    const randomIndex = Math.floor(Math.random() * messages.length);
    const randomMessage = messages[randomIndex];

    if (aoiMessage) {
      aoiMessage.textContent = randomMessage;
    }
  });
}

// Funciton for AI assistant pop up box
// Update March 31st
// This will open and close AOI chat box
if (chatBubble && chatBox){
    chatBubble.addEventListener("click", () => {
        chatBox.classList.toggle("active");
    });
}
////////////////////////// Update April 2nd CHAT BOX AI ASSISTANT ////////////////////
const chatInput = document.getElementById("chat_enter");
const sendBtn = document.getElementById("send_btn");
const chatDialog = document.getElementById("chat_dialog");

function addMessage(text, sender){
    const dia = document.createElement("p");

    // If you are adding a message than print
    if (sender === "user"){
        dia.textContent = "You: " + text;
    }
    // else AOI is sending print
    else{
        dia.textContent = "AOI: " + text;
    }

    chatDialog.appendChild(dia);

    // This will help scrolling for message exchanged
    chatDialog.scrollTop = chatDialog.scrollHeight;
}

/////////////////////////// Update April 3rd to the 5th mood system for AI assistance chat box ////////////////////
sendBtn.addEventListener("click", () => {
    const userText = chatInput.value.trim();

    if (userText === "") return;

    // message will appear for user
    addMessage(userText, "user");

    const mood = typeMood (userText);
    const dialogs = moodMessages[mood] || ["I think I found something for you!"];
    const randomReply = dialogs[Math.floor(Math.random() * dialogs.length)];

    addMessage(randomReply, "aoi");

    const picks = recommendSongs(mood);
    updateRecButtonsWithAI(picks);

    // Update April 8th 
    if (picks.length > 0){
        currentSongIndex = picks[0];
        loadThenPlay(songs[currentSongIndex].file);
    }

    chatInput.value = "";

});

// Make sure it goes through a check to be sure the elements are being grabbed
// This will help from errors showing up often
// safety check for user 
if (!audioPlayer || !nowPlaying || !playBtn || !pauseBtn) {
    console.error("Element missing. Please check HTML IDS..");
}



// Debug check to see if controls are working 
// I have this to ensure elements are working corrently
console.log("Audio element:", audioPlayer);
console.log("Play button:", playBtn);
console.log("Recommended buttons:", recButtons);
console.log("Theme buttons:", themeButtons.length);
console.log("Play button:", playBtn);
console.log("Recommended buttons:", recButtons);

