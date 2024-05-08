let requestAnimationFrameId: number;
let velocityX = 0;
let velocityY = 0;
const inertia = 0.01; // adjust this to change how quickly the ball changes direction
const maxSpeed = 5; // adjust this to change the maximum speed

export async function movePlayerBallNEW(
  ball: HTMLElement,
  procents: [number, number]
) {
  cancelAnimationFrame(requestAnimationFrameId);
  continueBallMovement(ball, procents);
}

async function continueBallMovement(
  el: HTMLElement,
  procents: [number, number]
) {
  let [procentX, procentY] = procents;

  // adjust velocity towards target direction
  velocityX += (procentX - velocityX) * inertia;
  velocityY += (procentY - velocityY) * inertia;

  // limit speed
  const speed = Math.sqrt(velocityX * velocityX + velocityY * velocityY);
  if (speed > maxSpeed) {
    velocityX = (velocityX / speed) * maxSpeed;
    velocityY = (velocityY / speed) * maxSpeed;
  }

  const currentLeft = parseFloat(getComputedStyle(el).left);
  const currentTop = parseFloat(getComputedStyle(el).top);
  const elInline = el as HTMLElement;

  // add velocity to current position
  elInline.style.left = `${currentLeft + velocityX}px`;
  elInline.style.top = `${currentTop + velocityY}px`;

  requestAnimationFrameId = requestAnimationFrame(async function () {
    continueBallMovement(el, procents);
  });
}

export function stopPlayerBallMovement() {
  cancelAnimationFrame(requestAnimationFrameId);
  // Reset velocities
  velocityX = 0;
  velocityY = 0;
}
