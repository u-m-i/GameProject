
const OFFSET = 18;
const SPINE_LENGTH = 34;

const HEAD_DIAMETER = 18;

const CHEST_LENGTH = (SPINE_LENGTH / 2) + 2;
const HAND_LENGTH = 12

const LEG_LENGTH = 14;

const DELTA = 10;

const LEFT_KEY = "a";
const RIGHT_KEY = "d";
const JUMP_KEY = "w";

const FORWARD = [1,0];
const BACKWARD = [-1,0];
const UPWARD =  [0,-1];
const DOWNWARD =  [0,1];

let rules =
{
   isInvulnerable: false,
   hasFallen: false,
   hasDied: false,

   // {Character}
   character : {},

   // {p5.Vector}
   respawnPoint : {},
   //hasTimedout: false,

   delay : 2340,
   totalLifes: 3,


   recount: function(rules)
   {
      console.log("The recount is being called");

      rules.isInvulnerable = false;

      if(rules.totalLifes == 0)
      {
         rules.hasDied = true;
         return; // Avoid respawning in case has fallen
      }

      if(rules.hasFallen)
         rules.respawn();
   },

   hurt: function()
   {
      if(this.hasFallen && this.isInvulnerable)
         this.delay = 1600;

      if(this.isInvulnerable)
         return;

      console.log("The player has been hurted");

      // Finish the game

      this.totalLifes--;

      this.isInvulnerable = true;

      if(this.totalLifes === 0)
      {
         this.delay = 1450;
      }

      setTimeout(this.recount,this.delay,this);
   },

   endGame: function()
   {
      fill(25);
      textSize(45);

      textAlign(CENTER);

      text("Game over!",width / 2 , height / 2);

      text("Press any key to restart",width /2, (height / 2) + 55);

      this.totalLifes = 3;
   },

   respawn: function()
   {
      this.hasFallen = false;

      limits.reset();

      this.character.velocity.y = 0;
      this.character.velocity.x = 0;

      this.character.transform.x = this.respawnPoint.x;
      this.character.transform.y = this.respawnPoint.y;

      this.character.mustBlock = false;
   },
};


let limits =
{
   setDefault: function(min, max)
   {
      this.minDefault = min;
      this.maxDefault = max;

      this.min = this.minDefault;
      this.max = this.maxDefault;
   },

   setMax : function(max)
   {
      this.max = max === 0 ? maxDefault : max;
   },

   setMin : function(min)
   {
      this.min = min === 0 ? this.minDefault : min;
   },

   reset: function()
   {
      this.min = this.minDefault;
      this.max = this.maxDefault;
   }
};

class Object
{
   transform; // {p5.Vector}

   velocity; // {p5.Vector}

   multiplier; // {Number}

   acceleration; // {Number}

   constructor(x, y, acceleration, velocityMultiplier)
   {
      this.transform = createVector(x, y);

      this.multiplier = velocityMultiplier;

      this.acceleration = acceleration;

      this.velocity = createVector(0, 0); // Neutral movement
   }

   /**
    * Deals with unitary vectors 
    * @param {p5.Vector} vector 
    */
   addForce(vector)
   {
      let amplification  = p5.Vector.mult(vector, this.multiplier);

      this.velocity.add(amplification);
   }

   subForce(vector)
   {
      let amplification  = p5.Vector.mult(vector, this.multiplier);

      this.velocity.sub(amplification);
   }

   *addContinuousForce(vector)
   {
      let speed = 16 / this.acceleration;

      // {p5.Vector}
      let force = p5.Vector.mult(vector, speed);

      while(abs(this.velocity.y) < limits.max)
      {
         this.velocity.add(force);
         yield this.velocity;
      }

      while(abs(this.velocity.y) > 0)
      {
         this.velocity.sub(force);
         yield this.velocity;
      }
   }
}

class Character extends Object
{

// {String}
   state;

// {Boolean}
// Use to block the input in certain moments
   mustBlock;

// {Boolean}
   isGrounded;

// {p5.Sound}
   jumpingsound;


   constructor(x,y, acceleration, velocityMultiplier)
   {
      super(x, y, acceleration,  velocityMultiplier);

      this.state = "idle";
   }

   crown = function() 
   {
      return this.transform.y - SPINE_LENGTH - HEAD_DIAMETER * 2 + 4 ;
   }

