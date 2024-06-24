// How much the ball must slow down to be reset
// Based on the velocity. Closer to 0, less velocity
const VELOCITY_TRESHOLD_POSITIVE = 0.1;
const VELOCITY_TRESHOLD_NEGATIBE = -0.1;
export function isStill(velocityX: number, velocityY: number) {
  const isStillX =
    velocityX >= VELOCITY_TRESHOLD_NEGATIBE &&
    velocityX <= VELOCITY_TRESHOLD_POSITIVE;
  const isStillY =
    velocityY >= VELOCITY_TRESHOLD_NEGATIBE &&
    velocityY <= VELOCITY_TRESHOLD_POSITIVE;

  if (isStillX && isStillY) {
    return true;
  }

  return false;
}
