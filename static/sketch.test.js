import {BACKWARD, Character, FORWARD, JUMP_KEY, LEFT_KEY, RIGHT_KEY, UPWARD} from './configuration.js';

let directionMap = new Map();
let character = {};


// Concrete methods

function setup()
{
   createCanvas(1200, 680);

   directionMap.set(LEFT_KEY, createVector(...BACKWARD));
   directionMap.set(RIGHT_KEY, createVector(...FORWARD));
   directionMap.set(JUMP_KEY, createVector(...UPWARD));

   character = new Character(230,400, 2);

	background(100,155,255); //fill the sky blue
}


function draw()
{
   clear();

	background(100,155,255);

   character.draw();
}


function keyPressed()
{
   if(!character)
      return;

   if(directionMap.get(key) !== undefined)
   {
      character.addForce(directionMap.get(key));
   }
}

function keyReleased()
{
   if(!character)
      return;

   if(directionMap.get(key) !== undefined)
   {
      character.subForce(directionMap.get(key));
   }
}

// Add the p5 engine

let library = document.createElement("script");

library.src = "./static/p5.js";

// Define global objects that p5 will take
library.onload = () =>
{
   window.setup = setup;
   window.draw = draw;

   window.keyPressed = keyPressed;
   window.keyReleased = keyReleased;
}

document.body.appendChild(library);