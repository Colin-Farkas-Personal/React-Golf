const PULL_STRENGTH = 0.1;
const VELOCITY_THRESHOLD = 0.01;
const STOP_DISTANCE = 0.05;

export function pullEffect(
  currentVelocity: [number, number],
  playerCenterPoint: { x: number; y: number },
  centerPoint: { x: number; y: number }
): [number, number] {
  // Calculate the vector from the player to the center of the pit
  let dx = centerPoint.x - playerCenterPoint.x;
  let dy = centerPoint.y - playerCenterPoint.y;

  // Calculate the distance
  let distance = Math.sqrt(dx * dx + dy * dy);

  // If the distance is less than or equal to the stop distance, set velocity to zero
  if (distance <= STOP_DISTANCE) {
    return [0, 0];
  }

  // Only normalize and scale the vector if the distance is not zero
  if (distance !== 0) {
    // Normalize the vector
    dx /= distance;
    dy /= distance;

    // Scale the vector by the pull strength
    dx *= PULL_STRENGTH;
    dy *= PULL_STRENGTH;
  }

  // Subtract the pull vector from the current velocity to get the new velocity
  let newVelocityX = currentVelocity[0] + dx;
  let newVelocityY = currentVelocity[1] + dy;

  // If the velocity is below or at the threshold, set it to zero
  if (
    Math.abs(newVelocityX) <= VELOCITY_THRESHOLD &&
    Math.abs(newVelocityY) <= VELOCITY_THRESHOLD
  ) {
    newVelocityX = 0;
    newVelocityY = 0;
  }

  return [newVelocityX, newVelocityY];
}
