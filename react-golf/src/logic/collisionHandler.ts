// ELEMENTS
let courseElement: HTMLElement | null = null;
const DAMPENING = 0.8;

document.addEventListener("DOMContentLoaded", function () {
  // this function runs when the DOM is ready, i.e. when the document has been parsed
  courseElement = document.querySelector(".course-ground");
});

interface Point {
  x: number;
  y: number;
}

interface Ray {
  p1: Point;
  p2: Point;
}

interface Circle {
  x: number;
  y: number;
  radius: number;
}

function rayInterceptsCircle(ray: Ray, circle: Circle): boolean {
  const dx = ray.p2.x - ray.p1.x;
  const dy = ray.p2.y - ray.p1.y;
  const u = Math.min(
    1,
    Math.max(
      0,
      ((circle.x - ray.p1.x) * dx + (circle.y - ray.p1.y) * dy) /
        (dy * dy + dx * dx)
    )
  );
  const nx = ray.p1.x + dx * u - circle.x;
  const ny = ray.p1.y + dy * u - circle.y;
  return nx * nx + ny * ny < circle.radius * circle.radius;
}

function queryCoursePointElements() {
  if (!courseElement) {
    courseElement = document.querySelector(".course-ground") as HTMLElement;
  }

  const topLeftElement = document.querySelector(
    ".course-corner-tl"
  ) as HTMLElement;
  const topRightElement = document.querySelector(
    ".course-corner-tr"
  ) as HTMLElement;
  const bottomLeftElement = document.querySelector(
    ".course-corner-bl"
  ) as HTMLElement;
  const bottomRightElement = document.querySelector(
    ".course-corner-br"
  ) as HTMLElement;

  return {
    topLeftElement,
    topRightElement,
    bottomLeftElement,
    bottomRightElement,
  };
}

interface CoursePointElements {
  topLeftElement: HTMLElement;
  topRightElement: HTMLElement;
  bottomLeftElement: HTMLElement;
  bottomRightElement: HTMLElement;
}
function createRaysAndCircle(
  ball: HTMLElement,
  coursePointElements: CoursePointElements
) {
  const {
    topLeftElement,
    topRightElement,
    bottomLeftElement,
    bottomRightElement,
  } = coursePointElements;

  // Get the coordinates of the corners
  const tL = topLeftElement.getBoundingClientRect();
  const tR = topRightElement.getBoundingClientRect();
  const bL = bottomLeftElement.getBoundingClientRect();
  const bR = bottomRightElement.getBoundingClientRect();
  const ballRect = ball.getBoundingClientRect();

  // Get x and y of the ball
  const ballX = ballRect.left + ballRect.width / 2;
  const ballY = ballRect.top + ballRect.height / 2;
  const ballRadius = parseFloat(getComputedStyle(ball).width) / 2;

  const rays = {
    rayTop: { p1: tL, p2: tR },
    rayRight: { p1: tR, p2: bR },
    rayBottom: { p1: bR, p2: bL },
    rayLeft: { p1: bL, p2: tL },
  };

  const circle: Circle = { x: ballX, y: ballY, radius: ballRadius };

  return { rays, circle };
}

export function handleCollisionWithTilt(
  ball: HTMLElement,
  velocityX: number,
  velocityY: number
) {
  // If courseElement is null, try to query it again
  if (!courseElement) {
    courseElement = document.querySelector(".course-ground") as HTMLElement;
  }

  let newVelocityX = velocityX;
  let newVelocityY = velocityY;

  const coursePointElements = queryCoursePointElements();
  const { rays, circle } = createRaysAndCircle(ball, coursePointElements);

  if (rayInterceptsCircle(rays.rayTop, circle)) {
    if (velocityY > 0) {
      return [velocityX, velocityY * DAMPENING];
    }

    newVelocityY = -velocityY * DAMPENING;
  }

  if (rayInterceptsCircle(rays.rayRight, circle)) {
    if (velocityX < 0) {
      return [velocityX * DAMPENING, velocityY];
    }

    newVelocityX = -velocityX * DAMPENING;
  }

  if (rayInterceptsCircle(rays.rayBottom, circle)) {
    if (velocityY < 0) {
      return [velocityX, velocityY * DAMPENING];
    }

    newVelocityY = -velocityY * DAMPENING;
  }

  if (rayInterceptsCircle(rays.rayLeft, circle)) {
    if (velocityX > 0) {
      return [velocityX * DAMPENING, velocityY];
    }

    newVelocityX = -velocityX * DAMPENING;
  }

  return [newVelocityX, newVelocityY];
}

export function isCollidingWithFlag(ball: HTMLElement) {
  if (!courseElement) {
    courseElement = document.querySelector(".course-ground") as HTMLElement;
  }

  const flagHoleElement = courseElement.querySelector("#course-flag-hole");
  if (!flagHoleElement) {
    return false;
  }

  const ballRect = ball.getBoundingClientRect();
  const flagHoleRect = flagHoleElement.getBoundingClientRect();

  // Return true if ball is inside of the flag hole
  return (
    ballRect.left >= flagHoleRect.left &&
    ballRect.right <= flagHoleRect.right &&
    ballRect.top >= flagHoleRect.top &&
    ballRect.bottom <= flagHoleRect.bottom
  );
}
