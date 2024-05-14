let canvas;

function setup(){
    canvas = createCanvas();
    canvas.parent("excerpt-one-p5");
}

function preload(){
    backgroundImg = loadImage('./img/grid-paper.png');
}

function draw(){
    background(backgroundImg);
}   

function mouseMoved(){
}