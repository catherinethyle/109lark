console.log("hello hello");

let pageTitle = document.querySelector("#page-title");
let pageHeader = document.querySelector("header");
let pageBody = document.querySelector("body");

// java timeout changes h1 title after 3sec
setTimeout(function(){
    pageTitle.style.color = "blue";
    // console.log("timeout worked!")
}, 3000);

// click event changes header bg color
pageHeader.onclick = function() {
    // console.log("clicked header :)")
    pageBody.style.backgroundColor = "black";
} 

