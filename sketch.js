let sigma, rho, beta
let dt
let x, y, z
let px, py, pz
let amt_points = 500
let points = []

let sliderGroup = [];
let X;
let Y;
let Z;
let centerX;
let centerY;
let centerZ;
let h = 20;

function setup() {
  createCanvas(500, 500, WEBGL);
  background(0);
  // translate(-200, -200)
  // frameRate(1)
  sigma = 10
  beta = 8 / 3
  rho = 28
  x = 1
  y = 1
  z = 1
  dt = 1 / 100
  //create sliders
  for (var i = 0; i < 7; i++) {
    if (i === 2) {
      sliderGroup[i] = createSlider(10, 800, 400);
    } else if (i === 6) {
      sliderGroup[i] = createSlider(0.1, 10, 2, 0);
    } else {
      sliderGroup[i] = createSlider(-400, 400, 0);
    }
    h = map(i, 0, 6, 5, 85);
    sliderGroup[i].position(10, height + h);
    sliderGroup[i].style('width', '80px');
  }
}

function draw() {
  background(0);
  let dx = sigma * (y - x)
  let dy = x * (rho - z) - y
  let dz = x * y - beta * z
  x += dx * dt
  y += dy * dt
  z += dz * dt
  points.push(new p5.Vector(x, y, z))
  if (points.length >= amt_points) points.shift()
  
  stroke(255);
  noFill();

  let scaleSize = sliderGroup[6].value()

  scale(scaleSize);

  let startcolor = color( 64,  58,  62)
  let endcolor = color(190,  88, 105)

  X = sliderGroup[0].value()
  Y = sliderGroup[1].value()
  Z = sliderGroup[2].value()
  centerX = sliderGroup[3].value()
  centerY = sliderGroup[4].value()
  centerZ = sliderGroup[5].value()
  camera(X, Y, Z, centerX, centerY, centerZ, 0, 1, 0)

  scale(scaleSize);
  beginShape()
    for (let i = points.length - 2; i > 0; i--) {
      let v = points[i]
      let nv = points[i + 1]
      let currColor = i > points.length * .1 ? lerpColor(
        startcolor,
        endcolor,
        i / (points.length * .9)
      ) : lerpColor(color(0, 0, 0), startcolor, i / (points.length * .1))
      stroke(currColor)
      line(v.x, v.y, v.z, nv.x, nv.y, nv.z)
    }
  endShape()
  // print(points)
}


