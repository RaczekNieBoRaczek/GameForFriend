const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;



const houseFirst = new Image();
houseFirst.src = 'images/house2.png';

const houseSecond = new Image();
houseSecond.src = 'images/house3.png';

const egg = new Image();
egg.src = 'images/egg.png';

const animals = new Image();
animals.src = 'images/animals.png';


var satge = "";
var refreshIntervalIdAnimals;
var refreshIntervalIdHouses;

function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH){
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}

function drawSpriteSimple(img, dX, dY, dW, dH){
    ctx.drawImage(img,dX,dY,dW,dH)
}

function clear(sX,sY,dX,dY){
    ctx.clearRect(sX,sY,dX,dY);
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
           clearInterval(refreshIntervalIdAnimals);   
           stage = "choseHouse";
           alert(stage);
           refreshIntervalIdAnimals = setInterval(animateHouses,500);
           chosenAnimal = this;
        }
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
        }
        
    } 
}

var chosenAnimal;

var Mouse = new Animal(80,canvas.height/1.5,"mouse","grey");

var Dog = new Animal(200,canvas.height/1.5,"wolf","grey");

var Bear = new Animal(320,canvas.height/1.5,"bear","brown");

var Sheep = new Animal(440,canvas.height/1.5,"sheep","brown");

var houseOne = new House(60,canvas.height/2,200,200, houseFirst);

var houseTwo = new House(350,canvas.height/2,200,200, houseSecond);

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
});


  
window.onload = function() {
    drawChoseMenu();
    refreshIntervalIdAnimals = setInterval(animate,100); 
}

    














