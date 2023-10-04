let cell_padding = 50;
let shape_size = height / 2.6;
let degree = 35;
let line_thicness = 5;
let cover_color = "#C62828";
let cover_border_color = "#B71C1C";
let time_height = 60;
let time_width = shape_size - cell_padding / 1.3;

let circle_radiuses = [
  {
    circle: shape_size,
    numbers: [],
    degree: 25,
    offset: 0,
    loop: 0,
  },
  {
    circle: shape_size - cell_padding,
    numbers: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    degree: 20,
    offset: 0,
    loop: 0,
  },
  {
    circle: shape_size - cell_padding * 2,
    numbers: [0, 1, 2, 3, 4, 5],
    degree: 21,
    offset: 0,
    loop: 0,
  },
  {
    circle: shape_size - cell_padding * 3,
    numbers: [],
    degree: 25,
    offset: 0,
    loop: 0,
  },
  {
    circle: shape_size - cell_padding * 3.5,
    numbers: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    degree: -34,
    offset: 0,
    loop: 0,
  },
  {
    circle: shape_size - cell_padding * 4.5,
    numbers: [0, 1, 2],
    degree: 55,
    offset: 0,
    loop: 0,
  },
];
let hourl = circle_radiuses[5];
let hourr = circle_radiuses[4];
let minl = circle_radiuses[2];
let minr = circle_radiuses[1];

function setup() {
  for (let i = 0; i < circle_radiuses.length; i++) {
    const radius = circle_radiuses[i].circle;
    let numbers = circle_radiuses[i].numbers;
    let text_degree = circle_radiuses[i].degree;
    let offset = circle_radiuses[i].offset;
    drawCircle(radius, width / 2, height / 2, "#3339");
    ctx.translate(width / 2, height / 2);
    ctx.rotate(-getDegree(offset));
    for (let j = 0; j < numbers.length; j++) {
      const hl_number = numbers[j];
      drawText(hl_number + "", radius - cell_padding / 2, 0);
      ctx.rotate(getDegree(text_degree));
    }
    ctx.resetTransform();
  }

  let line_count = (shape_size * 2) / line_thicness;
  let gap = -1;

  drawRoundedRect(
    width / 2,
    height / 2 - time_height / 2,
    time_width,
    time_height,
    32,
    cover_border_color,
    4
  );

  clipCircle(circle_radiuses[0].circle + 10, width / 2, height / 2, cover_ctx);

  ctx.shadowInset = true;

  ctx.shadowOffsetX = 3;
  ctx.shadowOffsetY = 3;
  ctx.shadowBlur = 10;
  ctx.shadowColor = "#000";
  drawCircle(shape_size, width / 2, height / 2, "#0000");
  ctx.shadowColor = cover_border_color;
  drawCircle(
    circle_radiuses[0].circle + 10,
    width / 2,
    height / 2,
    cover_border_color,
    20,
    cover_ctx
  );
  for (let i = 0; i < line_count; i++) {
    if (i % 2) continue;
    drawRect(
      i * line_thicness + (width / 2 - shape_size) + gap,
      height / 2 - shape_size,
      line_thicness,
      shape_size * 2,
      cover_color,
      cover_ctx
    );
  }

  clockClip();
}

function draw() {
  let time = getDateParams();
  gsap.to(hourl, {
    offset: calcDegree(time[0], hourl),
    duration: 1,
  });
  gsap.to(hourr, {
    offset: calcDegree(time[1], hourr),
    duration: 1,
  });
  gsap.to(minl, {
    offset: calcDegree(time[2], minl),
    duration: 1,
  });
  gsap.to(minr, {
    offset: calcDegree(time[3], minr),
    duration: 1,
  });
  // hourl.offset = calcDegree(time[0], hourl);
  // hourr.offset = calcDegree(time[1], hourr);
  // minl.offset = calcDegree(time[2], minl);
  // minr.offset = calcDegree(time[3], minr);
  ctx.clearRect(0, 0, width, height);
  cover_ctx.clearRect(0, 0, width, height);
  setup();
}
