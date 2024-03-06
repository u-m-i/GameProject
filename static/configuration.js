
const OFFSET = 18;
const SPINE_LENGTH = 34;

const HEAD_DIAMETER = 18;

const CHEST_LENGTH = (SPINE_LENGTH / 2) + 2;
const HAND_LENGTH = 12

const LEG_LENGTH = 14;


const LEFT_KEY = "a";
const RIGHT_KEY = "d";
const JUMP_KEY = "w";

const FORWARD = [1,0];
const BACKWARD = [-1,0];
const UPWARD =  [0,-1];

class Object
{
   transform; // {p5.Vector}
   velocity; // {p5.Vector}

   multiplier; // {Number}

   constructor(x, y, velocityMultiplier)
   {
      this.transform = createVector(x, y);

      this.multiplier = velocityMultiplier;

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

   *addContiniousForce(vector, acceleration)
   {
      let ratio = this.multiplier / acceleration;

      // {p5.Vector}
      let buffer = p5.Vector.mult(vector, ratio);

      while(buffer.x < this.multiplier || buffer.y < this.multiplier)
      {
         yield buffer.add(ratio);
      }
   }
}

class Character extends Object
{

   state; // {String}

   constructor(x,y, velocityMultiplier)
   {
      super(x, y, velocityMultiplier);

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
      line(this.transform.x, (this.transform.y - OFFSET) - CHEST_LENGTH,  this.transform.x + HAND_LENGTH, (this.transform.y - OFFSET) - CHEST_LENGTH - delta); 

      //Left arm
      line(this.transform.x, (this.transform.y - OFFSET) - CHEST_LENGTH,  this.transform.x - HAND_LENGTH, (this.transform.y - OFFSET) - CHEST_LENGTH - delta); 

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


   setColor()
   {
      fill(0);
      strokeWeight(2);
   }


   draw()
   {
      this.setColor();

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

      this[this.state](); // Draw the current state
   }
}


export {Character,LEFT_KEY, RIGHT_KEY, JUMP_KEY, FORWARD, BACKWARD, UPWARD};


