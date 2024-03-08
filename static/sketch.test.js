import {DOWNWARD,BACKWARD, Character, FORWARD, JUMP_KEY, LEFT_KEY, RIGHT_KEY, UPWARD} from './configuration.js';

let directionMap = new Map();
let character = {};
let gravity = {};
let floor = {};


// Concrete methods

function setup()
{
   createCanvas(1200, 680);

   directionMap.set(LEFT_KEY, createVector(...BACKWARD));
   directionMap.set(RIGHT_KEY, createVector(...FORWARD));
   directionMap.set(JUMP_KEY, createVector(...UPWARD));

   character = new Character(230,400, 8, 2);

   let downward = createVector(...DOWNWARD);

   floor = (height * 3/4);

   gravity = p5.Vector.div(downward, 12);

//   object = new Character(200, 90, 8, 2);

//   const iterator = object.addContinuousForce(createVector(...UPWARD));
//
//   for(let i = 0; i < 16; ++i)
//   {
//      let result = iterator.next().value;
//      
//      console.log(`Iteration ${i} with the value ${result}`);
//   }


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

   character.draw();

   console.log(character.transform.y > floor);

   if(character.transform.y <= floor)
   {
      console.log(`transform.y ${character.transform.y}, floor ${floor}`);
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