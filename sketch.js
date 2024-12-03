// Capstone Coding Project 
// Evalina Maille
// November 19, 2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

const AU = 35; 
const EARTH_YEAR = 36500;
let planets = [];
let moons = [];
let stars = [];

class Star {
  constructor(x, y) {
    this.x = x;
    this.y = y; 
    this.colour;
    this.mass;
    this.diameter;
    this.surfaceTemp;
    this.brightness; 
  }

  display() {
    fill(this.colour);
    stroke("white");
    circle(this.x, this.y, this.diameter); 
    //rotateY(millis(1000)/36);
  }
}

class Planet {
  constructor(astronomicalUnits, earthYears, orbiting){
    this.astronomicalUnits = astronomicalUnits;
    this.orbiting = orbiting;
    this.radians = 0;
    this.distanceFromSun = this.astronomicalUnits * AU + this.orbiting.diameter/2;
    this.x = Math.cos(this.radians)*this.distanceFromSun;
    this.y = Math.sin(this.radians)*this.distanceFromSun; 
    this.mass;
    this.diameter;
    this.orbitalPeriod = earthYears * EARTH_YEAR;
    this.orbitalVelocity = 2* Math.PI * this.distanceFromSun/this.orbitalPeriod;
    this.moons;
    this.ringSystem;
  }

  orbit(){
    this.radians += this.orbitalVelocity; 
    this.x = Math.cos(this.radians)*this.distanceFromSun;
    this.y = Math.sin(this.radians)*this.distanceFromSun; 
  }
  display(){
    fill(this.colour);
    circle(this.x, this.y, this.diameter);
    this.orbit(this.x, this.y);
    //console.log(earth.radians);
  }
}

//not working, need help 
function assignData(){
  for (let row = 0; row<bodiesData.rows; row++){
    let thing = abs[bodiesData.getString(row, "name")];
    if (bodiesData.getString(row, "type") === "Star"){
      thing =  new Star();
    }
    else if (bodiesData.getString(row, 'type') === "Planet"){
      thing =  new Planet();
    }
    thing.diameter = bodiesData.getNum(row, "diameter"); 
    thing.distanceFromSun = bodiesData.getNum(row, "distAu"); 
    thing.orbitalPeriod = bodiesData.getNum(row, "earthYr");
    thing.colour = bodiesData.getString(row, "colour");
    if (bodiesData.getString(row, "type") === "Star"){
      stars.push(thing);
    }
    else if (bodiesData.getString(row, 'type') === "Planet"){
      planets.push(thing);
    }
  }
}

// let sun = new Star(0, 0);

// // earth.mass = 5.97, earth.diameter = 3475, earth.distanceFromSun = 149.6;
// // earth.orbitalPeriod = 365.2, earth.orbitalVelocity = 29.8, earth.moons = 1, earth.ringSystem = false; 

function preload(){
  bodiesData = loadTable("SSDataSheet.csv", "csv", "header");
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  assignData();
  // sun.diameter = 300;
  // earth = new Planet(1, 1, sun);
  // earth.colour = "blue"; 
  // earth.diameter = 3; 
  // sun.colour = "yellow";
  // earth.distanceFromSun = 184;
}

//0.4	68	559

function draw() {
  background(0);
  orbitControl();
  for (planet in planets){
    this.display()
  }
  for (star in stars){
    this.display();
  }
  // sun.display();
  // earth.display();
  // some.display();
  // othersome.display();
}
