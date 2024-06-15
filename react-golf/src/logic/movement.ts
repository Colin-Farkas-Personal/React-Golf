import {
  handleCollisionWithTilt
} from "./collisionHandler";

let requestAnimationFrameId: number;
let velocityX = 0;
let velocityY = 0;

const inertia = 0.01;
const maxSpeed = 20;
let isStopping = false;
const deceleration = 0.995;

export async function movePlayerBall(
  ball: HTMLElement,
  direction: Velocity,
  speed: number,
) {
  isStopping = false;
  cancelAnimationFrame(requestAnimationFrameId);
  moveBall(ball, direction, speed);
}

function normalizeVelocity() {
  const currentSpeed = Math.hypot(velocityX, velocityY);
  if (currentSpeed > maxSpeed) {
    velocityX = (velocityX / currentSpeed) * maxSpeed;
    velocityY = (velocityY / currentSpeed) * maxSpeed;
  }
}

async function moveBall(
  ball: HTMLElement,
  direction: Velocity,
  targetSpeed: number
) {
  const [dirX, dirY] = direction;

  velocityX += (dirX * targetSpeed - velocityX) * inertia;
  velocityY += (dirY * targetSpeed - velocityY) * inertia;

  if (isStopping) {
    velocityX *= deceleration;
    velocityY *= deceleration;

    if (Math.abs(velocityX) < 0.01 && Math.abs(velocityY) < 0.01) {
      velocityX = 0;
      velocityY = 0;
      isStopping = false;
      cancelAnimationFrame(requestAnimationFrameId);
      return;
    }
  }

  normalizeVelocity();

  const currentLeft = parseFloat(getComputedStyle(ball).left);
  const currentTop = parseFloat(getComputedStyle(ball).top);

  [velocityX, velocityY] = handleCollisionWithTilt(ball, velocityX, velocityY);

  ball.style.left = `${currentLeft + velocityX}px`;
  ball.style.top = `${currentTop + velocityY}px`;

  requestAnimationFrameId = requestAnimationFrame(async function () {
    if (isStopping) {
      moveBall(ball, [0, 0], 0);
    } else {
      moveBall(ball, direction, targetSpeed);
    }
  });
}

export function stopPlayerBall() {
  isStopping = true;
}
