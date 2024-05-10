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

  // Query the corner elements
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

  const rayTop: Ray = { p1: tL, p2: tR };
  const rayRight: Ray = { p1: tR, p2: bR };
  const rayBottom: Ray = { p1: bR, p2: bL };
  const rayLeft: Ray = { p1: bL, p2: tL };
  const circle: Circle = { x: ballX, y: ballY, radius: ballRadius };

  if (rayInterceptsCircle(rayTop, circle)) {
    newVelocityY = -velocityY * DAMPENING;
  }

  if (rayInterceptsCircle(rayRight, circle)) {
    newVelocityX = -velocityX * DAMPENING;
  }

  if (rayInterceptsCircle(rayBottom, circle)) {
    newVelocityY = -velocityY * DAMPENING;
  }

  if (rayInterceptsCircle(rayLeft, circle)) {
    newVelocityX = -velocityX * DAMPENING;
  }

  return [newVelocityX, newVelocityY];
}

// export function handleBoundaryCollision(
//   ball: HTMLElement,
//   velocityX: number,
//   velocityY: number
// ): [number, number] {
//   let newVelocityX = velocityX;
//   let newVelocityY = velocityY;

//   // If courseElement is null, try to query it again
//   if (!courseElement) {
//     courseElement = document.querySelector(".course-ground") as HTMLElement;
//   }

//   // If courseElement is still null, return the original direction
//   if (!courseElement) {
//     newVelocityX = velocityX;
//     newVelocityY = velocityY;
//   }

//   // Get the dimensions of the ball and the course
//   const ballRect = ball.getBoundingClientRect();
//   const courseRect = courseElement.getBoundingClientRect();
//   const courseBorderWidth = parseFloat(
//     parseFloat(getComputedStyle(courseElement).borderWidth).toFixed(3)
//   );

//   // Predict the new position of the ball
//   const newBallRect = {
//     left: parseFloat(ballRect.left.toFixed(3)),
//     right: parseFloat(ballRect.right.toFixed(3)),
//     top: parseFloat(ballRect.top.toFixed(3)),
//     bottom: parseFloat(ballRect.bottom.toFixed(3)),
//   };

//   // Check if the ball would hit the left or right boundary
//   const hitHorizontalBoundary =
//     newBallRect.left < courseRect.left + courseBorderWidth ||
//     newBallRect.right > courseRect.right - courseBorderWidth;

//   // Check if the ball would hit the top or bottom boundary
//   const hitVerticalBoundary =
//     newBallRect.top < courseRect.top + courseBorderWidth ||
//     newBallRect.bottom > courseRect.bottom - courseBorderWidth;

//   if (hitVerticalBoundary) {
//     newVelocityY = -velocityY;
//     newVelocityX = -velocityX;
//   }
//   if (hitHorizontalBoundary) {
//     newVelocityX = -velocityX;
//   }

//   return [newVelocityX, newVelocityY];
// }

export function isCollidingWithFlag(ball: HTMLElement) {
  if (!courseElement) {
    courseElement = document.querySelector(".course-ground") as HTMLElement;
  }

  const flagHoleElement = courseElement.querySelector(".course-flag-hole");
  if (!flagHoleElement) {
    return false;
  }

  const ballRect = ball.getBoundingClientRect();
  const flagHoleRect = flagHoleElement.getBoundingClientRect();

  return (
    ballRect.left < flagHoleRect.right &&
    ballRect.right > flagHoleRect.left &&
    ballRect.top < flagHoleRect.bottom &&
    ballRect.bottom > flagHoleRect.top
  );
}
