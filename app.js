const canvas = document.getElementById("layer1");
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

const canvasBackground = document.getElementById("layer2");
const ctxBackground = canvasBackground.getContext('2d');
const CANVASBACKGROUND_HEIGHT = canvasBackground.height = 600;
const CANVASBACKGROUND_WIDTH = canvasBackground.width = 600;

const canvasBubble = document.getElementById("layer3");
const ctxBubble = canvasBubble.getContext('2d');
const CANVASBubble_HEIGHT = canvasBubble.height = 600;
const CANVASBubble_WIDTH = canvasBubble.width = 600;

var Font = new FontFace('myFont', 'url(images/Apple.ttf)');

Font.load();

const houseFirst = new Image();
houseFirst.src = 'images/house2.png';

const houseSecond = new Image();
houseSecond.src = 'images/house3.png';

const egg = new Image();
egg.src = 'images/egg.png';

const animals = new Image();
animals.src = 'images/animals.png';

const arrowKeys = new Image();
arrowKeys.src = 'images/ArrowKeys.png';

const acceptButton = new Image();
acceptButton.src = 'images/AccceptKey.png';

const background = new Image();
background.src = 'images/GRASS.png';

const clouds = new Image();
clouds.src = 'images/clouds.png';

const bars = new Image();
bars.src = 'images/bars.png';

const foodBubble = new Image();
foodBubble.src = 'images/FoodBubble.png';

const energyBubble = new Image();
energyBubble.src = 'images/EnergyBubble.png';

var stage = "";
var refreshIntervalId;
var refreshIntervalIdFoodBar;
var refreshIntervalIdEnergyBar;
var refreshIntervalIdHealthBar;
var refreshIntervalAllBars;
var refreshIntervalFoodBubble;
var refreshIntervalEenergyBubble;

function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH){
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}

function drawSpriteSimple(img, dX, dY, dW, dH){
    ctx.drawImage(img,dX,dY,dW,dH)
}

function clearSprites(sX,sY,dX,dY){
    ctx.clearRect(sX,sY,dX,dY);
}

function drawBackgroundSprite(img, sX, sY, sW, sH, dX, dY, dW, dH){
    ctxBackground.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}

function drawBubble(img,dX,dY,dW,dH){
    ctxBubble.drawImage(img,dX,dY,dW,dH);
}

function clearBubble(sX,sY,dX,dY){
    ctxBubble.clearRect(sX,sY,dX,dY);
}

function clear(sX,sY,dX,dY){
    ctx.clearRect(sX,sY,dX,dY);
}
function drawBackground(img, dX, dY, dW, dH){
    ctxBackground.drawImage(img,dX,dY,dW,dH);
}

function clearBackground(sX,sY,dX,dY){
    ctxBackground.clearRect(sX,sY,dX,dY);
}


const map = {
    cols: 8,
    rows: 8,
    tsize: 80,
    tiles: [
      2, 2, 2, 2, 2, 2, 2, 2,
      2, 2, 2, 2, 2, 2, 2, 2,
      2, 2, 2, 2, 2, 2, 2, 2,
      1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1
    ],
    getTile(col, row) {
      return this.tiles[row * map.cols + col]
    }
  };
  
function renderMap(){
    for (let c = 0; c < map.cols; c++) {
        for (let r = 0; r < map.rows; r++) {
          const tile = map.getTile(c, r);
          if (tile !== 0) { 
            ctxBackground.drawImage(
                background, 
              (tile -1)*80, 
              0, 
              80, 
              80,
              c * 80, 
              r * 80, 
              80, 
              80 
            );
          }
        }
      }
    
    ctxBackground.drawImage(clouds,0,128, 384,128, 350, 80, 384,128);
    ctxBackground.drawImage(clouds,8,384, 376,128, -50, 20, 376,128);
}





