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

function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH){
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}
function clear(sX,sY,dX,dY){
    ctx.clearRect(sX,sY,dX,dY);
}

class Animal{
    
    constructor(x,y, sheetLocX, sheetLocY, sX, sY){
        this.x = x;
        this.y = y;
        this.frame = 0;
        this.sheetLocX = sheetLocX;
        this.sheetLocY = sheetLocY;
        this.sX = sX;
        this.sY = sY;
    }
    
    animateIdle(){
        clear(this.x, this.y, this.sY,this.sY)
        this.frame++;
        drawSprite(animals,this.sheetLocX+(this.sX*this.frame),this.sheetLocY,this.sX,this.sY,this.x ,this.y,this.sX,this.sY);
        if(this.frame == 3){
            this.frame = 0;
        }  
    }
    click(mouseX, mouseY){
        if(mouseX > this.x && mouseX < this.x +this.sX && mouseY > this.y && mouseY < this.y + this.sY){
           clear(0,0,canvas.width, canvas.height)
           clearInterval(refreshIntervalId);        
        }
        
    } 
}

class House{
    constructor(x,y, sX, sY){
        this.x = x;
        this.y = y;
        this.sX = sX;
        this.sY = sY;
    }

    drawHouse(){
        ctx.Image(houseFirst,100,100)
    }

    click(mouseX, mouseY){
        if(mouseX > this.x && mouseX < this.x +this.sX && mouseY > this.y && mouseY < this.y + this.sY){
           clear(0,0,canvas.width, canvas.height)
           stage = 3;
           
        }
        
    } 
}

let Hamster = new Animal(80,canvas.height/1.5, 384, 864,96,96);

let Dog = new Animal(200,canvas.height/1.5,0,2304,96,96);

let Bear = new Animal(320,canvas.height/1.5,768,1728,96,96);

let Sheep = new Animal(440,canvas.height/1.5,0,2016,96,96);

let house1 = new House(20,20,100,100)

function animate(){   
    Hamster.animateIdle();
    Dog.animateIdle();
    Bear.animateIdle();
    Sheep.animateIdle();  
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
    var w=egg.width;
    var h=egg.height;
    var sizer=scalePreserveAspectRatio(w,h,canvas.width,canvas.height);
    ctx.drawImage(egg,0,0,w,h,canvas.width/4,canvas.height/8,w*sizer/2,h*sizer/2);   
};

window.onload = function() {
    drawChoseMenu();
}

canvas.addEventListener('click', (event) => {
    const rect =canvas.getBoundingClientRect();
    const x = event.clientX  -rect.left;
    const y = event.clientY - rect.top;
    Hamster.click(x,y);
    Dog.click(x,y);
    Bear.click(x,y);
    Sheep.click(x,y);
});
    
var refreshIntervalId = setInterval(animate,100);













