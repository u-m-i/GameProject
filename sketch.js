// Constans for character structure

const SPINE_LENGTH = 34;
const HEAD_DIAMETER = 18;
const CHEST_LENGTH = (SPINE_LENGTH / 2) + 2;
const HAND_LENGTH = 12
const LEG_LENGTH = 14;

const MOVEMENT_SUM = 3;

let delta = 10
let offset = 18;
let maximumHeight;
let rightLimit, leftLimit;

let gameChar_x;
let gameChar_y;
let floorPos_y;
let coin;
let canyon;

// Booleans
let isFalling = false, isJumping = false, isPlummeting = false;
let isLeft = false, isRight = false;
// Array with all the moveable scene props
let props = [];

function propMovement(direction)
{
    for(let i = 0; i < props.length; ++i)
    {
        switch(direction)
        {

            case "up":
            case "left": 
                props[i].x += MOVEMENT_SUM
                break;

            case "right":
                props[i].x -= MOVEMENT_SUM
        }

    }
}

function setup()
{
	createCanvas(1024, 576);
	floorPos_y = height * 3/4;
	gameChar_x = width/2;
	gameChar_y = floorPos_y;
    maximumHeight = floorPos_y - 56;

    rightLimit = width - 200;

    leftLimit = width - rightLimit;

    coin = 
        {
            x : 450, 
            y : floorPos_y - 10, 
            isPicked : false,
        };

    canyon = 
        {
            x : 120,
            y : floorPos_y,
            limit : 80,
            size : 72,
            hasEntered : false
        };

    props.push(coin, canyon);
}

