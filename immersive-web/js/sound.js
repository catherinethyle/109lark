let voicemail = document.querySelector("#voicemail");
let playButton = document.querySelector("#play-button");
let pauseButton = document.querySelector("#mute-button");

playButton.addEventListener("click", function() {
    voicemail.play();
    voicemail.volume = 0.65;
})

pauseButton.addEventListener("click", function() {
    voicemail.pause();
})

voicemail.onloadeddata = function() {
    console.log("loaded");
}

