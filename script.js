// Function to adjust playlist size
function adjustPlaylistSize() {
    const screenDiv = document.getElementById("screen");
    const playlistDiv = document.getElementById("playlist-cont");
  
    const availableHeight = screenDiv.clientHeight;
    const headerHeight = document.getElementById("nav").clientHeight;
    const playerHeight = document.getElementById("player").clientHeight;
    const playlistMargin = 0; // Adjust this value if needed
  
    const playlistHeight = availableHeight - headerHeight - playerHeight - playlistMargin;
    playlistDiv.style.height = playlistHeight + "px";
  }
  
  // Initially adjust playlist size
  adjustPlaylistSize();
  
  // Call the function on window resize
  window.addEventListener("resize", adjustPlaylistSize);

// Get references to the favorite icons
const roundedFavorite = document.querySelector(".favorite");
const materialFavorite = document.querySelector(".favorite-filled");

// Add an event listener to the rounded favorite icon
roundedFavorite.addEventListener("click", function() {
    // Toggle visibility of the favorite icons
    roundedFavorite.style.display = "none";
    materialFavorite.style.display = "block";
});

materialFavorite.addEventListener("click", function() {
  // Toggle visibility of the favorite icons
  roundedFavorite.style.display = "block";
  materialFavorite.style.display = "none";
});



const audio = document.getElementById('audioPlayer');


// Function to play or pause the track
function togglePlay() {
    if (audio.paused) {
        audio.play();
        document.getElementById('playPause').innerHTML = '<i class="fa-solid fa-circle-pause"></i>';
    } else {
        audio.pause();
        document.getElementById('playPause').innerHTML = '<i class="fa-solid fa-circle-play"></i>';
    }
}



// Event listener to toggle play/pause
document.getElementById('playPause').addEventListener('click', togglePlay);

// Function to update progress bar
function updateProgressBar() {
    const progress = (audio.currentTime / audio.duration) * 100;
    document.getElementById('progress').value = progress;
}

// Event listener to update progress bar
audio.addEventListener('timeupdate', updateProgressBar);

const volumeSlider = document.getElementById('volu'); // Assuming the volume slider has an id of 'volu

volumeSlider.addEventListener('input', function() {
    const volume = this.value / 100; // Convert the slider value to a range of 0 to 1
    audio.volume = volume; // Set the volume of the audio element
});

const seekBar = document.getElementById('progress'); // Assuming the seek bar has an id of 'progress'

seekBar.addEventListener('input', function() {
    const seekTime = this.value * audio.duration / 100; // Calculate the seek time based on the slider value
    audio.currentTime = seekTime; // Set the current playback time of the audio element
});

// Update the seek bar as the audio plays
audio.addEventListener('timeupdate', function() {
    const progress = (audio.currentTime / audio.duration) * 100; // Calculate the progress percentage
    seekBar.value = progress; // Update the seek bar value
});

const tracks = [
  {
      albumArt: 'https://c.saavncdn.com/520/Baarishein-English-2018-20180522204131-500x500.jpg',
      trackName: 'Baarishein',
      trackArtist: 'Anuv Jain',
      source: 'Baarishein.mp3'
  },
  {
      albumArt: 'https://c.saavncdn.com/266/Gul-Hindi-2021-20210706151615-500x500.jpg',
      trackName: 'Gul',
      trackArtist: 'Anuv Jain',
      source: 'gul.mp3'
  },
  {
      albumArt: 'https://c.saavncdn.com/078/Dev-Hindi-2021-20220830155616-500x500.jpg',
      trackName: 'Liggi',
      trackArtist: 'Ritviz',
      source: 'liggi.mp3'
  }
];

let currentTrackIndex = 0;

function updateTrackInfo(trackIndex) {
  const albumArtElement = document.getElementById('thumbnail');
  const trackNameElement = document.getElementById('trackName');
  const trackArtistElement = document.getElementById('trackArtist');

  albumArtElement.style.backgroundImage = `url(${tracks[trackIndex].albumArt})`;
  trackNameElement.textContent = tracks[trackIndex].trackName;
  trackArtistElement.textContent = tracks[trackIndex].trackArtist;

  audio.src = tracks[trackIndex].source;
    audio.load();
}

