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
let stringFlipper = new Map();



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
//n this will work!!!!
  //eval(`${bodiesData.getString(0, "theName")} = new ${stringFlipper.get(bodiesData.get(0, "type"))}();`);
  for (let row = 0; row<bodiesData.rows; row++){
    let tempThing = eval(`${bodiesData.get(row, "theName")} = new ${stringFlipper.get(bodiesData.get(row, "type"))}();`);
    tempThing.diameter = bodiesData.getNum(row, "diameter"); 
    tempThing.distanceFromSun = bodiesData.getNum(row, "distAu"); 
    tempThing.orbitalPeriod = bodiesData.getNum(row, "earthYr");
    tempThing.colour = bodiesData.get(row, "colour");
    if (bodiesData.get(row, "type") === "Star"){
      tempThing.x =row;
      tempThing.y = row;
      stars.push(tempThing);
    }
    else if (bodiesData.get(row, 'type') === "Planet"){
      planets.push(tempThing);
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
  stringFlipper.set('Star', Star);
  stringFlipper.set('Planet', Planet);
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
  for (let thePlanet of planets){
    thePlanet.display();
  }
  for (let theStar of stars){
    theStar.display();
  }
  // sun.display();
  // earth.display();
  // some.display();
  // othersome.display();
}
