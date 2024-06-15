import { Line } from "../helpers/line";
import { handleCollisionReturn } from "./collisionHandler";

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

  // POINT/LINE-END COLLISION
  if (!objectRef.hasInside) {
    if (details.lineCollision.end) {
      resultResponse = {
        ...resultResponse,
        velocity: getReflectInverse(velocity),
      };
    }

    // LINE COLLISION
    if (details.lineCollision.line && details.currentLine) {
      const normal = getNormalVector(details.currentLine);
      const reflectionVelocity = getReflectionVelocity(velocity, normal);
      return { ...resultResponse, velocity: reflectionVelocity };
    }
  }

  if (objectRef.effect === "FINNISH") {
    return { ...resultResponse, isInHole: true };
  }

  return resultResponse;
}
