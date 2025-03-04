/**
 * Made with p5play!
 * https://p5play.org
 */

p5play.disableFriendlyErrors = true;

// Game variables
let instructions = 'BURGER vs SALAD';
let box;
let foodGroup;
let burgerImg, saladImg;

function preload() {
  // Preload images for better performance
  burgerImg = loadImage('burger-3.png');
  saladImg = loadImage('Salad-2.png');
}



function setup() {
  // Create a canvas that fills the screen
  new Canvas();
  
  // Set gravity
  world.gravity.y = 4;
  
  // Create food group
  foodGroup = new Group();
  
  // Configure food group defaults
  foodGroup.collider = 'dynamic';
  foodGroup.rotationLock = true;
  foodGroup.bounciness = .9;
  
}

function draw() {
  // Clear and set background
  clear();
  background(0);
  
  // Display instructions
  textSize(100);
  textAlign(CENTER);
  fill(255);
  text(instructions, canvas.w / 2, canvas.h / 2);
  
  // Create food on every frame like the original
    if (frameCount % 2 === 0) { // Change this number to control     generation speed
    createFood();
  }
  
  // Handle box movement when dragging
  if (mouse.dragging() && box) {
    box.moveTowards(mouse);
  }
  
  // Remove sprites only when they're off screen
  for (let sprite of foodGroup) {
    if (sprite.y > canvas.h + 100 || 
        sprite.y < -100 || 
        sprite.x > canvas.w + 100 || 
        sprite.x < -100) {
      sprite.remove();
    }
  }
}

function createFood() {
  // Create burger
  let burger = new foodGroup.Sprite();
  burger.x = mouse.x + 125;
  burger.y = mouse.y;
  burger.w = 100;
  burger.h = 100;
  burger.img = burgerImg;
  burger.scale = 1.5;
  
  // Create salad
  let salad = new foodGroup.Sprite();
  salad.x = mouse.x - 125;
  salad.y = mouse.y;
  salad.w = 100;
  salad.h = 100;
  salad.img = saladImg;
  salad.scale = 0.45;
}

function mousePressed() {
  // Create box on mouse press
  box = new Sprite(mouse.x, mouse.y, 200, 300);
  box.img = burgerImg;
  box.scale = 3;
  box.collider = 'dynamic';
  // box.mass = 50;
}

function windowResized() {
  // Handle window resizing
  resizeCanvas(windowWidth, windowHeight);
}