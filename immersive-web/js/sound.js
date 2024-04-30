let voicemail = document.querySelector("#voicemail");
let playButton = document.querySelector("#play-button");

playButton.addEventListener("click", function() {
    voicemail.play();
    voicemail.volume = 0.65;
})

voicemail.onloadeddata = function() {
    console.log("loaded");
}