class Animal{
        TypesOfAnimals = [
        {
            name: "mouse",
            direction:
            [
                {
                    name:"left",
                    colors: 
                    [
                        {
                            name: "brown",
                            sheetLocX: 1536,
                            sheetLocY: 294,
                        },
                        {
                            name: "brown-white",
                            sheetLocX: 1536,
                            sheetLocY: 192,
                        },
                        {
                            name: "white",
                            sheetLocX: 1536,
                            sheetLocY: 0,
                        },
                        {
                            name: "grey",
                            sheetLocX: 1536,
                            sheetLocY: 96,
                        },
                    ]
                },
                {
                    name: "right",
                    colors: 
                    [
                        {
                            name: "brown",
                            sheetLocX: 384,
                            sheetLocY: 864,
                        },
                        {
                            name: "brown-white",
                            sheetLocX: 384,
                            sheetLocY: 1152,
                        },
                        {
                            name: "white",
                            sheetLocX: 1152,
                            sheetLocY: 864,
                        },
                        {
                            name: "grey",
                            sheetLocX: 1152,
                            sheetLocY: 1152,
                        },
                    ]

                }
            ]
            
        },
        {
            name: "wolf",
            direction:
            [
                {
                    name:"left",
                    colors:
                    [
                        {
                            name: "grey-white",
                            sheetLocX: 1536,
                            sheetLocY: 864,
                        },
                        {
                            name: "orange-white",
                            sheetLocX: 1536,
                            sheetLocY: 1248,
                        },
                        {
                            name:"grey",
                            sheetLocX: 1536,
                            sheetLocY: 960,
                        },
                        {
                            name:"black",
                            sheetLocX: 1530,
                            sheetLocY: 1344,
                        },
                        {
                            name:"grey-brown",
                            sheetLocX: 1530,
                            sheetLocY: 1056,
                        },
                        {
                            name:"brown",
                            sheetLocX: 1536,
                            sheetLocY: 1152,
                        },

                    ]
                },
                {
                    name:"right",
                    colors:
                    [
                        {
                            name: "grey-white",
                            sheetLocX: 0,
                            sheetLocY: 2304,
                        },
                        {
                            name: "orange-white",
                            sheetLocX: 0,
                            sheetLocY: 2592,
                        },
                        {
                            name:"grey",
                            sheetLocX: 384,
                            sheetLocY: 2304,
                        },
                        {
                            name:"black",
                            sheetLocX: 384,
                            sheetLocY: 2592,
                        },
                        {
                            name:"grey-brown",
                            sheetLocX: 768,
                            sheetLocY: 2304,
                        },
                        {
                            name:"brown",
                            sheetLocX: 1152,
                            sheetLocY: 2304,
                        },

                    ]
                },
            ]
                  
        },
        {
            name: "bear",
            direction:
            [
                {
                    name: "left",
                    colors:
                    [
                        {
                            name:"brown",
                            sheetLocX: 1536,
                            sheetLocY: 384,
                        },
                        {
                            name:"orange",
                            sheetLocX: 1536,
                            sheetLocY: 480,
                        },
                        {
                            name:"black",
                            sheetLocX: 1536,
                            sheetLocY: 576,
                        },
                    ]
                },
                {
                    name: "right",
                    colors:
                    [
                        {
                            name:"brown",
                            sheetLocX: 0,
                            sheetLocY: 1728,
                        },
                        {
                            name:"orange",
                            sheetLocX: 384,
                            sheetLocY: 1728,
                            
                        },
                        {
                            name:"black",
                            sheetLocX: 768,
                            sheetLocY: 1728,
                        },

                    ]
                },
            ]          
        },
        {
            name: "sheep",
            direction: 
            [
                {
                    name: "left",
                    colors: 
                    [
                        {
                            name: "white",
                            sheetLocX: 1525,
                            sheetLocY: 672,
                        },
                        {
                            name: "brown",
                            sheetLocX: 1536,
                            sheetLocY: 768,
                        },
                    ]
                },
                {
                    name: "right",
                    colors: 
                    [
                        {
                            name: "white",
                            sheetLocX: 0,
                            sheetLocY: 2016,
                        },
                        {
                            name: "brown",
                            sheetLocX: 378,
                            sheetLocY: 2016,
                        },
                    ]
                }
            ]       
        },
    ]

