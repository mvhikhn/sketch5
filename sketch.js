const CYCLE = 300;
let cols = createCols("https://coolors.co/fed9ed-e7bcde-bb9cc0-67729d");
let bgCol = cols[0];
let lineCol = cols.splice(1, cols.length - 1);

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  let dep = max(width, height);
  ortho(-width / 2, width / 2, -height / 2, height / 2, -dep * 3, dep * 3);
}

function draw() {
  randomSeed(0);
  background(bgCol);
  let fr = (frameCount % CYCLE) / CYCLE;
  let maxDim = min(height, width) * 0.8;
  let num = 40;
  let span = maxDim / num;
  rotateX(-PI / 5);
  rotateY(-PI / 6);

  push();
  stroke(0);
  noFill();
  box(maxDim);
  pop();

  let count = 0;
  for (let z = -maxDim / 2; z < maxDim / 2; z += span) {
    let radOffset = map(z, -maxDim / 2, maxDim / 2, 0, TAU);
    let waveRatio = map(abs(z), 0, maxDim / 2, 0.5, 0);
    push();
    translate(0, 0, z);
    wavedLinePlane(maxDim, maxDim * 0.5, sin(radOffset + fr * TAU) * 0.5, 3, lineCol[int(count + frameCount * 0) % lineCol.length]);
    pop();
    count++;
  }
}

function wavedLinePlane(w, h, waveHeightRatio, sw, sc) {
  strokeWeight(sw);
  noStroke();
  fill(bgCol);
  wavedPlane(w, h, waveHeightRatio, false);
  stroke(sc);
  noFill();
  wavedPlane(w, h, waveHeightRatio, true);
}

function wavedPlane(w, h, waveHeightRatio, isStroke) {
  const cycle = CYCLE / 2;
  const vertNum = 100;
  let fr = (frameCount % cycle) / cycle;
  const span = w / vertNum;

  if (isStroke) beginShape();
  else beginShape(TRIANGLE_STRIP);
  for (let x = -w / 2; x <= w / 2; x += span) {
    let radOffset = map(x, -w / 2, w / 2, 0, TAU * 2);
    let maxWaveH = h * 0.5 * waveHeightRatio;
    let waveH = sin(fr * TAU + radOffset) * maxWaveH;
    let y = waveH - maxWaveH;

    if (abs(y) > h * 0.5) {
      y = -y + random(-5, 5);
    }

    if (abs(x) > w * 0.5) {
      x = -x + random(-5, 5);
    }

    if (!isStroke) vertex(x, h, 0);
    vertex(x, y, 0);
  }

  if (!isStroke) vertex(w / 2, h, 0);
  endShape();
}

function createCols(_url) {
  let slash_index = _url.lastIndexOf('/');
  let pallate_str = _url.slice(slash_index + 1);
  let arr = pallate_str.split('-');
  for (let i = 0; i < arr.length; i++) {
    arr[i] = '#' + arr[i];
  }
  return arr;
}
