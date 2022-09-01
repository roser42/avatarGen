let grid = [];
const rows = 31;
let canv, col, bgCol, curPalette;

//#region Palettes
const palette1 = [
  [255, 185, 151],
  [246, 126, 125],
  [132, 59, 98],
  [110, 3, 45],
  [116, 84, 106],
];

const palette2 = [
  [186, 209, 205],
  [242, 209, 201],
  [224, 134, 211],
  [131, 50, 172],
  [70, 39, 73],
];

const palette3 = [
  [57, 0, 153],
  [158, 0, 89],
  [255, 0, 84],
  [255, 84, 0],
  [255, 189, 0],
];

const palette4 = [
  [111, 191, 183],
  [242, 198, 65],
  [242, 149, 68],
  [242, 102, 102],
  [3, 101, 140],
  [80, 191, 191]
];

//#endregion
const patlettes = [palette1, palette2, palette3, palette4];

function setup() {
  canv = createCanvas(400, 400);
  for (let i = 0; i < rows; i++) {
    const tiles = [];
    for (let i = 0; i < rows; i++) {
      tiles.push({ active: 0, color: undefined });
    }
    grid[i] = tiles;
  }
  bgCol = '#000000';
  curPalette = randArrEl(patlettes);
  console.log(curPalette);
  background(bgCol);
  drowPixels();
}

function drowPixels() {
  clearCtx();
  curPalette = randArrEl(patlettes);

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
  background(bgCol);
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

function randArrEl(arr) {
  return arr[rand(0, arr.length)];
}

function getColor() {
  return curPalette[rand(0, curPalette.length)];
}

function save() {
  saveCanvas(canv, 'avatar', 'png');
}

document.getElementById("save").addEventListener("click", () => save());
document.getElementById("gen").addEventListener("click", () => drowPixels());