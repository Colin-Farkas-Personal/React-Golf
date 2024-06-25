// How much the ball should slow down.
// Value: 0-1
// A lower value means the player comes to stop faster.
const SAND_DECREASE_VALUE = 0.95;
export function sandEffect(currentVelocity: Velocity): Velocity {
  const decreasedX = currentVelocity[0] * SAND_DECREASE_VALUE;
  const decreasedY = currentVelocity[1] * SAND_DECREASE_VALUE;
  const decreasedVelocity = [decreasedX, decreasedY] as Velocity;
  return decreasedVelocity;
}
