// Constans for character structure

const SPINE_LENGTH = 34;
const HEAD_DIAMETER = 18;
const CHEST_LENGTH = (SPINE_LENGTH / 2) + 2;
const HAND_LENGTH = 12
const LEG_LENGTH = 14;

let offset = 18;

let gameChar_x;
let gameChar_y;
let floorPos_y;

// Booleans
let isFalling = false, isPlummeting = false;
let isLeft = false, isRight = false;

function setup()
{
	createCanvas(1024, 576);
	floorPos_y = height * 3/4;
	gameChar_x = width/2;
	gameChar_y = floorPos_y;
}

function draw()
{

	///////////DRAWING CODE//////////

	background(100,155,255); //fill the sky blue


	noStroke();
	fill(0,155,0);
	rect(0, floorPos_y, width, height - floorPos_y); //draw some green ground

	//draw the canyon

    isFalling = gameChar_y < floorPos_y;

	//the game character
	if(isLeft && isFalling)
	{
		// add your jumping-left code

	}
    else if(isJumping)
    {

    }
	else if(isRight && isFalling)
	{
		// add your jumping-right code

	}
	else if(isLeft && !isRight)
	{
        console.log(`isLeft : ${isLeft} isRight: ${isRight}`);

        //Spine
        stroke(0);
        line(gameChar_x, gameChar_y - offset,  gameChar_x, (gameChar_y - offset) - SPINE_LENGTH); 

        //Left leg
        line(gameChar_x, gameChar_y - offset,  gameChar_x - 8, gameChar_y); 

        //Rigth leg
        line(gameChar_x, gameChar_y - offset,  gameChar_x + 9, gameChar_y); 

        //Head
        circle(gameChar_x, gameChar_y - SPINE_LENGTH - HEAD_DIAMETER - 4, HEAD_DIAMETER);

        //Left arm
        line(gameChar_x, (gameChar_y - offset) - CHEST_LENGTH,  gameChar_x - HAND_LENGTH + 2, ((gameChar_y - offset) - CHEST_LENGTH) + 11); 

        //Right arm
        line(gameChar_x, (gameChar_y - offset) - CHEST_LENGTH,  gameChar_x + HAND_LENGTH - 8, ((gameChar_y - offset) - CHEST_LENGTH) + 13); 
        //Shadow
        fill(134);
        noStroke();
        ellipse(gameChar_x, gameChar_y + 6, 40,10);

	}
	else if(isRight && !isLeft)
	{
        //Spine
        stroke(0);
        line(gameChar_x, gameChar_y - offset,  gameChar_x, (gameChar_y - offset) - SPINE_LENGTH); 

        //Left leg
        line(gameChar_x, gameChar_y - offset,  gameChar_x - 8, gameChar_y); 

        //Rigth leg
        line(gameChar_x, gameChar_y - offset,  gameChar_x + 9, gameChar_y); 

        //Head
        circle(gameChar_x, gameChar_y - SPINE_LENGTH - HEAD_DIAMETER - 4, HEAD_DIAMETER);

        //Right arm
        line(gameChar_x, (gameChar_y - offset) - CHEST_LENGTH,  gameChar_x + HAND_LENGTH - 2, ((gameChar_y - offset) - CHEST_LENGTH) + 11); 

        //Left arm
        line(gameChar_x, (gameChar_y - offset) - CHEST_LENGTH,  gameChar_x - HAND_LENGTH + 8, ((gameChar_y - offset) - CHEST_LENGTH) + 13); 

        //Shadow
        fill(134);
        noStroke();
        ellipse(gameChar_x, gameChar_y + 6, 40,10);

	}
	else if(isFalling || isPlummeting)
	{
		// add your jumping facing forwards code

	}
	else
	{
        //Spine
        stroke(0);
        line(gameChar_x, gameChar_y - offset,  gameChar_x, (gameChar_y - offset) - SPINE_LENGTH); 

        //Left leg
        line(gameChar_x, gameChar_y - offset,  gameChar_x - 14, gameChar_y); 

        //Rigth leg
        line(gameChar_x, gameChar_y - offset,  gameChar_x + 14, gameChar_y); 

        //Head
        circle(gameChar_x, gameChar_y - SPINE_LENGTH - HEAD_DIAMETER - 4, HEAD_DIAMETER);

        //Left arm
        line(gameChar_x, (gameChar_y - offset) - CHEST_LENGTH,  gameChar_x + HAND_LENGTH, (gameChar_y - offset) - CHEST_LENGTH); 

        //Right arm
        line(gameChar_x, (gameChar_y - offset) - CHEST_LENGTH,  gameChar_x - HAND_LENGTH, (gameChar_y - offset) - CHEST_LENGTH); 

        //Shadow
        fill(134);
        noStroke();
        ellipse(gameChar_x, gameChar_y + 6, 40,10);

	}

	///////////INTERACTION CODE//////////
	//Put conditional statements to move the game character below here
    //

    if(isLeft && gameChar_x >= 0 )
    {
        gameChar_x--;
    }

    if(isRight && gameChar_x <= width)
    {
        gameChar_x++;
    }

}


function keyPressed()
{
	// if statements to control the animation of the character when
	// keys are pressed.
    //

    if(keyCode == 39)
    {
        isRight = true;
    }

    if(keyCode == 37)
    {
        isLeft = true;
    }

    console.log(keyCode);

    if(keyCode == 88 && !isFalling)
    {
        isJumping = true;
    }
}

function keyReleased()
{
    if(isLeft)
    {
        isLeft = false;
    }

    if(isRight)
    {
        isRight = false;
    }
}
