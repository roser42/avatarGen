var grid = [];
const rows = 31;
var col, bgCol;

var a = [
  [1, 0, 0, 0, 1],
  [0, 1, 0, 1, 0],
  [1, 0, 1, 0, 0],
  [0, 1, 0, 1, 0],
  [1, 0, 0, 0, 1],
];
var colors = [
  [111, 191, 183],
  [242, 198, 65],
  [242, 149, 68],
  [242, 102, 102],
  [3, 101, 140],
  [80, 191, 191]
];

function setup() {


  createCanvas(400, 400);
  for (let i = 0; i < rows; i++) {
    const tiles = [];
    for (let i = 0; i < rows; i++) {
      tiles.push({ active: 0, color: undefined });
    }
    grid[i] = tiles;
  }
  col = createColorPicker('#ffffff');
  bgCol = createColorPicker('#000000');
  background(bgCol.color());
  drowPixels();
}

function mousePressed() {
  clearCtx();
  drowPixels();
}

function drowPixels() {
  let offsetX = 5;
  let offsetY = 5;

  for (let j = 0; j < 9; j++) {
    if (j > 0) {
      offsetX += 8
      if (j % 3 == 0) {
        offsetX = 5
        offsetY += 8
      }
    }

    const color = getColor();
    const figure = genFigure();
    for (let x = 0; x < 5; x++) {
      for (let y = 0; y < 5; y++) {
        grid[x + offsetX][y + offsetY].active = figure[y][x];
        grid[x + offsetX][y + offsetY].color = color;
      }
    }
  }

  renderBoard();
}

function renderBoard() {
  noStroke();
  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < rows; y++) {
      if (grid[x][y].active == 1) {
        fill(grid[x][y].color);
        rect(x * (width / rows), y * (width / rows), (width / rows) + 1, (width / rows) + 1)
      }
    }
  }
}


function genFigure() {
  const figure = [];

  for (let i = 0; i < 5; i++) {
    let el1 = rand(0, 2);
    let el2 = rand(0, 2);
    let cent = rand(0, 2);
    figure.push([el1, el2, cent, el2, el1]);
  }
  return figure;
}

function clearCtx() {
  clear();
  background(bgCol.color());
  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < rows; y++) {
      grid[x][y].active = 0
    }
  }
}

function rand(min, max) {
  let rnd = Math.floor(Math.random() * (max - min)) + min;
  return rnd;
}

function getColor() {
  // grab a fil color
  let col;

  if (random() < 0.8) {
    col = colors[parseInt(random(colors.length))];
  } else {
    col = 100;
  }
  return col;
}