   left()
   {
        //Spine
      stroke(0);
      line(this.transform.x, this.transform.y - OFFSET,  this.transform.x, (this.transform.y - OFFSET) - SPINE_LENGTH); 

      //Left leg
      line(this.transform.x, this.transform.y - OFFSET,  this.transform.x - 8, this.transform.y); 

      //Rigth leg
      line(this.transform.x, this.transform.y - OFFSET,  this.transform.x + 9, this.transform.y); 

      //Head
      circle(this.transform.x, this.transform.y - SPINE_LENGTH - HEAD_DIAMETER - 4, HEAD_DIAMETER);

      //Left arm
      line(this.transform.x, (this.transform.y - OFFSET) - CHEST_LENGTH,  this.transform.x - HAND_LENGTH + 2, ((this.transform.y - OFFSET) - CHEST_LENGTH) + 11); 

      //Right arm
      line(this.transform.x, (this.transform.y - OFFSET) - CHEST_LENGTH,  this.transform.x + HAND_LENGTH - 8, ((this.transform.y - OFFSET) - CHEST_LENGTH) + 13); 
      //Shadow
      fill(134);
      noStroke();
      ellipse(this.transform.x, this.transform.y + 6, 40,10);

   };

   right()
   {
      stroke(0);
      line(this.transform.x, this.transform.y - OFFSET,  this.transform.x, (this.transform.y - OFFSET) - SPINE_LENGTH); 

      //Left leg
      line(this.transform.x, this.transform.y - OFFSET,  this.transform.x - 8, this.transform.y); 

      //Rigth leg
      line(this.transform.x, this.transform.y - OFFSET,  this.transform.x + 9, this.transform.y); 

      //Head
      circle(this.transform.x, this.transform.y - SPINE_LENGTH - HEAD_DIAMETER - 4, HEAD_DIAMETER);

      //Right arm
      line(this.transform.x, (this.transform.y - OFFSET) - CHEST_LENGTH,  this.transform.x + HAND_LENGTH - 2, ((this.transform.y - OFFSET) - CHEST_LENGTH) + 11); 

      //Left arm
      line(this.transform.x, (this.transform.y - OFFSET) - CHEST_LENGTH,  this.transform.x - HAND_LENGTH + 8, ((this.transform.y - OFFSET) - CHEST_LENGTH) + 13); 

      //Shadow
      fill(134);
      noStroke();
      ellipse(this.transform.x, this.transform.y + 6, 40,10);
   }

   jumping()
   {
      stroke(0);
      line(this.transform.x, this.transform.y - OFFSET,  this.transform.x, (this.transform.y - OFFSET) - SPINE_LENGTH); 

      //Left leg
      line(this.transform.x, this.transform.y - OFFSET,  (this.transform.x - LEG_LENGTH / 2) - 3, this.transform.y - 6); 
      line((this.transform.x - LEG_LENGTH / 2) - 3, this.transform.y - 6,  this.transform.x - LEG_LENGTH / 2 , this.transform.y); 

      //Rigth leg
      line(this.transform.x, this.transform.y - OFFSET,  (this.transform.x + LEG_LENGTH / 2) + 3, this.transform.y - 6); 
      line((this.transform.x + LEG_LENGTH / 2) + 3, this.transform.y - 6,  this.transform.x + LEG_LENGTH / 2 , this.transform.y); 

      //Head
      circle(this.transform.x, this.transform.y - SPINE_LENGTH - HEAD_DIAMETER - 4, HEAD_DIAMETER);

      //Right arm
      line(this.transform.x, (this.transform.y - OFFSET) - CHEST_LENGTH,  this.transform.x + HAND_LENGTH, (this.transform.y - OFFSET) - CHEST_LENGTH - DELTA); 

      //Left arm
      line(this.transform.x, (this.transform.y - OFFSET) - CHEST_LENGTH,  this.transform.x - HAND_LENGTH, (this.transform.y - OFFSET) - CHEST_LENGTH - DELTA); 

      //Shadow
      fill(134);
      noStroke();
      ellipse(this.transform.x, this.transform.y + 6, 40,10);
   }

