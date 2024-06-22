import { isCircleInPolygonReturn } from "../helpers/collisionType";
import { isStill } from "../helpers/isStill";
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
  velocity: Velocity
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

function finishEffect(velocity: Velocity) {
  const velocityX = velocity[0];
  const velocityY = velocity[1];

  if (isStill(velocityX, velocityY)) {
    location.reload();
    console.log("SLOW");
  }

  return velocity;
}
