
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

      //console.log(this.velocity);

      //console.log(`The velocity of the character -> ${this.velocity}`);
   }

   subForce(vector)
   {
      let amplification  = p5.Vector.mult(vector, this.multiplier);

      this.velocity.sub(amplification);
   }

   *addContinuousForce(vector)
   {
      let ratio = this.multiplier / this.acceleration;

      // {p5.Vector}
      let buffer = p5.Vector.mult(vector, ratio);

      while(abs(this.velocity.y) < this.multiplier)
      {
         this.velocity.add(buffer);
         yield this.velocity;
      }

      //while(abs(this.velocity.x) < this.multiplier && abs(this.velocity.y) < this.multiplier)
      //{
      //   this.velocity.add(buffer);
      //   yield this.velocity;
      //}

      while(abs(this.velocity.y) > 0)
      {
         this.velocity.sub(buffer);
         yield this.velocity;
      }
      //while(abs(this.velocity.x) > 0 || abs(this.velocity.y) > 0)
      //{
      //   this.velocity.sub(buffer);
      //   yield this.velocity;
      //}
   }
}

class Character extends Object
{

   state; // {String}

   constructor(x,y, acceleration, velocityMultiplier)
   {
      super(x, y, acceleration,  velocityMultiplier);

      this.state = "idle";
   }


   left = function()
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
      line(this.transform.x, (this.transform.y - OFFSET) - CHEST_LENGTH,  this.transform.x + HAND_LENGTH, (this.transform.y - OFFSET) - CHEST_LENGTH - delta); 

      //Left arm
      line(this.transform.x, (this.transform.y - OFFSET) - CHEST_LENGTH,  this.transform.x - HAND_LENGTH, (this.transform.y - OFFSET) - CHEST_LENGTH - delta); 

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

   setDirection(vector)
   {
      if(vector.y < 0 && (this.state == "jumping" || this.state == "falling"))
         return;

      if(vector.y < 0)
      {
         this.coroutine = this.addContinuousForce(vector, this.acceleration);
         this.state = "jumping";
         return;
      }

      this.addForce(vector);
   }

   unsetDirection(vector)
   {
      if(vector.y < 0 && (this.state == "jumping" || this.state == "falling"))
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

         console.log(result);

         if(!result)
         {
            this.coroutine = undefined;
         }
      }


      this.transform.add(this.velocity); // Adds force to the body

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
      else if(this.velocity.y != 0 )
      {
         this.state = "jumping";
      }

      this[this.state](); // Draw the current state
   }
}


class Coin extends Object
{
   state;

   draw()
   {

      if(this.state == "picked")
         return;

      stroke(0);
      fill(250, 255, 80);
      circle(this.transform.x, this.transform.y, 30);

      noStroke();

      fill(100, 100, 100, 140);
      ellipse(this.transform.x, this.transform.y + 20, 40, 3);

   }
}

class Platform extends Object
{
   draw()
   {
      stroke(0);
      fill(120,45,80);
      rect(this.transform.x, this.transform.y, 100, 22, 20, 20, 20, 20);
   }
}


export {Platform, Coin, Character, LEFT_KEY, RIGHT_KEY, JUMP_KEY, FORWARD, BACKWARD, UPWARD, DOWNWARD};