    constructor(x,y, givenType, givenDirection, givenColor){
        this.x = x;
        this.y = y;
        this.frame = 0;
        this.type = this.TypesOfAnimals.find((typeOfAnimal) => typeOfAnimal.name == givenType);
        this.direction = this.type.direction.find((directionOfAnimal) => directionOfAnimal.name == givenDirection);
        this.color = this.direction.colors.find((colorOfAnimal) => colorOfAnimal.name == givenColor);
        this.sheetLocX = this.color.sheetLocX;
        this.sheetLocY = this.color.sheetLocY;
        this.sX = 96;
        this.sY = 96;   
        this.pixelPerMove = 20;
    } 
    updateDirection(giveDirection){
        this.direction = this.type.direction.find((directionOfAnimal) => directionOfAnimal.name == giveDirection);
        this.color = this.direction.colors.find((colorOfAnimal) => colorOfAnimal.name == this.color.name);
        this.sheetLocX = this.color.sheetLocX;
        this.sheetLocY = this.color.sheetLocY;
    }
    draw(){
        clear(this.x, this.y, this.sX,this.sY)
        drawSprite(animals,this.sheetLocX+(this.sX*0),this.sheetLocY,this.sX,this.sY,this.x ,this.y,this.sX,this.sY);
    }
    animateIdle(){
        clear(this.x, this.y, this.sX,this.sY);
        
        if(this.frame == 4){
            this.frame = 0;
        }  
        drawSprite(animals,this.sheetLocX+(this.sX*this.frame),this.sheetLocY,this.sX,this.sY,this.x ,this.y,this.sX,this.sY);
        this.frame++;   

    }
    moveUP(){
        clear(this.x, this.y, this.sX,this.sY)
             
        if(this.frame == 4){
            this.frame = 0;
        }  
        if(this.y < 260){
            this.y = this.y;
        }else{
            this.y -= this.pixelPerMove;
        }
        
        drawSprite(animals,this.sheetLocX+(this.sX*this.frame),this.sheetLocY,this.sX,this.sY,this.x ,this.y,this.sX,this.sY);
        this.frame++;   

    }
    moveDOWN(){
        clear(this.x, this.y, this.sX,this.sY)     
        if(this.frame == 4){
            this.frame = 0;
        }  
        if(this.y > 504){
            this.y = this.y;
        }
        else
        {
            this.y += this.pixelPerMove;
        }

        drawSprite(animals,this.sheetLocX+(this.sX*this.frame),this.sheetLocY,this.sX,this.sY,this.x ,this.y,this.sX,this.sY);
        this.frame++;
    }
    moveRIGHT(){
        clear(this.x, this.y, this.sX,this.sY)
        this.updateDirection("right");   
        if(this.frame == 4){
            this.frame = 0;
        }  
        if(this.x > 504){
            this.x  = this.x;
        }
        else
        {        
            this.x += this.pixelPerMove;   
        }

        drawSprite(animals,this.sheetLocX+(this.sX*this.frame),this.sheetLocY,this.sX,this.sY,this.x,this.y,this.sX,this.sY);
        this.frame++;

    }
    moveLEFT(){
        clear(this.x, this.y, this.sX,this.sY)
        this.updateDirection("left");    
        if(this.frame == 4){
            this.frame = 0;
        }  
        if(this.x < 0){
            this.x  = this.x;
        }
        else
        {        
            this.x -= this.pixelPerMove; 
        }
        drawSprite(animals,this.sheetLocX+(3*this.sX)-(this.sX*this.frame),this.sheetLocY,this.sX,this.sY,this.x,this.y,this.sX,this.sY);
        this.frame++;

    }
    clickChose(mouseX, mouseY){
        if(mouseX > this.x && mouseX < this.x +this.sX && mouseY > this.y && mouseY < this.y + this.sY){
           clear(0,0,canvas.width, canvas.height)
           clearInterval(refreshIntervalId);   
           stage = "choseHouse";
           ctx.font = "30px myFont"; // set font
           ctx.textAlign = "center"; // center text
           ctx.fillStyle = "#ffffff "
           ctx.fillText("Choose House", 300,100);;
           refreshIntervalId = setInterval(animateHouses,500);
           chosenAnimal = this;
        }
    } 
    changeColor(way){
        let index = this.direction.colors.findIndex((colorIndex) => colorIndex == this.color)
        if(way == "up"){
            index++;       
        if(index < 0 || index >= this.direction.colors.length){
            index = 0;
            }
        }
        else if(way == "down"){
            index--;
            if(index < 0 || index >= this.direction.colors.length){
                index = this.direction.colors.length-1;
            }
        }        
       
        this.color = this.direction.colors[index];
        this.sheetLocX = this.color.sheetLocX;
        this.sheetLocY = this.color.sheetLocY;
    }

    
}

