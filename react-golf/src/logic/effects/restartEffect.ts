import { isStill } from "../../helpers/isStill";

const SLOWING__VALUE = 0.99;
export function restartEffect(currentVelocity: Velocity): Velocity {
  const velocityX = currentVelocity[0] * SLOWING__VALUE;
  const velocityY = currentVelocity[1] * SLOWING__VALUE;

  if (isStill(velocityX, velocityY)) {
    location.reload();
  }

  return [velocityX, velocityY];
}
