let canvas = document.getElementById("loading");
let cover_canvas = document.getElementById("cover");
let ctx = canvas.getContext("2d");
let cover_ctx = cover_canvas.getContext("2d");
ctx.imageSmoothingEnabled = true;
cover_ctx.imageSmoothingEnabled = true;
let mouseX = 0;
let mouseY = 0;
let mouse_radius = 40;
document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  // draw();
});

function setupCanvas(canvas) {
  var dpr = window.devicePixelRatio || 1;
  var rect = canvas.getBoundingClientRect();
  var ctx = canvas.getContext("2d");
  ctx.scale(dpr, dpr);
  return ctx;
}

function getSize(size) {
  return size;
  var dpr = window.devicePixelRatio || 1;
  return size / dpr;
}

function trueSize(size) {
  var dpr = window.devicePixelRatio || 1;
  return size * dpr;
}

function setCanvasSize() {
  // canvas.width = window.innerWidth;
  // canvas.height = window.innerHeight;
  // cover_canvas.width = window.innerWidth;
  // cover_canvas.height = window.innerHeight;
  cover_canvas.width = canvas.width;
  cover_canvas.height = canvas.height;
  height = canvas.height;
  width = canvas.width;
}

ctx = setupCanvas(canvas);
cover_ctx = setupCanvas(cover_canvas);

var height = getSize(canvas.height);
var width = getSize(canvas.width);
setCanvasSize();
