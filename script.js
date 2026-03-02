// Here we will write the buttons and functions for the index website.
// We will also write the code for the music player and the AI
// not seen to the player but, running in hte background
console.log("Powler Player is running..");

// grab key elements for index.html
// Ones below are for the music player
const audioPlayer = document.getElementById("audio_player");
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
const songs = [
  { file: "Error_ You.mp3", moods: ["sad", "calm", "tired"], energy: 2 },
  { file: "Funk and Gone.mp3", moods: ["happy", "chill", "fun"], energy: 3 },
  { file: "Final Fight.mp3", moods: ["hype", "focus", "angry"], energy: 5 },
  { file: "Beneath the Falling Sky.mp3", moods: ["calm", "focus"], energy: 3 },
  { file: "Falling Out of Frame.mp3", moods: ["sad", "focus"], energy: 2 },
  { file: "Fire.mp3", moods: ["hype", "angry"], energy: 5 },
  { file: "Keep It Down.mp3", moods: ["focus", "calm"], energy: 3 },
  { file: "Let me forget.mp3", moods: ["sad", "tired"], energy: 2 },
  { file: "Light Me Up.mp3", moods: ["happy", "hype"], energy: 4 },
  { file: "My Hidden Plan.mp3", moods: ["focus", "mystery", "calm"], energy: 3 },
  { file: "Star in the Dark.mp3", moods: ["calm", "sad", "chill"], energy: 2 },
  // 3 new songs added for user
  { file: "We might die, lock-in.mp3", moods: ["focus", "hype"], energy: 4 },
  { file: "Devil In Sheep Clothing.mp3", moods: ["angry", "hype", "focus"], energy: 5 },
  { file: "So easy.mp3", moods: ["happy", "chill", "calm"], energy: 3 }
];
///////////////////////////////////////////////////////////////////////////////

// This will help keep track for current song
let currentSongIndex = 0;
// recommended song 0, 1, 2
let recommendedSongIndex = [];

// Helper: load a song into the player and play it
function loadThenPlay(filename){
    audioPlayer.src = "audio/" + filename;
    audioPlayer.load();
    audioPlayer.play();

    nowPlaying.textContent = "Now Playing: " + filename;

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

let isSeeking = false;

// The data will load for the user, duration because avaiable (seen)
audioPlayer.addEventListener("loadedmetadata",() =>{
    updateProgressUI();
});

// Ensure that the UI keeps updating
audioPlayer.addEventListener("timeupdate", () =>{
    updateProgressUI();
});

// UPDATED UI MUSIC PROGRESS
function updateProgressUI(){
    const current = audioPlayer.currentTime || 0;
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
seekBar.addEventListener("touchstart", () => {
    isSeeking = true;
});

// user drags the bar (live)
seekBar.addEventListener("input", () => {
    const duration = audioPlayer.duration || 0;
    if (duration > 0){
        const percent = Number (seekBar.value) / 100;
        const previewTime = percent * duration;
        currentTimeEl.textContent = formTime(previewTime);
    }
});

// works after relases
function finishSeek() {
    const duration = audioPlayer.duration || 0;
    if (duration > 0) {
        const percent = Number(seekBar.value) / 100;
        audioPlayer.currentTime = percent * duration;
    }
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
//////////////////////// AI MOOD Inference & Recommendations ///////////////////////////
const moodInput = document.getElementById("mood_input");
const moodBtn = document.getElementById("mood_btn");
const aoiMessage = document.getElementById("aoi_message");

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
  return "calm";
}

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

    btn.textContent = song ? song.file : "Recommended Song";

    // Overwrite click action (no cloning needed)
    btn.onclick = () => {
      if (!song) return;
      currentSongIndex = songIdx;
      loadThenPlay(songs[currentSongIndex].file);
    };
  });
}

// Hook up AI button
if (moodBtn) {
  moodBtn.addEventListener("click", () => {
    const mood = typeMood(moodInput?.value);
    moodStatus.textContent = "Mood: " + mood;

    const picks = recommendSongs(mood);
    updateRecButtonsWithAI(picks);

    if (aoiMessage) {
      aoiMessage.textContent = `AOI: Detected "${mood}" — I picked 3 songs that match.`;
    }
  });
}

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

