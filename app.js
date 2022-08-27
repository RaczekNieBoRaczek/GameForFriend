const canvas = document.getElementById("layer1");
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

const canvasBackground = document.getElementById("layer2");
const ctxBackground = canvasBackground.getContext('2d');
const CANVASBACKGROUND_HEIGHT = canvasBackground.height = 600;
const CANVASBACKGROUND_WIDTH = canvasBackground.width = 600;



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


var stage = "";
var refreshIntervalId;

function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH){
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}

function drawSpriteSimple(img, dX, dY, dW, dH){
    ctx.drawImage(img,dX,dY,dW,dH)
}

function clear(sX,sY,dX,dY){
    ctx.clearRect(sX,sY,dX,dY);
}
function drawBackground(img, dX, dY, dW, dH){
    ctxBackground.drawImage(img,dX,dY,dW,dH);
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
                background, // image
              (tile -1)*80, // source x
              0, // source y
              80, // source width
              80,// source height
              c * 80, // target x
              r * 80, // target y
              80, // target width
              80 // target height
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
            colors:[
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
                }

            ],          
        },
        {
            name: "wolf",
            colors:[
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
                    name: "grey",
                    sheetLocX: 384,
                    sheetLocY: 2304,
                },
                {
                    name: "black",
                    sheetLocX: 384,
                    sheetLocY: 2592,
                },
                {
                    name: "grey-brown",
                    sheetLocX: 768,
                    sheetLocY: 2304,
                },
                {
                    name: "brown",
                    sheetLocX: 1152,
                    sheetLocY: 2304,
                },
            ],          
        },
        {
            name: "bear",
            colors:[
                {
                    name: "brown",
                    sheetLocX: 0,
                    sheetLocY: 1728,
                },
                {
                    name: "orange",
                    sheetLocX: 384,
                    sheetLocY: 1728,
                },
                {
                    name: "black",
                    sheetLocX: 768,
                    sheetLocY: 1728,
                },
            ],          
        },
        {
            name: "sheep",
            colors:[
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
            ],          
        },
    ]

    constructor(x,y, givenType, givenColor){
        this.x = x;
        this.y = y;
        this.frame = 0;
        this.type = this.TypesOfAnimals.find((typeOfAnimal) => typeOfAnimal.name == givenType);
        this.color = this.type.colors.find((colorOfAniaml) => colorOfAniaml.name == givenColor);
        this.sheetLocX = this.color.sheetLocX;
        this.sheetLocY = this.color.sheetLocY;
        this.sX = 96;
        this.sY = 96;   
    } 
    animateIdle(){
        clear(this.x, this.y, this.sY,this.sY)
        this.frame++;
        drawSprite(animals,this.sheetLocX+(this.sX*this.frame),this.sheetLocY,this.sX,this.sY,this.x ,this.y,this.sX,this.sY);
        if(this.frame == 3){
            this.frame = 0;
        }  
    }
    clickChose(mouseX, mouseY){
        if(mouseX > this.x && mouseX < this.x +this.sX && mouseY > this.y && mouseY < this.y + this.sY){
           clear(0,0,canvas.width, canvas.height)
           clearInterval(refreshIntervalId);   
           stage = "choseHouse";
           refreshIntervalId = setInterval(animateHouses,500);
           chosenAnimal = this;
        }
    } 
    changeColor(direction){
        let index = this.type.colors.findIndex((colorIndex) => colorIndex == this.color)
        if(direction == "up"){
            index++;       
        if(index < 0 || index >= this.type.colors.length){
            index = 0;
            }
        }
        else if(direction == "down"){
            index--;
            if(index < 0 || index >= this.type.colors.length){
                index = this.type.colors.length-1;
            }
        }        
       
 
        this.color = this.type.colors[index];
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
            clear(this.x, this.y -10, this.sY,this.sY)
            drawSpriteSimple(this.img,this.x,this.y,this.sX,this.sY);
            this.frame++;
        }  
        else if(this.frame == 1){
            clear(this.x, this.y, this.sY,this.sY)
            drawSpriteSimple(this.img,this.x,this.y-10,this.sX,this.sY);
            this.frame = 0;
        }  
    }

    click(mouseX, mouseY){
        if(mouseX > this.x && mouseX < this.x +this.sX && mouseY > this.y && mouseY < this.y + this.sY){
           clear(0,0,canvas.width, canvas.height);
           clearInterval(refreshIntervalId);
           stage = "choseColor";
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
        this.state = this.statesOfButton.find((stateOfBtn)=> stateOfBtn.name == givenState);
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
            refreshIntervalId = setInterval(animateChosenAnimal,100);
            renderMap();
            
        }      
    }
    reset(){
        if(stage == "choseColor"){
            clear(this.x, this.y, this.scaledX,this.scaledY)
            this.draw("idle");        
        }             
    }
}

var chosenAnimal;
var chosenHouse;

var Mouse = new Animal(80,canvas.height/1.5,"mouse","grey");

var Dog = new Animal(200,canvas.height/1.5,"wolf","grey");

var Bear = new Animal(320,canvas.height/1.5,"bear","brown");

var Sheep = new Animal(440,canvas.height/1.5,"sheep","brown");

var houseOne = new House(60,canvas.height/2,200,200, houseFirst);

var houseTwo = new House(350,canvas.height/2,200,200, houseSecond);

var rightArrow = new Arrow(400,250,"right");

var leftArrow = new Arrow (100,250,"left");

var acceptBtn = new AcceptBtn(430,500);

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
    ctx.drawImage(egg,0,0,w,h,canvas.width/4,canvas.height/8,w*sizer/2,h*sizer/2);   
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


  
window.onload = function() {
    drawChoseMenu();
    refreshIntervalId = setInterval(animate,100); 
}


    














