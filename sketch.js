const SIDE_LENGTH = 600;
const NUM_GRID = 30;
const GRID_LENGTH = SIDE_LENGTH / NUM_GRID;

let matrix = [];
let playing = false;

function getNeighbour(i, j) {
  if (i < 0 || j < 0 || i >= NUM_GRID || j >= NUM_GRID) {
    return false;
  }
  return matrix[i][j];
}

function applyRules() {
  let new_matrix = matrix.map((arr) => arr.slice());
  for (let i = 0; i < NUM_GRID; ++i) {
    for (let j = 0; j < NUM_GRID; ++j) {
      let population = 0;
      for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
          if (x == 0 && y == 0) {
            continue;
          }
          if (getNeighbour(i + x, j + y)) {
            population++;
          }
        }
      }

      if (population < 2) {
        new_matrix[i][j] = false;
      } else if (population == 3 && !matrix[i][j]) {
        new_matrix[i][j] = true;
      } else if (population > 3) {
        new_matrix[i][j] = false;
      }
    }
  }
  matrix = new_matrix;
}

function mouseClicked() {
  const i = Math.floor(mouseX / GRID_LENGTH);
  const j = Math.floor(mouseY / GRID_LENGTH);
  matrix[i][j] = !matrix[i][j];
}

function setup() {
  createCanvas(SIDE_LENGTH, SIDE_LENGTH);
  for (let i = 0; i < NUM_GRID; i++) {
    matrix.push([]);
    for (let j = 0; j < NUM_GRID; j++) {
      matrix[i].push(false);
    }
  }

  button = createButton("Play/Stop");
  button.position(SIDE_LENGTH / 2 - 75, SIDE_LENGTH + 10);
  button.mousePressed(() => {
    playing = !playing;
  });

  random = createButton("Random");
  random.position(SIDE_LENGTH / 2 + 5, SIDE_LENGTH + 10);
  random.mousePressed(() => {
    if (!playing) {
      for (let i = 0; i < NUM_GRID; i++) {
        for (let j = 0; j < NUM_GRID; j++) {
          matrix[i][j] = Math.random() < 0.5;
        }
      }
    }
  });
}

function draw() {
  background(220);

  // draw grid lines
  for (let x = 0; x <= SIDE_LENGTH; x += SIDE_LENGTH / NUM_GRID) {
    for (let y = 0; y <= SIDE_LENGTH; y += SIDE_LENGTH / NUM_GRID) {
      stroke(0);
      strokeWeight(1);
      line(x, 0, x, SIDE_LENGTH);
      line(0, y, SIDE_LENGTH, y);
    }
  }

  fill("black");
  noStroke();
  if (!playing) {
    frameRate(60);
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix.length; j++) {
        if (matrix[i][j]) {
          square(i * GRID_LENGTH, j * GRID_LENGTH, GRID_LENGTH);
        }
      }
    }
  } else {
    frameRate(2);
    applyRules();
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix.length; j++) {
        if (matrix[i][j]) {
          square(i * GRID_LENGTH, j * GRID_LENGTH, GRID_LENGTH);
        }
      }
    }
  }
}