class House{
    constructor(x,y,sX, sY, img){
        this.x = x;
        this.y = y;
        this.sX = sX;
        this.sY = sY;
        this.img = img;
        this.frame = 0;
    }

    drawHouse(newX, newY){
        this.x = newX;
        this.y = newY;
        drawSpriteSimple(this.img,this.x,this.y,this.sX,this.sY);  
    }

    animateIdle(){
        if(this.frame == 0){
            clear(this.x, this.y -10, this.sX,this.sY)
            drawSpriteSimple(this.img,this.x,this.y,this.sX,this.sY);
            this.frame++;
        }  
        else if(this.frame == 1){
            clear(this.x, this.y, this.sX,this.sY)
            drawSpriteSimple(this.img,this.x,this.y-10,this.sX,this.sY);
            this.frame = 0;
        }  
    }

    click(mouseX, mouseY){
        if(mouseX > this.x && mouseX < this.x +this.sX && mouseY > this.y && mouseY < this.y + this.sY){
           clear(0,0,canvas.width, canvas.height);
           clearInterval(refreshIntervalId);
           stage = "choseColor";
           ctx.textAlign = "center"; // center text
           ctx.fillStyle = "#ffffff "
           ctx.fillText("Choose Color", 300,100);;
           chosenAnimal.x = canvas.width/2-chosenAnimal.sX/2;
           chosenAnimal.y = canvas.height/2-chosenAnimal.sY/2;
           refreshIntervalId = setInterval(animateChosenAnimal,100);
           rightArrow.draw("idle");
           leftArrow.draw("idle");
           acceptBtn.draw("idle");
           chosenHouse = this;
        }       
    } 
}

class Arrow{

    directionsOfArrow =[
        {
            name: "right",
            states: [
            {
                name:"idle",
                sheetLocX: 240,
                sheetLocY: 30,
            },
            {
                name:"cliked",
                sheetLocX: 240,
                sheetLocY: 270,
            }
            ]
        },
        {
            name: "left",
            states: [
            {
                name:"idle",
                sheetLocX: 30,
                sheetLocY: 30,
            },
            {
                name:"cliked",
                sheetLocX: 30,
                sheetLocY: 270,
            }
            ]
        },

    ]

    constructor(x,y, givenDirection){
        this.x = x;
        this.y = y;
        this.direction = this.directionsOfArrow.find((directionOfArrow) => directionOfArrow.name == givenDirection);
        this.sX = 190;
        this.sY = 220;  
        this.scaledX = 95;
        this.scaledY = 110;
    }
    
    draw(givenState){
        this.state = this.direction.states.find((state) => state.name == givenState);
        this.sheetLocX = this.state.sheetLocX;
        this.sheetLocY = this.state.sheetLocY;
        drawSprite(arrowKeys, this.sheetLocX, this.sheetLocY, this.sX, this.sY, this.x, this.y, this.scaledX, this.scaledY);
    }

    clickClicked(mouseX, mouseY){
        if(mouseX > this.x && mouseX < this.x +this.scaledX && mouseY > this.y && mouseY < this.y + this.scaledY){
           clear(this.x, this.y, this.scaledX,this.scaledY)
           this.draw("cliked"); 

            if (this.direction.name == "right"){
                chosenAnimal.changeColor("up");
            }
            if (this.direction.name == "left"){
                chosenAnimal.changeColor("down");
            }                    
        }      
    }
    reset(){
        if(stage == "choseColor"){
            clear(this.x, this.y, this.scaledX,this.scaledY)
            this.draw("idle");        
        }
              
    }


}

class AcceptBtn{

    statesOfButton = [
        {
            name:"idle",
            sheetLocX: 20,
            sheetLocY: 20,
        },
        {
            name:"clicked",
            sheetLocX: 20,
            sheetLocY: 220,
        }
    ]

