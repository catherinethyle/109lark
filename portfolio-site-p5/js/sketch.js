let canvas;
let xPos = 0; // setting value for easing
let yPos = 0;
let easing = .05;


function setup(){
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0,0);
    canvas.style("z-index", -2);
}

function preload(){
    pointerImg = loadImage('./img/pointer.png');
    backgroundImg = loadImage('./img/background.jpg');
}

function windowResize(){
    resizeCanvas(windowWidth, windowHeight);
}

function draw(){
    // background(backgroundImg);
    clear();

    //easing poperty
    xPos = xPos + ((mouseX - xPos) * easing);
    yPos = yPos + ((mouseY - yPos) * easing);

    drawThing(xPos, yPos);
}   

function mouseMoved(){
    // drawThing(mouseX, mouseY);
}

// drawing trail of circles behind the mouse as it moves
// function drawThing(_x, _y){
//     strokeWeight(0);
//     fill(random(200, 255), random(200, 255), random(200, 255));
//     ellipse(_x, _y, 30, 30);
// }

function drawThing(_x, _y){
    image(pointerImg, _x, _y); 
}