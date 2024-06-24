import { isCircleInPolygonReturn } from "../helpers/collisionType";
import { isPartiallyStill, isStill } from "../helpers/isStill";
import { Line } from "../helpers/line";
import { handleCollisionReturn } from "./collisionHandler";

// INVERSE REFLECTION
function getReflectInverse(velocity: Velocity): Velocity {
  return [-velocity[0], -velocity[1]];
}

function getNormalVector(line: Line) {
  const lineVector = { x: line.b.x - line.a.x, y: line.b.y - line.a.y };
  const normalVector = { x: -lineVector.y, y: lineVector.x };
  const magnitude = Math.sqrt(
    normalVector.x * normalVector.x + normalVector.y * normalVector.y
  );
  return { x: normalVector.x / magnitude, y: normalVector.y / magnitude };
}

function getDotProduct(vectorA: Point, vectorB: Point) {
  return vectorA.x * vectorB.x + vectorA.y * vectorB.y;
}

// ANGLED REFLECTION
function getReflectionVelocity(velocity: Velocity, normal: Point) {
  const velocityPoint = { x: velocity[0], y: velocity[1] };
  const dotProduct = 2 * getDotProduct(velocityPoint, normal);

  return [
    velocity[0] - dotProduct * normal.x,
    velocity[1] - dotProduct * normal.y,
  ] as Velocity;
}

interface handleCollisionResponseReturn {
  velocity: Velocity;
  isInHole: boolean;
}
export function handleCollisionResponse(
  collisionResult: handleCollisionReturn,
  velocity: Velocity,
  playerRect: DOMRect
): handleCollisionResponseReturn {
  const { details, objectRef } = collisionResult;

  let resultResponse = {
    velocity,
    isInHole: false,
  } as handleCollisionResponseReturn;

  // LINE COLLISION (END & LINE)
  if (objectRef.effect === "BOUNCE") {
    const lineDetails = details as isCircleInPolygonReturn;

    // END
    if (lineDetails.lineCollision.end) {
      resultResponse = {
        ...resultResponse,
        velocity: getReflectInverse(velocity),
      };
    }

    // LINE
    if (lineDetails.lineCollision.line && lineDetails.currentLine) {
      const normal = getNormalVector(lineDetails.currentLine);
      const reflectionVelocity = getReflectionVelocity(velocity, normal);
      return { ...resultResponse, velocity: reflectionVelocity };
    }
  }

  if (objectRef.effect === "FINNISH") {
    return { ...resultResponse, isInHole: true };
  }

  if (objectRef.effect === "SLOW") {
    return { ...resultResponse, velocity: sandEffect(velocity) };
  }

  if (objectRef.effect === "RESTART") {
    // Reload Page
    return { ...resultResponse, velocity: finishEffect(velocity) };
  }

  if (objectRef.effect === "PULLED") {
    // Pulled towards middle
    const objectRect =
      collisionResult.objectRef.refObject.current?.getBoundingClientRect();

    if (!objectRect || !playerRect) {
      return { ...resultResponse, velocity };
    }

    const pulledWidth = objectRect?.width / 2;
    const pulledHeight = objectRect?.height / 2;

    const playerWidth = playerRect.width / 2;
    const playerHeight = playerRect.height / 2;

    const objectCenterPoint = {
      x: Number(objectRect?.left + pulledWidth),
      y: Number(objectRect?.top + pulledHeight),
    } as Point;

    const playerCenterPoint = {
      x: Number(playerRect?.left + playerWidth),
      y: Number(playerRect?.top + playerHeight),
    } as Point;

    return {
      ...resultResponse,
      velocity: pullEffect(velocity, playerCenterPoint, objectCenterPoint),
    };
  }

  return resultResponse;
}

// How much the ball should slow down.
// Value: 0-1
// A lower value means the player comes to stop faster.
const SAND_DECREASE_VALUE = 0.95;
function sandEffect(currentVelocity: Velocity): Velocity {
  const decreasedX = currentVelocity[0] * SAND_DECREASE_VALUE;
  const decreasedY = currentVelocity[1] * SAND_DECREASE_VALUE;
  const decreasedVelocity = [decreasedX, decreasedY] as Velocity;
  return decreasedVelocity;
}

function finishEffect(currentVelocity: Velocity) {
  const velocityX = currentVelocity[0];
  const velocityY = currentVelocity[1];

  console.log("WATER");

  if (isStill(velocityX, velocityY)) {
    location.reload();
  }

  return currentVelocity;
}

// How much the ball should increase in speed.
// Value: 1-inifinity
// A higher value means the ball moves faster towards the center point.

// X
// 1. FORWARD ->
//

const PULL_STRENGTH = 0.1; // Adjust this value as needed
const VELOCITY_THRESHOLD = 0.01; // Adjust this value as needed
const STOP_DISTANCE = 0.05; // Adjust this value as needed

function pullEffect(
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