    constructor(x,y){
        this.x = x;
        this.y = y;
        this.state;
        this.sX = 310;
        this.sY = 180;  
        this.scaledX = 155;
        this.scaledY = 90;
    }
    draw(givenState){
        this.state = this.statesOfButton.find((stateOfBtn) => stateOfBtn.name == givenState);
        this.sheetLocX = this.state.sheetLocX;
        this.sheetLocY = this.state.sheetLocY;
        drawSprite(acceptButton, this.sheetLocX, this.sheetLocY, this.sX, this.sY, this.x, this.y, this.scaledX, this.scaledY);
    }
    clickClicked(mouseX, mouseY){
        if(mouseX > this.x && mouseX < this.x +this.scaledX && mouseY > this.y && mouseY < this.y + this.scaledY){   
            stage = "life";           
            clear(this.x, this.y, this.scaledX,this.scaledY)
            this.draw("clicked");          
            clear(0,0,canvas.width, canvas.height)
            clearInterval(refreshIntervalId);  
            chosenAnimal.x = canvas.width/2-chosenAnimal.sX/2;
            chosenAnimal.y = canvas.height/2-chosenAnimal.sY/2;
            chosenHouse.drawHouse(10,40);
            chosenAnimal.draw();
            renderMap();
            window.addEventListener("keydown", keysPressed, false);
            window.addEventListener("keyup", keysReleased, false);  
            refreshIntervalId = setInterval(function(){  move_able = true;}, 100 );  
            foodBar.drawFullLevel();
            energyBar.drawFullLevel();
            healthBar.drawFullLevel();
            refreshIntervalIdFoodBar = setInterval(function(){

                    foodBar.currentLevel -= 1;

            },2000);
            refreshIntervalIdEnergyBar = setInterval(function(){

                    energyBar.currentLevel -= 1;

            },3000);
            refreshIntervalIdHealthBar = setInterval(function(){
                if(foodBar.currentLevel <= 0 || energyBar.currentLevel <= 0){
                    healthBar.currentLevel -= 1;
                }
                if(healthBar.currentLevel <= 0){
                    console.log("gameover");
                    clearInterval(refreshIntervalId);
                    clearInterval(refreshIntervalIdFoodBar);
                    clearInterval(refreshIntervalIdEnergyBar);
                    clearInterval(refreshIntervalAllBars);
                    clearInterval(refreshIntervalFoodBubble);
                    clearInterval(refreshIntervalEenergyBubble);
                    clearInterval(refreshIntervalIdHealthBar);
                    clearBubble(0,0,canvasBackground.width, canvasBackground.height);
                    clearSprites(0,0,canvas.width, canvas.height);
                    clearBackground(0,0,canvasBubble.width, canvasBubble.height);
                    ctx.font = "50px myFont"; // set font
                    ctx.textAlign = "center"; // center text
                    ctx.fillStyle = "#ffffff "
                    ctx.fillText("GAME OVER", 305,300);

                }
            },100);
            refreshIntervalAllBars = setInterval(function(){
                foodBar.drawCurrentLevel();
                energyBar.drawCurrentLevel();
                healthBar.drawCurrentLevel();
            },100)
            drawFoodAndEnergy();
            bubbleFoodTutorial();
            document.getElementById("layer1").style.zIndex = 1;
            document.getElementById("layer3").style.zIndex = 2;

        }      
    }

    reset(){
        if(stage == "choseColor"){
            clear(this.x, this.y, this.scaledX,this.scaledY)
            this.draw("idle");        
        }             
    }
}

function drawFoodAndEnergy(){
    drawBackgroundSprite(bars,0,938,126,140,20,510,63,70);
    drawBackgroundSprite(bars,7,231,105,105,510,510,63,63);

}

function bubbleFoodTutorial(){
    refreshIntervalFoodBubble = setInterval(function(){
        if(chosenAnimal.x < 53 && chosenAnimal.y > 400){
        drawBubble(foodBubble,30,382,216,150);
        }
        else if(chosenAnimal.x > 53 || chosenAnimal.y < 400)
        {
            clearBubble(30,382,216,150);
        }
        if(chosenAnimal.x > 450 && chosenAnimal.y > 450){
            drawBubble(energyBubble,360,392,205,150);
        }
        else if(chosenAnimal.x < 450 || chosenAnimal.y < 450)
        {
            clearBubble(360,392,205,150);
        }
    },
     150);   
}
 



class Level {

    colorsOfLevels = [
        {
            name:"green",
            sheetLocX: 987,
            sheetLocY: 168,
        },
        {
            name:"red",
            sheetLocX: 1176,
            sheetLocY: 28,
        },
        {
            name:"yellow",
            sheetLocX: 987,
            sheetLocY: 28,
        },
        {
            name:"blue",
            sheetLocX: 1169,
            sheetLocY: 168,
        }

    ]


