/**
 * Represents a canvas element.
 * @type {HTMLCanvasElement}
 */
var canvas = document.querySelector('canvas');  

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

/**
 * Draws a filled rectangle on the canvas.
 * @param {number} x - The x-coordinate of the top-left corner of the rectangle.
 * @param {number} y - The y-coordinate of the top-left corner of the rectangle.
 * @param {number} width - The width of the rectangle.
 * @param {number} height - The height of the rectangle.
 */
// function fillRect(x, y, width, height) {
//   c.fillRect(x, y, width, height);
// }

// Example usage of the fillRect function
// c.fillStyle = 'rgba(255, 0, 0, 0.5)';
// fillRect(100, 100, 100, 100);
// c.fillStyle = 'rgba(0, 0, 255, 0.5)';
// fillRect(300, 100, 100, 100);
// c.fillStyle = 'rgba(0, 255, 0, 0.5)';
// fillRect(200, 300, 100, 100);

// console.log(canvas);

// Line
// c.beginPath();
// c.moveTo(50, 300);
// c.lineTo(300, 100);
// c.lineTo(400, 300);
// c.lineTo(50, 300 );
// c.strokeStyle = "#fa34a3";
// c.stroke()

// Arc/ Circle
// c.beginPath();
// c.arc(300, 300, 30, 0, Math.PI * 2, false);
// c.strokeStyle = 'blue';
// c.stroke();

// for(let i = 0; i < 3; i++) {
//   let x = Math.random() * window.innerWidth;
//   let y = Math.random() * window.innerHeight;
//   let randomColor = Math.floor(Math.random() * 999999)
//   c.beginPath();
//   c.arc(x, y, 50, 0, Math.PI * 2, false);
//   c.strokeStyle = `#${randomColor}`;
//   c.stroke();
// }

var mouse = {
  x: undefined,
  y: undefined
}
var maxRadius=40;
var minRadius=2;

var colorArray = [
  '#2c3e50',
  '#e74c3c',
  '#ecf0f1',
  '#1498db',
  '#2980b9',
];
window.addEventListener('mousemove', function(event) {
  mouse.x = event.x;
  mouse.y = event.y;
  // console.log('mouse', mouse)
});

window.addEventListener('resize', function() {
  console.log('resize')
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  init();
})

function Circle(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.minRadius = radius;
  this.radius = radius;
  this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
  this.draw = function() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  
    
    // c.fillText(`${dy}`, x, y + 10)
    // c.stroke();
  }

  this.update = function() {  
    if (this.x + this.radius >= innerWidth || this.x - this.radius <= 0) {  
      this.dx = -this.dx;
    }
  
    if (this.y + this.radius >= innerHeight || this.y - this.radius <= 0) {  
      this.dy = -this.dy;
    }
  
    this.x += this.dx;
    this.y += this.dy;
    // c.fillText(`${this.dx}`, this.x, this.y)
    // interactivity
    if(mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y -this.y < 50 && mouse.y - this.y > -50) {
      // console.log('mouse.x - this.x',this.x)
      // console.log('mouse.x - this.x',this.y)
      if (this.radius < maxRadius) {
        this.radius += 1;
      }
    } else if(this.radius > this.minRadius) {
      this.radius -= 1;
    }
   
    this.draw();
  }
}

var circleArray = [];

function init() {
  circleArray = [];
  for (let i = 0; i < 800; i++) {
    var radius = Math.random() * 3 + 1;
    var x = Math.random() * (innerWidth - radius * 2) + radius;
    var y = Math.random() * (innerHeight - radius * 2) + radius;
    var dx = (Math.random() - 0.5);
    var dy = (Math.random() - 0.5);
    circleArray.push(new Circle(x, y, dx, dy, radius));
  }

  // animate()
}


function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);
  // circle.update();
  for(var i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  } 
  
}

init();
animate()