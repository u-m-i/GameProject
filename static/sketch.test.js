import {DOWNWARD,BACKWARD, Character, FORWARD, JUMP_KEY, LEFT_KEY, RIGHT_KEY, UPWARD, Coin} from './configuration.js';

let directionMap = new Map();
let character = {};
let gravity = {};
let floor = {};
let coin;


// Concrete methods

function setup()
{
   createCanvas(1200, 680);

   directionMap.set(LEFT_KEY, createVector(...BACKWARD));
   directionMap.set(RIGHT_KEY, createVector(...FORWARD));
   directionMap.set(JUMP_KEY, createVector(...UPWARD));

   character = new Character(230,400, 8, 2);

   let downward = createVector(...DOWNWARD);

   floor = (height * 7/8);

   gravity = p5.Vector.div(downward, 14);

//   object = new Character(200, 90, 8, 2);

//   const iterator = object.addContinuousForce(createVector(...UPWARD));
//
//   for(let i = 0; i < 16; ++i)
//   {
//      let result = iterator.next().value;
//      
//      console.log(`Iteration ${i} with the value ${result}`);
//   }

   coin = new Coin(450, floor - 10, 2, 2);

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

   coin.draw();

//   stroke(0);
//   fill(250, 255, 80);
//   circle(coin.x, coin.y, 30);
//
//   noStroke();
//
//   fill(100, 100, 100, 140);
//   ellipse(coin.x, coin.y + 20, 40, 3);

   character.draw();

   console.log(`Is the character grounded? ${character.transform.y > floor}`);
   console.log(`velocity->${character.velocity.x},${character.velocity.y}`);


   if(character.transform.y <= floor)
   {
     // console.log(`transform.y ${character.transform.y}, floor ${floor}`);
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