    constructor(x,y, givenColor){
        this.x = x;
        this.y = y;
        this.sX = 21;
        this.sY = 35;  
        this.color = this.colorsOfLevels.find((colorOfLevel) => colorOfLevel.name == givenColor);
        this.sheetLocX = this.color.sheetLocX;
        this.sheetLocY = this.color.sheetLocY;
        this.scaledX = 9;
        this.scaledY = 16;

    }

    draw(){
        clear(this.x, this.y, this.scaledX,this.scaledY)
        drawSprite(bars,this.sheetLocX,this.sheetLocY,this.sX,this.sY,this.x ,this.y,this.scaledX,this.scaledY);
    }
    clear(){
        clear(this.x, this.y, this.scaledX,this.scaledY);
    }
    add(){
        drawSprite(bars,this.sheetLocX,this.sheetLocY,this.sX,this.sY,this.x ,this.y,this.scaledX,this.scaledY);
    }
}


class Bar{

    icons = [
        {
            name: "heart",
            sheetLocX: 14,
            sheetLocY: 28,
            sX:84,
            sY:70,
            scaledX: 24,
            scaledY: 20,
        },
        {
            name: "food",
            sheetLocX: 0,
            sheetLocY: 938,
            sX:126,
            sY:140,
            scaledX: 18,
            scaledY: 20,
        },
        {
            name: "energy",
            sheetLocX: 7,
            sheetLocY: 231,
            sX: 105,
            sY: 105,
            scaledX: 20,
            scaledY: 20,
        }

    ]


    constructor(x,y, givenColor, givenIcon){
        this.x = x;
        this.y = y;
        this.sX = 329;
        this.sY = 49;  
        this.sheetLocX = 455;
        this.sheetLocY = 147
        this.scaledX = 148;
        this.scaledY = 22;
        this.color = givenColor;
        this.icon = this.icons.find((iconOfBar) => iconOfBar.name == givenIcon);
        this.levels = [];
        for(let i =0 ; i<14 ; i++){
            this.levels.push((new Level((this.x+5) + (10*i), this.y + 3, this.color)));
        }
        this.maxLevels = 14;
        this.currentLevel= 14;
    }

    draw(){
        clear(this.x, this.y, this.scaledX,this.scaledY)
        drawSprite(bars,this.sheetLocX,this.sheetLocY,this.sX,this.sY,this.x ,this.y,this.scaledX,this.scaledY);  
        drawSprite(bars,this.icon.sheetLocX,this.icon.sheetLocY,this.icon.sX,this.icon.sY,this.x -30,this.y,this.icon.scaledX,this.icon.scaledY);          
        this.levels.forEach(element => { element.draw() });
    }
    

    drawCurrentLevel(){
        this.levels = []
        if(this.currentLevel < 0){
            this.currentLevel = 0;
        }
        else{
            for(let i =0 ; i<this.currentLevel ; i++){
            this.levels.push((new Level((this.x+5) + (10*i), this.y + 3, this.color)));
        } 
        this.draw();
        }
    }

    drawFullLevel(){
        this.levels = []
        for(let i =0 ; i<14 ; i++){
            this.levels.push((new Level((this.x+5) + (10*i), this.y + 3, this.color)));
        }
        this.draw();
    }

}



var chosenAnimal;
var chosenHouse;

var Mouse = new Animal(80,canvas.height/1.3,"mouse","right","white");

var Dog = new Animal(200,canvas.height/1.3,"wolf","right","grey");

var Bear = new Animal(320,canvas.height/1.3,"bear","right","brown");

var Sheep = new Animal(440,canvas.height/1.3,"sheep","right","brown");

var houseOne = new House(60,canvas.height/2,200,200, houseFirst);

var houseTwo = new House(350,canvas.height/2,200,200, houseSecond);

var rightArrow = new Arrow(400,250,"right");

var leftArrow = new Arrow (100,250,"left");

var acceptBtn = new AcceptBtn(430,500);

var foodBar = new Bar(430,20, "yellow", "food");

var energyBar = new Bar(430,50, "blue", "energy");

