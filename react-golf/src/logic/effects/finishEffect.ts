import { isStill } from "../../helpers/isStill";

export function finishEffect(currentVelocity: Velocity) {
  const velocityX = currentVelocity[0];
  const velocityY = currentVelocity[1];

  console.log("WATER");

  if (isStill(velocityX, velocityY)) {
    location.reload();
  }

  return currentVelocity;
}
