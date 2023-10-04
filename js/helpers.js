function drawRect(x, y, w, h, color = "red", _ctx = ctx) {
  _ctx.shadowBlur = 0;
  _ctx.fillStyle = color;
  _ctx.fillRect(x, y, w, h);
}

function drawCircle(r, x, y, color = "#000", lineWidth = 2, _ctx = ctx) {
  _ctx.beginPath();
  _ctx.arc(x, y, r, 0, 2 * Math.PI, false);
  _ctx.lineWidth = lineWidth;
  _ctx.strokeStyle = color;
  _ctx.stroke();
  _ctx.closePath();
}

function drawRoundedRect(
  x,
  y,
  width,
  height,
  radius,
  color = "green",
  lineWidth = 2
) {
  let path = new Path2D();
  path.moveTo(x + radius, y);
  path.lineTo(x + width - radius, y);
  path.quadraticCurveTo(x + width, y, x + width, y + radius);
  path.lineTo(x + width, y + height - radius);
  path.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  path.lineTo(x + radius, y + height);
  path.quadraticCurveTo(x, y + height, x, y + height - radius);
  path.lineTo(x, y + radius);
  path.quadraticCurveTo(x, y, x + radius, y);
  path.closePath();
  ctx.fillStyle = "#0000";
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.stroke(path);
}

function getRoundedRectPath(x, y, width, height, radius) {
  let path = new Path2D();
  path.moveTo(x + radius, y);
  path.lineTo(x + width - radius, y);
  path.quadraticCurveTo(x + width, y, x + width, y + radius);
  path.lineTo(x + width, y + height - radius);
  path.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  path.lineTo(x + radius, y + height);
  path.quadraticCurveTo(x, y + height, x, y + height - radius);
  path.lineTo(x, y + radius);
  path.quadraticCurveTo(x, y, x + radius, y);
  path.closePath();
  return path;
}

function clipCircle(r, x, y, _ctx = ctx) {
  _ctx.beginPath();
  _ctx.arc(x, y, r, 0, 2 * Math.PI, false);
  _ctx.clip();
}

function drawText(text, x, y, color = "#000", font_size = 50) {
  ctx.font = font_size + "px Lato";
  ctx.fillStyle = color;
  ctx.shadowColor = "#333c";
  ctx.shadowBlur = 5;
  ctx.lineWidth = 5;
  ctx.fillText(text, x - font_size / 3.5, y + font_size / 3);
}

function clockClip() {
  // clipCircle(circle_radiuses[0].circle, width / 2, height / 2);

  // let region = new Path2D();
  // region.rect(width / 2, height / 2, 300, 200);
  // region.rect(width / 2 - shape_size, height / 2, 100, 50);
  // ctx.clip(region, "evenodd");
  cover_ctx.globalCompositeOperation = "destination-out";

  cover_ctx.fill(
    getRoundedRectPath(
      width / 2,
      height / 2 - time_height / 2,
      time_width,
      time_height,
      32
    )
  );

  cover_ctx.beginPath();
  cover_ctx.arc(width / 2, height / 2, 100, 0, 2 * Math.PI, false);
  cover_ctx.closePath();
  // Add background last using "destination-over";
  cover_ctx.globalCompositeOperation = "destination-over";
}

const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const getDegree = function (degrees) {
  return (degrees * Math.PI) / 180;
};

function numberWithZero(number) {
  number = number + "";
  return number.length == 1 ? "0" + number : number;
}

function getDateParams() {
  let date = new Date();
  let hour = numberWithZero(date.getHours());
  let mins = numberWithZero(date.getMinutes());
  let sec = numberWithZero(date.getSeconds());
  let time = hour + mins;
  // let time = hour + sec;
  // return (date.getSeconds() + "" + date.getSeconds()).split("");
  return time.split("");
}

function calcDegree(number, ref) {
  let is_last = number == 0 || ref.numbers.length - 1 < number;

  let degree;
  if (is_last) {
    // ref.loop + 1;
    // console.log(360 + (ref.numbers.length - 1) * ref.degree);
    if (ref.last_number != number) {
      ref.loop++;
    }
    // let deg = ref.loop * 360;
    // return deg;
    degree = ref.loop * 360 * Math.sign(ref.degree);
  } else {
    degree =
      ref.loop * 360 * Math.sign(ref.degree) + parseInt(number) * ref.degree;
  }
  ref.last_number = number;
  return degree;
}
