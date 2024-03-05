const SPINE_LENGTH = 34;

const HEAD_DIAMETER = 18;

const CHEST_LENGTH = (SPINE_LENGTH / 2) + 2;
const HAND_LENGTH = 12

const LEG_LENGTH = 14;

const MOVEMENT_SUM = 3;

const LEFT_ARROW_KEY_CODE = 37;
const RIGHT_ARROW_KEY_CODE = 39;

const LEFT_KEY = "A";


class Character
{
   #transform; // {p5.Vector}
   #velocity; // {p5.Vector}

   left = function()
   {
        //Spine
      stroke(0);
      line(this.#transform.x, this.#transform.y - offset,  this.#transform.x, (this.#transform.y - offset) - SPINE_LENGTH); 

      //Left leg
      line(this.#transform.x, this.#transform.y - offset,  this.#transform.x - 8, this.#transform.y); 

      //Rigth leg
      line(this.#transform.x, this.#transform.y - offset,  this.#transform.x + 9, this.#transform.y); 

      //Head
      circle(this.#transform.x, this.#transform.y - SPINE_LENGTH - HEAD_DIAMETER - 4, HEAD_DIAMETER);

      //Left arm
      line(this.#transform.x, (this.#transform.y - offset) - CHEST_LENGTH,  this.#transform.x - HAND_LENGTH + 2, ((this.#transform.y - offset) - CHEST_LENGTH) + 11); 

      //Right arm
      line(this.#transform.x, (this.#transform.y - offset) - CHEST_LENGTH,  this.#transform.x + HAND_LENGTH - 8, ((this.#transform.y - offset) - CHEST_LENGTH) + 13); 
      //Shadow
      fill(134);
      noStroke();
      ellipse(this.#transform.x, this.#transform.y + 6, 40,10);

   };

   right()
   {
      stroke(0);
      line(this.#transform.x, this.#transform.y - offset,  this.#transform.x, (this.#transform.y - offset) - SPINE_LENGTH); 

      //Left leg
      line(this.#transform.x, this.#transform.y - offset,  this.#transform.x - 8, this.#transform.y); 

      //Rigth leg
      line(this.#transform.x, this.#transform.y - offset,  this.#transform.x + 9, this.#transform.y); 

      //Head
      circle(this.#transform.x, this.#transform.y - SPINE_LENGTH - HEAD_DIAMETER - 4, HEAD_DIAMETER);

      //Right arm
      line(this.#transform.x, (this.#transform.y - offset) - CHEST_LENGTH,  this.#transform.x + HAND_LENGTH - 2, ((this.#transform.y - offset) - CHEST_LENGTH) + 11); 

      //Left arm
      line(this.#transform.x, (this.#transform.y - offset) - CHEST_LENGTH,  this.#transform.x - HAND_LENGTH + 8, ((this.#transform.y - offset) - CHEST_LENGTH) + 13); 

      //Shadow
      fill(134);
      noStroke();
      ellipse(this.#transform.x, this.#transform.y + 6, 40,10);
   }

   jumping()
   {
      stroke(0);
      line(this.#transform.x, this.#transform.y - offset,  this.#transform.x, (this.#transform.y - offset) - SPINE_LENGTH); 

      //Left leg
      line(this.#transform.x, this.#transform.y - offset,  (this.#transform.x - LEG_LENGTH / 2) - 3, this.#transform.y - 6); 
      line((this.#transform.x - LEG_LENGTH / 2) - 3, this.#transform.y - 6,  this.#transform.x - LEG_LENGTH / 2 , this.#transform.y); 

      //Rigth leg
      line(this.#transform.x, this.#transform.y - offset,  (this.#transform.x + LEG_LENGTH / 2) + 3, this.#transform.y - 6); 
      line((this.#transform.x + LEG_LENGTH / 2) + 3, this.#transform.y - 6,  this.#transform.x + LEG_LENGTH / 2 , this.#transform.y); 

      //Head
      circle(this.#transform.x, this.#transform.y - SPINE_LENGTH - HEAD_DIAMETER - 4, HEAD_DIAMETER);

      //Right arm
      line(this.#transform.x, (this.#transform.y - offset) - CHEST_LENGTH,  this.#transform.x + HAND_LENGTH, (this.#transform.y - offset) - CHEST_LENGTH - delta); 

      //Left arm
      line(this.#transform.x, (this.#transform.y - offset) - CHEST_LENGTH,  this.#transform.x - HAND_LENGTH, (this.#transform.y - offset) - CHEST_LENGTH - delta); 

      //Shadow
      fill(134);
      noStroke();
      ellipse(this.#transform.x, this.#transform.y + 6, 40,10);
   }

   falling()
   {
      stroke(0);
      line(this.#transform.x, this.#transform.y - offset,  this.#transform.x, (this.#transform.y - offset) - SPINE_LENGTH); 

      //Left leg
      line(this.#transform.x, this.#transform.y - offset,  (this.#transform.x - LEG_LENGTH / 2) - 3, this.#transform.y - 6); 
      line((this.#transform.x - LEG_LENGTH / 2) - 3, this.#transform.y - 6,  this.#transform.x - LEG_LENGTH / 2 , this.#transform.y); 

      //Rigth leg
      line(this.#transform.x, this.#transform.y - offset,  (this.#transform.x + LEG_LENGTH / 2) + 3, this.#transform.y - 6); 
      line((this.#transform.x + LEG_LENGTH / 2) + 3, this.#transform.y - 6,  this.#transform.x + LEG_LENGTH / 2 , this.#transform.y); 

      //Head
      circle(this.#transform.x, this.#transform.y - SPINE_LENGTH - HEAD_DIAMETER - 4, HEAD_DIAMETER);

      //Right arm
      line(this.#transform.x, (this.#transform.y - offset) - CHEST_LENGTH,  this.#transform.x + HAND_LENGTH, (this.#transform.y - offset) - CHEST_LENGTH - delta); 

      //Left arm
      line(this.#transform.x, (this.#transform.y - offset) - CHEST_LENGTH,  this.#transform.x - HAND_LENGTH, (this.#transform.y - offset) - CHEST_LENGTH - delta); 

      //Shadow
      fill(134);
      noStroke();
      ellipse(this.#transform.x, this.#transform.y + 6, 40,10);
   }

   idle()
   {
      //Spine
      stroke(0);
      line(this.#transform.x, this.#transform.y - offset,  this.#transform.x, (this.#transform.y - offset) - SPINE_LENGTH); 

      //Left leg
      line(this.#transform.x, this.#transform.y - offset,  this.#transform.x - 14, this.#transform.y); 

      //Rigth leg
      line(this.#transform.x, this.#transform.y - offset,  this.#transform.x + 14, this.#transform.y); 

      //Head
      circle(this.#transform.x, this.#transform.y - SPINE_LENGTH - HEAD_DIAMETER - 4, HEAD_DIAMETER);

      //Left arm
      line(this.#transform.x, (this.#transform.y - offset) - CHEST_LENGTH,  this.#transform.x + HAND_LENGTH, (this.#transform.y - offset) - CHEST_LENGTH); 

      //Right arm
      line(this.#transform.x, (this.#transform.y - offset) - CHEST_LENGTH,  this.#transform.x - HAND_LENGTH, (this.#transform.y - offset) - CHEST_LENGTH); 

      //Shadow
      fill(134);
      noStroke();
      ellipse(this.#transform.x, this.#transform.y + 6, 40,10);
   }


   draw()
   {
      this.#transform.add(this.#velocity); // Adds force to the body

      this[state](); // Draw the current state
   }
}


export {SPINE_LENGTH, HEAD_DIAMETER, CHEST_LENGTH, HAND_LENGTH, LEG_LENGTH, MOVEMENT_SUM, LEFT_ARROW_KEY_CODE, RIGHT_ARROW_KEY_CODE};