function draw()
{

	///////////DRAWING CODE//////////

	background(100,155,255); //fill the sky blue
    //console.log(gameChar_x);


	noStroke();
	fill(0,155,0);
	rect(0, floorPos_y, width, height - floorPos_y); //draw some green ground

    if(dist(gameChar_x, gameChar_y, coin.x, coin.y) < 26.5)
    {
        coin.isPicked = true;
    }

    if(!coin.isPicked)
    {
        // Coin
        stroke(0);
        fill(250, 255, 80);
        circle(coin.x, coin.y, 30);

        noStroke();

        fill(100, 100, 100, 100);
        ellipse(coin.x, coin.y + 20, 40, 3);
    }

	//draw the canyon
    fill(100, 155, 255);
    rect(canyon.x, floorPos_y, canyon.size, 144); 

    console.log(dist(gameChar_x, gameChar_y, (canyon.x + canyon.size), canyon.y));
    fill(0);
    ellipse((canyon.x + canyon.size), floorPos_y, 10, 10);

    if(dist(gameChar_x, gameChar_y, canyon.x, canyon.y) < 8 || dist(gameChar_x, gameChar_y, (canyon.x + canyon.size), canyon.y) < 5)
    {
        isFalling = true;
        canyon.hasEntered = true;
    }

	//the game character
	if(isLeft && (isFalling || isJumping))
	{
		// add your jumping-left code
        console.log(`isLeft : ${isLeft} isJumping: ${isJumping}`);

        //Spine
        stroke(0);
        line(gameChar_x, gameChar_y - offset,  gameChar_x, (gameChar_y - offset) - SPINE_LENGTH); 

        //Left leg
        line(gameChar_x, gameChar_y - offset,  (gameChar_x - (LEG_LENGTH / 2) - 4), gameChar_y - 10); 
        line((gameChar_x - (LEG_LENGTH / 2) - 4), gameChar_y - 10, (gameChar_x - (LEG_LENGTH / 2) + 2), gameChar_y - 2); 

        //Rigth leg
        line(gameChar_x, gameChar_y - offset,  gameChar_x + 14, gameChar_y); 

        //Head
        circle(gameChar_x, gameChar_y - SPINE_LENGTH - HEAD_DIAMETER - 4, HEAD_DIAMETER);

        //Right arm
        line(gameChar_x, (gameChar_y - offset) - CHEST_LENGTH,  gameChar_x + HAND_LENGTH, (gameChar_y - offset) - CHEST_LENGTH); 

        //Left arm
        line(gameChar_x, (gameChar_y - offset) - CHEST_LENGTH,  gameChar_x - HAND_LENGTH, (gameChar_y - offset) - CHEST_LENGTH - delta); 
        //Shadow
        fill(134);
        noStroke();
        ellipse(gameChar_x, gameChar_y + 6, 40,10);

	}
	else if(isRight && (isFalling || isJumping))
	{
		// add your jumping-right code
        console.log(`isRight : ${isRight} isJumping: ${isJumping}`);

        //Spine
        stroke(0);
        line(gameChar_x, gameChar_y - offset,  gameChar_x, (gameChar_y - offset) - SPINE_LENGTH); 

        //Left leg
        line(gameChar_x, gameChar_y - offset,  gameChar_x - 14, gameChar_y); 

        //Rigth leg
        line(gameChar_x, gameChar_y - offset,  (gameChar_x + (LEG_LENGTH / 2) + 4), gameChar_y - 10); 
        line((gameChar_x + (LEG_LENGTH / 2) + 4), gameChar_y - 10, (gameChar_x + (LEG_LENGTH / 2) - 2), gameChar_y - 2); 

        //Head
        circle(gameChar_x, gameChar_y - SPINE_LENGTH - HEAD_DIAMETER - 4, HEAD_DIAMETER);

        //Right arm
        line(gameChar_x, (gameChar_y - offset) - CHEST_LENGTH,  gameChar_x + HAND_LENGTH, (gameChar_y - offset) - CHEST_LENGTH - delta); 

        //Left arm
        line(gameChar_x, (gameChar_y - offset) - CHEST_LENGTH,  gameChar_x - HAND_LENGTH, (gameChar_y - offset) - CHEST_LENGTH); 
        //Shadow
        fill(134);
        noStroke();
        ellipse(gameChar_x, gameChar_y + 6, 40,10);

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
	else if(isFalling || isJumping || canyon.hasEntered)
	{
        //Spine
        stroke(0);
        line(gameChar_x, gameChar_y - offset,  gameChar_x, (gameChar_y - offset) - SPINE_LENGTH); 

        //Left leg
        line(gameChar_x, gameChar_y - offset,  (gameChar_x - LEG_LENGTH / 2) - 3, gameChar_y - 6); 
        line((gameChar_x - LEG_LENGTH / 2) - 3, gameChar_y - 6,  gameChar_x - LEG_LENGTH / 2 , gameChar_y); 

        //Rigth leg
        line(gameChar_x, gameChar_y - offset,  (gameChar_x + LEG_LENGTH / 2) + 3, gameChar_y - 6); 
        line((gameChar_x + LEG_LENGTH / 2) + 3, gameChar_y - 6,  gameChar_x + LEG_LENGTH / 2 , gameChar_y); 

        //Head
        circle(gameChar_x, gameChar_y - SPINE_LENGTH - HEAD_DIAMETER - 4, HEAD_DIAMETER);

        //Right arm
        line(gameChar_x, (gameChar_y - offset) - CHEST_LENGTH,  gameChar_x + HAND_LENGTH, (gameChar_y - offset) - CHEST_LENGTH - delta); 

        //Left arm
        line(gameChar_x, (gameChar_y - offset) - CHEST_LENGTH,  gameChar_x - HAND_LENGTH, (gameChar_y - offset) - CHEST_LENGTH - delta); 

        //Shadow
        fill(134);
        noStroke();
        ellipse(gameChar_x, gameChar_y + 6, 40,10);
	}
	else // Idle
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


    if(isLeft && gameChar_x >= 0 )
    {
        gameChar_x-= 2;

        if(gameChar_x >= (leftLimit + 20))
        {
            // To all the props in the scene to move
            propMovement("left");
        }

    }

    if(isRight && gameChar_x <= width)
    {
        gameChar_x+= 2;

        if(gameChar_x >= (rightLimit - 20))
        {
            // To all the props in the scene to move
            propMovement("right");
        }

    }

    // Increase Y to simulate so it simulates gravity
    if(isFalling && (gameChar_y < floorPos_y || canyon.hasEntered))
    {
        gameChar_y += 1.2;
    }
    else if(isFalling && gameChar_y == floorPos_y)
    {
        isFalling = false;
    }


    if(isJumping && gameChar_y > maximumHeight)
    {
        gameChar_y -= 4; // 8 is the force of the jump
    }
    else if(gameChar_y == maximumHeight && isJumping)
    {
        isJumping = false;
        isFalling = true;
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

    if(keyCode == 32 && !isFalling && !isJumping)
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