function playNextTrack() {
  currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
  updateTrackInfo(currentTrackIndex);
  audio.play();
}

function playPreviousTrack() {
  currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
  updateTrackInfo(currentTrackIndex);
  audio.play();
}

updateTrackInfo(0); // Index 1 corresponds to the second track in the array (0-based index)

const progressTimeElement = document.getElementById('progressTime');

audio.addEventListener('timeupdate', function() {
    const currentTime = Math.floor(audio.currentTime);
    const minutes = Math.floor(currentTime / 60);
    const seconds = currentTime % 60;
    const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    progressTimeElement.textContent = formattedTime;
});

const totalTimeElement = document.getElementById('totalTime');

audio.addEventListener('loadedmetadata', function() {
    const totalDuration = Math.floor(audio.duration);
    const totalMinutes = Math.floor(totalDuration / 60);
    const totalSeconds = totalDuration % 60;
    const formattedTotalTime = `${totalMinutes.toString().padStart(2, '0')}:${totalSeconds.toString().padStart(2, '0')}`;
    totalTimeElement.textContent = formattedTotalTime;
});

const shuffleIcon = document.getElementById('shuffle');

shuffleIcon.addEventListener('click', function() {
    const isShuffleOn = shuffleIcon.classList.toggle('shuffle-on');
    shuffleIcon.setAttribute('data-shuffle', isShuffleOn.toString());
});


// Assuming 'audio' is the variable referring to your audio element
document.addEventListener('keydown', function(event) {
  if (event.keyCode === 32) { // 32 is the keyCode for space key
      if (audio.paused) {
          audio.play();
          document.getElementById('playPause').innerHTML = '<i class="fa-solid fa-circle-pause"></i>';
      } else {
          audio.pause();
          document.getElementById('playPause').innerHTML = '<i class="fa-solid fa-circle-play"></i>'
      }
  }
});

document.addEventListener('keydown', function(event) {
  if (event.altKey && event.key === 'ArrowRight') {
      // Code to play the next track goes here
      playNextTrack();
      document.getElementById('playPause').innerHTML = '<i class="fa-solid fa-circle-pause"></i>'
  }
});

document.addEventListener('keydown', function(event) {
  if (event.altKey && event.key === 'ArrowLeft') {
      // Code to play the next track goes here
      playPreviousTrack();
      document.getElementById('playPause').innerHTML = '<i class="fa-solid fa-circle-pause"></i>'
  }
});

let isShuffleOn = false;

document.addEventListener('keydown', function(event) {
    if (event.key === 's') {
        toggleShuffle();
    }
});

function toggleShuffle() {
    isShuffleOn = !isShuffleOn;

    const shuffleIcon = document.querySelector('#shuffle');
    if (isShuffleOn) {
        // Shuffle is on, change icon color to green
        shuffleIcon.style.color = '#1DB954';
    } else {
        // Shuffle is off, change icon color to default
        shuffleIcon.style.color = '';
    }
}

document.addEventListener('keydown', function(event) {
    if (event.altKey) {
        if (event.key === 'ArrowUp') {
            // Increase volume
            audio.volume += 0.01; // You can adjust the increment value as needed
            
        } else if (event.key === 'ArrowDown') {
            // Decrease volume
                audio.volume -= 0.01; // You can adjust the decrement value as needed
        }
    }
});


document.addEventListener("keydown", function(event) {
    const seekBar = document.getElementById("progress");

    if (event.code === "ArrowRight") {
        // Seek forward 5 seconds
        audio.currentTime += 5;
    } else if (event.code === "ArrowLeft") {
        // Seek backward 5 seconds
        audio.currentTime -= 5;
    }

    // Update seek bar position
    seekBar.value = (audio.currentTime / audio.duration) * 100;
});



var libico = document.getElementById('libraryico');
var lPanel = document.getElementById('l-panel');
var nav = document.getElementById('nav');
var home = document.getElementById('home');
var search = document.getElementById('search');

function libexpand() {
    lPanel.style.width = '300px';
    nav.style.alignItems = 'initial';
    home.style.marginLeft = '20px';
    search.style.marginLeft = '20px';
    
    
}