   falling()
   {
      stroke(0);
      line(this.transform.x, this.transform.y - OFFSET,  this.transform.x, (this.transform.y - OFFSET) - SPINE_LENGTH); 

      //Left leg
      line(this.transform.x, this.transform.y - OFFSET,  (this.transform.x - LEG_LENGTH / 2) - 3, this.transform.y - 6); 
      line((this.transform.x - LEG_LENGTH / 2) - 3, this.transform.y - 6,  this.transform.x - LEG_LENGTH / 2 , this.transform.y); 

      //Rigth leg
      line(this.transform.x, this.transform.y - OFFSET,  (this.transform.x + LEG_LENGTH / 2) + 3, this.transform.y - 6); 
      line((this.transform.x + LEG_LENGTH / 2) + 3, this.transform.y - 6,  this.transform.x + LEG_LENGTH / 2 , this.transform.y); 

      //Head
      circle(this.transform.x, this.transform.y - SPINE_LENGTH - HEAD_DIAMETER - 4, HEAD_DIAMETER);

      //Right arm
      line(this.transform.x, (this.transform.y - OFFSET) - CHEST_LENGTH,  this.transform.x + HAND_LENGTH, (this.transform.y - OFFSET) - CHEST_LENGTH - DELTA); 

      //Left arm
      line(this.transform.x, (this.transform.y - OFFSET) - CHEST_LENGTH,  this.transform.x - HAND_LENGTH, (this.transform.y - OFFSET) - CHEST_LENGTH - DELTA); 

      //Shadow
      fill(134);
      noStroke();
      ellipse(this.transform.x, this.transform.y + 6, 40,10);
   }

   idle()
   {
      //Spine
      stroke(0);
      line(this.transform.x, this.transform.y - OFFSET,  this.transform.x, (this.transform.y - OFFSET) - SPINE_LENGTH); 

      //Left leg
      line(this.transform.x, this.transform.y - OFFSET,  this.transform.x - 14, this.transform.y); 

      //Rigth leg
      line(this.transform.x, this.transform.y - OFFSET,  this.transform.x + 14, this.transform.y); 

      //Head
      circle(this.transform.x, this.transform.y - SPINE_LENGTH - HEAD_DIAMETER - 4, HEAD_DIAMETER);

      //Left arm
      line(this.transform.x, (this.transform.y - OFFSET) - CHEST_LENGTH,  this.transform.x + HAND_LENGTH, (this.transform.y - OFFSET) - CHEST_LENGTH); 

      //Right arm
      line(this.transform.x, (this.transform.y - OFFSET) - CHEST_LENGTH,  this.transform.x - HAND_LENGTH, (this.transform.y - OFFSET) - CHEST_LENGTH); 

      //Shadow
      fill(134);
      noStroke();
      ellipse(this.transform.x, this.transform.y + 6, 40,10);
   }

   playSound()
   {
      this[this.state+"sound"]?.play();
   }

   setDirection(vector)
   {
      if(this.mustBlock)
         return;

      if(vector.y < 0 && !this.isGrounded)
         return;

      if(vector.y < 0)
      {
         this.coroutine = this.addContinuousForce(vector);
         this.state = "jumping";
         this.playSound();
         return;
      }

      this.addForce(vector);
   }

   unsetDirection(vector)
   {
      if(this.mustBlock)
         return;

      if(vector.y < 0)
         return;

      this.subForce(vector);
   }


   setColor()
   {
      fill(0);
      strokeWeight(2);
   }


   draw()
   {
      this.setColor();

      if(this.coroutine !== undefined)
      {
         let result = this.coroutine.next().value;

         if(!result)
         {
            this.coroutine = undefined;
         }
      }

      this.transform.add(this.velocity); // Adds force to the body

      //point(this.transform.x, this.transform.y);

      if(this.velocity.x < 0)
      {
         this.state = "left";
      }
      else if(this.velocity.x > 0)
      {
         this.state = "right";
      }
      else if(this.velocity.x == 0 && this.velocity.y == 0)
      {
         this.state = "idle";
      }
      else if(this.velocity.y < 0 )
      {
         this.state = "jumping";
      }
      else if(this.velocity.y > 0)
      {
         this.state = "falling";
      }

      console.log(this.state);

      this[this.state](); // Draw the current state
   }
}


class Coin extends Object
{
// {String}
   state; 
// {Number}
   diameter = 30;
// {Number}
   threshold = 2;

   draw()
   {
      if(this.state == "picked")
         return;

      stroke(0);
      fill(250, 255, 80);
      circle(this.transform.x, this.transform.y, this.diameter);

      noStroke();

      fill(100, 100, 100, 140);
      ellipse(this.transform.x, this.transform.y + 20, 40, 3);
   }

