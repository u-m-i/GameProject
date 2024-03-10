import {Platform, Character, Coin, limits, JUMP_KEY, LEFT_KEY, RIGHT_KEY, UPWARD, BACKWARD, FORWARD} from './configuration.js';

let directionMap = new Map();
let character = {};
let gravity = {};
let floor = {};
let coin, platform;
let collissionObjects = [];


// Concrete methods

function setup()
{
   createCanvas(1200, 680);

   directionMap.set(LEFT_KEY, createVector(...BACKWARD));
   directionMap.set(RIGHT_KEY, createVector(...FORWARD));
   directionMap.set(JUMP_KEY, createVector(...UPWARD));

   floor = (height * 7/8);

   gravity = createVector(0, (1/14));

   character = new Character(250,400, 8, 4);

   coin = new Coin(450, floor - 10, 2, 2);

   platform = new Platform(480, floor - 92, 2, 2);

   collissionObjects.push(coin, platform);

   limits.setMax(0);
   limits.setMin(floor);

	background(100,155,255); //fill the sky blue
}


function draw()
{
   clear();
   background(100,155,255);


   // Ground
   stroke(30);
	strokeWeight(3);

	fill(0,155,83);
	rect(0, floor, width, height - floor);

   //coin.draw();
   platform.draw();
   character.draw();
   
   platform.getLimits(character.transform, character.crown());

   if(character.transform.y < floor)
   {
      character.addForce(gravity);
   }
   else
   {
      //console.log(character.velocity);
      character.velocity.y = 0;
   }
}


function keyPressed()
{
   if(!character)
      return;

   if(directionMap.get(key) !== undefined)
      character.setDirection(directionMap.get(key));
}

function keyReleased()
{
   if(!character)
      return;

   if(directionMap.get(key) !== undefined)
      character.unsetDirection(directionMap.get(key));
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
