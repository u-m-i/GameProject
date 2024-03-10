import {Platform, Character, Coin, limits, JUMP_KEY, LEFT_KEY, RIGHT_KEY, UPWARD, BACKWARD, FORWARD} from './configuration.js';

let directionMap = new Map();
let character = {};
let gravity = {};
let floor = {};
let coin, platform, lastcoin;
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

   lastcoin = new Coin(807, floor - 10, 2, 2);

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


   // Draw the world
   stroke(30);
	strokeWeight(3);

	fill(0,155,83);
	rect(0, floor, width, height - floor);

   // test

   noStroke();
   fill(100,155,255);
   rect(820, floor, 140, height - floor);

	fill(0,155,83);
   stroke(30);
   //fill(40,40,200);
	strokeWeight(3);
   rect(940,floor, 60, height - floor, 100, 0, 0, 0);
   rect(815,floor, 60, height - floor, 0, 100, 0, 0);

   coin.draw();
   lastcoin.draw();
   platform.draw();
   character.draw();
   
   // Calculate collisions

   platform.getLimits(character.transform, character.crown());
   coin.getLimits(character.transform);
   lastcoin.getLimits(character.transform);

   if(character.transform.x >= (815 + 60 - 10) && character.transform.x <= (940))
   {
      if(character.transform.y >= floor)
      {
         console.log(floor);
         limits.setMin(780);
      }
   }


   // Apply modifications
   if(character.transform.y < limits.min)
   {
      character.addForce(gravity);
   }
   else
   {
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