var healthBar = new Bar(430,80, "green", "heart");



function animate(){   
    Mouse.animateIdle();
    Dog.animateIdle();
    Bear.animateIdle();
    Sheep.animateIdle();  
}

function animateHouses(){
    houseOne.animateIdle();
    houseTwo.animateIdle();
}

function animateChosenAnimal(){
    chosenAnimal.animateIdle();
}

function roundRect(x, y, w, h, radius)
{
  var r = x + w;
  var b = y + h;
  ctx.beginPath();
  ctx.moveTo(x+radius, y);
  ctx.lineTo(r-radius, y);
  ctx.quadraticCurveTo(r, y, r, y+radius);
  ctx.lineTo(r, y+h-radius);
  ctx.quadraticCurveTo(r, b, r-radius, b);
  ctx.lineTo(x+radius, b);
  ctx.quadraticCurveTo(x, b, x, b-radius);
  ctx.lineTo(x, y+radius);
  ctx.quadraticCurveTo(x, y, x+radius, y);
  ctx.stroke();
}

class myBtn{
    constructor(x, y, w, h, radius, color) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.radius = radius;
        this.color = color;
    }
    
     drawObject() {
        ctx.roundRect(this.x, this.y, this.w, this.h, this.radius);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}


function drawChoseMenu(){
    function scalePreserveAspectRatio(imgW,imgH,maxW,maxH){
        return(Math.min((maxW/imgW),(maxH/imgH)));
    }
    let w=egg.width;
    let h=egg.height;
    let sizer=scalePreserveAspectRatio(w,h,canvas.width,canvas.height);
    ctx.drawImage(egg,0,0,w,h,canvas.width/4,canvas.height/4,w*sizer/2,h*sizer/2);   
    stage = "choseMenu";  
};



canvas.addEventListener('click', (event) => {
    const rect =canvas.getBoundingClientRect();
    const x = event.clientX  -rect.left;
    const y = event.clientY - rect.top;
    if(stage == "choseMenu"){
        Mouse.clickChose(x,y);
        Dog.clickChose(x,y);
        Bear.clickChose(x,y);
        Sheep.clickChose(x,y);
    }
    else if(stage == "choseHouse"){
        houseOne.click(x,y);
        houseTwo.click(x,y);
    }
    else if(stage == "choseColor"){       
        rightArrow.clickClicked(x,y);
        leftArrow.clickClicked(x,y);
        acceptBtn.clickClicked(x,y);
        setTimeout(function(){rightArrow.reset()},150);
        setTimeout(function(){leftArrow.reset()},150);
        setTimeout(function(){acceptBtn.reset()},150);
    }
});


 
var keys = [];

var move_able = true;
var foodTuorial = true;
var energyTutorial = true;

function keysPressed(e) {
    // store an entry for every key pressed
    keys[e.keyCode] = true; 
    // left
    if (keys[37] && move_able == true) {
      chosenAnimal.moveLEFT();
      move_able = false;
    }
 
    // right
    if (keys[39]&& move_able == true) {
        chosenAnimal.moveRIGHT();
        move_able = false;
    }
 
    // up
    if (keys[38]&& move_able == true) {
        chosenAnimal.moveUP();
        move_able = false;
    }
 
    // down
    if (keys[40]&& move_able == true) {
        chosenAnimal.moveDOWN();
        move_able = false;
    }
    if (keys[69]) {
        if(chosenAnimal.x < 53 && chosenAnimal.y > 400){
           if(foodBar.currentLevel < foodBar.maxLevels){
                foodBar.currentLevel += 1 
           }
        }
        else if(chosenAnimal.x > 450 && chosenAnimal.y > 450){
            if(energyBar.currentLevel < energyBar.maxLevels){
                energyBar.currentLevel += 1  
            }

        }
        
    }

 
    e.preventDefault();
          
}
 
function keysReleased(e) {
    // mark keys that were released
    keys[e.keyCode] = false;
}  


  
window.onload = function() {
    document.fonts.add(Font);
    
    ctx.font = "30px myFont"; // set font
	ctx.textAlign = "center"; // center text
    ctx.fillStyle = "#ffffff "
	ctx.fillText("Choose animal", 300,100);
    drawChoseMenu();
    refreshIntervalId = setInterval(animate,100); 
}


    