   getLimits(transform)
   {

      if(p5.Vector.dist(transform, this.transform) + this.diameter <= this.threshold || p5.Vector.dist(transform, this.transform) - this.diameter <= this.threshold)
      {
         this.state = "picked";
      }
   }
}

class Platform extends Object
{
   width = 100;
   height = 22;

   draw()
   {
      stroke(0);
      fill(120,45,80);
      rect(this.transform.x, this.transform.y, this.width, this.height, 20, 20, 20, 20);
   }

   getLimits(position, top)
   {
      if(position.x >= this.transform.x && position.x <= (this.transform.x + 100))
      {
         registerColl(this);

         fill(255,0,0,100);
         rect(this.transform.x, this.transform.y + 22,  this.width, (height * (7/8)) - this.transform.y - 20);

         if(position.y < (this.transform.y + this.height))
         {

            rect(this.transform.x, this.transform.y - this.height,  this.width, this.transform.y - (this.transform.y - this.height));

            limits.setMin(this.transform.y);
         }

//         if(position.y >= this.transform.y && top < this.transform.y)
//         {
//            console.log("Do not apply gravity");
//         }

         if(top > this.transform.y + this.height)
         {
            limits.setMax(top - (this.transform.y + this.height));

            stroke(2);
            fill(0);
            line(position.x, top, this.transform.x, (this.transform.y + this.height));
         }

         return;
      }

      unregisterColl(this);

      if(top < (this.transform.y + this.height) && top > this.transform.y)
      {
         fill(0,255,0,100);
         rect(this.transform.x - 70, this.transform.y, 70, this.height);
      }
   }
}

class Pitfall extends Object 
{
// {Number}
   height = height - this.transform.y;
// {Number}
   width = 60;
// {Number}
   roundness = 100;

   draw()
   {
      noStroke();
      fill(100,155,255);
      rect(this.transform.x + 5, this.transform.y, 140, this.height);

      fill(0,155,83);
      stroke(30);
      strokeWeight(3);

      rect((this.transform.x + 125), this.transform.y, this.width, this.transform.y, this.roundness, 0, 0, 0);

      rect(this.transform.x, this.transform.y, this.width, this.height, 0, this.roundness, 0, 0);
   }

   getLimits(transform)
   {
      if(transform.x >= (815 + 60 - 10) && transform.x <= this.transform.x + 125)
      {
         registerColl(this);


         if(transform.y >= this.transform.y)
         {
            rules.hasFallen = true;
            rules.respawnPoint = this.transform;

            rules.character.mustBlock = true;
            rules.character.velocity.x = 0;

            rules.hurt();
            limits.setMin(780);
         }

         return;
      }

      unregisterColl(this);
   }
}

class Enemy extends Object
{
// {Number}
   width =  50;
// {Number}
   height = 50;

   draw()
   {
      push();

      stroke(10);
      strokeWeight(3);

      fill(184, 8, 0);
      rectMode(CENTER);
      rect(this.transform.x, this.transform.y - this.height / 2, this.width, this.height);

      triangle(this.transform.x - this.width / 2, this.transform.y - this.height , this.transform.x - (this.width / 2) + 10, this.transform.y - this.height - 10, this.transform.x - (this.width / 2) + 20, this.transform.y - this.height );

      pop();
   }


   getLimits(transform)
   {
      if(transform.x >= this.transform.x - (this.width / 2) 
         && transform.x < this.transform.x + (this.width / 2))
      {
         registerColl(this);

         if(transform.y < this.transform.y - this.height)
         {
            limits.setMin(this.transform.y - this.height);

            return; // Avoid hurt the player if it is in a legal position
         }

         rules.hurt();
      }

      unregisterColl(this);
   }
}

let lastColl;

function unregisterColl( objct )
{
   if(!lastColl)
      return;

   if(lastColl === objct)
   {
      limits.reset();
   }
}

function registerColl( objct )
{
   if(lastColl === objct)
      return;

   lastColl = objct;
}


export {Pitfall, Platform, Coin, Character, Enemy, limits, rules, LEFT_KEY, RIGHT_KEY, JUMP_KEY, FORWARD, BACKWARD, UPWARD, DOWNWARD};
