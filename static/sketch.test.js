import {Platform, Character, Coin, limits, JUMP_KEY, LEFT_KEY, RIGHT_KEY, UPWARD, BACKWARD, FORWARD, Enemy} from './configuration.js';

let directionMap = new Map();
let character = {};
let gravity = {};
let floor = {};
let coin, platform;
let enemy;

let jumpeffect;

let lifesCount = 3;

/// ======== Concrete methods for p5  ========

function preload()
{
   soundFormats('mp3');

   jumpeffect = loadSound('static/sounds/jump.mp3');
   jumpeffect.setVolume(0.2);
}

function setup()
{
   createCanvas(1200, 680);

   directionMap.set(LEFT_KEY, createVector(...BACKWARD));
   directionMap.set(RIGHT_KEY, createVector(...FORWARD));
   directionMap.set(JUMP_KEY, createVector(...UPWARD));

   floor = (height * 7/8);

   gravity = createVector(0, (1/14));

   character = new Character(250,400, 8, 4);

   character.jumpingsound = jumpeffect;

   coin = new Coin(450, floor - 10, 2, 2);

   platform = new Platform(480, floor - 92, 2, 2);

   enemy = new Enemy(230, floor, 2, 2);

   limits.setDefault(floor, 16);

	background(100,155,255); //fill the sky blue
}


function draw()
{
   clear();
   background(100,155,255);

   /// ======== Draw the world  ========

   stroke(30);
	strokeWeight(3);

	fill(0,155,83);
	rect(0, floor, width, height - floor);

   // Pitfall

   noStroke();
   fill(100,155,255);
   rect(820, floor, 140, height - floor);

	fill(0,155,83);
   stroke(30);
	strokeWeight(3);
   rect(940,floor, 60, height - floor, 100, 0, 0, 0);
   rect(815,floor, 60, height - floor, 0, 100, 0, 0);

   coin.draw();
   platform.draw();
   character.draw();
   enemy.draw();

   /// ======== Calculate collisions ======== 

   platform.getLimits(character.transform, character.crown());
   coin.getLimits(character.transform);

   // Enemy
   enemy.getLimits(character.transform);

   // Pitfall
   if(character.transform.x >= (815 + 60 - 10) && character.transform.x <= (940))
   {
      if(character.transform.y >= floor)
      {
         limits.setMin(780);
      }
   }


   if(character.transform.y < limits.min)
   {
      character.addForce(gravity);
   }
   else
   {
      character.velocity.y = 0;
      character.transform.y = limits.min;
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

// ========= Add the p5 engine =========

let library = document.createElement("script");

library.src = "./static/p5.js";

library.onload = () =>
{

   let library = document.createElement("script");

   library.src = "./static/p5.sound.min.js";

   // Add to the context the concrete implementations
   library.onload = () =>
   {
      window.preload = preload;
      window.setup = setup;
      window.draw = draw;

      window.keyPressed = keyPressed;
      window.keyReleased = keyReleased;
   }

   document.body.appendChild(library);
};

document.body.appendChild(library);